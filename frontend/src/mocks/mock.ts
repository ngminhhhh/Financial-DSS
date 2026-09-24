// Dữ liệu mẫu lấy nguyên từ wireframe trong design/. Khi nối backend,
// thay các export dưới đây bằng dữ liệu từ API (giữ nguyên shape).

export type Trend = 'up' | 'down' | 'flat'

export interface Candle {
  o: number
  h: number
  l: number
  c: number
}

export interface ChartAxis {
  min: number
  max: number
  ticks: number[]
  format: (v: number) => string
}

export interface MarketIndex {
  name: string
  value: string
  change: string
  trend: Trend
}

export interface Notification {
  title: string
  detail: string
  tone: 'up' | 'down' | 'ink'
}

export interface Instrument {
  symbol: string
  name: string
  price: string
  changePct: string
  trend: Trend
  volume: string
  highlightVolume?: boolean
  spark: number[]
  buyPct: number
  followed: boolean
  avatar: string
  avatarMuted?: boolean
}

export interface WatchItem {
  symbol: string
  price: string
  change: string
  changePct: string
  trend: Trend
  volume: string
  signal: string
  signalTone: 'up' | 'down' | 'none'
  href: string
}

export interface NewsItem {
  sentiment: 'pos' | 'neu' | 'neg'
  title: string
  summary: string
  time: string
}

export interface Score {
  label: string
  value: number
  text?: string
}

export interface Alternative {
  title: string
  detail: string
  recommended?: boolean
}

export interface Advice {
  action: string
  confidence: number
  phase: string
  scores: Score[]
  reasons: { text: string; strong?: boolean }[]
  alternatives: Alternative[]
}

export interface Stat {
  label: string
  value: string
}

export interface Holding {
  symbol: string
  type: string
  qty: string
  cost: string
  price: string
  value: string
  pnl: string
  trend: Trend
  weight: string
  href: string
}

// ---------- Chung ----------

export const marketIndices: MarketIndex[] = [
  { name: 'VN-INDEX', value: '1,254.32', change: '0.68%', trend: 'up' },
  { name: 'VN30', value: '1,298.10', change: '0.25%', trend: 'down' },
  { name: 'HNX-INDEX', value: '231.45', change: '0.44%', trend: 'up' },
]

export const notifications: Notification[] = [
  { title: 'VNM — Tín hiệu MUA', detail: 'MA20 cắt lên MA50 · 10:32', tone: 'up' },
  { title: 'HPG — Cảnh báo BÁN', detail: 'RSI(14) = 78, vùng quá mua · 09:15', tone: 'down' },
  { title: 'VN30F1M — Tín hiệu LONG', detail: 'Breakout kháng cự 1,280 · 11:02', tone: 'up' },
  { title: 'Danh mục — Cảnh báo rủi ro', detail: 'Cách margin call 32% · 08:50', tone: 'ink' },
]

// ---------- Biểu đồ nến ----------
// Hình dạng nến giữ đúng wireframe: toạ độ (wick trên, wick dưới, thân trên,
// thân dưới, tăng?) trên vùng vẽ y=15..207 được quy đổi ngược ra giá.
const candleShape: [number, number, number, number, boolean][] = [
  [165, 205, 175, 195, false], [150, 188, 158, 178, true], [158, 198, 168, 188, false],
  [140, 178, 150, 168, true], [148, 185, 158, 175, false], [128, 165, 138, 155, true],
  [135, 170, 145, 160, false], [115, 150, 122, 140, true], [122, 155, 130, 145, false],
  [102, 138, 110, 128, true], [108, 142, 118, 132, false], [88, 124, 96, 114, true],
  [94, 128, 104, 118, false], [74, 110, 82, 100, true], [82, 115, 90, 105, false],
  [62, 98, 70, 88, true], [68, 102, 78, 92, false], [48, 84, 56, 74, true],
  [55, 88, 64, 78, false], [35, 70, 42, 60, true],
]

export const PLOT_TOP = 15
export const PLOT_BOTTOM = 207

