import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'border-ink bg-ink text-white',
  outline: 'border-ink bg-white text-ink',
  ghost: 'border-line bg-white text-sub',
}

export function Button({
  variant = 'primary',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`cursor-pointer rounded-sq border-[1.5px] font-bold ${variants[variant]} ${className}`}
      {...rest}
    />
  )
}
