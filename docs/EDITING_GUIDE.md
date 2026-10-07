# 作品集修改指南

這份指南用「我想改什麼？」來反查檔案。一般內容更新應優先修改 `src/data`，只有調整畫面結構時才修改 Vue 元件，調整外觀時才修改 CSS。

## 最常修改的地方

| 想修改的內容                     | 修改檔案                                      | 要找的欄位／位置                                    |
| -------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| 中文、英文、日文介面文字         | `src/data/messages.js`                        | `messages['zh-Hant']`、`messages.en`、`messages.ja` |
| 首頁主標與短自介                 | `src/data/messages.js`                        | `homeTitle`、`homeLead`、`homeShort`                |
| About 長版自介                   | `src/data/messages.js`                        | `aboutTitle`、`aboutBody`                           |
| 姓名                             | `src/components/AppHeader.vue`                | `CHING-YUNG HUANG`；頁尾另見 `AboutSection.vue`     |
| 職稱與三個能力標籤               | `src/sections/HomeSection.vue`                | `.role` 與 `.skill-pills`                           |
| 案例頁名稱、媒體與說明           | `src/data/projects.js`                        | 對應完整 Case Study 的資料與 `/projects/:slug`      |
| 前端作品名稱、摘要、Role、Tools  | `src/data/frontendWorks.js`                   | 對應第二章的 `title`、`summary`、`role`、`tools`    |
| 前端作品識別名稱                 | `src/data/frontendWorks.js`                   | `slug` 需保持唯一，供 Overlay 與畫面狀態辨識        |
| Artwork 名稱、分類、Contribution | `src/data/artworks.js`                        | `title`、`type`、`contribution`                     |
| Intro 圖片                       | `src/components/LayeredHeroArtwork.vue`       | `introMain` 匯入路徑                                |
| Intro 圖片替代文字               | `src/components/LayeredHeroArtwork.vue`       | `introAlt` 三語物件                                 |
| 共用響應式圖片規則               | `src/components/ResponsivePortfolioImage.vue` | Source、尺寸、載入優先級及 `currentSrc`             |
| 雲朵圖片、款式與動畫             | `src/components/FloatingCloud.vue`            | `cloudA`、`cloudB`、`variant` 與動畫 props          |
| Home 雲朵位置與速度              | `src/components/LayeredHeroArtwork.vue`       | `<FloatingCloud>` 的位置、尺寸與速度 props          |
| Home 裝飾花朵                    | `src/components/HomeDecorativeFlowers.vue`    | `flowerBlue`、`flowerPink` 與 `.hero-decoration`    |
| 其他章節花朵與雲朵               | `src/components/SectionDecorations.vue`       | `section` 預設配置與 `.section-decoration`          |
| Home 首次進場狀態                | `src/composables/useHomeIntro.js`             | 單次播放狀態與 1100ms 結束時間                      |
| Home 日夜彩蛋狀態                | `src/composables/useHomeTheme.js`             | 本次 App 使用期間共用的日／夜狀態                   |
| 太陽、月亮與星點                 | `src/components/HomeCelestialToggle.vue`      | 點擊切換、三語名稱及裝飾狀態                        |
| Featured 單頁專案入口            | `src/sections/FeaturedSection.vue`            | 標題與 `project-card--featured`                     |
| 臺北自來水園區 Case Study        | `src/views/ProjectCaseStudyView.vue`          | 六段式垂直專案介紹、返回與直向提示                  |
| Case Study Highlights            | `src/components/ProjectHighlightGallery.vue`  | 四項成果的 Hover、Focus 與觸控展開                  |

Case Study 的水感配色、弧線、反光與專屬字體堆疊均限制在 `ProjectCaseStudyView.vue` 的 scoped style。專案目前沒有本機字型檔，頁面沿用全站已載入的 `Klee One`、`LXGW WenKai Mono TC` 與 Noto Serif fallback；若日後加入字型，請使用可供網頁嵌入的 WOFF2 並先確認授權。

Case Study 的鼠標點、延遲外圈、Canvas 路徑粒子、Hero 三層點擊波紋與全頁背景視差由 `src/composables/useCaseStudyPointerEffects.js` 控制。桌機細滑鼠環境才啟用鼠標與粒子；觸控只保留點擊波紋，Reduced Motion 會停用全部動態效果。背景不規則色塊與斷裂同心圓位於 `ProjectCaseStudyView.vue`，共用同一個固定背景層並以兩種低速率位移，不使用外部參考圖片。案例頁掛載時由 `case-study-enter` 提供純透明度的 `640ms` 淡入轉場；請勿在 `.case-study-view` 的進場動畫加入 `transform`，否則會改變固定游標與粒子 Canvas 的定位基準。