function candlesFromShape(min: number, max: number): Candle[] {
  const toPrice = (y: number) => max - ((y - PLOT_TOP) / (PLOT_BOTTOM - PLOT_TOP)) * (max - min)
  return candleShape.map(([wt, wb, bt, bb, up]) => ({
    h: toPrice(wt),
    l: toPrice(wb),
    o: toPrice(up ? bb : bt),
    c: toPrice(up ? bt : bb),
  }))
}

const fmtInt = (v: number) => Math.round(v).toLocaleString('en-US')
const fmt1 = (v: number) =>
  v.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export const vnmAxis: ChartAxis = {
  min: 64500,
  max: 70000,
  ticks: [70000, 68800, 67300, 65800, 64500],
  format: fmtInt,
}
export const vnmCandles = candlesFromShape(vnmAxis.min, vnmAxis.max)

export const vn30f1mAxis: ChartAxis = {
  min: 1270.5,
  max: 1300,
  ticks: [1300, 1292.5, 1285.6, 1278, 1270.5],
  format: fmt1,
}
export const vn30f1mCandles = candlesFromShape(vn30f1mAxis.min, vn30f1mAxis.max)

export const chartRange = { from: '01/09', to: '23/09' }

// ---------- Dashboard ----------

export const dashboardStats = {
  portfolio: { label: 'Tổng giá trị danh mục', value: '152,300,000 ₫', change: '▲ 1,850,000 ₫ (1.23%) hôm nay' },
  buyingPower: { label: 'Sức mua khả dụng', value: '48,120,000 ₫', note: 'Tỷ lệ ký quỹ phái sinh: 145%' },
}

export const watchlist: WatchItem[] = [
  { symbol: 'VNM', price: '68,500', change: '+1,200', changePct: '+1.78%', trend: 'up', volume: '2.1M', signal: 'Cơ hội mua', signalTone: 'up', href: '/stocks/VNM' },
  { symbol: 'HPG', price: '27,850', change: '-350', changePct: '-1.24%', trend: 'down', volume: '8.4M', signal: 'Cảnh báo bán', signalTone: 'down', href: '/stocks/HPG' },
  { symbol: 'FPT', price: '134,200', change: '+800', changePct: '+0.60%', trend: 'up', volume: '1.6M', signal: 'Theo dõi', signalTone: 'none', href: '/stocks/FPT' },
  { symbol: 'MWG', price: '52,100', change: '0', changePct: '0.00%', trend: 'flat', volume: '950K', signal: 'Theo dõi', signalTone: 'none', href: '/stocks/MWG' },
  { symbol: 'VN30F1M', price: '1,285.6', change: '+12.4', changePct: '+0.97%', trend: 'up', volume: '62.3K HĐ', signal: 'Tín hiệu LONG', signalTone: 'up', href: '/derivatives/VN30F1M' },
  { symbol: 'VCB', price: '91,400', change: '+400', changePct: '+0.44%', trend: 'up', volume: '3.2M', signal: 'Theo dõi', signalTone: 'none', href: '/stocks/VCB' },
]

// ---------- Danh sách cổ phiếu / phái sinh ----------

