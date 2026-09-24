import type { Trend } from '../../mocks/mock'
import { trendText } from '../ui/trend'

export function InstrumentHeader({
  symbol,
  name,
  price,
  change,
  trend,
}: {
  symbol: string
  name: string
  price: string
  change: string
  trend: Trend
}) {
  return (
    <div className="shrink-0">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl font-bold">{symbol}</span>
        <span className="text-xs text-sub">{name}</span>
      </div>
      <div className={`mt-1 flex items-baseline gap-2.5 ${trendText[trend]}`}>
        <span className="text-[28px] font-bold">{price}</span>
        <span className="text-sm font-bold">{change}</span>
      </div>
    </div>
  )
}
