import { Link } from 'react-router-dom'
import { BarsIcon, BoltIcon, WarningIcon } from '../components/icons'

const features = [
  {
    Icon: BarsIcon,
    title: 'Bảng điện thời gian thực',
    text: 'Theo dõi khớp lệnh, dư mua – dư bán trực tiếp cho từng mã cổ phiếu, theo đúng bố cục quen thuộc của nhà đầu tư.',
  },
  {
    Icon: BoltIcon,
    title: 'Khuyến nghị có giải thích',
    text: 'Mua / Bán / Giữ kèm lý do cụ thể, theo mô hình ra quyết định Intelligence – Design – Choice.',
  },
  {
    Icon: WarningIcon,
    title: 'Quản lý rủi ro phái sinh',
    text: 'Cảnh báo tỷ lệ ký quỹ và rủi ro margin call theo thời gian thực cho VN30F1M.',
  },
]

export default function Landing() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-ink">
      <header className="flex h-[84px] shrink-0 items-center border-b border-line px-14">
        <div className="text-xl font-bold tracking-[0.5px]">MTH.</div>
      </header>

      <section className="flex gap-[60px] px-14 pt-[72px]">
        <div className="flex-1">
          <div className="mb-5 text-[13px] tracking-[1.5px] text-sub uppercase">
            Decision Support System · Chứng khoán Việt Nam
          </div>
          <h1 className="m-0 text-[56px] leading-[1.08] font-bold tracking-[-1px]">
            Ra quyết định
            <br />
            đầu tư rõ ràng hơn.
          </h1>
          <p className="mt-[22px] max-w-[460px] text-base leading-[1.6] text-sub">
            Hệ thống hỗ trợ quyết định cho nhà đầu tư cá nhân — theo dõi cổ phiếu cơ sở và phái sinh
            VN30F1M, nhận khuyến nghị Mua / Bán / Long / Short kèm giải thích rõ ràng.
          </p>
          <div className="mt-[34px] flex gap-3.5">
            <Link
              to="/dashboard"
              className="rounded-sq border-[1.5px] border-ink bg-ink px-[26px] py-3.5 text-sm font-semibold text-white"
            >
              Bắt đầu ngay
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <svg width="480" height="320" viewBox="0 0 480 320" fill="none">
            {[280, 200, 120, 40].map((y) => (
              <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="var(--color-line)" strokeWidth="1" />
            ))}
            <polyline
              points="0,240 40,255 80,220 120,235 160,190 200,205 240,160 280,175 320,120 360,140 400,80 440,95 480,40"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="480" cy="40" r="5" fill="var(--color-ink)" />
            <text x="330" y="30" fontFamily="Space Grotesk" fontSize="13" fill="var(--color-ink)" fontWeight="700">
              VN-INDEX ▲ 0.68%
            </text>
            <text x="10" y="300" fontFamily="Space Grotesk" fontSize="11" fill="var(--color-sub)">01/09</text>
            <text x="440" y="300" fontFamily="Space Grotesk" fontSize="11" fill="var(--color-sub)">23/09</text>
          </svg>
        </div>
      </section>

      <section className="flex gap-10 px-14 pt-16 pb-24">
        {features.map(({ Icon, title, text }) => (
          <div key={title} className="flex-1 border-t-[1.5px] border-ink pt-[18px]">
            <Icon size={26} strokeWidth={1.6} />
            <div className="mt-3.5 text-base font-bold">{title}</div>
            <div className="mt-2 text-[13.5px] leading-[1.6] text-sub">{text}</div>
          </div>
        ))}
      </section>

      <footer className="mt-auto flex h-16 shrink-0 items-center border-t border-line px-14">
        <span className="text-xs text-sub">© 2026 MTH.</span>
      </footer>
    </div>
  )
}