export const stocks: Instrument[] = [
  { symbol: 'VNM', name: 'CTCP Sữa Việt Nam', price: '68,500', changePct: '+1.78%', trend: 'up', volume: '2,100,000', spark: [22, 20, 23, 16, 18, 12, 14, 8, 10, 4, 6], buyPct: 62, followed: true, avatar: 'VNM' },
  { symbol: 'HPG', name: 'CTCP Tập đoàn Hòa Phát', price: '27,850', changePct: '-1.24%', trend: 'down', volume: '8,400,000', highlightVolume: true, spark: [6, 9, 7, 13, 11, 17, 15, 20, 18, 23, 21], buyPct: 35, followed: true, avatar: 'HPG' },
  { symbol: 'FPT', name: 'CTCP FPT', price: '134,200', changePct: '+0.60%', trend: 'up', volume: '1,600,000', spark: [20, 19, 21, 15, 17, 10, 13, 9, 11, 6, 8], buyPct: 58, followed: true, avatar: 'FPT' },
  { symbol: 'MWG', name: 'CTCP Đầu tư Thế Giới Di Động', price: '52,100', changePct: '0.00%', trend: 'flat', volume: '950,000', spark: [14, 12, 15, 13, 16, 12, 14, 13, 15, 12, 14], buyPct: 50, followed: true, avatar: 'MWG', avatarMuted: true },
  { symbol: 'VCB', name: 'NH TMCP Ngoại thương Việt Nam', price: '91,400', changePct: '+0.44%', trend: 'up', volume: '3,200,000', spark: [21, 19, 20, 15, 17, 11, 13, 9, 10, 5, 7], buyPct: 55, followed: true, avatar: 'VCB' },
  { symbol: 'VIC', name: 'Tập đoàn Vingroup', price: '45,600', changePct: '-0.44%', trend: 'down', volume: '2,800,000', spark: [8, 10, 9, 14, 12, 18, 16, 21, 19, 24, 22], buyPct: 40, followed: false, avatar: 'VIC' },
  { symbol: 'MSN', name: 'Tập đoàn Masan', price: '72,300', changePct: '+2.12%', trend: 'up', volume: '1,100,000', spark: [24, 21, 22, 15, 17, 8, 10, 5, 7, 2, 3], buyPct: 70, followed: false, avatar: 'MSN' },
  { symbol: 'GAS', name: 'Tổng Công ty Khí Việt Nam', price: '63,200', changePct: '0.00%', trend: 'flat', volume: '680,000', spark: [14, 15, 13, 16, 14, 15, 13, 14, 15, 13, 14], buyPct: 50, followed: false, avatar: 'GAS', avatarMuted: true },
]

export const derivatives: Instrument[] = [
  { symbol: 'VN30F1M', name: 'Đáo hạn 17/10/2026', price: '1,285.6', changePct: '+0.97%', trend: 'up', volume: '142,300', spark: [22, 19, 21, 15, 17, 10, 13, 7, 9, 3, 5], buyPct: 58, followed: true, avatar: 'VN30' },
  { symbol: 'VN30F2M', name: 'Đáo hạn 20/11/2026', price: '1,283.2', changePct: '+0.85%', trend: 'up', volume: '28,400', spark: [20, 18, 19, 14, 16, 11, 13, 9, 10, 6, 7], buyPct: 55, followed: false, avatar: 'VN30', avatarMuted: true },
  { symbol: 'VN30F1Q', name: 'Đáo hạn 18/12/2026', price: '1,279.0', changePct: '+0.60%', trend: 'up', volume: '9,600', spark: [15, 14, 16, 13, 15, 11, 13, 10, 12, 9, 11], buyPct: 52, followed: false, avatar: 'VN30', avatarMuted: true },
  { symbol: 'VN30F2Q', name: 'Đáo hạn 19/03/2027', price: '1,276.5', changePct: '+0.42%', trend: 'flat', volume: '3,200', spark: [14, 15, 13, 16, 14, 15, 13, 14, 15, 13, 14], buyPct: 50, followed: false, avatar: 'VN30', avatarMuted: true },
]

// ---------- Chi tiết cổ phiếu (VNM) ----------

export const stockDetail = {
  symbol: 'VNM',
  name: 'CTCP Sữa Việt Nam · HOSE',
  price: '68,500',
  change: '▲ 1,200 (1.78%)',
  trend: 'up' as Trend,
  refs: [
    { label: 'TC', value: '67,300' },
    { label: 'Trần', value: '71,900' },
    { label: 'Sàn', value: '62,700' },
  ],
  stats: [
    { label: 'Tổng KL', value: '2,140,500' },
    { label: 'Cao', value: '69,100' },
    { label: 'Thấp', value: '67,000' },
    { label: 'TB', value: '68,320' },
    { label: 'NN mua / bán', value: '320K / 180K' },
  ] as Stat[],
  position: {
    left: { label: 'Khối lượng sở hữu', value: '300 cổ phiếu' },
    right: { label: 'Giá trị tương đương', value: '20,550,000 ₫' },
  },
  order: { qty: 300, price: 68500 },
}

