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

  deepDive?: {
    大白话?: string;
    能解决什么?: string[];
    怎么跑起来?: string;
    使用门槛?: string;
    赚钱思路?: string;
    下一步行动?: string[];
  } | null;

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
