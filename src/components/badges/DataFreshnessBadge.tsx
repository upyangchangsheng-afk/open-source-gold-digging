import { getDataFreshness } from '@/lib/scenes';

export default function DataFreshnessBadge({ lastUpdated, expirationDays }: { lastUpdated: string; expirationDays?: number }) {
  const { status, days } = getDataFreshness(lastUpdated, expirationDays);

  if (status === 'fresh') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        数据新鲜
      </span>
    );
  }

  if (status === 'stale') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        信息已过{days}天，可能已变化
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      待刷新
    </span>
  );
}
