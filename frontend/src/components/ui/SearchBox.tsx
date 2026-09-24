import { SearchIcon } from '../icons'

export function SearchBox({
  placeholder,
  value,
  onChange,
  className = '',
}: {
  placeholder: string
  value?: string
  onChange?: (v: string) => void
  className?: string
}) {
  return (
    <label className={`flex items-center gap-2 rounded-sq border border-line px-3 py-2 ${className}`}>
      <SearchIcon className="shrink-0 text-sub" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-faint"
      />
    </label>
  )
}
