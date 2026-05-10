const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(
  __dirname,
  '../../github-ai-discovery/output/projects_db.json'
);
const OUT_PATH = path.resolve(__dirname, '../src/data/projects.json');

function toSlug(repoId) {
  return repoId.replace(/\//g, '-');
}

function mapCategory(rawTag) {
  switch (rawTag) {
    case '赚钱项目':
    case 'AI工具/SaaS':
      return 'can-earn';
    case 'AI插件/扩展':
    case '垂直AI应用':
      return 'need-modify';
    case 'AI开发框架':
    case 'AI模型/权重':
      return 'learn-reference';
    case '学术论文':
      return 'academic';
    // 🆕 新管线标签
    case '商业验证':
      return 'can-earn';
    case '平台插件':
      return 'need-modify';
    default:
      return 'learn-reference';
  }
}

function mapPipelineBadge(categoryTag) {
  if (categoryTag === '商业验证') return 'commercial_validated';
  if (categoryTag && categoryTag.startsWith('平台插件')) return 'platform_plugin';
  if (categoryTag && categoryTag.startsWith('场景-')) return 'business_scene';
  return null;
}

function normalizeDeepDive(dd) {
  if (!dd) return null;
  const out = { ...dd };
  // 怎么跑起来：数组 → 换行分隔的字符串
  if (Array.isArray(out.怎么跑起来)) {
    out.怎么跑起来 = out.怎么跑起来.join('\n');
  }
  return out;
}

function normalizeTechStack(ts) {
  if (!ts) return null;
  const out = {};
  // 单值字段保持字符串
  if (ts.主语言) out.主语言 = ts.主语言;
  // 多值字段统一转数组（Python 可能输出字符串或数组）
  const arrayFields = ['框架', 'AI依赖', '数据库', '部署方式', '部署', '前端', '向量数据库'];
  for (const f of arrayFields) {
    const v = ts[f];
    if (!v || (typeof v === 'string' && v.trim() === '')) continue;
    out[f] = Array.isArray(v) ? v : [v];
  }
  // Python 输出 "部署" 映射为前端期望的 "部署方式"
  if (out.部署 && !out.部署方式) {
    out.部署方式 = out.部署;
    delete out.部署;
  }
  return out;
}

function transform() {
  const raw = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const projects = raw.projects;
  const result = [];

  for (const [repoId, entry] of Object.entries(projects)) {
    const cur = entry.current;
    if (!cur || !cur.分析) continue;

    const a = cur.分析;

    result.push({
      slug: toSlug(repoId),
      repoId: repoId,
      owner: cur.owner || '',
      repo: cur.repo || '',
      url: cur.url || `https://github.com/${repoId}`,
      homepage: cur.homepage || '',
      description: cur.description || '',
      stars: cur.stars || 0,
      language: cur.language || '',
      license: cur.license || '',
      topics: cur.topics || [],
      createdAt: cur.created_at || '',
      updatedAt: cur.updated_at || '',
      source: cur.source || '',
      sourceType: cur.source_type || cur.source || '',

      // 🆕 非GitHub源的元数据
      sourceMeta: {
        hnPoints: cur.hn_points || 0,
        hnComments: cur.hn_comments || 0,
        devtoReactions: cur.devto_reactions || 0,
        devtoComments: cur.devto_comments || 0,
        ihRevenue: cur.ih_revenue || '',
        ytViews: cur.yt_views || 0,
        ytLikes: cur.yt_likes || 0,
        ytRevenueSignal: cur.yt_revenue_signal || '',
      },

      categoryTag: a.项目类型标签 || '',
      displayCategory: mapCategory(a.项目类型标签),
      pipeline: mapPipelineBadge(a.项目类型标签),
      intelligenceLevel: a.情报等级 || 1,
      oneLiner: a.一句话定位 || '',
      corePainPoint: a.核心痛点 || '',
      monetizationPaths: a.变现路径 || [],
      actionSuggestions: a.行动建议 || [],
      sixDimensions: {
        实现难度: a.六维度?.实现难度 || '',
        产出结果: a.六维度?.产出结果 || '',
        持续性: a.六维度?.持续性 || '',
        盈利路径: a.六维度?.盈利路径 || '',
        竞争烈度: a.六维度?.竞争烈度 || '',
        风险等级: a.六维度?.风险等级 || [],
      },
      hasReadme: a.有README ?? false,
      readmeLength: a.README长度 || 0,
      hasDocker: a.有Docker || false,
      hasDockerCompose: a.有DockerCompose || false,
      hasTests: a.有Tests || false,
      hasCi: a.有CI || false,

      // 🆕 新分析维度
      deployability: a.部署就绪度 || null,
      commercialSignals: a.商业化信号 || null,
      chineseFriendliness: a.中文友好度 || null,
      activity: a.活跃度 || null,

      firstSeen: entry.first_seen || '',
      lastSeen: entry.last_seen || '',
      seenCount: entry.seen_count || 0,

      deepDive: normalizeDeepDive(a.深度解析),
      quickCard: a.快速判断卡 || a.完整报告?._快速判断卡 || null,
      fullReport: a.完整报告 || null,
      techStack: normalizeTechStack(a.技术栈),
      useCases: a.使用案例 || [],
    });
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Transformed ${result.length} projects → ${OUT_PATH}`);

  // 也导出站点状态（lastUpdate 等）
  const STATUS_SRC = path.resolve(
    __dirname,
    '../../github-ai-discovery/output/status.json'
  );
  const STATUS_OUT = path.resolve(__dirname, '../src/data/site-status.json');
  let siteStatus = { lastUpdate: null, projectCount: 0, success: false };
  try {
    if (fs.existsSync(STATUS_SRC)) {
      const rawStatus = JSON.parse(fs.readFileSync(STATUS_SRC, 'utf-8'));
      siteStatus = {
        lastUpdate: rawStatus.lastRun || null,
        projectCount: rawStatus.projectCount || result.length,
        success: rawStatus.success ?? true,
      };
    } else {
      siteStatus.projectCount = result.length;
    }
  } catch (_) {
    siteStatus.projectCount = result.length;
  }
  fs.writeFileSync(STATUS_OUT, JSON.stringify(siteStatus, null, 2), 'utf-8');
  console.log(`Site status → ${STATUS_OUT}`);
}

transform();
