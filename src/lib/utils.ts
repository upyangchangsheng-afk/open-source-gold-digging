export function toSlug(repoId: string): string {
  return repoId.replace(/\//g, '-');
}

export function fromSlug(slug: string): string {
  const idx = slug.indexOf('-');
  if (idx === -1) return slug;
  return slug.substring(0, idx) + '/' + slug.substring(idx + 1);
}

export function formatStars(n: number): string {
  if (n >= 1000) {
    const k = (n / 1000).toFixed(1);
    return k.endsWith('.0') ? k.slice(0, -2) + 'k' : k + 'k';
  }
  return String(n);
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const days = Math.floor((now.getTime() - then.getTime()) / 86400000);
  if (days < 1) return '今天';
  if (days < 30) return `${days}天前`;
  if (days < 365) return `${Math.floor(days / 30)}个月前`;
  return `${Math.floor(days / 365)}年前`;
}

export function isToday(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr === today;
}

export function isNewProject(createdAt: string): boolean {
  const now = new Date();
  const then = new Date(createdAt);
  const months =
    (now.getFullYear() - then.getFullYear()) * 12 +
    (now.getMonth() - then.getMonth());
  return months < 3;
}
