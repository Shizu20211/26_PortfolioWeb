# 作品集修改指南

這份指南用「我想改什麼？」來反查檔案。一般內容更新應優先修改 `src/data`，只有調整畫面結構時才修改 Vue 元件，調整外觀時才修改 CSS。

## 最常修改的地方

| 想修改的內容                      | 修改檔案                                      | 要找的欄位／位置                                    |
| --------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| 中文、英文、日文介面文字          | `src/data/messages.js`                        | `messages['zh-Hant']`、`messages.en`、`messages.ja` |
| 首頁主標與短自介                  | `src/data/messages.js`                        | `homeTitle`、`homeLead`、`homeShort`                |
| About 長版自介                    | `src/data/messages.js`                        | `aboutTitle`、`aboutBody`                           |
| 姓名                              | `src/components/AppHeader.vue`                | `CHING-YUNG HUANG`；頁尾另見 `AboutSection.vue`     |
| 職稱與三個能力標籤                | `src/sections/HomeSection.vue`                | `.role` 與 `.skill-pills`                           |
| 專案名稱、摘要、Role、Tools       | `src/data/projects.js`                        | 對應專案物件的 `title`、`summary`、`role`、`tools`  |
| 專案識別名稱                      | `src/data/projects.js`                        | `slug` 需保持唯一，供 Overlay 與畫面狀態辨識        |
| Artwork 名稱、分類、Contribution  | `src/data/artworks.js`                        | `title`、`type`、`contribution`                     |
| Intro 圖片                        | `src/components/LayeredHeroArtwork.vue`       | `introMain` 匯入路徑                                |
| Intro 圖片替代文字                | `src/components/LayeredHeroArtwork.vue`       | `introAlt` 三語物件                                 |
| 共用響應式圖片規則                | `src/components/ResponsivePortfolioImage.vue` | Source、尺寸、載入優先級及 `currentSrc`             |
| 雲朵圖片、款式與動畫              | `src/components/FloatingCloud.vue`            | `cloudA`、`cloudB`、`variant` 與動畫 props          |
| Home 雲朵位置與速度               | `src/components/LayeredHeroArtwork.vue`       | `<FloatingCloud>` 的位置、尺寸與速度 props          |
| Home 裝飾花朵                     | `src/components/HomeDecorativeFlowers.vue`    | `flowerBlue`、`flowerPink` 與 `.hero-decoration`    |
| 其他章節花朵與雲朵                | `src/components/SectionDecorations.vue`       | `section` 預設配置與 `.section-decoration`          |
| Home 首次進場狀態                 | `src/composables/useHomeIntro.js`             | 單次播放狀態與 1100ms 結束時間                      |
| Home 日夜彩蛋狀態                 | `src/composables/useHomeTheme.js`             | 本次 App 使用期間共用的日／夜狀態                   |
| 太陽、月亮與星點                  | `src/components/HomeCelestialToggle.vue`      | 點擊切換、三語名稱及裝飾狀態                        |
| Featured 三個子面板               | `src/sections/FeaturedSection.vue`            | Overview、Visual、Interaction 與各自子頁碼          |
| Featured 圖片展開 Placeholder     | `src/components/CinematicProjectVisual.vue`   | Panel 2／3 圖片位置與 Reveal 外觀                   |
| Projects Hover List／Flex Gallery | `src/components/ProjectHoverList.vue`         | 桌面專案列、手機橫向 Gallery 與 Preview             |
| Project Detail Overlay            | `src/components/ProjectDetailOverlay.vue`     | 專案細節、右欄捲動、關閉按鈕與焦點控制              |
| Project 空間轉場                  | `src/composables/useProjectTransition.js`     | Temporary visual、GSAP Flip.fit 與清理              |
| Magnetic Hover                    | `src/composables/useMagneticHover.js`         | 僅套用於具有 `data-magnetic` 的主要操作元素。       |
| Navigation 小貓                   | `src/components/NavigationKitten.vue`         | Pointer 追隨、活動範圍、行走及每秒跳躍判斷。        |
| About Footer                      | `src/components/PortfolioFooter.vue`          | 版權資訊與返回首頁按鈕。                            |
| 全域邊界裝飾                      | `src/components/PortfolioDecorations.vue`     | `boundaries` 可追加裝飾，並調整邊界、上下位置與旋轉 |
| Featured 圖片／影片路徑           | `src/data/projects.js`                        | 精選專案的 `media` 物件                             |
| 五章背景色                        | `src/data/sections.js`                        | 每章的 `color`                                      |
| 全站品牌色與字型                  | `src/assets/styles/tokens.css`                | `--color-*`、`--font-*`                             |
| 桌面與手機版面                    | `src/assets/main.css`                         | 對應元件 class 與檔案底部 media queries             |
| 語言切換時間                      | `src/composables/useLanguage.js`              | `setTimeout(..., 120)`                              |
| 語言淡出程度                      | `src/assets/main.css`                         | `.is-language-changing` 的 `opacity`                |
| 網站標題與搜尋描述                | `index.html`                                  | `<title>`、`meta name="description"`                |

