import { ListPage } from '../components/list/ListPage'
import { derivatives } from '../mocks/mock'

export default function DerivativeList() {
  return (
    <ListPage
      title="Danh sách phái sinh"
      searchPlaceholder="Tìm mã hợp đồng…"
      initialItems={derivatives}
      labels={{ symbol: 'Mã hợp đồng', volume: 'Tổng KL hợp đồng', ratio: 'Long / Short' }}
      hrefFor={(i) => `/derivatives/${i.symbol}`}
    />
  )
}
