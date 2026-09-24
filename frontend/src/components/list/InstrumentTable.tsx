import { Link } from 'react-router-dom'
import type { Instrument } from '../../mocks/mock'
import { BuySellBar } from '../ui/BuySellBar'
import { Card } from '../ui/Card'
import { Sparkline } from '../ui/Sparkline'
import { StarToggle } from '../ui/StarToggle'
import { trendText } from '../ui/trend'

// Header và hàng dữ liệu dùng CHUNG các class cột này (design-system §5) để thẳng cột.
const COLS = {
  symbol: 'flex-[1.9] min-w-0',
  price: 'flex-[1]',
  volume: 'flex-[1.1]',
  spark: 'flex-[0.95]',
  ratio: 'flex-[3.7]',
  star: 'ml-[18px] w-11 shrink-0 flex justify-center',
}

const headCls = 'text-[11px] font-semibold tracking-[0.4px] text-sub uppercase'

export function InstrumentTable({
  items,
  labels,
  hrefFor,
  onToggleFollow,
}: {
  items: Instrument[]
  labels: { symbol: string; volume: string; ratio: string }
  hrefFor: (i: Instrument) => string
  onToggleFollow: (symbol: string) => void
}) {
  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden px-2">
      <div className="overflow-auto">
        <div className="flex items-center border-b border-ink px-3 py-3.5">
          <div className={`${COLS.symbol} ${headCls}`}>{labels.symbol}</div>
          <div className={`${COLS.price} ${headCls}`}>
            Giá khớp <span className="font-medium tracking-normal text-faint normal-case">· 1 ngày ▾</span>
          </div>
          <div className={`${COLS.volume} ${headCls}`}>{labels.volume}</div>
          <div className={`${COLS.spark} ${headCls}`}>Biểu đồ</div>
          <div className={`${COLS.ratio} ${headCls}`}>{labels.ratio}</div>
          <div className={COLS.star} />
        </div>

        {items.map((it, idx) => (
          <Link
            key={it.symbol}
            to={hrefFor(it)}
            className={`flex items-center px-3 py-[11px] hover:bg-hover ${
              idx < items.length - 1 ? 'border-b border-line-soft' : ''
            }`}
          >
            <div className={`${COLS.symbol} flex items-center gap-2.5`}>
              <div
                className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                  it.avatarMuted ? 'bg-sub' : 'bg-ink'
                }`}
              >
                {it.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-bold">{it.symbol}</div>
                <div className="truncate text-[11.5px] text-sub">{it.name}</div>
              </div>
            </div>
            <div className={COLS.price}>
              <div className={`text-sm font-bold ${it.trend === 'flat' ? '' : trendText[it.trend]}`}>
                {it.price}
              </div>
              <div className={`text-[11.5px] font-semibold ${trendText[it.trend]}`}>{it.changePct}</div>
            </div>
            <div className={`${COLS.volume} text-[13px] text-body`}>
              {it.highlightVolume ? (
                <span className="rounded-sq bg-neutral-tag px-2 py-[3px]">{it.volume}</span>
              ) : (
                it.volume
              )}
            </div>
            <div className={COLS.spark}>
              <Sparkline values={it.spark} trend={it.trend} />
            </div>
            <div className={COLS.ratio}>
              <BuySellBar buyPct={it.buyPct} />
            </div>
            <div className={COLS.star}>
              <StarToggle on={it.followed} onToggle={() => onToggleFollow(it.symbol)} />
            </div>
          </Link>
        ))}

        {items.length === 0 && (
          <div className="px-3 py-10 text-center text-[13px] text-sub">Không có mã phù hợp</div>
        )}
      </div>
    </Card>
  )
}
