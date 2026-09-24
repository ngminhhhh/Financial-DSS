import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  return (
    <div className="relative flex h-screen min-h-[720px] w-full min-w-[1280px] bg-white text-ink">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <Outlet />
      </div>
    </div>
  )
}
