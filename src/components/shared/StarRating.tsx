export default function StarRating({
  count,
  size = 'md',
}: {
  count: 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const color = [
    'text-amber-500',
    'text-amber-500',
    'text-red-500',
  ];

  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`} aria-label={`${count}星情报等级`}>
      {[1, 2, 3].map((star) => (
        <span
          key={star}
          className={star <= count ? color[count - 1] : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </span>
  );
}
