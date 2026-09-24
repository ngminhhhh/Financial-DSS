import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { trendText } from '../components/ui/trend'
import { allocation, holdings, portfolioStats } from '../mocks/mock'

// Header và hàng dùng chung flex ratio để thẳng cột.
const COLS = [
  ['Mã', 'flex-[0.8]'],
  ['Loại', 'flex-[1.1]'],
  ['Khối lượng', 'flex-[1]'],
  ['Giá vốn', 'flex-[1]'],
  ['Giá hiện tại', 'flex-[1]'],
  ['Giá trị hiện tại', 'flex-[1.3]'],
  ['Lãi / lỗ', 'flex-[1.6]'],
  ['Tỷ trọng', 'flex-[0.8]'],
] as const
const col = (i: number) => COLS[i][1]

export default function Portfolio() {
  return (
    <main className="flex min-h-0 flex-1 flex-col gap-[18px] overflow-auto px-7 py-[26px]">
      <h1 className="m-0 text-xl font-bold">Danh mục đầu tư</h1>

      <div className="flex gap-4">
        {portfolioStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} valueClass={s.trend ? trendText[s.trend] : ''} />
        ))}
      </div>

      <Card className="px-5 py-[18px]">
        <div className="mb-3.5 text-[13px] font-bold">Phân bổ tài sản</div>
        <div className="flex h-3.5 overflow-hidden rounded-sq border border-line">
          {allocation.map((a) => (
            <div key={a.label} className={a.swatch} style={{ width: `${a.pct}%` }} />
          ))}
        </div>
        <div className="mt-3 flex gap-7">
          {allocation.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <div
                className={`h-[9px] w-[9px] rounded-sq ${a.swatch} ${a.swatch === 'bg-line' ? 'border border-radio-off' : ''}`}
              />
              <span className="text-xs text-body">
                {a.label} — {a.pct}% · {a.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="flex min-h-0 flex-1 flex-col px-5 py-[18px]">
        <div className="mb-3 shrink-0 text-[13px] font-bold">Vị thế đang nắm giữ</div>
        <div className="overflow-auto">
          <div className="flex items-center border-b border-ink px-3 pb-2.5">
            {COLS.map(([label, cls]) => (
              <div key={label} className={`${cls} text-[11px] font-semibold tracking-[0.4px] text-sub uppercase`}>
                {label}
              </div>
            ))}
          </div>
          {holdings.map((h, idx) => (
            <Link
              key={h.symbol}
              to={h.href}
              className={`flex items-center px-3 py-[13px] text-[13px] hover:bg-hover ${
                idx < holdings.length - 1 ? 'border-b border-line-soft' : ''
              }`}
            >
              <div className={`${col(0)} font-bold`}>{h.symbol}</div>
              <div className={col(1)}>
                <span className="inline-flex rounded-sq border border-line px-[9px] py-[3px] text-[10.5px] font-semibold text-sub">
                  {h.type}
                </span>
              </div>
              <div className={col(2)}>{h.qty}</div>
              <div className={col(3)}>{h.cost}</div>
              <div className={col(4)}>{h.price}</div>
              <div className={`${col(5)} font-semibold`}>{h.value}</div>
              <div className={`${col(6)} font-semibold ${trendText[h.trend]}`}>{h.pnl}</div>
              <div className={col(7)}>{h.weight}</div>
            </Link>
          ))}
        </div>
      </Card>
    </main>
  )
}
