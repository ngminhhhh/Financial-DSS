import type { Trend } from '../../mocks/mock'
import { trendStroke } from './trend'

export function Sparkline({ values, trend }: { values: number[]; trend: Trend }) {
  const step = 90 / (values.length - 1)
  const points = values.map((y, i) => `${i * step},${y}`).join(' ')
  return (
    <svg width="90" height="28" viewBox="0 0 90 28">
      <polyline points={points} fill="none" stroke={trendStroke[trend]} strokeWidth="1.6" />
    </svg>
  )
}
