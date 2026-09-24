import { ListPage } from '../components/list/ListPage'
import { stocks } from '../mocks/mock'

export default function StockList() {
  return (
    <ListPage
      title="Danh sách cổ phiếu"
      searchPlaceholder="Tìm mã cổ phiếu…"
      initialItems={stocks}
      labels={{ symbol: 'Mã chứng khoán', volume: 'Tổng khối lượng', ratio: 'Mua / Bán' }}
      hrefFor={(i) => `/stocks/${i.symbol}`}
    />
  )
}
