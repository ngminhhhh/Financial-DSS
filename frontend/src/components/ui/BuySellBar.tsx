export function BuySellBar({ buyPct }: { buyPct: number }) {
  const sellPct = 100 - buyPct
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] font-bold">
        <span className="text-up">{buyPct}%</span>
        <span className="text-down">{sellPct}%</span>
      </div>
      <div className="flex h-[5px] overflow-hidden rounded-full">
        <div className="bg-up" style={{ width: `${buyPct}%` }} />
        <div className="bg-down" style={{ width: `${sellPct}%` }} />
      </div>
    </div>
  )
}
