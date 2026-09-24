import { useState } from 'react'
import type { Candle, ChartAxis, Trend } from '../../mocks/mock'
import { CandlestickChart } from '../charts/CandlestickChart'
import { Card } from '../ui/Card'
import { TimeframeToggle } from '../ui/SegmentedToggle'
import { trendText } from '../ui/trend'

type Item = { label: string; value: string; trend?: Trend }

const TIMEFRAMES = ['15 phút', 'Ngày'] as const

/** Card chart của trang chi tiết: dòng tham chiếu + toggle, nến, dải chỉ số bên dưới. */
export function ChartCard({
  refs,
  stats,
  candles,
  axis,
}: {
  refs: Item[]
  stats: Item[]
  candles: Candle[]
  axis: ChartAxis
}) {
  const [tf, setTf] = useState<(typeof TIMEFRAMES)[number]>('Ngày')

  return (
    <Card className="shrink-0 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-[18px] text-[11.5px] text-sub">
          {refs.map((r) => (
            <span key={r.label}>
              {r.label} <b className={r.trend ? trendText[r.trend] : 'text-ink'}>{r.value}</b>
            </span>
          ))}
        </div>
        <TimeframeToggle options={TIMEFRAMES} value={tf} onChange={setTf} />
      </div>

      <CandlestickChart candles={candles} axis={axis} />

      <div className="mt-3.5 flex gap-[26px] border-t border-line-soft pt-3">
        {stats.map((s) => (
          <div key={s.label}>
            <span className="text-[11px] text-sub">{s.label}</span>
            <div className={`text-[13px] font-bold ${s.trend ? trendText[s.trend] : ''}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
