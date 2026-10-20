# Phase 12 檢核：Frontend Works 完整化與跨章節整理

狀態：**已完成（使用者確認本階段 portfolio-section 製作完成）**

完成日期：2026-10-12

## 階段目標與範圍

沿用 Vue、Vite、Vue Router、GSAP、既有五章橫向作品集與 Design Token，完成 Frontend Works 正式圖片、三語文案、外部入口、詳情閱讀與手機展示。交叉檢查其他章節的資料、共用事件及樣式，清理本階段殘留與衝突。

本階段完成不代表正式公開發布；Artworks 正式素材、About 聯絡資料與 Phase Final 的全站發布驗收另行處理。

## 作品資料與語言

作品依以下順序呈現，保留既有 slug 與 route 行為：

| 作品             | slug              | 分類                 |
| ---------------- | ----------------- | -------------------- |
| 記憶萬花筒       | snake-maze        | 創意互動             |
| 北歐城市旅遊導覽 | vue-travel        | Vue 開發             |
| 香水收藏圖鑑     | food-ordering     | Vue CDN・介面互動    |
| My Pokédex       | my-pokedex        | API 串接             |
| 即時天氣小卡     | live-weather-card | API 串接・Serverless |
| 幻想島嶼訂房     | fantasy-booking   | 原生 JavaScript      |
| 全國賽事網站重構 | marathon-redesign | UI/UX 設計・團隊專案 |

- 七件作品的 Title、Summary、Details、Tags 與圖片 Alt 具備中／英／日資料。
- 文案依使用者確認版本，維持技術精確、理性中帶輕微詩意的語氣。
- 天氣作品說明 Cloudflare Worker 後端代理部署及前端—代理—外部 API 資料流程；未擴寫未驗證的資料庫或 Secret 管理功能。
- Figma 作品呈現團隊背景，以及「篩選不足、時間更新不明確、分類雜亂、視覺規劃不足」對應的設計調整。
- 旅遊、訂房、Pokédex 說明末尾加入圖片非本人拍攝或繪製聲明，三語可切換。
- 移除不適用的 Role／Status 與待補工具佔位，保留已核對的 Tools。
- 接入六個 GitHub Pages 網址與 Figma Prototype，外部連結含另開分頁名稱及 noopener noreferrer。

## 桌面列表與手機作品卡

- 桌面保留 Hover List，預覽移至 body，避免被橫向容器裁切；進入作品列初始化位置，再跟隨游標並限制於視窗範圍。
- 六件前端作品使用各自 01 圖作封面／hover；Figma 使用 figma01.png。
- Reduced Motion 模式仍可顯示 hover 預覽，停用追蹤緩動。
- 手機橫向作品卡只顯示編號、標題與入口，概述留在詳情頁。
- 加入下深上淺的漸層遮罩與淺色文字，改善截圖文字與作品標題重疊時的辨識。
- 移除實體右邊框，以不占寬度的內側淡深色分隔線降低亮邊。

## 詳情閱讀與導覽

- frontend-work-detail-open 為 body 的狀態 class；實際詳情由 Teleport Overlay 建立，不新增前端作品 route。
- 桌面保留 50／50、手機橫向保留 55／45 雙欄。
- 標題與作品網站入口固定；Summary、Tools、Details 使用右側獨立文字捲動區。
- 網站入口在標題右側、底部對齊；返回維持右上角固定位置。
- 返回與網站入口共用專案內文字體、較小字級、連續底線、44px 最小操作範圍及 #475873 hover／focus。
- 返回移除 data-magnetic；文字底線由內層 span 呈現，與按鈕點擊範圍分離。
- 文字區以 Tab 聚焦，維持原生鍵盤捲動；詳情內焦點循環、Escape 關閉及關閉後恢復原作品按鈕焦點。
- 詳情開啟時隔離主橫向導覽的滾輪與左右鍵處理。
- 文字捲軸軌道透明、拉霸 #475873；WebKit 樣式寬 3px，Firefox 使用 thin 降級。

## 圖片展示與動畫

- 一般作品滿版等比填滿（cover），每張約 5 秒，淡入淡出約 0.4 秒循環；不顯示控制列。
- 圖片來源與容器尺寸穩定，不隨圖片比例或右側文字捲動改變欄位位置。
- Figma 桌面長圖 figma_pc.png 與容器等寬，手機長圖 figma_mob.png 以右下角子畫面呈現，保留大小並加陰影、細邊框。
- 長圖自動從頂端展示到底部，底部停留後淡出重播；不顯示捲軸。窄／低高度視窗改為依序展示桌面與手機圖。
- 滑鼠停留或長圖鍵盤聚焦暫停；滾輪有緩動，觸控保留手動閱讀。Reduced Motion 停用自動播放、回到首圖。
- 進場 Flip 結束後交給正式圖片展示。修正返回時 duration:0 不會觸發 onComplete 導致流程卡住的問題，並提供中斷／清理路徑。
- 載入失敗有三語提示，一般輪播跳過失敗圖片。

## 跨 Section 清理

- 清除舊 target-visual、已移除控制列翻譯、手機概述樣式及重複 hover 規則。
- 移除未使用的 getTransitionLayer；詳情卸載清理動畫並中止後續進場操作。
- 共用磁吸效果釋放已移除 DOM 的事件、動畫與引用，避免 route 切換累積。
- 保留既有 Artworks／About section 配色調整及 lockfile metadata 變更；未加入新依賴或改寫其他章節。
- 全站檢查細節見 [Frontend Works 與跨 Section 檢查](FRONTEND_WORKS_AUDIT.md)。

## 驗證紀錄

- [x] 全站 32 個 Vue SFC script／template 編譯檢查通過。
- [x] 靜態三語 t() 鍵無缺漏，本機相對與 alias import 存在。
- [x] 七件作品三語內容、Tags、圖片 Alt、素材路徑及 slug 檢查通過。
- [x] 即時定位、完成、中斷、錯誤清理及失敗圖片跳過的邏輯檢查通過。
- [x] Production Build 通過，143 個模組轉換。
- [x] 修改檔案 Prettier 與 git diff --check 通過。
- [x] 使用者確認本階段 portfolio-section 製作完成並要求推送 GitHub。

## 完成狀態與驗證限制

本階段依使用者確認標記完成。以下是 Review 當時的驗證限制，保留作為歷史紀錄：

- 沒有可用的瀏覽器控制工具，未宣稱已完成本輪實機視覺、手勢、跨瀏覽器與極端尺寸驗收。
- 外站讀取工具此次失敗；程式已接線，但不能宣稱遠端可達性、Figma 分享權限及天氣 API 即時回應已通過驗證。
- Figma 原始桌面 PNG 約 19.6 MB，手機 PNG 約 2.9 MB；素材效能優化留待後續。
- Artworks 正式素材、公開範圍與說明及 About 聯絡／文件網址在當時仍待補，不列為本階段前端作品區完成的阻擋項；前者後續於 Phase 13 完成，後者已在 About 階段接入。
- 當時提交與推送使用 `air`；目前分支與發布狀態改由 [Phase 狀態總覽](PHASE_STATUS.md) 與 [部署指南](DEPLOYMENT.md) 記錄。