## 修改內容的安全順序

### 新增或修改專案

打開 `src/data/projects.js`，找到對應的 `slug`。三語欄位必須同時保留：

```js
{
  slug: 'project-url-name',
  title: {
    'zh-Hant': '中文名稱',
    en: 'English title',
    ja: '日本語タイトル',
  },
  summary: {
    'zh-Hant': '中文摘要',
    en: 'English summary',
    ja: '日本語の概要',
  },
  role: '你的真實角色',
  tools: ['Figma', 'Vue'],
  tags: ['UI/UX', 'Front-end'],
  image: null,
}
```

`slug` 用於首頁 Project Overlay 與畫面狀態辨識，不需另建專案路由。沒有確認的內容維持待補，不要推測填寫。

### 新增或修改 Artwork

打開 `src/data/artworks.js`。每件作品需要唯一 `key`；`title` 使用三語物件。尚未確認 Contribution 時保留 `null`：

```js
{
  key: 'unique-name',
  title: {
    'zh-Hant': '作品名稱',
    en: 'Artwork title',
    ja: '作品タイトル',
  },
  type: 'Printmaking',
  contribution: null,
}
```

### 替換 Intro 圖片

1. 將圖片放入 `src/assets/images/intro/`。
2. 使用用途明確的英文檔名，例如 `hero-composite-artwork.webp`。
3. 在 `src/components/LayeredHeroArtwork.vue` 修改圖片匯入路徑。
4. 同步修改三語 `alt`，描述圖片內容，不要寫「圖片」或檔名。

若另有 AVIF／WebP 或不同寬度版本，請透過 `ResponsivePortfolioImage` 的 `sources`、
`srcset` 與 `sizes` 傳入；原始格式保留為 `src` fallback。所有圖片都要填入實際
`width`、`height`，避免載入時版面跳動。需要做詳情轉場時，從元件公開的
`currentSrc` 取得瀏覽器實際選用的檔案。

目前使用：

```text
src/assets/images/intro/intro-main.png
```

### 加入正式專案圖片

建議把圖片放在：

```text
src/assets/images/featured/
src/assets/images/projects/
src/assets/images/artworks/
```

目前卡片顯示的是 `ProjectSummaryCard.vue` 與 `ArtworkPreviewCard.vue` 中的 Placeholder。正式接圖時，應先在資料物件加入圖片路徑，再由卡片元件依 `image` 是否存在切換 `<img>` 或 Placeholder，避免把每張圖片硬寫進 Section。

Featured 範例目前在 `src/data/projects.js` 檔案頂端匯入：

```js
import waterParkBanner from '@/assets/images/featured/WaterParkBanner.png'
```

並在精選專案的 `media` 填入 `type: 'image'`、`src`、實際寬高及三語替代文字。若改用影片，建議將 MP4／WebM 放進 `src/assets/videos/featured/`，再把同一欄位改為：

```js
import waterParkVideo from '@/assets/videos/featured/water-park.mp4'

media: {
  type: 'video',
  src: waterParkVideo,
  mimeType: 'video/mp4',
  poster: waterParkBanner,
  fallbackText: {
    'zh-Hant': '瀏覽器不支援影片播放。',
    en: 'Your browser does not support video playback.',
    ja: 'お使いのブラウザは動画再生に対応していません。',
  },
}
```

影片元件已支援原生控制列、行動裝置行內播放及預覽封面；正式上線建議優先使用 H.264 MP4，並保留壓縮後的 poster 圖片。

### 修改聯絡方式

聯絡區塊位於 `src/sections/AboutSection.vue`：

- `contacts`：控制 Email、GitHub、104、Résumé 四個項目。
- `.contact-grid`：由 `src/assets/main.css` 控制排列。
- 正式連結加入後，將 Placeholder 容器改為 `<a>`，並提供可理解的連結文字。

## 視覺樣式從哪裡改

### 全站色彩、字型與共用尺寸

修改 `src/assets/styles/tokens.css`。優先改變 CSS Custom Properties，不要把同一顏色散寫在多個元件中。

```css
--color-paper: /* 全站紙張底色 */;
--color-ink: /* 主要文字 */;
--color-ink-teal: /* 品牌互動色 */;
--color-coral: /* 點綴色 */;
--font-display: /* 大標 */;
--font-body: /* 正文 */;
--font-label: /* 編號、標籤 */;
--page-pad: /* 左右頁面留白 */;
```

### 各元件與響應式版面

修改 `src/assets/main.css`，可用下列 class 搜尋：

