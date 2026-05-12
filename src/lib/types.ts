export interface SixDimensions {
  实现难度: string;
  产出结果: string;
  持续性: string;
  盈利路径: string;
  竞争烈度: string;
  风险等级: string[];
}

export const DISPLAY_CATEGORIES = [
  'can-earn',
  'need-modify',
  'learn-reference',
  'academic',
] as const;

export type DisplayCategory = (typeof DISPLAY_CATEGORIES)[number];

export function isValidDisplayCategory(s: string): s is DisplayCategory {
  return (DISPLAY_CATEGORIES as readonly string[]).includes(s);
}

export const SORT_OPTIONS = ['stars', 'newest', 'level'] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export interface Project {
  slug: string;
  repoId: string;
  owner: string;
  repo: string;
  url: string;
  homepage: string;
  description: string;
  stars: number;
  language: string;
  license: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  source: string;
  sourceType?: string;

  /** 非GitHub数据源的元数据 */
  sourceMeta?: {
    hnPoints?: number;
    hnComments?: number;
    devtoReactions?: number;
    devtoComments?: number;
    ihRevenue?: string;
    ytViews?: number;
    ytLikes?: number;
    ytRevenueSignal?: string;
  };

  categoryTag: string;
  displayCategory: DisplayCategory;
  intelligenceLevel: 1 | 2 | 3;
  oneLiner: string;
  corePainPoint: string;
  monetizationPaths: string[];
  actionSuggestions: string[];
  sixDimensions: SixDimensions;
  hasReadme: boolean;
  readmeLength: number;
  hasDocker: boolean;
  hasDockerCompose: boolean;
  hasTests: boolean;
  hasCi: boolean;

  firstSeen?: string;
  lastSeen?: string;
  seenCount?: number;

  /** @deprecated 旧版深度解析，被 quickCard + fullReport 替代，保留 1 个版本过渡 */
  deepDive?: {
    大白话?: string;
    能解决什么?: string[];
    怎么跑起来?: string;
    使用门槛?: string;
    赚钱思路?: string;
    下一步行动?: string[];
    LLM深度解析?: unknown;
  } | null;

  quickCard?: QuickCard | null;

  fullReport?: FullReport | null;

  techStack?: {
    主语言?: string;
    框架?: string[];
    AI依赖?: string[];
    数据库?: string[];
    部署方式?: string[];
  } | null;

  useCases?: Array<{
    场景: string;
    做什么: string;
    怎么做: string;
    解决什么: string;
    预期效果: string;
  }>;
}

export interface WeeklyPick {
  slug: string;
  editorNote: string;
  week: string;
}

export interface Category {
  key: DisplayCategory;
  label: string;
  icon: string;
  description: string;
}

export interface FilterState {
  category: DisplayCategory | null;
  sortBy: SortOption;
  onlyNewToday?: boolean;
}

/** 快速判断卡 — 30秒读完，始终可见 */
export interface QuickCard {
  推荐产品形态: string;
  目标用户: string;
  可行性总评: '🟢推荐入场' | '🟡条件入场' | '🔴建议观望' | '⚪暂不评级';
  一句话结论: string;
  核心卖点: string;
  预估投入: string;
  可信度?: '🟢高' | '🟡中' | '🔴低';
}

/** 同行运作拆解 子结构 */
export interface CompetitorBreakdown {
  竞品名称: string;
  产品形态: string;
  获客方式: string;
  收费模式: string;
  技术栈推测: string;
  运营节奏: string;
  可借鉴点: string;
  可差异化点: string;
  一句话总结: string;
}

/** 完整可行性报告 — 6 大模块 */
export interface FullReport {
  盈利判断: {
    盈利模式: string;
    定价参考: string;
    目标客单价: string;
    收入天花板: string;
    回本周期: string;
    变现路径: string;
    可信度?: '🟢高' | '🟡中' | '🔴低';
  };
  落地路径: {
    MVP范围: string;
    搭建步骤: string;
    部署方案: string;
    所需资源: string;
    关键里程碑: string;
    同行运作拆解?: CompetitorBreakdown[];
    可信度?: '🟢高' | '🟡中' | '🔴低';
  };
  门槛与风险: {
    技术门槛: string;
    资源门槛: string;
    核心卡点: string;
    常见坑: string;
    合规风险: string;
    应对建议: string;
    可信度?: '🟢高' | '🟡中' | '🔴低';
  };
  市场格局: {
    市场痛点: string;
    需求热度: string;
    已知竞品: string;
    差异化空间: string;
    入场时机: string;
    可信度?: '🟢高' | '🟡中' | '🔴低';
  };
  项目匹配: {
    推荐产品形态: string;
    备选方向: string;
    类似成功案例: string;
    适用场景: string;
    目标用户画像: string;
    可信度?: '🟢高' | '🟡中' | '🔴低';
  };
  技术评估: {
    代码质量: string;
    社区健康度: string;
    依赖风险: string;
    部署难度: string;
    可维护性: string;
    扩展性: string;
    可信度?: '🟢高' | '🟡中' | '🔴低';
  };
  /** LLM 一并返回的快速判断卡缓存 */
  _快速判断卡?: QuickCard;
}

// ============================================================
// 场景系统类型定义
// ============================================================

export type DataConfidence = 'verified' | 'ai-estimated' | 'speculative';

export const SCENE_SORT_OPTIONS = ['default', 'barrier-asc'] as const;
export type SceneSortOption = (typeof SCENE_SORT_OPTIONS)[number];

export interface ToolRef {
  name: string;
  githubUrl: string;
  usage: string;
  projectSlug: string | null;
  alternatives: string[];
}

export interface CompetitorScene {
  name: string;
  productForm: string;
  pricing: string;
  acquisition: string;
  estimatedMonthly: string;
  learnFrom: string;
  differentiationGap: string;
}

export interface SuccessCase {
  name: string;
  platform: string;
  incomeRange: string;
  operationDuration: string;
  sourceUrl: string;
}

export interface Resource {
  title: string;
  type: 'template' | 'tutorial' | 'tool' | 'asset' | 'script';
  url: string;
  cost: 'free' | 'paid' | 'freemium';
  description: string;
}

export interface LearningStep {
  step: number;
  title: string;
  action: string;
  toolsNeeded: string[];
  expectedOutput: string;
  timeRequired: string;
  detailedGuide: string;
  pitfalls: string[];
}

export interface Scene {
  slug: string;
  name: string;
  tags: string[];
  oneLiner: string;
  painPoints: string[];
  targetUsers: string[];
  useScenarios: string[];
  tools: ToolRef[];
  toolSources: string[];
  techBarrier: string;
  setupTime: string;
  entryBarrier: string;
  startupCost: string;
  timeInvestment: string;
  competitors: CompetitorScene[];
  revenueChannels: string[];
  estimatedIncome: string;
  paybackPeriod: string;
  risks: string[];
  trend: string;
  successCases: SuccessCase[];
  linkedProjectSlugs: string[];
  recommendedStack: string[];
  learningPath: LearningStep[];
  resources: Resource[];
  dataConfidence: DataConfidence;
  lastUpdated: string;
  marketSources: string[];
}
