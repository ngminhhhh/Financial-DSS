# MTH. — Hệ hỗ trợ ra quyết định đầu tư chứng khoán & phái sinh

Đồ án môn **Data Warehouse** (HCMUT, HK 261).

MTH. là một **Decision Support System (DSS)** dành cho nhà đầu tư cá nhân trên thị trường chứng khoán Việt Nam:

- theo dõi **cổ phiếu cơ sở** (VNM, HPG, FPT, …) và **hợp đồng tương lai VN30F1M**;
- đưa ra khuyến nghị **Mua / Bán / Long / Short** kèm lý do, theo mô hình ra quyết định của Simon (**Intelligence → Design → Choice**);
- cảnh báo rủi ro ký quỹ (margin call) cho vị thế phái sinh.

## Kiến trúc tổng quan

```
 Nguồn dữ liệu            Kho dữ liệu               Phân tích & ra quyết định         Trình bày
┌──────────────┐  ETL   ┌──────────────┐        ┌─────────────────────────┐      ┌────────────┐
│ data/ (CSV)  │ ─────▶ │  warehouse/  │ ─────▶ │ analytics_engine/       │      │            │
└──────────────┘        │ (star schema)│        │  Kỹ thuật · Cơ bản ·    │      │ frontend/  │
┌──────────────┐        └──────────────┘        │  Sentiment · Rủi ro     │ ───▶ │ React +    │
│ streaming/   │ ──────────────┘                ├─────────────────────────┤ API  │ Tailwind   │
│ (giá realtime)│                               │ decision_engine/        │ ◀──▶ │            │
└──────────────┘                                │  khuyến nghị + phương án│      └────────────┘
                                                └────────────┬────────────┘
                                                        backend/ (API)
```

> **Trạng thái hiện tại:** mới có **thiết kế giao diện** (`design/`), **frontend** chạy được với dữ liệu mẫu, và **dữ liệu thô VN30F1M**. Các module còn lại mới có thư mục, chưa có mã nguồn. Vai trò ghi trong bảng dưới là **dự kiến**.

## Cấu trúc thư mục

| Thư mục / file | Trạng thái | Nội dung |
|---|---|---|
| `data/` | Có dữ liệu | Dữ liệu thô đầu vào. **Không được commit** vì `.gitignore` bỏ qua `data`. |
| `data/derivative/VN30F1M_raw.csv` | ~41.500 dòng | Nến 15 phút của VN30F1M từ 10/08/2017. Các cột: `Datetime, Open, High, Low, Close, Volume, Value` |
| `data/underlying/` | Trống | Dữ liệu cổ phiếu cơ sở |
| `etl/` | Chưa có mã | Trích xuất, làm sạch và nạp dữ liệu vào kho |
| `warehouse/` | Chưa có mã | Lược đồ kho dữ liệu (bảng fact và dimension) và script tạo bảng |
| `streaming/` | Chưa có mã | Nhận giá và khớp lệnh theo thời gian thực |
| `analytics_engine/` | Chưa có mã | Chấm điểm Kỹ thuật, Cơ bản, Sentiment, Rủi ro. Đây là các thanh điểm trong card "Trợ lý tài chính" |
| `decision_engine/` | Chưa có mã | Từ điểm số tạo ra khuyến nghị, độ tin cậy, lý do và các phương án đề xuất |
| `backend/` | Chưa có mã | API cung cấp dữ liệu cho frontend và nhận lệnh đặt |
| `notebooks/` | Chưa có mã | Notebook khám phá và thử nghiệm mô hình |
| `docs/` | Trống | Tài liệu và báo cáo |
| `design/` | Hoàn chỉnh | 7 wireframe HTML (1440×960) và `design-system.md` (màu, typography, component) |
| `frontend/` | Chạy được | Giao diện React dựng lại từ `design/`, dùng dữ liệu mẫu |
| `PLAN.md` | — | Kế hoạch hiện thực frontend |
| `requirements.txt` | Trống | Các thư viện Python sẽ dùng |

### `frontend/`

```
frontend/
├── index.html                  # nạp font Space Grotesk
├── vite.config.ts              # Vite + React + Tailwind v4
└── src/
    ├── main.tsx, App.tsx       # khởi tạo app và khai báo route
    ├── index.css               # design token (@theme): màu, font, bo góc 2px
    ├── mocks/mock.ts           # TOÀN BỘ dữ liệu mẫu — thay file này bằng lời gọi API khi có backend
    ├── components/
    │   ├── layout/             # AppLayout, Sidebar (88px), Topbar (64px), NotificationDropdown
    │   ├── ui/                 # Card, Button, Chip, toggle, SearchBox, Sparkline, BuySellBar, StarToggle, NewsTag, StatCard
    │   ├── charts/             # CandlestickChart (SVG, trục giá bên phải)
    │   ├── advisor/            # ChartCard, InstrumentHeader, OrderCard, AssistantCard
    │   ├── list/               # InstrumentTable + ListPage (dùng chung cho cổ phiếu & phái sinh)
    │   └── icons.tsx
    └── pages/                  # Landing, Dashboard, StockList, StockAdvisor, DerivativeList, DerivativeAdvisor, Portfolio
```

| Route | Màn hình | Wireframe |
|---|---|---|
| `/` | Trang giới thiệu | `Landing.dc.html` |
| `/dashboard` | Tổng quan: số liệu chính, biểu đồ nến, danh sách theo dõi | `Dashboard.dc.html` |
| `/stocks` | Danh sách cổ phiếu (lọc theo dõi, tìm kiếm) | `StockList.dc.html` |
| `/stocks/:symbol` | Chi tiết mã: biểu đồ, tin tức, đặt lệnh, trợ lý tài chính | `StockAdvisor.dc.html` |
| `/derivatives` | Danh sách hợp đồng phái sinh | `DerivativeList.dc.html` |
| `/derivatives/:symbol` | Chi tiết VN30F1M: biểu đồ, rủi ro ký quỹ, đặt lệnh, trợ lý | `DerivativeAdvisor.dc.html` |
| `/portfolio` | Danh mục: phân bổ tài sản, vị thế đang nắm | `Portfolio.dc.html` |

## Chạy frontend

Yêu cầu Node.js ≥ 20.

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # kiểm tra kiểu + build ra dist/
```

## Nguyên tắc thiết kế

Chi tiết trong [`design/design-system.md`](design/design-system.md). Tóm tắt:

- Phong cách tối giản, chỉ dùng đen và trắng. Font **Space Grotesk**, card và nút bo góc **2px**.
- Màu chỉ dùng khi mang ý nghĩa: **xanh `#16A34A`** cho tăng / lãi / Mua / Long / tin tích cực, **đỏ `#DC2626`** cho giảm / lỗ / Bán / Short / tin tiêu cực, **xám `#F2F2F2`** cho tag tin trung lập. Không thêm màu trang trí.
- Trong các bảng, hàng tiêu đề và hàng dữ liệu phải dùng cùng một cách chia cột (flex) để các cột thẳng hàng.

## Việc tiếp theo

1. Dựng `etl/` và `warehouse/`, nạp `VN30F1M_raw.csv` cùng dữ liệu cổ phiếu cơ sở vào kho.
2. Hiện thực `analytics_engine/` và `decision_engine/`, trả kết quả đúng với kiểu `Advice` trong `frontend/src/mocks/mock.ts`.
3. Viết API trong `backend/`, rồi thay dữ liệu mẫu ở frontend bằng lời gọi API.
4. Kiểm tra số dư, khối lượng và giá trước khi cho phép đặt lệnh (nút "Vào lệnh").