| 畫面區域     | CSS class                                               |
| ------------ | ------------------------------------------------------- |
| 固定頁首     | `.site-header`、`.identity`                             |
| 語言切換     | `.language-switcher`、`.language-switcher__option`      |
| 五章橫向容器 | `.portfolio-track`、`.portfolio-section`                |
| Home         | `.home-section`、`.hero-copy`、`.layered-hero`          |
| Featured     | `.featured-section`、`.project-card--featured`          |
| Projects     | `.projects-section`、`.project-gallery`                 |
| Artworks     | `.artworks-section`、`.artworks-grid`                   |
| About        | `.about-section`、`.contact-grid`                       |
| 底部導覽     | `.section-navigation`                                   |
| 頁碼         | `.section-progress`                                     |
| 手機橫向     | `@media (max-width: 1180px) and (max-height: 720px)`    |
| 手機直向     | `@media (max-width: 760px) and (orientation: portrait)` |
| 減少動態     | `@media (prefers-reduced-motion: reduce)`               |

## 互動邏輯從哪裡改

| 功能               | 檔案                                          | 注意事項                                                         |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------------- |
| 目前章節判定       | `src/composables/useActiveSection.js`         | 背景、導覽、頁碼與 Hash 共用此狀態，不要另建第二套。             |
| Track 真實尺寸量測 | `src/composables/useTrackMeasurements.js`     | Section Offset、Track Width 與版面變動重算集中於此。             |
| 滾輪與左右鍵       | `src/composables/useHorizontalNavigation.js`  | 滾輪數值會影響手感；桌面不接管 Pointer Drag。                    |
| Featured 圖片視差  | `src/composables/useFeaturedGalleryMotion.js` | GSAP ScrollTrigger 僅綁定 Featured 水平進度。                    |
| Projects 列表切換  | `src/components/ProjectHoverList.vue`         | 中央判定控制吸附；首尾導覽區按鈕或第 1／5 張向外滑動可切換章節。 |
| 語言與轉場         | `src/composables/useLanguage.js`              | 語言值固定為 `zh-Hant`、`en`、`ja`。                             |
| Hero Pointer 視差  | `src/composables/usePointerParallax.js`       | 保留 RAF 節流、Touch 停用及 Pointer Leave 歸零。                 |
| Reduced Motion     | `src/composables/useReducedMotion.js`         | 不要移除，這是無障礙需求。                                       |
| Magnetic Hover     | `src/composables/useMagneticHover.js`         | `data-magnetic` 選取；Touch 與 Reduced Motion 不執行。           |
| Navigation 小貓    | `src/components/NavigationKitten.vue`         | 僅桌面顯示，Listener、RAF、Interval 必須清理。                   |
| 雲朵動畫           | `src/components/FloatingCloud.vue`            | 位置和速度由呼叫端傳入，不在元件內硬寫。                         |

### HomeCelestialToggle 狀態規格

- Anatomy：星點裝飾層、太陽／月亮切換按鈕與圓形天體。
- Data／Props：三語名稱來自 `messages.js`；日夜狀態來自 `useHomeTheme.js`。
- Variants：日間太陽、夜間月亮；沒有尺寸變體。
- Default／Active：日間為預設；夜間以 `aria-pressed="true"` 表示。
- Hover：不切換狀態；只有使用者主動 Click／Tap 才切換。
- Focus-visible：沿用全站 Focus Ring；Enter／Space 提供與 Click 等價操作。
- Touch：Tap 一次切換；不因 Swipe、Pointer Move 或接觸範圍經過而切換。
- Disabled／Loading／Error：N/A；元件不讀取遠端資料，也沒有不可操作狀態。
- Responsive：手機橫向縮小天體並避開文字、作品主體及底部導覽。
- Reduced Motion：保留日夜色彩與資訊，停用天體旋轉和非必要位移。
- Cleanup：沒有 Global Listener、RAF、Interval 或 Timer。

## 每個檔案的角色

### 不常修改的入口檔

- `src/main.js`：啟動 Vue、註冊 Router、載入全域 CSS。
- `src/App.vue`：只承接 `<RouterView>`，通常不用改。
- `vite.config.js`：建置工具設定，除非增加 Plugin，否則不用改。
- `jsconfig.json`：編輯器路徑設定，通常不用改。
- `.prettierrc.json`：格式規則，團隊確認後才調整。

### 不要手動修改

- `package-lock.json`：執行 `npm install` 時自動更新。
- `node_modules/`：套件安裝結果，可由 `npm install` 重建。
- `dist/`：`npm run build` 產生的成品，可隨時重建。
- `.git/`：Git 歷史資料，不應直接編輯。
- `.gitkeep`：用來保留目前仍沒有正式素材的空資料夾。

## 修改後檢查

```sh
npm run format
npm run format:check
npm run build
```

若只更新文字，仍建議執行 Build。若改動橫向互動或手機版面，另用桌面、手機橫向與手機直向實際檢查。
