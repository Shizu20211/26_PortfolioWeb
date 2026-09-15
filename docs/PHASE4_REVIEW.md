# Phase 4 Featured Horizontal Gallery 重新檢核紀錄

審核日期：2026-09-15

## 原階段基線

Phase 4 原驗收已通過，正式基線為 `v0.4.0-phase4`。本次不移動既有 Tag，
以保留當時可回復的版本。

## 驗收後修正

- 橫向裝置判定由 1024 × 600 擴充至 1180 × 720，涵蓋實際檢核畫面。
- Featured 最後一頁重新分配圖片與說明欄比例，說明欄在低高度畫面可自行垂直捲動。
- 壓縮 metadata 間距並限制視覺媒體高度，避免內容被底部 Navigation 截斷。
- 全語言 Title 改為依所屬區域自適應，最多顯示兩行並採平衡斷句。
- Subpanel Heading 使用固定 Header 安全距離加 `1vh`，避免原本 `clamp()` 最小值鎖死定位。

Featured 與下一個 Projects Section 的背景底色已依最終審核意見互換。

## 重新檢核狀態

程式建置通過後，仍待使用者以桌面與手機橫向畫面重新確認。確認前不建立或移動
Phase 4 Tag。

## 後續備註

若要製作 Water Effect，待 Featured 背景完成後再加入，可以避免之後更換背景時，
需要重新調整整套水波參數。

Water Effect 不屬於 Phase 4 驗收阻擋項目，後續實作仍須遵守 Reduced Motion、
文字可讀性、行動裝置效能與效果範圍限制。
