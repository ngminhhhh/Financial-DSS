import { Card } from '../ui/Card'
import { notifications } from '../../mocks/mock'

const dot = { up: 'bg-up', down: 'bg-down', ink: 'bg-ink' } as const

export function NotificationDropdown() {
  return (
    <Card className="absolute top-[70px] right-[78px] z-10 w-[340px] py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="border-b border-line-soft px-4 py-3 text-[13px] font-bold">Thông báo</div>
      {notifications.map((n, i) => (
        <div
          key={n.title}
          className={`flex gap-2.5 px-4 py-[11px] ${i < notifications.length - 1 ? 'border-b border-line-soft' : ''}`}
        >
          <div className={`mt-[5px] h-[7px] w-[7px] shrink-0 rounded-full ${dot[n.tone]}`} />
          <div>
            <div className="text-[12.5px] font-bold">{n.title}</div>
            <div className="text-[11.5px] text-sub">{n.detail}</div>
          </div>
        </div>
      ))}
      <button className="mt-0.5 w-full cursor-pointer border-t border-line-soft px-4 pt-2.5 pb-1 text-center text-xs font-semibold">
        Xem tất cả thông báo
      </button>
    </Card>
  )
}
