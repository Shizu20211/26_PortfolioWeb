# Phase Final：Release Cleanup & Deployment

狀態：**進行中**

本階段是正式公開前的最後一道發布程序。內容階段與部署基礎已完成，目前集中處理公開安全、素材授權、效能與跨裝置總驗收。

## 階段目標

- 保存完整且可回復的開發歷史。
- 從公開版 `main` 移除不適合公開的階段紀錄、外部參考資料與工作檔。
- 將 README 整理為面向訪客與工程師的正式專案說明。
- 完成素材授權、敏感資訊、效能、SEO、無障礙與跨裝置驗收。
- 建立可重現的 Production Build，完成正式部署與發布基線 Tag。

## 執行前提

- [x] Phase 10 原方案已由手機橫向右側資料區捲動取代。
- [x] Frontend Works 的正式圖片、Role、Tools、狀態與連結已補齊。
- [x] Artworks 的正式圖片、文案與詳細頁資料已補齊。
- [x] About 的 Email、GitHub、Instagram 與履歷連結已確認。
- [ ] 所有中／英／日文案已完成最終校對。
- [ ] 桌機、手機橫向與主要瀏覽器已完成實機驗收。
- [ ] 使用者已明確確認可以進入公開版本清理。

## 執行流程

### 1. 建立完整封存基線

- 確認 Working Tree 為乾淨狀態。
- 執行 Production Build、Prettier 與 Git 差異檢查。
- 建立清理前 Tag，例如 `v1.0.0-pre-cleanup`。
- 建立封存 Branch，例如 `archive/development-notes`。
- 確認 Phase 文件、參考規格與完整開發歷史均可由封存 Branch 取回。

### 2. 公開內容與敏感資訊稽核

- 搜尋 `.env`、API Key、Token、私鑰、Email、電話與未公開網址。
- 確認 OpenWeatherMap 等服務不在前端 Bundle 暴露正式金鑰。
- 確認 `.env`、`.env.*` 皆被忽略，只保留不含真實密鑰的 `.env.example`。
- 檢查 Git 歷史是否曾提交敏感資料；若有，必須重寫歷史，不能只刪除目前檔案。
- 確認履歷 PDF 是否適合公開，並移除地址、電話或其他非必要個資。

### 3. 素材與授權稽核

- 確認圖片、影片、字體、Icon、第三方程式碼與參考素材的使用權。
- 將只供開發參考、不可再散布或來源不明的內容移出公開 `main`。
- 補上必要的素材來源、第三方授權與著作權說明。
- 確認 PSD、AI、未壓縮輸出檔與其他原始工作檔不會進入公開 Repo。

### 4. 文件清理

公開版 `main` 原則上保留：

```text
README.md
LICENSE
package.json
package-lock.json
vite.config.js
index.html
src/
public/
```

以下資料先封存，再依公開需求從 `main` 移除：

```text
docs/PHASE_HISTORY.md
docs/PHASE11_REVIEW.md
docs/PHASE12_REVIEW.md
docs/PHASE13_REVIEW.md
```

- 保留 `docs/README.md`、`docs/PHASE_STATUS.md`、`docs/EDITING_GUIDE.md` 與 `docs/DEPLOYMENT.md` 作為現行文件。
- 刪除過時路徑、失效指令、重複說明與已完成 Placeholder 記錄。
- 不以一般刪除處理含敏感或無權公開的歷史內容；該情況必須另外執行歷史清理。

### 5. 正式 README

README 最終應包含：

- 專案名稱與簡短介紹。
- 正式網站與預覽圖片。
- 核心特色與支援語言。
- Vue 3、Vite、Vue Router、GSAP 等主要技術棧。
- 本機安裝、啟動與 Production Build 指令。
- 精簡且準確的專案結構。
- 環境變數與 API Proxy 設定方式，但不得包含真實密鑰。
- Responsive、Reduced Motion 與無障礙支援說明。
- 圖片、影片、字體、第三方套件與著作權說明。
- 作者與公開聯絡方式。

### 6. 程式與內容清理

- 移除未使用的 Component、Composable、CSS Selector、資料欄位與 import。
- 移除所有公開畫面中的「待補」、「Placeholder」與測試內容。
- 確認路由、slug、圖片與影片路徑無失效或大小寫錯誤。
- 確認 Console 沒有 Error、Vue Warning、404 或媒體載入失敗。
- 確認三語內容沒有缺值、誤用語言或不自然斷句。
- 不為了縮小檔案而破壞既有視覺、動畫、手機橫向操作與 Reduced Motion。

### 7. 效能與部署準備

- 檢查圖片格式、尺寸、Lazy Loading 與 Responsive Source。
- 檢查影片格式、Fast Start、載入時機與檔案大小。
- 評估大型影片是否改用 Git LFS、CDN 或物件儲存服務。
- 設定正式 Base URL、SPA Rewrite、404 Fallback 與 Cache Headers。
- 補齊 `title`、description、Open Graph、favicon 與分享圖片。
- 以部署環境重新確認所有深層路由可直接開啟與重新整理。

### 8. 最終驗收

- [ ] `npm ci` 可在乾淨環境完成。
- [ ] `npm run format:check` 通過。
- [ ] `npm run build` 通過。
- [ ] `git diff --check` 通過。
- [ ] Working Tree 乾淨。
- [ ] 桌機鍵盤、滑鼠、觸控與 Reduced Motion 驗收通過。
- [ ] iOS Safari 與 Android Chrome 手機橫向驗收通過。
- [ ] 中文、英文、日文所有主要路由驗收通過。
- [ ] 主要圖片、影片、外部連結與下載檔案可正常使用。
- [ ] Lighthouse 或同等檢查沒有阻擋發布的重大問題。
- [ ] GitHub 公開內容不含敏感資訊或無權公開的素材。

### 9. 正式部署與版本基線

- 將清理完成的 `main` 推送至 GitHub。
- 連接正式部署平台並設定 Production 環境變數。
- 完成正式網址、SPA Rewrite 與 HTTPS 驗證。
- 建立正式 Release 與 Tag，例如 `v1.0.0`。
- 記錄部署日期、Commit、Tag、正式網址與驗收結果。
- 公開 Repo 前進行最後一次可見檔案與 Git 歷史稽核。

## 完成標準

Phase Final 只有在以下條件全部成立時才能標示為「已完成」：

- 開發資料已有可回復的封存 Branch 與 Tag。
- 公開 `main` 僅保留正式程式、必要資產與乾淨文件。
- 敏感資訊、素材授權、三語內容與外部連結均已確認。
- Production Build、主要瀏覽器與實機驗收全部通過。
- 正式網站已部署，GitHub Release 與 `v1.0.0` 已建立。

## 安全原則

- 未取得使用者確認前，不刪除 Phase 文件、不重寫 Git 歷史、不公開 Repository。
- 封存完成不代表素材自動取得公開授權；授權必須逐項確認。
- Private Repo 轉為 Public 前，必須重新稽核完整 Git 歷史，而不只檢查最新檔案。
