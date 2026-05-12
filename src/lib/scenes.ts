import type { Scene, SceneSortOption } from './types';
import scenesData from '@/data/scenes.json';

const scenes: Scene[] = scenesData as Scene[];

export function getAllScenes(): Scene[] {
  return scenes;
}

export function getSceneBySlug(slug: string): Scene | undefined {
  return scenes.find((s) => s.slug === slug);
}

export function getScenesByProjectSlug(projectSlug: string): Scene[] {
  return scenes.filter((s) => s.linkedProjectSlugs.includes(projectSlug));
}

export function getScenesByTag(tag: string): Scene[] {
  return scenes.filter((s) => s.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  scenes.forEach((s) => s.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function sortScenes(scenes: Scene[], sortBy: SceneSortOption): Scene[] {
  const sorted = [...scenes];
  switch (sortBy) {
    case 'barrier-asc':
      sorted.sort((a, b) => {
        const order: Record<string, number> = { '极低': 0, '低': 1, '中': 2, '中偏高': 3, '高': 4 };
        return (order[a.entryBarrier.split(' — ')[0]] ?? 5) - (order[b.entryBarrier.split(' — ')[0]] ?? 5);
      });
      break;
    case 'default':
    default:
      break;
  }
  return sorted;
}

export function getDataFreshness(lastUpdated: string): { status: 'fresh' | 'stale' | 'expired'; days: number } {
  const now = new Date();
  const updated = new Date(lastUpdated);
  const days = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 90) return { status: 'fresh', days };
  if (days <= 180) return { status: 'stale', days };
  return { status: 'expired', days };
}
