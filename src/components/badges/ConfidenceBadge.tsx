import type { DataConfidence } from '@/lib/types';

const config: Record<DataConfidence, { label: string; className: string }> = {
  verified: {
    label: '已验证数据',
    className: 'bg-green-100 text-green-800',
  },
  'ai-estimated': {
    label: 'AI估算',
    className: 'bg-blue-50 text-blue-700',
  },
  speculative: {
    label: '推演数据',
    className: 'bg-gray-100 text-gray-600',
  },
};

export default function ConfidenceBadge({ level }: { level: DataConfidence }) {
  const { label, className } = config[level];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
