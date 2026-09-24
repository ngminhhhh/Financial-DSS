import { useState } from 'react'
import type { Advice } from '../../mocks/mock'
import { Card } from '../ui/Card'

function ScoreBar({ label, value, text }: { label: string; value: number; text?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-[78px] shrink-0 text-xs text-sub">{label}</span>
      <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-line-soft">
        {/* Giữ đơn sắc: không đổi màu theo điểm số */}
        <div className="h-full rounded-full bg-ink" style={{ width: `${value}%` }} />
      </div>
      {text ? (
        <span className="w-[70px] text-xs font-bold">{text}</span>
      ) : (
        <span className="w-6 text-right text-xs font-bold">{value}</span>
      )}
    </div>
  )
}

/** Card "Trợ lý tài chính": 1 vùng cuộn duy nhất cho badge + score + lý do + phương án. */
export function AssistantCard({ advice }: { advice: Advice }) {
  const [selected, setSelected] = useState(() =>
    Math.max(0, advice.alternatives.findIndex((a) => a.recommended)),
  )

  return (
    <Card className="flex min-h-0 flex-1 flex-col p-5">
      <div className="mb-3.5 shrink-0 text-xs font-bold tracking-[0.4px] text-sub uppercase">
        Trợ lý tài chính
      </div>

      <div className="-mr-2.5 min-h-0 overflow-auto pr-2.5">
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-sq bg-ink font-bold text-white ${
              advice.action.length > 3 ? 'text-[13px]' : 'text-sm'
            }`}
          >
            {advice.action}
          </div>
          <div>
            <div className="text-[13px] font-bold">Độ tin cậy {advice.confidence}%</div>
            <div className="text-xs text-sub">{advice.phase}</div>
          </div>
        </div>

        <div className="mt-[18px] flex flex-col gap-2.5">
          {advice.scores.map((s) => (
            <ScoreBar key={s.label} {...s} />
          ))}
        </div>

        <div className="mt-4 border-t border-line-soft pt-3.5">
          <div className="mb-2 text-xs font-bold text-sub">Vì sao có khuyến nghị này?</div>
          <ul className="m-0 flex list-disc flex-col gap-1.5 pl-[18px]">
            {advice.reasons.map((r) => (
              <li key={r.text} className={`text-xs text-body ${r.strong ? 'font-semibold' : ''}`}>
                {r.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 border-t border-line-soft pt-3.5">
          <div className="mb-3 text-[13px] font-bold">Phương án đề xuất</div>
          <div className="flex flex-col gap-2">
            {advice.alternatives.map((a, i) => {
              const on = i === selected
              return (
                <button
                  key={a.title}
                  onClick={() => setSelected(i)}
                  className={`flex cursor-pointer gap-2.5 rounded-sq border px-3 py-2.5 text-left ${
                    on ? 'border-ink bg-hover' : 'border-line bg-white'
                  }`}
                >
                  <div
                    className={`mt-0.5 h-[15px] w-[15px] shrink-0 rounded-full ${
                      on ? 'border-[5px] border-ink' : 'border-[1.5px] border-radio-off'
                    }`}
                  />
                  <div>
                    <div className="text-[12.5px] font-bold">
                      {a.title}
                      {a.recommended && ' · Khuyến nghị'}
                    </div>
                    <div className="text-[11.5px] text-sub">{a.detail}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
