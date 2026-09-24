import { StarIcon } from '../icons'

export function StarToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      aria-label={on ? 'Bỏ theo dõi' : 'Theo dõi'}
      onClick={(e) => {
        // nút nằm trong hàng <Link>: không điều hướng khi bấm sao
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      className={`cursor-pointer ${on ? 'text-ink' : 'text-star-off'}`}
    >
      <StarIcon filled={on} />
    </button>
  )
}
