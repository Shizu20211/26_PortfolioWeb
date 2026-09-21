# CHING-YUNG HUANG — 日常微光

Vue 3 + Vite 橫向作品集第一階段。以 Horizontal Exhibition / Digital Editorial 為基調，讓瀏覽者在五個章節中快速理解視覺設計、前端互動與工藝背景。

> 不確定要去哪裡修改？請先看 [作品集修改指南](docs/EDITING_GUIDE.md)，可依照「改文案、專案、圖片、色彩、手機版或互動」快速找到對應檔案。

## 執行方式

```sh
npm install
npm run dev
npm run build
npm run preview
```

## 第一階段範圍

- `00 Home`：姓名、定位、三語自介、能力標籤與 Intro 視覺。
- Home 太陽／月亮是局部日夜彩蛋；只在使用者 Click／Tap 或鍵盤啟用後切換，不影響其他章節。
- `01 Featured`：台北自來水園區教育性網站重構的三個水平子面板；非官方委託。
- `02 Projects`：五項網頁／互動作品入口。
- `03 Artworks`：八類視覺、3D 與工藝作品入口。
- `04 About`：轉職敘事、技能、AI 協作原則與聯絡方式插槽。
- About Footer 提供版權資訊與返回首頁操作。
- 桌面主要操作支援輕量 Magnetic Hover；Reduced Motion 時停用。
- 桌面 Navigation 上方的小貓會追隨水平 Pointer，並約每秒判斷一次跳躍；手機橫向則沿 Navigation 分隔線顯示連續瀏覽進度。
- 中文、英文、日文介面；語言偏好儲存在瀏覽器。
- 桌面支援滾輪逐章、Trackpad 原生水平捲動、鍵盤與導覽列；不接管 Pointer Drag。
- 手機橫向支援左右滑動；手機直向提示旋轉，但仍能縱向閱讀。
- 所有專案詳情目前顯示於首頁 Overlay；待補資料保持製作中標示，不代表完整 Case Study 已完成。

## 檔案與控制區域

### 專案入口與設定

| 檔案                | 控制區域／用途                                                   |
| ------------------- | ---------------------------------------------------------------- |
| `index.html`        | 網站語系、SEO 描述、瀏覽器標題、字型預連線及 Vue 掛載入口。      |
| `package.json`      | Vue、Vite、Router、Prettier 版本與開發、建置、預覽、格式化指令。 |
| `package-lock.json` | 鎖定實際安裝的套件版本，不手動修改。                             |
| `vite.config.js`    | Vite 的 Vue Plugin 與 `@` 對應 `src` 的路徑別名。                |
| `jsconfig.json`     | 編輯器 JavaScript 與路徑提示設定。                               |
| `.prettierrc.json`  | 工程團隊共用的程式碼排版規則。                                   |

### Vue 入口與頁面

| 檔案                                  | 控制區域／用途                                              |
| ------------------------------------- | ----------------------------------------------------------- |
| `src/main.js`                         | 建立 Vue App、載入全域 CSS 與 Vue Router。                  |
| `src/App.vue`                         | 最外層 Router View；路由頁面由此顯示。                      |
| `src/router/index.js`                 | 首頁、Artworks 預留頁及無效網址轉址。                       |
| `src/views/PortfolioOverviewView.vue` | 組合五個橫向章節，連接 Active Section、背景色、導覽及頁碼。 |
| `src/views/ArtworksView.vue`          | Artworks 分類預留頁。                                       |

### 首頁章節

| 檔案                               | 控制區域／用途                                   |
| ---------------------------------- | ------------------------------------------------ |
| `src/sections/HomeSection.vue`     | 姓名定位、主標、自介、能力標籤、作品與履歷入口。 |
| `src/sections/FeaturedSection.vue` | 台北自來水園區精選專案及非官方委託說明。         |
| `src/sections/ProjectsSection.vue` | 其他網站／互動專案的垂直 Hover List。            |
| `src/sections/ArtworksSection.vue` | 八類藝術與工藝作品預覽。                         |
| `src/sections/AboutSection.vue`    | 長版自介、技能、AI 協作原則及聯絡資料插槽。      |

### 共用元件

| 檔案                                        | 控制區域／用途                                      |
| ------------------------------------------- | --------------------------------------------------- |
| `src/components/AppHeader.vue`              | 固定頁首、英文姓名及語言切換器。                    |
| `src/components/LanguageSwitcher.vue`       | 三顆獨立的 `中　EN　日` 純文字按鈕與明確語言切換。  |
| `src/components/SectionNavigation.vue`      | 桌面底部五章導覽及 `aria-current`。                 |
| `src/components/SectionProgress.vue`        | 目前章節頁碼，例如 `01 / 05`。                      |
| `src/components/CatFollower.vue`            | PSD 分層小貓的追隨、視線、步行與定時跳躍。          |
| `src/components/PortfolioFooter.vue`        | About Footer、版權資訊與返回首頁操作。              |
| `src/components/LayeredHeroArtwork.vue`     | Intro 主圖、Pointer 視差、雲朵與花朵裝飾。          |
| `src/components/HomeCelestialToggle.vue`    | Home 太陽／月亮按鈕與夜間星點。                     |
| `src/components/FloatingCloud.vue`          | 使用既有圖片、可設定位置、尺寸與速度的裝飾雲。      |
| `src/components/SectionDecorations.vue`     | Featured 至 About 的少量花朵與雲朵配置。            |
| `src/components/CinematicProjectVisual.vue` | Featured Panel 2／3 的圖片 Placeholder 與展開外觀。 |
| `src/components/ProjectSummaryCard.vue`     | 專案圖片插槽、摘要、Role、Tools 與詳情入口。        |
| `src/components/ProjectDetailOverlay.vue`   | Project 細節 Overlay、內容捲動與返回動畫。          |
| `src/components/ArtworkPreviewCard.vue`     | Artwork 圖片插槽、類型與 Contribution。             |
| `src/components/ScrollHint.vue`             | 首頁橫向捲動提示。                                  |

