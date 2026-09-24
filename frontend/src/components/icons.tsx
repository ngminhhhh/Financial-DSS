import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 19, strokeWidth = 1.8, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const HomeIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 11l8-7 8 7" /><path d="M6 10v9h5v-5h2v5h5v-9" /></Icon>
)
export const BarsIcon = (p: IconProps) => (
  <Icon {...p}><rect x="4" y="12" width="3" height="7" /><rect x="10.5" y="7" width="3" height="12" /><rect x="17" y="3" width="3" height="16" /></Icon>
)
export const TrendIcon = (p: IconProps) => (
  <Icon {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 6h6v6" /></Icon>
)
export const BriefcaseIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="8" width="18" height="11" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></Icon>
)
export const GearIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></Icon>
)
export const SearchIcon = (p: IconProps) => (
  <Icon size={15} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon>
)
export const BellIcon = (p: IconProps) => (
  <Icon size={16} {...p}><path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></Icon>
)
export const UserIcon = (p: IconProps) => (
  <Icon size={16} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></Icon>
)
export const WarningIcon = (p: IconProps) => (
  <Icon size={26} {...p}><path d="M12 3l10 18H2z" /><path d="M12 9v5" /><path d="M12 17h.01" /></Icon>
)
export const BoltIcon = (p: IconProps) => (
  <Icon size={26} {...p}><path d="M13 2L3 14h7l-1 8 11-13h-7l1-7z" /></Icon>
)
export const StarIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Icon size={17} strokeWidth={1.4} fill={filled ? 'currentColor' : 'none'} {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Icon>
)
