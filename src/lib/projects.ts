import type {
  Project,
  WeeklyPick,
  Category,
  DisplayCategory,
  FilterState,
  SortOption,
} from './types';
import projectsData from '@/data/projects.json';
import weeklyPicksData from '@/data/weekly-picks.json';

const projects: Project[] = projectsData as Project[];
const weeklyPicks: WeeklyPick[] = weeklyPicksData as WeeklyPick[];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getWeeklyPicks(): Array<{
  project: Project;
  editorNote: string;
  week: string;
}> {
  return weeklyPicks
    .map((pick) => {
      const project = getProjectBySlug(pick.slug);
      if (!project) return null;
      return { project, editorNote: pick.editorNote, week: pick.week };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

export function getCategories(): Category[] {
  return [
    {
      key: 'can-earn',
      label: '可以赚钱',
      icon: '💰',
      description: '可以直接部署收钱的项目',
    },
    {
      key: 'need-modify',
      label: '改改用',
      icon: '🔧',
      description: '需要二开但方向明确',
    },
    {
      key: 'learn-reference',
      label: '学习参考',
      icon: '📖',
      description: '框架/库，用来学技术',
    },
    {
      key: 'academic',
      label: '学术论文',
      icon: '🔬',
      description: '论文仓库，默认折叠',
    },
  ];
}

export function getCategoryLabel(key: DisplayCategory): string {
  const cat = getCategories().find((c) => c.key === key);
  return cat?.label ?? key;
}

export function filterProjects(filter: FilterState): Project[] {
  let result = [...projects];

  if (filter.category) {
    result = result.filter((p) => p.displayCategory === filter.category);
  }

  switch (filter.sortBy) {
    case 'stars':
      result.sort((a, b) => b.stars - a.stars);
      break;
    case 'newest':
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'level':
      result.sort((a, b) => b.intelligenceLevel - a.intelligenceLevel);
      break;
  }

  return result;
}

export function getAcademicProjects(): Project[] {
  return projects.filter((p) => p.displayCategory === 'academic');
}

export function getNonAcademicProjects(): Project[] {
  return projects.filter((p) => p.displayCategory !== 'academic');
}
