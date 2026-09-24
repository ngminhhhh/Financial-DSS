import type { NewsItem } from '../../mocks/mock'

const styles: Record<NewsItem['sentiment'], [string, string]> = {
  pos: ['bg-up-bg text-up', 'Tích cực'],
  neu: ['bg-neutral-tag text-sub', 'Trung lập'],
  neg: ['bg-down-bg text-down', 'Tiêu cực'],
}

export function NewsTag({ sentiment }: { sentiment: NewsItem['sentiment'] }) {
  const [cls, label] = styles[sentiment]
  return (
    <span className={`inline-flex shrink-0 items-center rounded-sq px-2.5 py-1 text-[11px] font-bold ${cls}`}>
      {label}
    </span>
  )
}
