import { Link, NavLink } from 'react-router-dom'
import { BarsIcon, BriefcaseIcon, GearIcon, HomeIcon, TrendIcon } from '../icons'

const items = [
  { to: '/dashboard', label: 'Tổng quan', Icon: HomeIcon },
  { to: '/stocks', label: 'Cổ phiếu', Icon: BarsIcon },
  { to: '/derivatives', label: 'Phái sinh', Icon: TrendIcon },
  { to: '/portfolio', label: 'Danh mục', Icon: BriefcaseIcon },
]

function Pill({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex h-9 w-11 items-center justify-center rounded-sq ${active ? 'bg-ink text-white' : ''}`}
    >
      {children}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="flex w-[88px] shrink-0 flex-col items-center gap-7 border-r border-line bg-white py-[22px]">
      <Link to="/" className="text-sm font-bold tracking-[0.5px] text-ink">
        M.
      </Link>
      <nav className="mt-3 flex flex-col gap-[22px]">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-[5px] ${isActive ? 'text-ink' : 'text-faint'}`
            }
          >
            {({ isActive }) => (
              <>
                <Pill active={isActive}>
                  <Icon />
                </Pill>
                <span className={`text-[10px] ${isActive ? 'font-semibold' : ''}`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1" />
      <button aria-label="Cài đặt" className="cursor-pointer text-faint">
        <Pill>
          <GearIcon />
        </Pill>
      </button>
    </aside>
  )
}
