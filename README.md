#  — 日常

以 Vue 3 與 Vite 製作的三語個人作品集，結合橫向章節導覽、案例研究、藝術作品 Gallery、3D 模型與工藝作品展示。視覺方向以 Digital Editorial 為基調，保留紙張、手繪與展覽式閱讀感。

## 目前狀態

- 首頁包含 `Home`、`Featured`、`Projects`、`Artworks`、`About` 五個章節。
- 提供繁體中文、英文、日文介面，語言偏好儲存在瀏覽器。
- 桌面支援滾輪、Trackpad、鍵盤及底部導覽；手機依方向提供橫向或直向閱讀版面。
- 專案與作品使用 Vue Router 獨立網址，支援直接開啟及重新整理。
- Artworks 已包含版畫與染織裝置、植物染、漆器、金工、3D、場景繪圖、版畫書籍等專屬展示。
- 《短睡珈琲》使用互動翻書形式；中、英文介面提供菜單譯文提示，日文介面保留原始日文頁面。
- About 已連接 Email、GitHub、Instagram 與三語履歷 PDF。
- GitHub Pages 工作流程設定為推送 `main` 後自動建置與部署。

## 技術

- Vue 3
- Vue Router
- Vite
- GSAP
- Three.js
- Prettier

Node.js 版本需求：`^22.18.0 || >=24.12.0`。

## 本機執行

首次安裝：

```sh
npm install
```

啟動開發伺服器：

```sh
npm run dev
```

正式建置與本機預覽：

```sh
npm run build
npm run preview
```

格式化與格式檢查：

```sh
npm run format
npm run format:check
```

目前專案未設定 ESLint，因此沒有 `npm run lint` 指令；提交前至少應執行 `npm run format:check` 與 `npm run build`。

## 手機實機測試

讓開發伺服器接受區域網路連線：

```sh
npm run dev -- --host 0.0.0.0
```

手機與電腦連接同一個 Wi-Fi，再以手機開啟終端顯示的 `Network` 網址，例如：

```text
http://192.168.x.x:5173/
```

實際 IP 由目前網路環境決定，不應將範例位址寫死於程式碼。

## 路由

| 路徑              | 用途                       |
| ----------------- | -------------------------- |
| `/`               | 五章首頁作品集             |
| `/projects/:slug` | 專案 Case Study            |
| `/artworks`       | Artworks 完整列表          |
| `/artworks/:slug` | Artwork 詳情與專屬 Gallery |

無效網址會返回首頁。Router 使用 `import.meta.env.BASE_URL`，可同時支援本機根路徑與 GitHub Pages 子路徑。

## 主要內容位置

| 檔案                                  | 用途                              |
| ------------------------------------- | --------------------------------- |
| `src/data/messages.js`                | 全站介面與自介的中、英、日文案    |
| `src/data/projects.js`                | 專案資料與媒體                    |
| `src/data/frontendWorks.js`           | 前端作品資料                      |
| `src/data/artworks.js`                | 藝術作品、三語內容及 Gallery 資料 |
| `src/data/threeDWorks.js`             | 3D 作品與模型設定                 |
| `src/data/contact.js`                 | 聯絡方式與三語履歷 PDF 路徑       |
| `src/assets/main.css`                 | 全站主要版面與響應式樣式          |
| `src/assets/styles/tokens.css`        | 色彩、字型、間距等設計變數        |
| `src/views/PortfolioOverviewView.vue` | 五章首頁組合與水平導覽            |
| `src/views/ProjectCaseStudyView.vue`  | 專案詳情入口                      |
| `src/views/ArtworkDetailView.vue`     | 作品詳情入口與 Gallery 分派       |

作品詳情依內容使用不同元件，例如：

- `SnoozeCafeCaseStudy.vue`：互動翻書與菜單譯文。
- `SplitArtworkGalleryCaseStudy.vue`：版畫／植物染分割 Gallery。
- `SceneIllustrationGallery.vue`：橫、直幅場景繪圖與視差。
- `LacquerwareCaseStudy.vue`：漆器敘事與製程。
- `MetalworkGallery.vue`：金工作品展示。
- `ThreeDModelViewer.vue`：GLB／Draco 3D 模型。
- `KaohsiungMapCaseStudy.vue`：高雄印章地圖案例。

新增或修改內容前，請先閱讀 [作品集修改指南](docs/EDITING_GUIDE.md)。

## 素材與公開檔案

- 原始圖片與模型位於 `src/assets/`，由 Vite 匯入並產生帶雜湊的正式檔案。
- 不需經 JavaScript 匯入的公開檔案位於 `public/`。
- 三語履歷目前位於 `public/draco/documents/`，連結透過 `import.meta.env.BASE_URL` 產生。
- `dist/` 是建置產物，不應手動修改或提交。

## 部署

GitHub Pages 工作流程位於 `.github/workflows/deploy-pages.yml`：

1. 將已驗證的變更提交並推送至 `main`。
2. GitHub Actions 執行 `npm ci` 與 `npm run build`。
3. 建置時將 `VITE_BASE_PATH` 設為儲存庫名稱。
4. `dist/index.html` 會複製為 `dist/404.html`，讓 Vue Router 深層網址可以恢復。
5. `dist` 上傳並部署至 GitHub Pages。

設定完成後的專案網址為：

`https://shizu20211.github.io/26_PortfolioWeb/`

首次部署需在 GitHub 儲存庫開啟 `Settings → Pages`，將 Source 設為 `GitHub Actions`。完整步驟與疑難排解請見 [部署指南](docs/DEPLOYMENT.md)。

## 維護原則

- 不虛構客戶關係、研究數據、成果或個人職責。
- 新增圖片時保留正確尺寸、比例與替代文字。
- 新增互動時同時處理鍵盤、觸控與 `prefers-reduced-motion`。
- 修改三語內容時同步檢查繁中、英文與日文；原作本身已包含日文時，可依展示需求省略重複譯文。
- 推送前確認 `git diff` 僅包含預期檔案，並完成格式與正式建置檢查。
