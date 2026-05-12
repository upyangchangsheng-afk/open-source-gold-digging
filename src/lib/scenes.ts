import type { Scene, SceneSortOption } from './types';
import scenesData from '@/data/scenes.json';
import candidateData from '@/data/candidate-scenes.json';
import marketingScene from '@/data/scene-ai-marketing.json';
import knowledgeScene from '@/data/scene-ai-knowledge.json';
import automationScene from '@/data/scene-ai-automation.json';

const allScenes: Scene[] = [
  ...(scenesData as Scene[]),
  marketingScene as Scene,
  knowledgeScene as Scene,
  automationScene as Scene,
  ...(candidateData as Scene[]),
];

export function getAllScenes(): Scene[] {
  return allScenes;
}

export function getDeepScenes(): Scene[] {
  return allScenes.filter((s) => !s.sceneType || s.sceneType === 'deep');
}

export function getCandidateScenes(): Scene[] {
  return allScenes.filter((s) => s.sceneType === 'candidate');
}

export function getSceneBySlug(slug: string): Scene | undefined {
  return allScenes.find((s) => s.slug === slug);
}

export function getScenesByProjectSlug(projectSlug: string): Scene[] {
  return allScenes.filter((s) => s.linkedProjectSlugs.includes(projectSlug));
}

export function getScenesByTag(tag: string): Scene[] {
  return allScenes.filter((s) => s.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  allScenes.forEach((s) => s.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function sortScenes(scenes: Scene[], sortBy: SceneSortOption): Scene[] {
  const sorted = [...scenes];
  switch (sortBy) {
    case 'barrier-asc':
      sorted.sort((a, b) => {
        const order: Record<string, number> = { '极低': 0, '低': 1, '中低': 1.5, '中': 2, '中偏高': 3, '高': 4 };
        return (order[a.entryBarrier.split(' — ')[0]] ?? 5) - (order[b.entryBarrier.split(' — ')[0]] ?? 5);
      });
      break;
    case 'default':
    default:
      // 过期场景降权
      sorted.sort((a, b) => getSceneSortWeight(b) - getSceneSortWeight(a));
      break;
  }
  return sorted;
}

export function getDataFreshness(
  lastUpdated: string,
  expirationDays?: number,
): { status: 'fresh' | 'stale' | 'expired'; days: number } {
  const now = new Date();
  const updated = new Date(lastUpdated);
  const days = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
  const freshDays = expirationDays ?? 90;
  const staleDays = freshDays * 2;
  if (days <= freshDays) return { status: 'fresh', days };
  if (days <= staleDays) return { status: 'stale', days };
  return { status: 'expired', days };
}

export function getSceneSortWeight(scene: Scene): number {
  const freshness = getDataFreshness(scene.lastUpdated, scene.expirationDays);
  if (freshness.status === 'expired') return 0.4;
  if (freshness.status === 'stale') return 0.7;
  return 1.0;
}
