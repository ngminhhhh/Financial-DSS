import type { Trend } from '../../mocks/mock'

export const trendText: Record<Trend, string> = {
  up: 'text-up',
  down: 'text-down',
  flat: 'text-sub',
}

export const trendStroke: Record<Trend, string> = {
  up: 'var(--color-up)',
  down: 'var(--color-down)',
  flat: 'var(--color-faint)',
}
