import { useMemo, useState } from 'react'
import type { Instrument } from '../../mocks/mock'
import { Chip } from '../ui/Chip'
import { SearchBox } from '../ui/SearchBox'
import { InstrumentTable } from './InstrumentTable'

/** Khung chung cho StockList / DerivativeList: tiêu đề, chip lọc, ô tìm, bảng. */
export function ListPage({
  title,
  searchPlaceholder,
  initialItems,
  labels,
  hrefFor,
}: {
  title: string
  searchPlaceholder: string
  initialItems: Instrument[]
  labels: { symbol: string; volume: string; ratio: string }
  hrefFor: (i: Instrument) => string
}) {
  const [items, setItems] = useState(initialItems)
  const [onlyFollowed, setOnlyFollowed] = useState(false)
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toUpperCase()
    return items.filter(
      (i) => (!onlyFollowed || i.followed) && (!q || i.symbol.includes(q) || i.name.toUpperCase().includes(q)),
    )
  }, [items, onlyFollowed, query])

  const toggleFollow = (symbol: string) =>
    setItems((prev) => prev.map((i) => (i.symbol === symbol ? { ...i, followed: !i.followed } : i)))

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-[18px] px-7 py-[26px]">
      <h1 className="m-0 text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-2.5">
        <Chip active={!onlyFollowed} onClick={() => setOnlyFollowed(false)}>
          Tất cả
        </Chip>
        <Chip active={onlyFollowed} onClick={() => setOnlyFollowed(true)}>
          Đang theo dõi
        </Chip>
        <div className="flex-1" />
        <SearchBox placeholder={searchPlaceholder} value={query} onChange={setQuery} className="w-[286px]" />
      </div>

      <InstrumentTable items={visible} labels={labels} hrefFor={hrefFor} onToggleFollow={toggleFollow} />
    </main>
  )
}
