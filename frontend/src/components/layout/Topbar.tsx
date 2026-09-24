import { useEffect, useRef, useState } from 'react'
import { marketIndices } from '../../mocks/mock'
import { BellIcon, UserIcon } from '../icons'
import { SearchBox } from '../ui/SearchBox'
import { trendText } from '../ui/trend'
import { NotificationDropdown } from './NotificationDropdown'

export function Topbar() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <header className="flex h-16 shrink-0 items-center gap-7 border-b border-line bg-white px-7">
      <SearchBox placeholder="Tìm mã cổ phiếu, phái sinh…" className="w-[306px]" />

      <div className="ml-2 flex gap-6">
        {marketIndices.map((m) => (
          <div key={m.name} className="flex flex-col">
            <span className="text-[10.5px] text-sub">{m.name}</span>
            <span className="text-sm font-bold">
              {m.value}{' '}
              <span className={`font-semibold ${trendText[m.trend]}`}>
                {m.trend === 'down' ? '▼' : '▲'} {m.change}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      <div ref={ref}>
        <button
          aria-label="Thông báo"
          onClick={() => setOpen((o) => !o)}
          className="relative h-[34px] w-[34px] cursor-pointer"
        >
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line text-ink">
            <BellIcon />
          </div>
          <div className="absolute top-0 right-0 h-2 w-2 rounded-full border-[1.5px] border-white bg-down" />
        </button>
        {open && <NotificationDropdown />}
      </div>

      <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ink text-white">
        <UserIcon />
      </div>
    </header>
  )
}
