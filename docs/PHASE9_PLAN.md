# Phase 9 執行計劃：About、聯絡入口與三語履歷

狀態：第一輪結構實作完成，待使用者瀏覽器檢核與正式素材。

## 階段目標

- About 內文、能力、AI 協作與聯絡方式不得落入底部 Navigation。
- 桌機與手機橫向保留單一 Section；內容過長時只讓中間內容區垂直捲動。
- 手機直向維持自然頁面高度，不建立內層滾動陷阱。
- 建立 Email、GitHub、關於我三語簡歷與 Instagram 的資料接口，不建立假連結。

## 版面比例

- 桌機使用 `about-intro : about-meta = 3 : 2`。
- 手機橫向使用 `about-intro : about-meta = 1 : 1`。
- 自介設定最大行寬，避免欄寬增加後形成過長行距。
- 桌機高度不足時由 `.about-content` 垂直捲動。
- 手機橫向不建立內層捲動；待提供三語精簡版自介後切換為精簡文案。
- 手機直向改為單欄，自介、Meta、Footer 依正常文件流排列。

## 聯絡 Icon 與履歷

- 正式 Icon 使用 97 × 97 透明 WebP，保留原始手繪質感並以 24 × 24 顯示。
- 四個 Icon 已放在 `src/assets/icons/contact/`，分別對應 Email、GitHub、關於我與 Instagram。
- 正式履歷使用 PDF，預定放在 `public/documents/`。
- 三語檔名：
  - `resume-ching-yung-huang-zh.pdf`
  - `resume-ching-yung-huang-en.pdf`
  - `resume-ching-yung-huang-ja.pdf`
- Illustrator `.ai` 保留為設計來源，不由網站直接載入。
- 正式 URL、SVG 與 PDF 未提供前維持 Placeholder。

## 驗收清單

- [ ] 一般桌機三語內容不與 Footer／Navigation 重疊。
- [ ] 低高度桌機可以捲動完整 About 內容。
- [ ] 手機橫向顯示精簡自介且沒有 About 內層捲動。
- [ ] About 內層到達頂端或底端後，主 Track 可以繼續切換 Section。
- [ ] 手機直向沒有水平 overflow，Footer 不覆蓋聯絡方式。
- [ ] 四個聯絡項目的 Icon 保持 24 × 24 且文字對齊。
- [ ] 語言切換後履歷連結對應正確 PDF。
- [ ] 鍵盤、Focus 與 Reduced Motion 正常。

## 待補資料

- Email、GitHub、Instagram 正式 URL。
- 「關於我」三語簡歷 PDF。
- 手機版三語精簡自介。
