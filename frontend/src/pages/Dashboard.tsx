import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CandlestickChart } from '../components/charts/CandlestickChart'
import { Card } from '../components/ui/Card'
import { TimeframeToggle } from '../components/ui/SegmentedToggle'
import { StatCard } from '../components/ui/StatCard'
import { trendText } from '../components/ui/trend'
import { dashboardStats, vnmAxis, vnmCandles, watchlist } from '../mocks/mock'

const TIMEFRAMES = ['15 phút', 'Ngày'] as const
const COLS = ['flex-[1]', 'flex-[1]', 'flex-[1]', 'flex-[1]', 'flex-[1]', 'flex-[1.4]']
const HEADERS = ['Mã', 'Giá', '+/-', '%', 'KL', 'Tín hiệu']
const signalDot = { up: 'bg-up', down: 'bg-down', none: 'bg-faint' } as const

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Chào buổi sáng'
  if (h < 18) return 'Chào buổi chiều'
  return 'Chào buổi tối'
}

export default function Dashboard() {
  const [tf, setTf] = useState<(typeof TIMEFRAMES)[number]>('Ngày')
  const { portfolio, buyingPower } = dashboardStats

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden px-7 py-6">
      <div>
        <h1 className="m-0 mb-0.5 text-xl font-bold">{greeting()}, Minh</h1>
        <p className="m-0 text-[13px] text-sub">Tổng quan thị trường và danh mục của bạn hôm nay</p>
      </div>

      <div className="flex gap-4">
        <StatCard label={portfolio.label} value={portfolio.value}>
          <div className="mt-1 text-xs font-semibold text-up">{portfolio.change}</div>
        </StatCard>
        <StatCard label={buyingPower.label} value={buyingPower.value}>
          <div className="mt-1 text-xs text-sub">{buyingPower.note}</div>
        </StatCard>
      </div>

      {/* Chart: mã đầu tiên trong danh sách theo dõi */}
      <Card className="shrink-0 px-5 py-[18px]">
        <div className="mb-2.5 flex items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold">VNM</span>
              <span className="text-[11.5px] text-sub">CTCP Sữa Việt Nam</span>
            </div>
            <div className="mt-0.5 flex items-baseline gap-2 text-up">
              <span className="text-[19px] font-bold">68,500</span>
              <span className="text-[12.5px] font-bold">▲ 1,200 (1.78%)</span>
            </div>
          </div>
          <div className="flex-1" />
          <Link to="/stocks/VNM" className="border-b border-ink text-xs font-semibold">
            Xem bảng điện &amp; khuyến nghị
          </Link>
        </div>
        <div className="mb-3 flex justify-end">
          <TimeframeToggle options={TIMEFRAMES} value={tf} onChange={setTf} />
        </div>
        <CandlestickChart candles={vnmCandles} axis={vnmAxis} />
      </Card>

      {/* Watchlist */}
      <Card className="flex min-h-0 flex-1 flex-col py-[18px] pr-2 pl-5">
        <div className="mb-3 flex items-center pr-3">
          <div className="text-sm font-bold">Danh sách theo dõi</div>
          <div className="flex-1" />
          <Link to="/stocks" className="border-b border-ink text-xs font-semibold">
            Xem tất cả
          </Link>
        </div>
        <div className="overflow-auto pr-3">
          <div className="flex border-b border-ink">
            {HEADERS.map((h, i) => (
              <div
                key={h}
                className={`${COLS[i]} px-3 pb-2.5 text-[11px] font-semibold tracking-[0.4px] text-sub uppercase`}
              >
                {h}
              </div>
            ))}
          </div>
          {watchlist.map((w, idx) => {
            const color = w.trend === 'flat' ? '' : `${trendText[w.trend]} font-semibold`
            return (
              <Link
                key={w.symbol}
                to={w.href}
                className={`flex border-b border-line-soft text-[13px] hover:bg-hover ${idx === 0 ? 'bg-hl' : ''}`}
              >
                <div className={`${COLS[0]} p-3 font-bold`}>{w.symbol}</div>
                <div className={`${COLS[1]} p-3`}>{w.price}</div>
                <div className={`${COLS[2]} p-3 ${color}`}>{w.change}</div>
                <div className={`${COLS[3]} p-3 ${color}`}>{w.changePct}</div>
                <div className={`${COLS[4]} p-3`}>{w.volume}</div>
                <div className={`${COLS[5]} flex items-center p-3`}>
                  <span className={`mr-1.5 inline-block h-[7px] w-[7px] shrink-0 rounded-full ${signalDot[w.signalTone]}`} />
                  {w.signal}
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </main>
  )
}
