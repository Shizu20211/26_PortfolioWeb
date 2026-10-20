# Phase 狀態總覽

更新日期：2026-10-21

本文件是 Phase 狀態的唯一入口。早期階段的詳細敘述已濃縮至 [歷史摘要](PHASE_HISTORY.md)；近期內容階段保留完整 Review。

## 狀態表

| Phase | 狀態                       | 說明／依據                                                                               |
| ----- | -------------------------- | ---------------------------------------------------------------------------------------- |
| 0     | 已完成（基線）             | 2026-09-11 建立增修前基準；僅供歷史比較。                                                |
| 1     | 已完成                     | Git Tag `v0.1.0-phase1`。                                                                |
| 2     | 已完成                     | Responsive Image 基礎與資料介面通過；Git Tag `v0.2.0-phase2`。正式素材仍納入發布前 QA。  |
| 3     | 已完成                     | Git Tag `v0.3.0-phase3`。                                                                |
| 4     | 已完成                     | Featured 響應式修正通過；基線 `v0.4.1-phase4`。                                          |
| 5     | 已完成                     | Projects Gallery 通過；Git Tag `v0.5.0-phase5`。                                         |
| 6     | 已完成                     | Project Detail Transition 與建置檢查通過；Git Tag `v0.6.0-phase6`。                      |
| 7     | 已完成                     | Footer、Magnetic Hover、Kitten 已整合；Git Tag `v0.7.0-phase7`。                         |
| 8     | 已完成，已由 Phase 13 取代 | Artworks 橫向長廊曾由使用者確認；正式素材、詳情與三語內容以 Phase 13 為準。              |
| 9     | 已完成                     | About 已接入 Email、GitHub、Instagram 與三語履歷；低高度／手機橫向只讓右側資料區捲動。   |
| 10    | 取消獨立執行               | 原「手機版精簡自介」方案未採用，已由 Phase 9 的右側資料區捲動方案取代。                  |
| 11    | 已完成                     | [臺北自來水園區案例頁 Review](PHASE11_REVIEW.md)。                                       |
| 12    | 已完成                     | [Frontend Works Review](PHASE12_REVIEW.md)。                                             |
| 13    | 已完成                     | [Artworks Review](PHASE13_REVIEW.md)。                                                   |
| Final | 進行中                     | 網站已具備建置與部署流程，但仍需完成發布前的授權、敏感資訊、跨瀏覽器、實機與效能總驗收。 |

## 目前仍需處理

以下屬於 Phase Final，不代表 Phase 1–13 未完成：

- 以目前正式素材重新做圖片、影片、外部連結與三語內容的全站抽查。
- 完成 iOS Safari、Android Chrome、桌面主要瀏覽器與 Reduced Motion 實機驗收。
- 確認履歷、圖片、影片、字型、3D 模型及第三方素材適合公開。
- 檢查公開 Repository 與 Git 歷史是否包含敏感資訊或不宜公開的工作檔。
- 完成效能、SEO、無障礙與深層路由重新整理驗證。
- 建立正式 Release／Tag，並記錄正式網址、Commit 與驗收日期。

## 維護方式

- 完成新的內容階段時，更新本表並新增必要的 Review；不要再建立只有一兩項內容的分散 TODO。
- 功能被後續階段重做時，在本表標示「已取代」，不讓舊規格繼續成為待辦。
- 只有可重現的測試、使用者確認或 Git Tag 才能作為「已完成」依據。
