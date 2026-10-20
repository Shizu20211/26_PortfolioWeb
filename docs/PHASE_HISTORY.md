# Phase 0–10 歷史摘要

本文件合併已完成、已取代或不再需要獨立維護的早期 Phase 說明。完整現況請看 [Phase 狀態總覽](PHASE_STATUS.md)。

## Phase 0–3：基線與基礎架構

- Phase 0（2026-09-11）記錄五章首頁、既有路由、橫向導航與素材的增修前基準。
- Phase 1–3 完成主要導航、Responsive Image／資料介面與首頁基礎增修，分別保留 `v0.1.0-phase1`、`v0.2.0-phase2`、`v0.3.0-phase3` Tag。
- Phase 0 當時列出的 Drag、語言切換、Section 量測與 Artwork Route 等缺口，後續階段均已處理，不再列為現行待辦。

## Phase 4：Featured

- Featured 細節頁共用章節小標，低高度桌機與手機橫向採緊湊雙欄，手機直向採單欄。
- 響應式修正版於 2026-09-16 通過，正式基線為 `v0.4.1-phase4`。
- 後續全域字級或正式背景調整不改變本階段功能結論。

## Phase 5：Projects Gallery

- 桌面使用滿版垂直清單；手機橫向使用中央卡片判定、首尾章節交接與卡片入口。
- 2026-09-17 通過，基線為 `v0.5.0-phase5`。
- 手機觸控慣性與瀏覽器工具列影響已併入 Phase Final 實機 QA。

## Phase 6：Project Detail Transition

- 完成 Preview Overlay、GSAP Flip、關閉返回、淡出 fallback、焦點循環、Escape、Reduced Motion 與動態資源清理。
- 桌面採 50／50，手機橫向採 55／45；正式建置通過，基線為 `v0.6.0-phase6`。
- 後續 Frontend Works 詳情體驗已在 Phase 12 重新整理。

## Phase 7：Footer、Magnetic Hover 與 Kitten

- 完成 About Footer、返回首頁、細指標裝置的 Magnetic Hover、桌面／手機 Kitten、Touch 隔離與 Reduced Motion。
- 使用者驗收後建立 `v0.7.0-phase7`；舊文件中尚未勾選的瀏覽器清單不再代表功能未完成。
- 全站跨裝置複驗仍屬 Phase Final。

## Phase 8：Artworks 橫向長廊

- 完成兩排錯落長廊、作品卡 Reveal、局部視差、RouterLink、Artwork Route Transition、鍵盤與 Reduced Motion。
- 使用者已確認通過；當時使用的暫代圖與待補文案後來由正式 Artworks 製作取代。
- 現況、正式素材與八件作品的驗收結論以 [Phase 13](PHASE13_REVIEW.md) 為準。

## Phase 9–10：About 與聯絡資料

- About 已接入 Email、GitHub、Instagram 與中文／英文／日文履歷 PDF。
- 桌面維持雙欄；低高度與手機橫向只讓右側 `.about-meta` 資料區捲動；手機直向採自然文件流。
- Phase 10 原規劃另建三語精簡自介，實作後確認不需要，已由右側資料區捲動方案取代，因此取消獨立執行。

## 保留的發布前事項

圖片尺寸與裁切、手機觸控、跨瀏覽器、媒體效能、素材授權及公開範圍都是會隨正式內容變動的項目，統一由 [Phase Final](PHASE_FINAL_PLAN.md) 管理，不再散落於各階段文件。
