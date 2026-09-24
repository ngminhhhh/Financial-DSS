import { Button } from './Button'

/** 2 nút flex-1: nút đang chọn = primary, còn lại = outline nhạt (MUA/BÁN, LONG/SHORT). */
export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="mb-2.5 flex gap-2">
      {options.map((o) => (
        <Button
          key={o}
          variant={o === value ? 'primary' : 'ghost'}
          className="flex-1 p-[9px] text-[13px]"
          onClick={() => onChange(o)}
        >
          {o}
        </Button>
      ))}
    </div>
  )
}

/** Toggle khung thời gian nhỏ ở góc card chart. */
export function TimeframeToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`cursor-pointer rounded-sq border px-[13px] py-[5px] text-[11.5px] font-semibold ${
            o === value ? 'border-ink bg-ink text-white' : 'border-line bg-white text-sub'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