### 狀態與內容資料

| 檔案                                         | 控制區域／用途                                               |
| -------------------------------------------- | ------------------------------------------------------------ |
| `src/composables/useLanguage.js`             | 三語狀態、localStorage、`html lang` 及輕微淡出淡入。         |
| `src/composables/useActiveSection.js`        | 唯一 Active Section 狀態、IntersectionObserver 與 URL Hash。 |
| `src/composables/useHorizontalNavigation.js` | 滾輪逐章、Trackpad 原生水平輸入與左右鍵。                    |
| `src/composables/useTrackMeasurements.js`    | 集中量測 Section Offset、Track 寬度並監聽版面尺寸改變。      |
| `src/composables/usePointerParallax.js`      | Hero Pointer 座標、RAF 節流與離開時歸零。                    |
| `src/composables/useReducedMotion.js`        | 監聽系統 Reduced Motion 設定。                               |
| `src/composables/useMagneticHover.js`        | 桌面主要操作的 Magnetic Hover、動態元件監聽與清理。          |
| `src/composables/useProjectTransition.js`    | Project temporary visual 與 GSAP Flip 空間轉場。             |
| `src/data/messages.js`                       | 所有介面與長、短自介的中／英／日文案。                       |
| `src/data/sections.js`                       | 五章 ID、編號及背景色。                                      |
| `src/data/projects.js`                       | 專案 slug、三語標題、摘要、標籤、Role 與 Tools。             |
| `src/data/artworks.js`                       | Artwork 類別、三語標題與公開狀態。                           |

### 樣式與素材

| 檔案／資料夾                                         | 控制區域／用途                                    |
| ---------------------------------------------------- | ------------------------------------------------- |
| `src/assets/main.css`                                | 五章版面、元件外觀、動態、桌面及手機響應式設計。  |
| `src/assets/styles/tokens.css`                       | 色彩、字型、圓角、陰影及頁面間距變數。            |
| `src/assets/styles/base.css`                         | Reset、Focus Visible 與 Reduced Motion 基礎規則。 |
| `src/assets/images/intro/intro-main.png`             | 目前 Intro 主視覺。                               |
| `src/assets/cat/`                                    | 小貓八層透明 PNG 與原始 500×500 圖層座標。        |
| `src/assets/images/{featured,projects,artworks}`     | 後續正式作品圖片存放位置。                        |
| `src/assets/illustrations/{hero,clouds,decorations}` | 後續分層插畫、雲朵與裝飾素材位置。                |

正式圖片統一透過 `src/components/ResponsivePortfolioImage.vue` 輸出。元件支援
AVIF／WebP `<source>`、fallback、`srcset`、`sizes`、固定尺寸與三語 Alt；首頁首屏圖片使用
`loading="eager"` 與高載入優先級，其餘作品圖片預設延遲載入。尚未提供的格式不建立假來源。
第二階段目前為保留通過；正式素材加入後須依 `docs/PHASE2_REVIEW.md` 回頭複審。

## 待補素材規格

所有缺圖區都保留實際版面位置，畫面會顯示用途、尺寸與待補狀態。加入正式素材時請沿用以下用途式檔名。

| 檔案                                                                   |    建議尺寸／比例 | 格式與透明需求                 | 用途／狀態                   |
| ---------------------------------------------------------------------- | ----------------: | ------------------------------ | ---------------------------- |
| `hero-background-sky.svg`                                              | 2400 × 1400，12:7 | SVG                            | 遠景天空，待補               |
| `hero-background-mountains.svg`                                        | 2400 × 1400，12:7 | SVG、透明背景                  | 後景山景，待補               |
| `hero-midground-field.svg`                                             | 2400 × 1400，12:7 | SVG、透明背景                  | 中景草原，待補               |
| `hero-foreground-flowers.svg`                                          | 2400 × 1400，12:7 | SVG、透明背景                  | 前景花卉，待補               |
| `hero-composite-artwork.webp`                                          | 2400 × 1400，12:7 | WebP                           | 分層圖載入失敗時的備援，待補 |
| `cloudA.png`                                                           |         370 × 183 | PNG、透明背景                  | Home／Featured 漂浮雲朵      |
| `cloudB.png`                                                           |         372 × 123 | PNG、透明背景                  | Home 漂浮雲朵                |
| `paper-grain-overlay.png`                                              |       1024 × 1024 | PNG、透明且可平鋪              | 紙張顆粒，待補               |
| `featured-water-park-overview.webp`                                    |  1600 × 1000，8:5 | WebP；介面文字需極銳利時用 PNG | Featured 主圖，待補          |
| `project-{slug}-cover.webp`                                            |   1440 × 900，8:5 | WebP／PNG                      | 各專案卡片，待補             |
| `artwork-{name}-preview.webp`                                          |   長邊至少 1600px | WebP／PNG，保留原作比例        | 各作品預覽，待補             |
| `resume-ching-yung-huang.pdf`                                          |                A4 | PDF                            | 履歷，待補                   |
| `icon-email.svg`、`icon-github.svg`、`icon-104.svg`、`icon-resume.svg` |      24 × 24 基準 | SVG、透明背景                  | 聯絡 Icon，待補              |

目前 Intro 使用 `intro-main.png`（2656 × 1768，透明 PNG），直接呈現圖片本身的不規則外緣。

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
