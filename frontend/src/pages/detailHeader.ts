import type { Instrument, Trend } from '../mocks/mock'

/**
 * Wireframe chỉ có dữ liệu chi tiết cho 1 mã. Với mã khác, lấy phần header
 * (mã, tên, giá, %) từ danh sách; phần còn lại vẫn là dữ liệu mẫu cho tới khi nối API.
 */
export function headerFor(
  symbol: string | undefined,
  detail: { symbol: string; name: string; price: string; change: string; trend: Trend },
  list: Instrument[],
) {
  if (!symbol || symbol === detail.symbol) return detail
  const it = list.find((i) => i.symbol === symbol)
  if (!it) return detail
  const arrow = it.trend === 'down' ? '▼' : it.trend === 'up' ? '▲' : ''
  return {
    symbol: it.symbol,
    name: it.name,
    price: it.price,
    change: `${arrow} ${it.changePct.replace(/^[+-]/, '')}`.trim(),
    trend: it.trend,
  }
}

export const parseNum = (s: string) => Number(s.replace(/,/g, '')) || 0
export const fmtVnd = (n: number) => `${Math.round(n).toLocaleString('en-US')} ₫`
