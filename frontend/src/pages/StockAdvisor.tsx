import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AssistantCard } from '../components/advisor/AssistantCard'
import { ChartCard } from '../components/advisor/ChartCard'
import { InstrumentHeader } from '../components/advisor/InstrumentHeader'
import { OrderCard } from '../components/advisor/OrderCard'
import { Card } from '../components/ui/Card'
import { NewsTag } from '../components/ui/NewsTag'
import { stockAdvice, stockDetail, stockNews, stocks, vnmAxis, vnmCandles } from '../mocks/mock'
import { fmtVnd, headerFor, parseNum } from './detailHeader'

const SIDES = ['MUA', 'BÁN'] as const

export default function StockAdvisor() {
  const { symbol } = useParams()
  const header = headerFor(symbol, stockDetail, stocks)

  const [side, setSide] = useState<(typeof SIDES)[number]>('MUA')
  const [qty, setQty] = useState(String(stockDetail.order.qty))
  const [price, setPrice] = useState(stockDetail.order.price.toLocaleString('en-US'))

  return (
    <main className="flex min-h-0 flex-1 gap-5 px-7 py-[22px]">
      {/* Left */}
      <div className="flex min-h-0 min-w-0 flex-[1.5] flex-col gap-4">
        <InstrumentHeader {...header} />

        <ChartCard refs={stockDetail.refs} stats={stockDetail.stats} candles={vnmCandles} axis={vnmAxis} />

        <Card className="flex min-h-0 flex-1 flex-col px-[18px] py-4">
          <div className="mb-3 shrink-0 text-[13px] font-bold">Tin tức liên quan</div>
          <div className="flex flex-col gap-2.5 overflow-auto">
            {stockNews.map((n) => (
              <div key={n.title} className="rounded-sq border border-line-soft p-3">
                <div className="mb-1.5 flex items-center gap-2.5">
                  <NewsTag sentiment={n.sentiment} />
                  <span className="text-[13px] font-bold">{n.title}</span>
                </div>
                <div className="text-xs leading-[1.5] text-sub">
                  {n.summary} · {n.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right: Decision Engine */}
      <div className="flex min-h-0 w-[400px] shrink-0 flex-col gap-4">
        <OrderCard
          position={stockDetail.position}
          sides={SIDES}
          side={side}
          onSideChange={setSide}
          fields={[
            { label: 'Khối lượng', value: qty, onChange: setQty },
            { label: 'Giá đặt', value: price, onChange: setPrice },
          ]}
          estimate={`Giá trị lệnh ước tính: ${fmtVnd(parseNum(qty) * parseNum(price))}`}
        />
        <AssistantCard advice={stockAdvice} />
      </div>
    </main>
  )
}
