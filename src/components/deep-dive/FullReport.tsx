import type { FullReport, QuickCard } from '@/lib/types';

function ConfidenceBadge({ level }: { level?: string }) {
  if (!level) return null;
  const colors: Record<string, string> = {
    '🟢高': 'bg-green-50 text-green-700 border-green-200',
    '🟡中': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    '🔴低': 'bg-red-50 text-red-700 border-red-200',
  };
  const color = colors[level] || 'bg-gray-50 text-gray-500 border-gray-200';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}>
      可信度 {level}
    </span>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-lg bg-[#fafaf9] p-3">
      <span className="text-xs font-medium text-[#8a8a8a]">{label}</span>
      <p className="mt-1 text-sm text-[#404040] leading-relaxed">{value}</p>
    </div>
  );
}

function CompetitorCard({ c }: { c: Record<string, unknown> }) {
  const fields = [
    { label: '产品形态', value: c.产品形态 },
    { label: '获客方式', value: c.获客方式 },
    { label: '收费模式', value: c.收费模式 },
    { label: '技术栈推测', value: c.技术栈推测 },
    { label: '运营节奏', value: c.运营节奏 },
  ].filter(f => f.value && typeof f.value === 'string' && (f.value as string).trim());

  return (
    <div className="rounded-xl border border-black/5 bg-white p-4">
      <h4 className="font-semibold text-[#171717]">{(c as any).竞品名称 || '竞品'}</h4>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label}>
            <span className="text-xs text-[#8a8a8a]">{f.label}</span>
            <p className="text-sm text-[#404040]">{(f as any).value}</p>
          </div>
        ))}
      </div>
      {(c as any).可借鉴点 && (
        <div className="mt-3 rounded-lg bg-green-50 p-2.5">
          <span className="text-xs font-medium text-green-700">可借鉴</span>
          <p className="mt-0.5 text-sm text-green-800">{(c as any).可借鉴点}</p>
        </div>
      )}
      {(c as any).可差异化点 && (
        <div className="mt-2 rounded-lg bg-blue-50 p-2.5">
          <span className="text-xs font-medium text-blue-700">可差异化</span>
          <p className="mt-0.5 text-sm text-blue-800">{(c as any).可差异化点}</p>
        </div>
      )}
      {(c as any).一句话总结 && (
        <p className="mt-3 text-sm font-medium text-[#404040]">💡 {(c as any).一句话总结}</p>
      )}
    </div>
  );
}

function ModuleDetails({
  title,
  icon,
  priority,
  defaultOpen = false,
  confidence,
  children,
}: {
  title: string;
  icon: string;
  priority: string;
  defaultOpen?: boolean;
  confidence?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      className="rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden group"
      open={defaultOpen}
    >
      <summary className="flex w-full items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#fafaf9] transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{icon}</span>
          <div>
            <span className="font-semibold text-[#171717]">{title}</span>
            <span className="ml-2 text-xs text-[#8a8a8a]">{priority}</span>
          </div>
          {confidence && <ConfidenceBadge level={confidence} />}
        </div>
        <span className="text-sm text-[#8a8a8a] group-open:hidden">展开 ▼</span>
        <span className="text-sm text-[#8a8a8a] hidden group-open:inline">收起 ▲</span>
      </summary>

      <div className="px-5 pb-5 pt-1 border-t border-black/5">
        {children}
      </div>
    </details>
  );
}

function ReportFallback({ quickCard }: { quickCard?: QuickCard | null }) {
  if (!quickCard) return null;
  return (
    <section className="mt-4 space-y-4">
      <div className="rounded-2xl border border-black/5 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-800">⚠️ 完整报告暂不可用</h3>
        <p className="mt-2 text-sm text-amber-700">
          LLM 深度分析未能生成完整报告。上方快速判断卡包含基本信息。
          运行 <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">python run.py --quick</code> 并确保 <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">DEEPSEEK_API_KEY</code> 环境变量已设置。
        </p>
      </div>
    </section>
  );
}

