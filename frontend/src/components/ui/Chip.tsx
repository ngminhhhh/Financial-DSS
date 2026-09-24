export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-sq border px-[15px] py-[7px] text-[12.5px] font-semibold ${
        active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-sub'
      }`}
    >
      {children}
    </button>
  )
}