export const stockNews: NewsItem[] = [
  { sentiment: 'pos', title: 'VNM ký hợp đồng xuất khẩu 1,200 tỷ sang Trung Đông', summary: 'Doanh nghiệp mở rộng thị trường xuất khẩu, kỳ vọng đóng góp thêm 3–4% doanh thu quý 4', time: '2 giờ trước' },
  { sentiment: 'pos', title: 'Khối ngoại mua ròng phiên thứ 3 liên tiếp', summary: 'Giá trị mua ròng đạt 45 tỷ đồng, tập trung vào nhóm cổ phiếu vốn hóa lớn ngành tiêu dùng', time: '5 giờ trước' },
  { sentiment: 'neu', title: 'VNM công bố kế hoạch chi trả cổ tức quý 3', summary: 'Tỷ lệ cổ tức tiền mặt dự kiến 15%, ngày chốt quyền chưa được công bố cụ thể', time: '1 ngày trước' },
  { sentiment: 'neg', title: 'Chi phí nguyên liệu đầu vào tăng 8% so với cùng kỳ', summary: 'Giá sữa bột nguyên liệu nhập khẩu tăng có thể ảnh hưởng biên lợi nhuận gộp quý tới', time: '1 ngày trước' },
  { sentiment: 'neu', title: 'Đại hội cổ đông bất thường dự kiến tổ chức tháng 11', summary: 'Nội dung chính liên quan đến việc bầu bổ sung thành viên HĐQT nhiệm kỳ mới', time: '2 ngày trước' },
]

export const stockAdvice: Advice = {
  action: 'MUA',
  confidence: 78,
  phase: 'Choice phase — đã chọn phương án tốt nhất',
  scores: [
    { label: 'Kỹ thuật', value: 82 },
    { label: 'Cơ bản', value: 65 },
    { label: 'Sentiment', value: 70 },
    { label: 'Rủi ro', value: 40, text: 'Trung bình' },
  ],
  reasons: [
    { text: 'MA20 cắt lên MA50 — tín hiệu xu hướng tăng' },
    { text: 'P/E thấp hơn trung bình ngành sữa 18%' },
    { text: 'Tin tức tích cực về hợp đồng xuất khẩu' },
    { text: 'RSI(14) = 55 — chưa vào vùng quá mua' },
  ],
  alternatives: [
    { title: 'Mua toàn bộ ngay tại 68,500', detail: 'Kỳ vọng +6.2% / 4 tuần · Rủi ro trung bình', recommended: true },
    { title: 'Mua 50% ngay, 50% chờ về 66,000', detail: 'Kỳ vọng +5.1% / 4 tuần · Rủi ro thấp hơn' },
    { title: 'Đặt lệnh chờ tại 66,800', detail: 'Chờ giá điều chỉnh về vùng hỗ trợ' },
    { title: 'Không mua, tiếp tục theo dõi', detail: 'Chưa đủ tín hiệu xác nhận' },
  ],
}

// ---------- Chi tiết phái sinh (VN30F1M) ----------

export const derivativeDetail = {
  symbol: 'VN30F1M',
  name: 'Hợp đồng tương lai VN30 · đáo hạn 17/10/2026 (còn 12 ngày)',
  price: '1,285.6',
  change: '▲ 12.4 (0.97%)',
  trend: 'up' as Trend,
  refs: [
    { label: 'Basis (F−S)', value: '+4.8', trend: 'up' as Trend },
    { label: 'Open Interest', value: '38,900' },
    { label: 'KL hợp đồng', value: '142,300' },
  ],
  stats: [
    { label: 'Mở cửa', value: '1,273.2' },
    { label: 'Cao', value: '1,290.0' },
    { label: 'Thấp', value: '1,270.5' },
    { label: 'Open Interest', value: '38,900' },
    { label: 'Basis (F−S)', value: '+4.8 (+0.37%)', trend: 'up' as Trend },
  ],
  margin: {
    title: 'Tỷ lệ ký quỹ hiện tại: 145%',
    detail: 'Còn cách ngưỡng gọi ký quỹ (margin call) 32% — nếu VN30F1M giảm thêm ~40 điểm, tài khoản sẽ bị margin call',
  },
  position: {
    left: { label: 'Số hợp đồng đang nắm giữ', value: '0 hợp đồng' },
    right: { label: 'Giá trị ký quỹ đã dùng', value: '0 ₫' },
  },
  // Ký quỹ ban đầu ước tính cho 1 hợp đồng (theo wireframe)
  order: { contracts: 1, stopLoss: 1265.0, marginPerContract: 17280000 },
}

