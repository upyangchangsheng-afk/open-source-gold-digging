export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
}: {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <h2 className="text-xl font-semibold text-[#171717] sm:text-2xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm text-[#8a8a8a]">{subtitle}</p>
      )}
    </div>
  );
}
