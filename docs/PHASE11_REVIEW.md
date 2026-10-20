# Phase 11 檢核：臺北自來水園區網站重構案例頁

狀態：**已完成**

完成日期：2026-10-03

## 階段目標

- 完成 `/projects/taipei-water-park` 專案細節頁，不另建 Demo，並沿用現有 Vue 3、Router、三語與 Design Token 架構。
- 以深水藍 `#263957`、低彩度青色、米色文字與水波圖層建立案例頁獨立視覺，不覆寫作品集全域 Token。
- 展示 Project Overview、Before / After、Design Process、Project Highlights 與 Reflection。
- 清楚呈現使用者研究、資訊架構、介面設計、插畫與前端開發的個人負責範圍。
- 維持桌機、手機橫向、Reduced Motion 與鍵盤操作的基本可用性。

## 實作說明

### 路由與資料

- 案例路由使用 `/projects/:slug`，由 `src/views/ProjectCaseStudyView.vue` 統一呈現。
- 案例文案、影片、圖片、Alt、Role、Tools 與外部連結集中於 `src/data/projects.js`。
- 章節名稱、操作文字、錯誤狀態與無障礙標籤由 `src/data/messages.js` 提供中／英／日三語。
- 本案例已移除「待補」、「圖片待補」與圖片規格等填充文字；其他未完成專案的待補資料不屬於本階段。

### 視覺與互動

- Hero 使用專案前後畫面影片，並保留滑鼠水波回饋。
- 案例頁使用獨立自訂 Cursor、延遲圓環、光點粒子與輕微背景視差，不影響作品集其他頁面。
- Before / After 保留錯位式 Editorial Layout，圖片與影片皆限制於自身媒體區域。
- Design Process 使用 Site Map 與 UI Design 正式圖片。
- Project Highlights 使用風琴式 Gallery，支援 Hover、Focus、Click 與方向鍵切換。
- Go Top 使用水波玻璃球樣式；手機版球體與內部元素等比縮小約 25%。
- Reflection 內文使用共用響應式字級，並保持於安全閱讀行寬內。

### 影片與載入

- 所有案例影片皆使用 MP4 Base Media 容器與 H.264 / `avc1` 視訊資訊。
- Review 當時的影片未偵測到音訊軌；後續替換的 `navigation-redesign.mp4` 含 AAC 音軌，但元件固定使用 `muted` 與 `playsinline`，不會播放聲音。
- 八支影片均已轉為 Fast Start 結構，`moov` 索引位於 `mdat` 影片資料前，以改善手機與串流環境的開始播放時間。
- 影片使用 IntersectionObserver 延遲建立，進入可視範圍後才播放。
- 使用 `autoplay muted playsinline`，離開可視範圍後暫停，播放完留白 3 秒再重播。
- 載入失敗時會顯示三語錯誤訊息；開發環境會在 Console 記錄載入或自動播放錯誤。

## 檢查標準

### 資料與語意

- [x] `/projects/taipei-water-park` 可由首頁「查看專案」進入。
- [x] 中文、英文、日文的 Title、章節名、說明、Alt、Role 與負責範圍能正確切換。
- [x] 中文頁的個人負責範圍使用中文，不混用「MY CONTRIBUTION」等固定英文。
- [x] Role 使用 `dl` / `dt` / `dd` 呈現名稱與對應內容。
- [x] 案例頁沒有「待補」、Placeholder 規格或尚未完成等公開填充文字。
- [x] 外部連結使用新分頁並加上 `rel="noreferrer"`。

### 版面與 Responsive

- [x] 桌機版章節、圖片、影片與文字皆限制於案例頁寬度。
- [x] 手機橫向保留上下滾動閱讀，不引入作品集首頁的橫向 Track。
- [x] 600 CSS px 以下手機直向顯示橫向閱讀提示，避免內容擠壓。
- [x] Site Map 與 UI Design 媒體使用同一比例基準，UI Design 能完整呈現。
- [x] Gallery 在小於 1600 px 時取消特殊影片位移，在小於 860 px 時改為直向風琴排列。
- [x] Go Top 不遮擋主要文字，並考慮 Safe Area；手機版縮小約 25%。

### 互動與無障礙

- [x] 專案主視覺、圖片與 Gallery 具有有意義的三語 Alt 或 Accessible Name。
- [x] Gallery 可以點擊、Focus、左右方向鍵、Home 與 End 切換。
- [x] Fine Pointer 才啟用自訂 Cursor 與粒子，Touch 不執行滑鼠追蹤。
- [x] Reduced Motion 停用進場、視差、水波、粒子與平滑回頂。
- [x] Observer、Resize Listener、RAF、Timer 與動態水波節點在卸載或動畫完成後清除。
- [x] 影片無音、可於可視區域自動播放，並具有載入失敗狀態。

### 建置與穩定性

- [x] `npm run build` 通過，Vite 完成 120 個模組轉換。
- [x] 相關 Vue、JavaScript 與文案檔案通過 Prettier 檢查。
- [x] `git diff --check` 通過，沒有空白或 Patch 格式問題。
- [x] 影片全數通過 MP4 Base Media 與 Fast Start 結構檢查。

## 已確認的延後項目

以下項目經使用者確認不列入 Phase 11 完成條件：

- 一般動態模式的影片播放控制。
- 影片 Poster 封面。

## 完成紀錄

Phase 11 「臺北自來水園區網站重構案例頁」已完成。後續若更換影片、圖片、外部網址或三語文案，應重新執行本文件的媒體、Responsive、語言與 Production Build 檢查。

2026-10-19 已替換並重新建置 `navigation-redesign.mp4`；影片縮短且壓縮至部署限制內，Production Build 通過。此更新不改變 Phase 11 的完成結論。
