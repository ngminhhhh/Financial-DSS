import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AssistantCard } from '../components/advisor/AssistantCard'
import { ChartCard } from '../components/advisor/ChartCard'
import { InstrumentHeader } from '../components/advisor/InstrumentHeader'
import { OrderCard } from '../components/advisor/OrderCard'
import { WarningIcon } from '../components/icons'
import { Card } from '../components/ui/Card'
import { derivativeAdvice, derivativeDetail, derivatives, vn30f1mAxis, vn30f1mCandles } from '../mocks/mock'
import { fmtVnd, headerFor, parseNum } from './detailHeader'

const SIDES = ['LONG', 'SHORT'] as const

export default function DerivativeAdvisor() {
  const { symbol } = useParams()
  const d = derivativeDetail
  const header = headerFor(symbol, d, derivatives)

  const [side, setSide] = useState<(typeof SIDES)[number]>('LONG')
  const [contracts, setContracts] = useState(String(d.order.contracts))
  const [stopLoss, setStopLoss] = useState(d.order.stopLoss.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/, ','))

  return (
    <main className="flex min-h-0 flex-1 gap-5 px-7 py-[22px]">
      {/* Left */}
      <div className="flex min-h-0 min-w-0 flex-[1.5] flex-col gap-4">
        <InstrumentHeader {...header} />

        <ChartCard refs={d.refs} stats={d.stats} candles={vn30f1mCandles} axis={vn30f1mAxis} />

        <Card className="flex min-h-0 flex-1 flex-col px-[18px] py-4">
          <div className="mb-3 shrink-0 text-[13px] font-bold">Rủi ro ký quỹ</div>
          <div className="flex gap-3.5 rounded-sq border border-ink p-3.5">
            <WarningIcon className="shrink-0 text-ink" />
            <div>
              <div className="text-[13px] font-bold">{d.margin.title}</div>
              <div className="mt-0.5 text-xs leading-[1.5] text-sub">{d.margin.detail}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right: Decision Engine */}
      <div className="flex min-h-0 w-[400px] shrink-0 flex-col gap-4">
        <OrderCard
          position={d.position}
          sides={SIDES}
          side={side}
          onSideChange={setSide}
          fields={[
            { label: 'Số hợp đồng', value: contracts, onChange: setContracts },
            { label: 'Stop-loss', value: stopLoss, onChange: setStopLoss },
          ]}
          estimate={`Ký quỹ ban đầu ước tính: ${fmtVnd(parseNum(contracts) * d.order.marginPerContract)}`}
          warning="Đòn bẩy cao — rủi ro lỗ vượt vốn ký quỹ ban đầu"
        />
        <AssistantCard advice={derivativeAdvice} />
      </div>
    </main>
  )
}
