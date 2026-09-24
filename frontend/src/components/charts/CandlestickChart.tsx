import { PLOT_BOTTOM, PLOT_TOP, chartRange, type Candle, type ChartAxis } from '../../mocks/mock'

// Theo design-system §5: viewBox rộng hơn vùng nến ~74px để chừa trục giá bên phải.
const VIEW_W = 820
const VIEW_H = 220
const PLOT_RIGHT = 746
const AXIS_X = 770
const SLOT = 38
const BODY_W = 14

export function CandlestickChart({ candles, axis }: { candles: Candle[]; axis: ChartAxis }) {
  const y = (p: number) =>
    PLOT_TOP + ((axis.max - p) / (axis.max - axis.min)) * (PLOT_BOTTOM - PLOT_TOP)

  return (
    <>
      <svg width="100%" height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none">
        {axis.ticks.map((t) => (
          <g key={t}>
            <line x1="0" y1={y(t)} x2={PLOT_RIGHT} y2={y(t)} stroke="var(--color-grid)" strokeWidth="1" />
            <text x={AXIS_X} y={y(t) + 4} fontFamily="Space Grotesk" fontSize="11" fill="var(--color-muted)">
              {axis.format(t)}
            </text>
          </g>
        ))}
        {candles.map((c, i) => {
          const up = c.c >= c.o
          const color = up ? 'var(--color-up)' : 'var(--color-down)'
          const cx = 17 + i * SLOT
          const top = y(Math.max(c.o, c.c))
          const bottom = y(Math.min(c.o, c.c))
          return (
            <g key={i} stroke={color} fill={color}>
              <line x1={cx} y1={y(c.h)} x2={cx} y2={y(c.l)} />
              <rect x={cx - BODY_W / 2} y={top} width={BODY_W} height={Math.max(bottom - top, 1)} />
            </g>
          )
        })}
      </svg>
      <div className="mt-0.5 flex justify-between">
        <span className="text-[11px] text-muted">{chartRange.from}</span>
        <span className="text-[11px] text-muted">{chartRange.to}</span>
      </div>
    </>
  )
}