Case Study 圖片與影片請放在 `src/assets/images/projects/<project-slug>/` 下，再由 `src/data/projects.js` 引入。`LazyCaseStudyMedia.vue` 負責圖片原生 Lazy Loading、影片進入可視範圍後才載入／播放，以及影片結束停留最後一幀 3 秒後重播；Reduced Motion 下影片不自動播放並顯示控制列。Project Highlights 只會建立目前展開項目的影片，避免四支影片同時載入。臺北自來水園區的影片集中在 `src/assets/images/projects/taipei-water-park/video/`。

媒體在滿版容器內的視覺焦點可於 `projects.js` 的 `media.objectPosition` 調整，格式與 CSS `object-position` 相同。若要移動畫框內的整張圖紙，請使用 `translateX`、`translateY`；負值分別向左、向上移動。1920px 構圖使用上述基本值；小於 1600px 時以 `compactTranslateX/Y: '0%'` 取消位移，小於 860px 的手機橫向則以 `mobileTranslateX/Y: '0%'` 維持原比例。Gallery 目前不使用額外縮放。若要讓圖片或影片可點擊，在同一個 `media` 加上 `href`，`LazyCaseStudyMedia` 會輸出新分頁連結；未提供 `href` 時仍是一般展示媒體。

專案 Role 可使用三語物件，顯示時統一以 `pick(project.role)` 取得目前語言。Design Process 的媒體左右位置由資料欄位 `side: 'right'` 明確控制，不使用項目奇偶數判斷，避免增刪項目後位置意外互換；若項目有 `media`，會以 `LazyCaseStudyMedia` 取代 Placeholder。Project Highlights 使用四項小型橫向風琴，展開後由圖片／影片滿版，說明與個人貢獻覆蓋在左下漸層上；手機橫向改為較矮的垂直風琴，避免媒體與文字重疊。Before／After 同樣採滿版媒體與左下文字，但手機取消錯位重疊。

Project Highlights 底部遮色位於 `ProjectHighlightGallery.vue` 的 `.case-study-gallery__body::after`，可調整 `inset` 改變漸層高度，或調整 `linear-gradient()` 最後一個 `rgb()` 的透明度改變深淺。Before／After 的遮色則位於 `ProjectCaseStudyView.vue` 的 `.case-study-comparison-side::after`。目前三支操作影片的原始檔約為 52–112MB；正式上線前應轉為 Web H.264 MP4 並壓縮，否則雖已延遲載入，首次展開仍會消耗大量流量。

案例頁右側使用深水藍軌道與灰綠色細捲軸。水球 Go Top 採用 `go-top.zip` 的功能規格：桌機捲動超過 541px、手機超過 321px 後顯示；案例頁使用自己的捲動容器，因此由 Vue 讀取 `.case-study-view.scrollTop`，而非直接使用附件的 `window.scrollY`。視覺使用本機 CSS 雙層液面，不依賴外部水波圖片；Reduced Motion 下停止水面動畫。
| Frontend Works Hover List／Flex Gallery | `src/components/FrontendWorkList.vue` | 桌面前端作品列、手機橫向 Gallery 與 Preview |
| Frontend Work Detail Overlay | `src/components/FrontendWorkDetailOverlay.vue` | 前端作品細節、右欄捲動、關閉按鈕與焦點控制 |
| Frontend Work 空間轉場 | `src/composables/useFrontendWorkTransition.js` | Temporary visual、GSAP Flip.fit 與清理 |
| Magnetic Hover | `src/composables/useMagneticHover.js` | 僅套用於具有 `data-magnetic` 的主要操作元素。 |
| Navigation 小貓 | `src/components/CatFollower.vue` | 桌面 Pointer、手機 Track 進度與 5／8 秒閒置狀態。 |
| 小貓分層素材與座標 | `src/assets/cat/` | 八張身體 PNG、四張 Loading PNG 與圖層座標。 |
| About Footer | `src/components/PortfolioFooter.vue` | 版權資訊與返回首頁按鈕。 |
| 全域邊界裝飾 | `src/components/PortfolioDecorations.vue` | `boundaries` 可追加裝飾，並調整邊界、上下位置與旋轉 |
| Featured 圖片／影片路徑 | `src/data/projects.js` | 精選專案的 `media` 物件 |
| 五章背景色 | `src/data/sections.js` | 每章的 `color` |
| 全站品牌色與字型 | `src/assets/styles/tokens.css` | `--color-*`、`--font-*` |
| 桌面與手機版面 | `src/assets/main.css` | 對應元件 class 與檔案底部 media queries |
| 語言切換時間 | `src/composables/useLanguage.js` | `setTimeout(..., 120)` |
| 語言淡出程度 | `src/assets/main.css` | `.is-language-changing` 的 `opacity` |
| 網站標題與搜尋描述 | `index.html` | `<title>`、`meta name="description"` |

