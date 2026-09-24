import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { SegmentedToggle } from '../ui/SegmentedToggle'

export interface OrderField {
  label: string
  value: string
  onChange: (v: string) => void
}

/** Card "Vị thế & đặt lệnh" — cố định, không cuộn. Dùng chung cho cổ phiếu và phái sinh. */
export function OrderCard<T extends string>({
  position,
  sides,
  side,
  onSideChange,
  fields,
  estimate,
  warning,
  onSubmit,
}: {
  position: { left: { label: string; value: string }; right: { label: string; value: string } }
  sides: readonly T[]
  side: T
  onSideChange: (s: T) => void
  fields: [OrderField, OrderField]
  estimate: string
  warning?: string
  onSubmit?: () => void
}) {
  return (
    <Card className="shrink-0 px-5 py-[18px]">
      <div className="mb-3.5 flex items-center justify-between border-b border-line-soft pb-3.5">
        <div>
          <div className="text-[11px] text-sub">{position.left.label}</div>
          <div className="text-base font-bold">{position.left.value}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-sub">{position.right.label}</div>
          <div className="text-base font-bold">{position.right.value}</div>
        </div>
      </div>

      <div className="mb-2.5 text-[13px] font-bold">Đặt lệnh</div>
      <SegmentedToggle options={sides} value={side} onChange={onSideChange} />

      <div className="mb-2.5 flex gap-2.5">
        {fields.map((f) => (
          <label key={f.label} className="flex-1">
            <div className="mb-1 text-[11px] text-sub">{f.label}</div>
            <input
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              inputMode="decimal"
              className="w-full rounded-sq border border-line px-2.5 py-[9px] text-[13px] font-semibold outline-none focus:border-ink"
            />
          </label>
        ))}
      </div>

      <div className={`text-[11px] text-sub ${warning ? 'mb-2' : 'mb-3'}`}>{estimate}</div>
      {warning && <div className="mb-3 text-[11px] font-semibold text-ink">⚠ {warning}</div>}

      {/* TODO: validate số dư / khối lượng / giá trước khi gọi API đặt lệnh */}
      <Button className="w-full p-[11px] text-[13px]" onClick={onSubmit}>
        Vào lệnh
      </Button>
    </Card>
  )
}
