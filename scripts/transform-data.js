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
    default:
      return 'learn-reference';
  }
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

      categoryTag: a.项目类型标签 || '',
      displayCategory: mapCategory(a.项目类型标签),
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

      firstSeen: entry.first_seen || '',
      lastSeen: entry.last_seen || '',
      seenCount: entry.seen_count || 0,

      deepDive: a.深度解析 || null,
      techStack: a.技术栈 || null,
      useCases: a.使用案例 || [],
    });
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Transformed ${result.length} projects → ${OUT_PATH}`);
}

transform();