## 修改內容的安全順序

## 使用手機實機檢查畫面

手機與電腦必須連接同一個 Wi-Fi。請在專案根目錄啟動可供區域網路存取的開發伺服器：

```bash
npm run dev -- --host
```

終端機會列出類似下方的網址：

```text
Local:   http://localhost:5173/
Network: http://192.168.x.x:5173/
```

在手機瀏覽器輸入 `Network` 那一行的完整網址，不要使用 `localhost`。`localhost` 在手機上代表手機本身，不是開發用電腦。若終端機沒有顯示 Network 網址，可在 macOS 另開終端機查詢目前 Wi-Fi IP：

```bash
ipconfig getifaddr en0
```

取得 IP 後，以 `http://電腦IP:5173/` 開啟，例如 `http://192.168.1.20:5173/`。開發伺服器執行期間，儲存 Vue 或 CSS 檔案後，手機通常會自動更新。

本案手機版以橫向使用為主。檢查時請旋轉手機，並確認：

- 首頁插畫、日月按鈕、標題與裝飾沒有超出 Section。
- 左右滑動 Gallery 時，不會誤帶動全域 Section，也不會誤觸專案連結。
- 上下滑動 Case Study 時，內容、影片與 Go Top 不重疊底部瀏覽器工具列。
- Project Highlights 展開後，媒體不露底、文字可閱讀，也能繼續往上下區段滑動。
- Navigation 分隔線上的貓咪保持等比，點擊空白處或貓咪時可正常跳躍。
- 中文、英文、日文切換後，標題最多兩行且不被裁切。
- 直向模式顯示旋轉提示；旋轉回橫向後頁面能正常使用。

若要檢查正式建置結果，先執行：

```bash
npm run build
npm run preview -- --host
```

再以手機開啟終端機顯示的 `Network` 網址。Production Preview 不會像開發模式一樣即時更新；修改程式後，需要重新執行 `npm run build`。

如果手機無法連線，依序確認：

1. 手機與電腦確實使用同一個 Wi-Fi，且未開啟會隔離區域網路的 VPN。
2. 啟動指令包含 `-- --host`。
3. macOS 防火牆允許 Node／終端機接受連線。
4. 使用終端機當次顯示的 Network 網址與連接埠，不沿用先前網址。
5. iPhone Safari 若仍顯示舊版，可重新整理、關閉分頁再開，或清除該網站資料。

桌面瀏覽器的 Responsive Mode 適合快速調整尺寸，但無法完全模擬手機的觸控慣性、瀏覽器工具列、安全區域與影片播放政策；進入正式上線前仍需至少完成一次手機橫向實機檢查。

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

`slug` 用於專案識別與 `/projects/:slug` 路由。臺北自來水園區的完整內容放在同一物件的 `caseStudy`；其他尚未確認的內容維持待補，不要推測填寫。

臺北自來水園區 Case Study 的六段資料對應如下：

- `caseStudy.heroTitleLines`：三語 Hero 標題斷行，每個陣列項目顯示一行。
- `caseStudy.heroMedia`：案例頁 Hero 專用影片；不影響首頁 Featured 圖片。
- `caseStudy.overview`：專案概述；`body` 使用三語段落陣列，每個項目會輸出一個 `<p>`，不要在文字內輸入「換行」或 `<br>`。
- `caseStudy.beforeAfter`：四組調整前／後；每組可用 `ratio` 統一前後畫框比例，寬幅資訊圖建議使用 `fit: 'contain'` 避免裁切。
- `caseStudy.processTitle`：Design Process 的中／英／日標題。
- `caseStudy.process`：Mind Map、Site Map、Figma 素材位置。
- `caseStudy.highlights`：四項互動成果。
- `caseStudy.reflection`：三語結語段落陣列，每個項目會輸出一個 `<p>`。
- `caseStudy.externalUrl`：實際專案網址。

### 新增或修改 Artwork

打開 `src/data/artworks.js`。每件作品需要唯一 `key` 與英文 `slug`。首頁卡片比例由
`layout`（`portrait`、`square`、`wide`）控制；`published` 控制公開狀態，
`showOnOverview` 控制是否出現在首頁，`overviewOrder` 控制順序。`title` 使用三語物件，
尚未確認 Contribution 時保留 `null`：

```js
{
  key: 'unique-name',
  slug: 'unique-artwork-slug',
  layout: 'square',
  published: true,
  showOnOverview: true,
  overviewOrder: 1,
  focalPosition: '50% 50%',
  parallaxStrength: 0.7,
  title: {
    'zh-Hant': '作品名稱',
    en: 'Artwork title',
    ja: '作品タイトル',
  },
  type: 'Printmaking',
  contribution: null,
}
```