export const derivativeAdvice: Advice = {
  action: 'LONG',
  confidence: 65,
  phase: 'Choice phase — rủi ro margin là điều kiện chặn',
  scores: [
    { label: 'Kỹ thuật', value: 75 },
    { label: 'Basis/OI', value: 68 },
    { label: 'Rủi ro margin', value: 70, text: 'Cao' },
  ],
  reasons: [
    { text: 'Basis dương mở rộng — tâm lý thị trường tích cực' },
    { text: 'Giá breakout khỏi vùng kháng cự 1,280' },
    { text: 'Open Interest tăng cùng chiều giá — xác nhận xu hướng' },
    { text: 'Biến động (ATR) đang cao — rủi ro đòn bẩy lớn', strong: true },
  ],
  alternatives: [
    { title: 'Đứng ngoài, chưa vào lệnh', detail: 'Rủi ro ký quỹ hiện tại ở mức cao, ưu tiên bảo toàn vốn', recommended: true },
    { title: 'Long 1 hợp đồng theo risk profile', detail: 'Stop-loss đề xuất tại 1,265 (−20 điểm)' },
    { title: 'Long có hedge bằng vị thế cổ phiếu VN30', detail: 'Giảm rủi ro biến động ngắn hạn' },
    { title: 'Short 1 hợp đồng', detail: 'Không phù hợp — ngược xu hướng hiện tại' },
  ],
}

// ---------- Danh mục ----------

export const portfolioStats = [
  { label: 'Tổng giá trị danh mục', value: '62,300,000 ₫' },
  { label: 'Lãi / lỗ tổng', value: '▲ 2,900,000 ₫ (4.9%)', trend: 'up' as Trend },
  { label: 'Tiền mặt khả dụng', value: '11,020,000 ₫' },
  { label: 'Tỷ lệ ký quỹ (phái sinh)', value: '145%' },
]

export const allocation = [
  { label: 'Cổ phiếu cơ sở', pct: 54, value: '34,000,000 ₫', swatch: 'bg-ink' },
  { label: 'Phái sinh (ký quỹ)', pct: 28, value: '17,280,000 ₫', swatch: 'bg-mid' },
  { label: 'Tiền mặt', pct: 18, value: '11,020,000 ₫', swatch: 'bg-line' },
]

export const holdings: Holding[] = [
  { symbol: 'VNM', type: 'Cổ phiếu', qty: '300 cp', cost: '64,200', price: '68,500', value: '20,550,000 ₫', pnl: '▲ 1,290,000 ₫ (6.7%)', trend: 'up', weight: '33%', href: '/stocks/VNM' },
  { symbol: 'HPG', type: 'Cổ phiếu', qty: '500 cp', cost: '27,800', price: '26,900', value: '13,450,000 ₫', pnl: '▼ 450,000 ₫ (3.2%)', trend: 'down', weight: '22%', href: '/stocks/HPG' },
  { symbol: 'VN30F1M', type: 'Phái sinh · Long', qty: '1 HĐ', cost: '1,265.0', price: '1,285.6', value: '17,280,000 ₫', pnl: '▲ 2,060,000 ₫ (11.9%)', trend: 'up', weight: '28%', href: '/derivatives/VN30F1M' },
]
