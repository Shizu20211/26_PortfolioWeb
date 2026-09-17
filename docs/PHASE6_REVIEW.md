# Phase 6 Project Detail Transition 檢核紀錄

更新日期：2026-09-17

## 本階段範圍

- Projects 項目開啟對應的 Preview Overlay。
- 使用 temporary visual layer 與 GSAP Flip 維持來源到 Detail Target 的空間連續性。
- 圖片抵達後才顯示標題、分類、Role、Tools、說明與 Case Study 入口。
- 關閉時返回原來源；來源不存在時使用淡出 fallback。
- 缺少正式圖片的專案沿用用途式 Placeholder，不建立假素材。
- 支援 Close、Escape、焦點循環、焦點還原與 Reduced Motion。
- Overlay 開啟期間鎖定頁面捲動，不移除全站 ScrollTrigger。
- 桌面採 50／50，手機橫向採 55／45 分割。

## 程式檢核

- [x] 選取資料直接使用完整 Project 物件與 slug。
- [x] 快速重複點擊不會建立多個 Overlay。
- [x] Temporary layer 在關閉及元件卸載後移除。
- [x] Event listener 在元件卸載後移除。
- [x] 原 Router 與 Case Study 路由保留。
- [x] Reduced Motion 直接顯示靜態 Detail Visual。
- [x] 正式建置通過。

## 待畫面驗收

- 桌面圖片／Placeholder 起點與 Detail Target 是否一致。
- 手機橫向 55／45 版面與文字大小。
- 開啟及返回動畫是否無閃爍。
- 快速操作、Escape 與 Case Study 入口是否符合預期。