`focalPosition` 對應圖片的 `object-position`，可避免主體被裁切；
`parallaxStrength` 建議使用 `0`～`1`，不適合視差的作品可設為 `0`。

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

聯絡資料位於 `src/data/contact.js`，畫面結構位於 `src/sections/AboutSection.vue`：

- `contactItems`：控制 Email、GitHub、關於我、Instagram 四個項目與 WebP Icon 路徑。
- `aboutDocuments`：依 `zh-Hant`、`en`、`ja` 對應三份簡歷 PDF。
- `.contact-grid`：由 `src/assets/main.css` 控制排列。
- `.about-content`：桌面使用 3:2 欄寬、手機橫向使用 1:1；僅桌面允許內容安全捲動。
- 手機橫向預定使用三語精簡版自介，不以內層捲動容納長文。
- 手繪 Icon 放在 `src/assets/icons/contact/`，使用 97 × 97 透明 WebP，網站以 24 × 24 顯示。
- 正式連結填入後會自動改用 `<a>`；未提供時維持 Placeholder。

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

| 畫面區域       | CSS class                                               |
| -------------- | ------------------------------------------------------- |
| 固定頁首       | `.site-header`、`.identity`                             |
| 語言切換       | `.language-switcher`、`.language-switcher__option`      |
| 五章橫向容器   | `.portfolio-track`、`.portfolio-section`                |
| Home           | `.home-section`、`.hero-copy`、`.layered-hero`          |
| Featured       | `.featured-section`、`.project-card--featured`          |
| Frontend Works | `.frontend-works-section`、`.frontend-work-gallery`     |
| Artworks       | `.artworks-section`、`.artworks-grid`                   |
| About          | `.about-section`、`.contact-grid`                       |
| 底部導覽       | `.section-navigation`                                   |
| 頁碼           | `.section-progress`                                     |
| 手機橫向       | `@media (max-width: 1180px) and (max-height: 720px)`    |
| 手機直向       | `@media (max-width: 760px) and (orientation: portrait)` |
| 減少動態       | `@media (prefers-reduced-motion: reduce)`               |

## 互動邏輯從哪裡改

| 功能                    | 檔案                                         | 注意事項                                                       |
| ----------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| 目前章節判定            | `src/composables/useActiveSection.js`        | 背景、導覽、頁碼與 Hash 共用此狀態，不要另建第二套。           |
| Track 真實尺寸量測      | `src/composables/useTrackMeasurements.js`    | Section Offset、Track Width 與版面變動重算集中於此。           |
| 滾輪與左右鍵            | `src/composables/useHorizontalNavigation.js` | 滾輪數值會影響手感；桌面不接管 Pointer Drag。                  |
| Artwork 長廊動畫        | `src/composables/useArtworkArchiveMotion.js` | 逐張 Reveal、局部視差與長廊共享小標。                          |
| Frontend Works 列表切換 | `src/components/FrontendWorkList.vue`        | 中央判定控制吸附；首尾導覽區按鈕或首尾卡向外滑動可切換章節。   |
| 語言與轉場              | `src/composables/useLanguage.js`             | 語言值固定為 `zh-Hant`、`en`、`ja`。                           |
| Hero Pointer 視差       | `src/composables/usePointerParallax.js`      | 保留 RAF 節流、Touch 停用及 Pointer Leave 歸零。               |
| Reduced Motion          | `src/composables/useReducedMotion.js`        | 不要移除，這是無障礙需求。                                     |
| Magnetic Hover          | `src/composables/useMagneticHover.js`        | `data-magnetic` 選取；Touch 與 Reduced Motion 不執行。         |
| Navigation 小貓         | `src/components/CatFollower.vue`             | 桌面跟隨 Pointer；手機橫向使用 `trackProgress`，事件必須清理。 |

Loading 狀態的主要微調值也位於 `CatFollower.vue`：桌面閒置 `5000ms`、手機閒置
`8000ms`、`.cat-loading-state__cat` 的等比尺寸、`.cat-loading-spinner` 的位置與大小，
以及 `cat-loading-fade` 的逐點淡入速度。

手機 Tap 跳躍使用 `TAP_MAX_DISTANCE` 與 `TAP_MAX_DURATION` 區分點擊和 Swipe；手機跳躍
高度由 `.cat-follower-mover` 的 `--cat-jump-height` 控制。互動元件與 Gallery 會排除，
避免點擊操作時誤觸貓咪跳躍。
| 雲朵動畫 | `src/components/FloatingCloud.vue` | 位置和速度由呼叫端傳入，不在元件內硬寫。 |

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
