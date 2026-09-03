# CHING-YUNG HUANG — 日常微光

Vue 3 + Vite 橫向作品集第一階段。以 Horizontal Exhibition / Digital Editorial 為基調，讓瀏覽者在五個章節中快速理解視覺設計、前端互動與工藝背景。

## 執行方式

```sh
npm install
npm run dev
npm run build
npm run preview
```

## 第一階段範圍

- `00 Home`：姓名、定位、三語自介、能力標籤與 Intro 視覺。
- `01 Featured`：台北自來水園區教育性網站重構摘要；非官方委託。
- `02 Projects`：五項網頁／互動作品入口。
- `03 Artworks`：八類視覺、3D 與工藝作品入口。
- `04 About`：轉職敘事、技能、AI 協作原則與聯絡方式插槽。
- 中文、英文、日文介面；語言偏好儲存在瀏覽器。
- 桌面支援滾輪逐章、Trackpad 原生水平捲動、Pointer Drag、鍵盤與導覽列。
- 手機橫向支援左右滑動；手機直向提示旋轉，但仍能縱向閱讀。
- 所有專案詳情目前為誠實的製作中頁面，不代表完整 Case Study 已完成。

## 程式結構

- `src/sections`：五個總覽章節。
- `src/components`：導覽、進度、卡片、FloatingCloud 與分層 Hero。
- `src/composables`：橫向導覽、Active Section、語言、Pointer 視差與 Reduced Motion。
- `src/data`：章節、專案、作品與三語內容；後續 Case Study 沿用相同 slug。
- `src/views`：橫向總覽、作品分類與專案製作中頁面。
- `src/assets/styles`：Design Tokens 與基礎樣式。

## 待補素材規格

所有缺圖區都保留實際版面位置，畫面會顯示用途、尺寸與待補狀態。加入正式素材時請沿用以下用途式檔名。

| 檔案 | 建議尺寸／比例 | 格式與透明需求 | 用途／狀態 |
|---|---:|---|---|
| `hero-background-sky.svg` | 2400 × 1400，12:7 | SVG | 遠景天空，待補 |
| `hero-background-mountains.svg` | 2400 × 1400，12:7 | SVG、透明背景 | 後景山景，待補 |
| `hero-midground-field.svg` | 2400 × 1400，12:7 | SVG、透明背景 | 中景草原，待補 |
| `hero-foreground-flowers.svg` | 2400 × 1400，12:7 | SVG、透明背景 | 前景花卉，待補 |
| `hero-composite-artwork.webp` | 2400 × 1400，12:7 | WebP | 分層圖載入失敗時的備援，待補 |
| `cloud-soft-small.svg` | 約 600 × 240 | SVG、透明背景 | 小型雲朵；目前以 CSS 形狀暫代 |
| `cloud-soft-wide.svg` | 約 1000 × 320 | SVG、透明背景 | 寬型雲朵；目前以 CSS 形狀暫代 |
| `paper-grain-overlay.png` | 1024 × 1024 | PNG、透明且可平鋪 | 紙張顆粒，待補 |
| `featured-water-park-overview.webp` | 1600 × 1000，8:5 | WebP；介面文字需極銳利時用 PNG | Featured 主圖，待補 |
| `project-{slug}-cover.webp` | 1440 × 900，8:5 | WebP／PNG | 各專案卡片，待補 |
| `artwork-{name}-preview.webp` | 長邊至少 1600px | WebP／PNG，保留原作比例 | 各作品預覽，待補 |
| `resume-ching-yung-huang.pdf` | A4 | PDF | 履歷，待補 |
| `icon-email.svg`、`icon-github.svg`、`icon-104.svg`、`icon-resume.svg` | 24 × 24 基準 | SVG、透明背景 | 聯絡 Icon，待補 |

目前 Intro 使用由 `26_profile` 提供的兩張花景 PNG：

- `intro-flower-window.png`：2656 × 1768。
- `intro-flower-window-wide.png`：3100 × 2067，作為後續裁切備選。

## 待補內容

- Email、GitHub、104 與履歷連結。
- 各專案真實 Role、Tools、完成狀態、Live Demo、GitHub／Figma 連結與截圖。
- 各 Artwork 的圖片、年份、媒材、Contribution 與公開權利。
- VTuber 委託的可公開範圍與圖片權利。

在資料補齊前，不建立假連結、不虛構研究人數、成果、客戶關係或個人職責。

## 後續階段

- Phase 2：台北自來水園區、貪吃蛇迷宮、Vue 旅遊網站及台灣馬拉松 Figma 重構的完整 Case Study。
- Phase 3：奇幻訂房、訂餐、互動練習、VTuber、插畫、平面、地圖、3D 與工藝分類詳情。
- Phase 4：完整直式頁面、Gallery、燈箱、Before／After、轉場、測試、SEO 與效能深化。