export default function FullReport({
  report,
  quickCard,
}: {
  report?: FullReport | null;
  quickCard?: QuickCard | null;
}) {
  if (!report) {
    return <ReportFallback quickCard={quickCard} />;
  }

  const 盈 = report.盈利判断;
  const 落 = report.落地路径;
  const 风 = report.门槛与风险;
  const 市 = report.市场格局;
  const 项 = report.项目匹配;
  const 技 = report.技术评估;

  const 同行拆解 = 落?.同行运作拆解;

  return (
    <div className="mt-4 space-y-3">
      <ModuleDetails title="盈利判断" icon="💰" priority="⭐⭐⭐⭐⭐" defaultOpen confidence={盈?.可信度}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FieldRow label="盈利模式" value={盈?.盈利模式} />
          <FieldRow label="定价参考" value={盈?.定价参考} />
          <FieldRow label="目标客单价" value={盈?.目标客单价} />
          <FieldRow label="收入天花板" value={盈?.收入天花板} />
          <FieldRow label="回本周期" value={盈?.回本周期} />
        </div>
        <div className="mt-2">
          <FieldRow label="变现路径" value={盈?.变现路径} />
        </div>
      </ModuleDetails>

      <ModuleDetails title="落地路径" icon="🚀" priority="⭐⭐⭐⭐" confidence={落?.可信度}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FieldRow label="MVP范围" value={落?.MVP范围} />
          <FieldRow label="部署方案" value={落?.部署方案} />
          <FieldRow label="所需资源" value={落?.所需资源} />
          <FieldRow label="关键里程碑" value={落?.关键里程碑} />
        </div>
        <div className="mt-2 space-y-2">
          <FieldRow label="搭建步骤" value={落?.搭建步骤} />
        </div>
        {同行拆解 && 同行拆解.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-[#171717] mb-2">🔬 同行运作拆解</h4>
            <div className="space-y-3">
              {同行拆解.map((c, i) => (
                <CompetitorCard key={i} c={c as unknown as Record<string, unknown>} />
              ))}
            </div>
          </div>
        )}
      </ModuleDetails>

      <ModuleDetails title="门槛与风险" icon="⚠️" priority="⭐⭐⭐⭐" confidence={风?.可信度}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FieldRow label="技术门槛" value={风?.技术门槛} />
          <FieldRow label="资源门槛" value={风?.资源门槛} />
          <FieldRow label="核心卡点" value={风?.核心卡点} />
          <FieldRow label="合规风险" value={风?.合规风险} />
        </div>
        <div className="mt-2 space-y-2">
          <FieldRow label="常见坑" value={风?.常见坑} />
          <FieldRow label="应对建议" value={风?.应对建议} />
        </div>
      </ModuleDetails>

      <ModuleDetails title="市场格局" icon="📊" priority="⭐⭐⭐" confidence={市?.可信度}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FieldRow label="市场痛点" value={市?.市场痛点} />
          <FieldRow label="需求热度" value={市?.需求热度} />
          <FieldRow label="入场时机" value={市?.入场时机} />
          <FieldRow label="差异化空间" value={市?.差异化空间} />
        </div>
        <div className="mt-2">
          <FieldRow label="已知竞品" value={市?.已知竞品} />
        </div>
      </ModuleDetails>

      <ModuleDetails title="项目匹配" icon="🎯" priority="⭐⭐⭐" confidence={项?.可信度}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FieldRow label="推荐产品形态" value={项?.推荐产品形态} />
          <FieldRow label="备选方向" value={项?.备选方向} />
          <FieldRow label="类似成功案例" value={项?.类似成功案例} />
        </div>
        <div className="mt-2 space-y-2">
          <FieldRow label="适用场景" value={项?.适用场景} />
          <FieldRow label="目标用户画像" value={项?.目标用户画像} />
        </div>
      </ModuleDetails>

      <ModuleDetails title="技术评估" icon="🔧" priority="⭐⭐" confidence={技?.可信度}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FieldRow label="代码质量" value={技?.代码质量} />
          <FieldRow label="社区健康度" value={技?.社区健康度} />
          <FieldRow label="依赖风险" value={技?.依赖风险} />
          <FieldRow label="部署难度" value={技?.部署难度} />
          <FieldRow label="可维护性" value={技?.可维护性} />
          <FieldRow label="扩展性" value={技?.扩展性} />
        </div>
      </ModuleDetails>

      <p className="text-center text-xs text-[#8a8a8a] pt-2">
        🤖 以上内容由 AI 生成 · 可信度标记见各模块右上角 · 实际决策请结合具体情况判断
      </p>
    </div>
  );
}
