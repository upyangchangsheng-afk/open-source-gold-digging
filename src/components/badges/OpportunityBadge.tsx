import { isNewProject } from '@/lib/utils';
import type { Project } from '@/lib/types';

export default function OpportunityBadges({ project }: { project: Project }) {
  const badges: string[] = [];

  if (isNewProject(project.createdAt)) {
    badges.push('🆕 新项目');
  }
  if (project.hasDockerCompose || project.hasDocker) {
    badges.push('🐳 可部署');
  }
  if (project.source === 'external_ref') {
    badges.push('💬 社区推荐');
  }
  if (project.description?.toLowerCase().includes('alternative')) {
    badges.push('🔀 替代品');
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((b) => (
        <span
          key={b}
          className="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700"
        >
          {b}
        </span>
      ))}
    </div>
  );
}
