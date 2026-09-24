import { Card } from './Card'

export function StatCard({
  label,
  value,
  valueClass = '',
  children,
}: {
  label: string
  value: string
  valueClass?: string
  children?: React.ReactNode
}) {
  return (
    <Card className="flex-1 px-5 py-[18px]">
      <div className="mb-1.5 text-[11.5px] text-sub">{label}</div>
      <div className={`text-[22px] font-bold ${valueClass}`}>{value}</div>
      {children}
    </Card>
  )
}
