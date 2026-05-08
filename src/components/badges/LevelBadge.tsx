export default function LevelBadge({
  level,
  size = 'md',
}: {
  level: 1 | 2 | 3;
  size?: 'sm' | 'md';
}) {
  const colors: Record<number, string> = {
    1: 'bg-gray-100 text-gray-600',
    2: 'bg-amber-50 text-amber-700 border border-amber-200',
    3: 'bg-red-50 text-red-700 border border-red-200',
  };

  const stars = '★'.repeat(level) + '☆'.repeat(3 - level);
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClass} ${colors[level]}`}
    >
      {stars}
    </span>
  );
}
