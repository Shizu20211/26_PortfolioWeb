# Codex 執行指令：第一階段橫向作品集（最終增量修改版）

## 執行摘要

現有 Vue 3 + Vite 橫向作品集第一階段已完成基礎建置。本輪工作不是重建網站，而是在現有專案內抽取參考頁的視覺語言與微互動，完成「橫向作品大綱與簡介」的視覺強化，並預留後續分類頁及直式 Case Study 的延伸位置。

Codex 執行時必須保留：

- Vue 3 架構與 Vite 設定。
- 現有 Vue Router、路由與 Placeholder 頁面。
- 現有 View、Section、Component 與 Composable 分工。
- 現有作品資料內容、slug 與素材路徑。
- 現有中／英／日介面規劃與資料結構。
- 現有 Responsive、橫向操作和 Semantic HTML 基礎。

不得另建 Demo、不得把參考 HTML 整份貼進 Vue、不得將功能集中回單一 `App.vue`。參考碼只能用來辨識版面規則、動態節奏和互動狀態；實作需拆回既有 Vue 元件、Composable 和 CSS 架構。

本文件最後的「⑦ 已確認增量修改執行規格」為最新決策；若與前文舊規劃有差異，以⑦為準。

不得虛構專案成果、使用者研究、測試人數、客戶關係、個人職責或圖片來源。缺少資料時建立可替換 Placeholder，以用途命名，並在 README 集中列出。

已確認條件：

- 移除 Tailwind，使用原生 CSS 與 CSS Custom Properties。
- 中文預設；第一階段提供完整中／英／日介面和專案摘要。
- 使用 Google Fonts並提供系統字體 fallback。
- 保留使用者提出的 FloatingCloud 試作效果。
- 先保留山景、草原、花海等分層視覺素材插槽，不代替使用者決定最終插畫。
- 所有素材插槽註明建議的 `.svg`、`.png`或`.webp`格式。
- 降低五章背景色差異，補充中性深色與次要文字色。
- 首頁主標暫定「日常微光」。

---

# ① 目標

## 作品集定位

使用者具有平面設計、VTuber背景接案、Illustrator、Photoshop、Maya及基礎影音能力，並完成UI/UX與前端職訓，可使用Figma、Vue、HTML5、CSS與JavaScript，也能閱讀、驗證及修改AI輔助產出的程式。

網站應傳達：

> 具備美術與平面設計基礎，能將視覺概念轉譯為UI/UX與互動網頁原型的Creative Front-end Designer／互動體驗設計人才。

## 第一階段成果

完成五個可橫向瀏覽的大章節：

```text
00 Home
01 Featured
02 Projects
03 Artworks
04 About
```

即使招聘者不點入詳情，也能在1–2分鐘內理解定位、代表專案、Vue／Figma／互動能力、美術基礎、經歷與聯絡方式。

## 視覺目標

- 保留Horizontal Exhibition／Digital Editorial基調。
- 一個100vw Section對應一個主題。
- 大圖、留白、短文與清楚資訊層級。
- 柔和紙張色、手繪／蠟筆質感和少量陰影。
- 分層插畫、Pointer視差與FloatingCloud。
- 真實作品截圖的視覺權重高於裝飾插畫。

本階段不定稿「窗景／水路」或「山景／花園」的最終美術主題。將背景、前中後景和裝飾拆成可替換素材層，日後只需更換檔案。

## 後續製作

第一階段完成後仍需：

- Phase 2：臺北自來水園區、貪吃蛇迷宮、Vue旅遊網站、台灣馬拉松Figma重構的完整Case Study。
- Phase 3：奇幻訂房、訂餐、互動練習、VTuber、插畫、平面、地圖、3D與工藝分類詳情。
- Phase 4：完整直式頁面、Gallery、燈箱、Before／After、頁面轉場、測試、SEO與效能深化。

第一階段僅預留入口，不得把Placeholder宣稱為完成成果。

---

# ② 功能模組

## 本輪增量修改邊界

以現有 README 所列結構為準，不重新命名或搬移既有核心檔案。`App.vue` 繼續只負責最外層 `RouterView`；首頁組裝仍由 `PortfolioOverviewView.vue` 負責；各視覺效果放在對應 Section／Component，跨區共用狀態才抽成 Composable。

執行前先盤點實際原始碼並列出「保留／修改／新增」檔案。若 README 與實際專案不一致，以實際原始碼為準，但不得擅自刪除內容或改變路由。

## 參考頁視覺系統的抽取原則

參考頁的核心是直向頁面、Lenis 與 GSAP ScrollTrigger；目前作品集的核心是橫向 Section Track。不得直接搬運參考頁的全域捲動控制、DOM 查詢、Loader 或 Body Class 切換。所有動畫必須讀取既有 `activeSectionIndex` 或橫向 Track 的局部進度。

### 效果映射表

| 編號／效果 | 首頁處理 | 建議落點 | 實作方式 | 行動版／降級 |
|---|---|---|---|---|
| ⑦ Creative Typography | 本輪實作 | `HomeSection.vue` 後段或 `AboutSection.vue` 的定位宣言；新增 `CreativeTypography.vue` | 文案由三語資料陣列產生，不以 `innerHTML` 切字；文字片段與穿插圖片由資料描述；以 Section 局部水平進度逐段提高 opacity | 不逐字 Scrub，改為進入畫面後分組 Reveal；圖片保持可讀比例 |
| ⑧ Cinematic Expand | 本輪試作 | `FeaturedSection.vue`；新增 `CinematicProjectVisual.vue` | 精選專案主圖由膠囊／拱形框逐步擴張；用 CSS 變數控制 `transform`、`border-radius` 與遮罩，不改寫實際圖片路徑 | `<=1024px` 改為一次性 Reveal；不 Pin、不鎖住頁面、不強制滿螢幕 |
| ⑨ Horizontal Gallery | 首頁不直接套用；保留後續 | Phase 2 的直式 Case Study Gallery | 外層首頁已水平捲動，禁止再建立同方向巢狀 ScrollTrigger。首頁 Projects 沿用既有主 Track；未來直式詳情頁再做「垂直捲動→水平 Gallery」 | 平板／手機回到直式卡片或 Snap Gallery |
| ⑩ Hover List | 本輪實作 | `ProjectsSection.vue` 或 `ArtworksSection.vue`；新增 `HoverPreviewList.vue`、`PointerPreview.vue` | 清單由既有 projects／artworks data 產生；滑鼠移入時顯示對應現有封面；Pointer Move 以 RAF 節流；鍵盤 Focus 顯示固定預覽 | `hover:none` 或 `<=1024px` 顯示每列內嵌縮圖，不啟動跟隨游標 |
| ⑪ Marquee | 本輪實作但只使用一次 | `ArtworksSection.vue` 與 `AboutSection.vue` 之間，新增 `PortfolioMarquee.vue` | CSS 動畫或既有 Track 進度驅動；三語短句由 messages data 提供；複製列 `aria-hidden="true"` | Reduced Motion 顯示靜態單列；避免過快與無限佔用 GPU |
| ⑫ Masonry Gallery | 首頁只做靜態縮圖摘要；完整效果後續 | `ArtworksView.vue`／Phase 3 分類頁；新增 `ArtworkMasonry.vue` | CSS Grid 三欄保留作品原比例；差速 Parallax 僅在直式詳情頁、桌面且元素可見時運作 | 平板兩欄、手機單欄；停用差速 Parallax |
| ⑬ Ending／Footer | 本輪實作 | `AboutSection.vue` 末端；新增或整理 `PortfolioFooter.vue` | 結尾定位句、聯絡入口、版權與「回到起點」；回到起點呼叫既有水平導覽 API 並同步 Active Section／Hash | 保留原生按鈕與 Focus；Reduced Motion 使用立即定位 |
| ⑭ Responsive | 本輪整合，不覆寫既有規則 | 既有 responsive CSS 與各新元件 scoped style | 在目前斷點上追加能力查詢：`hover`、`pointer`、方向與 Reduced Motion；不只使用 `innerWidth` 判斷 | 手機橫向維持左右滑動；直向維持可上下閱讀，不設全頁鎖定 |
| ⑮ Global Animation | 本輪建立輕量共用層 | 新增 `useElementReveal.js`、`useSectionProgress.js`；必要時新增 `motion.css` | Fade、Mask、局部 Parallax 共用 Observer 與 RAF；Theme 繼續使用唯一 `activeSectionIndex`；元件自行清理事件 | Reduced Motion 直接顯示完成狀態；離開 Viewport 停止更新 |

參考原始碼定位：⑦ HTML 274–330／CSS 135–147／JS 552–556；⑧ HTML 332–342／CSS 149–169／JS 558–568；⑨ HTML 344–381／CSS 171–176／JS 570–585；⑩ HTML 383–419／CSS 178–198／JS 587–626；⑪ HTML 421–427／CSS 200–204／JS 628–632；⑫ HTML 429–452／CSS 206–212／JS 634–642；⑬ HTML 454–464；⑭ CSS 214–232；⑮ JS 645–690。行號僅供辨識效果，不代表允許複製整段程式。

### 不移植的參考頁內容

- 不加入 Lenis，避免接管既有橫向滾輪、Trackpad、拖曳與手機 Swipe。
- 不複製全域 `document.querySelectorAll()` 初始化流程；Vue 元件使用 `ref`、Props、Emits 與生命週期。
- 不使用 `innerHTML` 拆字，避免破壞三語、輔助科技與 Vue 更新。
- 不加入參考頁 Loader、全站自訂 Cursor、Liquid Filter 或 Unsplash 圖片。
- 不以 `body.className = ...` 切換主題，避免覆蓋既有 Class；沿用 `activeSectionIndex` 與 CSS Custom Properties。
- 不以動畫 `width`／`height` 作為 Cinematic Expand 的主要方案；優先使用 `transform`、`clip-path`／`mask` 與 CSS 變數，降低 Layout 重算。

## 新增檔案建議

```text
src/
├── components/
│   ├── CreativeTypography.vue
│   ├── CinematicProjectVisual.vue
│   ├── HoverPreviewList.vue
│   ├── PointerPreview.vue
│   ├── PortfolioMarquee.vue
│   └── PortfolioFooter.vue
├── composables/
│   ├── useElementReveal.js
│   └── useSectionProgress.js
└── assets/styles/
    └── motion.css
```

實際建立前先確認是否已有同用途元件；有則擴充既有檔案，不建立重複版本。元件名稱依用途命名，禁止 `Effect7.vue`、`NewGallery.vue` 或 `test-animation.js`。

## 分段執行順序

1. **P0／保護現況**：安裝依賴、執行目前 Build、紀錄路由與五章操作基準；盤點實際檔案和未提交變更。
2. **P1／共用動態基礎**：建立 Section 局部進度、Reveal／Mask、Reduced Motion 整合；不得先改內容資料。
3. **P2／首頁核心效果**：依序加入 Creative Typography、Featured Cinematic Expand、Hover List、單一 Marquee、Ending／Footer。
4. **P3／Responsive 與操作衝突測試**：驗證滾輪、Trackpad、鍵盤、導航列、手機橫向 Swipe 和手機直向閱讀，並確認桌面 Pointer Drag 已完整移除。
5. **P4／後續入口**：首頁 Masonry 只呈現靜態摘要；在 README 註明 Horizontal Gallery 與完整 Masonry Parallax 將於直式 Case Study／Artworks 分類頁製作。

每一階段需先 Build 成功再進下一階段；若某效果破壞既有橫向導航，先停用該效果並回報，不得改寫整套導航來配合參考碼。

## 既有結構（必須保留）

```text
src/
├── assets/
│   ├── images/{intro,featured,projects,artworks}/
│   ├── illustrations/{hero,clouds,decorations}/
│   └── styles/{tokens,base,layout,utilities,transitions}.css
├── components/
│   ├── AppHeader.vue
│   ├── LanguageSwitcher.vue
│   ├── HorizontalPortfolioTrack.vue
│   ├── SectionNavigation.vue
│   ├── SectionProgress.vue
│   ├── LayeredHeroArtwork.vue
│   ├── FloatingCloud.vue
│   ├── ProjectSummaryCard.vue
│   ├── ArtworkPreviewCard.vue
│   ├── ScrollHint.vue
│   └── PointerFollower.vue（若實際專案尚未存在，不因本輪強制建立）
├── sections/
│   ├── HomeSection.vue
│   ├── FeaturedSection.vue
│   ├── ProjectsSection.vue
│   ├── ArtworksSection.vue
│   └── AboutSection.vue
├── views/{PortfolioOverviewView,ProjectPlaceholderView}.vue
├── composables/
│   ├── useHorizontalNavigation.js
│   ├── useActiveSection.js
│   ├── useLanguage.js
│   ├── usePointerParallax.js
│   └── useReducedMotion.js
├── data/{sections,projects,artworks,messages}.js
├── router/index.js
├── App.vue
└── main.js
```

禁止使用`test.vue`、`new.js`、`img1.png`或`final2.svg`等無用途名稱。

## Design Tokens

移除`tailwind.config.js`，建立`src/assets/styles/tokens.css`：

```css
:root {
  --color-paper: #fff7ea;
  --color-surface: #fffaf1;
  --color-ink: #29303f;
  --color-ink-teal: #3e6e64;
  --color-muted: #68716f;
  --color-line: rgb(62 110 100 / 22%);

  --color-home: #f3e8d9;
  --color-featured: #d8dec6;
  --color-projects: #dce9e7;
  --color-artworks: #f7e2dc;
  --color-about: #fff7ea;

  --color-petal-yellow: #f3de8e;
  --color-water: #78aaa5;
  --color-coral: #d98288;
  --color-sand: #c4a47d;

  --font-display: "LXGW WenKai Mono TC", "Noto Serif TC", "Noto Serif JP", serif;
  --font-body: "Noto Sans TC", "Noto Sans JP", "PingFang TC", "Microsoft JhengHei", sans-serif;
  --font-hand: "Klee One", "Yomogi", cursive;
  --font-label: "Space Mono", monospace;

  --radius-sm: .75rem;
  --radius-md: 1.5rem;
  --radius-lg: 2rem;
  --radius-pill: 999px;
  --radius-organic: 42% 58% 65% 35% / 45% 45% 55% 55%;

  --shadow-paper: 4px 6px 0 rgb(62 110 100 / 15%);
  --shadow-paper-hover: 5px 8px 0 rgb(62 110 100 / 22%);
  --ease-standard: cubic-bezier(.4, 0, .2, 1);
  --ease-soft: cubic-bezier(.22, 1, .36, 1);
  --duration-fast: 180ms;
  --duration-normal: 420ms;
  --duration-slow: 800ms;
}
```

## Google Fonts

載入 LXGW WenKai Mono TC、Noto Serif TC／JP、Noto Sans TC／JP、Klee One、Yomogi及Space Mono。使用`preconnect`並只載入實際需要的字重。

- 首頁主標與 Section Heading：LXGW WenKai Mono TC；fallback 為 Noto Serif TC／JP。
- 正文：Noto Sans TC／JP。
- 短手寫註記：Klee One／Yomogi。
- 日期、工具、標籤：Space Mono。

Google Fonts失效時仍須可閱讀。Klee One與Yomogi不得用於長篇正文。

## Active Section與背景

只保留一個`activeSectionIndex`，由`useActiveSection.js`管理並提供給背景、Navigation、頁碼及`aria-current`。不要用兩套邏輯分別計算。

```css
.portfolio-app {
  background-color: var(--active-section-color, var(--color-home));
  transition: background-color var(--duration-slow) var(--ease-standard);
}
```

這是章節切換淡化，不是連續RGB插值。

## Home

包含姓名、職稱、主標「日常微光」、中英日摘要、三個能力標籤、View Selected Work、Download Résumé及分層主視覺。

素材插槽：

| 圖層 | 檔名 | 格式 | 用途 |
|---|---|---|---|
| 遠景天空 | `hero-background-sky.svg` | SVG | 可縮放色塊 |
| 後景山景 | `hero-background-mountains.svg` | SVG | 低位移視差 |
| 中景草原 | `hero-midground-field.svg` | SVG | 中位移視差 |
| 前景花卉 | `hero-foreground-flowers.svg` | SVG | 高位移視差 |
| 紙張顆粒 | `paper-grain-overlay.png` | PNG | 透明可平鋪Texture |
| 合成備援圖 | `hero-composite-artwork.webp` | WebP | 不使用分層時顯示 |

`LayeredHeroArtwork.vue`須使用元件自身範圍計算Pointer中心，以requestAnimationFrame節流並透過CSS變數更新。Pointer Leave回到中心；Reduced Motion及觸控裝置停用視差。

## FloatingCloud

保留使用者提出的試作效果，檔名與用途：

| 項目 | 檔名／形式 |
|---|---|
| 小型雲 | `cloud-soft-small.svg` |
| 寬形雲 | `cloud-soft-wide.svg` |
| 元件 | `FloatingCloud.vue` |

Props至少提供`top`、`left`、`size`、`color`、`duration`、`delay`與`opacity`。衍生Style使用`computed()`；`pointer-events:none`；只做緩慢`translateY`，Reduced Motion停止。由各Section資料設定數量與位置，不硬寫在元件內。第一階段依試作畫面配置，驗收時只因遮蔽或可讀性調整。

## Cards

Project Card保持真實截圖銳利。SVG Displacement Filter只能套在獨立裝飾層，不得套在正文、Focus Outline或作品圖片。

```css
.project-summary-card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-paper);
  transition: transform var(--duration-normal) var(--ease-soft),
              box-shadow var(--duration-normal) var(--ease-soft);
}
.project-summary-card:hover,
.project-summary-card:focus-within {
  transform: translateY(-5px);
  box-shadow: var(--shadow-paper-hover);
}
```

每張卡顯示三語標題和摘要、Role、最多三個能力標籤、最多四個工具、真實截圖、連結狀態及View Project。

## 內容配置

- Featured：臺北自來水園區網站重構；註明職訓教育性重構、非官方委託。
- Projects主卡：貪吃蛇迷宮、Vue旅遊網站、台灣馬拉松Figma重構。
- Projects次卡：奇幻空想訂房；高雄地圖集章移入 Projects 並預留後續電腦互動完整化。
- Artworks：預留1–8件首頁策展作品，包括VTuber背景、自來水插畫與地圖、訂餐網站 UI Visual Exercise、平面、Maya、染布、版畫或書籍。
- About：轉職脈絡、技能分層、AI協作原則、履歷、GitHub、104及Email。

## 導覽

桌面：滾輪一次切換一個主面板、Trackpad原生水平、左右鍵、底部Navigation與URL Hash；移除 Pointer Drag 與全頁 `grab`／`grabbing` 游標。

手機橫向：左右Swipe、一屏一章、顯示頁碼、可少量露出下一頁、點擊View Project進入詳情。

手機直向：提示橫向效果較完整，但仍能繼續縱向閱讀，不得隱藏整站。

## 三語系統

語言為`zh-Hant`、`en`、`ja`；中文預設。第一階段翻譯範圍：

- 導覽、按鈕與狀態。
- Home全部文字。
- Featured摘要。
- Project標題與摘要。
- Artwork標題、類型與Contribution。
- About簡介與技能分類。
- Project Placeholder。

切換器顯示`中／EN／日`；保持目前Section；以localStorage保存；同步更新`html lang`、ARIA Label與Alt。翻譯集中在`messages.js`。

## 路由預留

```text
/
/projects/taipei-water-park
/projects/snake-maze
/projects/vue-travel
/projects/marathon-redesign
/projects/fantasy-booking
/projects/food-ordering
/artworks
/artworks/:slug
```

詳情可共用`ProjectPlaceholderView.vue`，清楚顯示製作中。

---

# ③ 工具限制

## 必須使用

- Vue 3、Vite、Vue Router、Composition API。
- Semantic HTML5。
- 原生CSS與CSS Custom Properties。
- Pointer Events、IntersectionObserver、requestAnimationFrame。

## 禁止／第一階段不使用

- Tailwind、Bootstrap或其他UI Framework。
- Pinia、Nuxt、後端、資料庫或CMS。
- Three.js及全頁Canvas粒子。
- 未經確認的AI生成插畫。
- 多個大型動畫套件。
- 單一巨型Vue元件。

Creative Typography、Cinematic Expand、Hover List、Marquee、Reveal、Mask、Kitten、Magnetic Hover 和局部 Parallax 優先以 Vue 狀態、IntersectionObserver、Pointer Events、requestAnimationFrame、CSS Transition／Animation 和 CSS Custom Properties 完成。允許為「Artwork Card → Artwork Detail Route」圖片銜接安裝 `gsap` 並只使用 GSAP Flip；不得加入 Lenis，也不得用 GSAP 接管全站捲動或建立全站 Stretching Cursor。

程式要求：事件於Unmount移除；Pointer Move節流；離開Viewport的持續動畫停用或降載；重複內容資料驅動；不散落主題Inline Style。

---

# ④ 資料來源與去向

## 由使用者提供

- 姓名與英文拼寫。
- 中英日介紹最終文案。
- 履歷、Email、GitHub、104。
- Hero正式分層插畫。
- 專案截圖與作品圖片。
- Figma、Live Demo、GitHub連結。
- 真實Role、Tools及完成狀態。
- VTuber委託公開範圍與圖片權利資訊。

## 不足資料

不得補成真實成果。建立用途式Placeholder並在README列出檔名、格式、建議尺寸／比例、透明背景需求與狀態。

## 資料流

```text
使用者素材／文案
→ assets與data用途式整理
→ Vue元件讀取
→ 橫向總覽
→ Placeholder路由
→ 後續Case Study沿用slug與資料
```

圖片不可傳至第三方生成服務。參考網站只供視覺與互動研究，不下載或複製其角色、圖像與程式。

---

# ⑤ 外部依賴

必要 NPM 依賴沿用現有 `vue`、`vue-router`、`vite`，不得為參考頁效果重裝或升級整個專案。Artwork Route 圖片銜接允許加入鎖定版本的 `gsap` 並只使用 Flip Plugin。使用現有 lockfile；不以浮動 CDN 載入 Vue、GSAP 或其他程式庫，不加入 Lenis。

Google Fonts外部來源：`fonts.googleapis.com`與`fonts.gstatic.com`。

建議字重：

- Noto Serif TC／JP：400、600。
- Noto Sans TC／JP：400、500。
- Klee One：400、600。
- Yomogi：400。
- Space Mono：400。

若載入過重，優先保留Noto Serif TC／JP、Noto Sans TC／JP與Space Mono；只有實際使用時才載入Klee One和Yomogi。

所有正式圖片由使用者提供；不使用未授權Stock圖片。

---

# ⑥ 驗收標準

## 功能

- [ ] 修改前與修改後均可 Production Build，且既有路由數量與 slug 未減少。
- [ ] 沒有新建第二個 Vue Demo，也沒有把參考 HTML 貼入單一 Vue 元件。
- [ ] `App.vue` 維持外層 Router View 職責，首頁 Section／Component 分工未被集中化。
- [ ] 既有作品資料、三語資料與圖片路徑保持資料驅動，未複製成元件內硬編碼內容。
- [ ] 安裝、開發啟動與Production Build成功。
- [ ] 五個橫向Section均可到達。
- [ ] 桌面滾輪一次最多切換一章。
- [ ] Trackpad、Navigation與鍵盤可用；桌面 Pointer Drag 與全頁 `grab`／`grabbing` 已移除。
- [ ] Active Section、背景、頁碼與aria-current同步。
- [ ] 手機橫向可左右Swipe。
- [ ] 手機直向可閱讀且不被提示封鎖。
- [ ] 所有Placeholder路由可開啟。

## 三語

- [ ] `中／EN／日`切換可用。
- [ ] 完整介面與摘要均有三語。
- [ ] 切換後保持目前Section。
- [ ] 重新整理後保留偏好。
- [ ] `html lang`、ARIA Label與Alt同步。
- [ ] 無Lorem Ipsum或未處理按鈕。

## 視覺與素材

- [ ] 五章背景色差異降低。
- [ ] 正文使用中性Ink，品牌互動使用Ink Teal。
- [ ] Hero四層素材插槽與WebP備援可替換。
- [ ] 所有素材使用用途式檔名並標示格式。
- [ ] FloatingCloud完成，位置、大小、速度可配置。
- [ ] 雲朵不遮蔽標題、作品、CTA與導覽。
- [ ] Project圖片與文字不受Filter扭曲。
- [ ] 真實作品權重高於裝飾素材。

## 動態

- [ ] Creative Typography 可依橫向 Section 局部進度呈現；切換三語後不殘留舊字節點。
- [ ] Cinematic Expand 不使用 Pin、不攔截整頁操作，且不造成明顯 Layout Shift。
- [ ] Hover List 在滑鼠、鍵盤和觸控三種操作下都能取得相同作品資訊。
- [ ] Marquee 複製內容不被螢幕閱讀器重複朗讀。
- [ ] 首頁沒有同方向的巢狀水平捲動區。
- [ ] Theme、Navigation、頁碼仍共用唯一 Active Section 狀態。
- [ ] Hero Pointer以元件範圍計算並使用RAF節流。
- [ ] Pointer Leave回到中心。
- [ ] FloatingCloud只有緩慢懸浮，不加入劇烈Bounce。
- [ ] 動畫不產生異常捲動條。
- [ ] Reduced Motion停止視差、懸浮和非必要平滑動畫。
- [ ] 觸控裝置不依賴Hover取得資訊。

## 無障礙

- [ ] 首頁只有一個h1，每章有h2。
- [ ] 使用header、nav、main、section、article與footer。
- [ ] Skip Link有效。
- [ ] 所有互動可Tab操作且Focus Visible清楚。
- [ ] 裝飾圖使用空Alt或aria-hidden。
- [ ] 不以顏色作為唯一狀態提示。

## 內容誠實性

- [ ] 自來水園區標示教育性重構／非官方委託。
- [ ] Figma-only作品不宣稱已完成前端。
- [ ] 團隊作品區分個人與他人工作。
- [ ] AI協作不宣稱為完全手寫程式。
- [ ] 未確認權利的委託素材不公開。
- [ ] 無虛構數據、回饋或成果。

## README與交付

- [ ] README包含安裝、開發和Build方式。
- [ ] README說明元件、資料結構、第一階段範圍與待補素材。
- [ ] README列出Phase 2–4後續工作。
- [ ] Codex回報新增、保留、改寫的檔案及測試結果。
- [ ] Codex列出仍待使用者提供的資料。
- [ ] README 明列 ⑨ Horizontal Gallery 與 ⑫ 完整 Masonry Parallax 屬後續直式 Case Study／分類頁工作。

---

## 最終範圍提醒

第一階段完成的是「已建置橫向作品集的增量視覺強化與真實作品摘要」，不是另一個 Demo，也不是完整作品集終稿。後續分類及 Case Study 必須沿用同一套資料、路由、三語及視覺元件繼續製作，不應推翻第一階段架構。完整 Horizontal Gallery、Masonry Parallax、Gallery、燈箱、Before／After 與長篇敘事，留在各分類及直式 Case Study 製作。

---

# ⑦ 已確認增量修改執行規格

## 7.1 執行方式與保護條件

這是既有 Vue 專案的增量修改，不是新建範例。開始前：

1. 閱讀實際 `package.json`、Router、Overview View、五個 Section、相關 Components、Composables、Data 與 CSS。
2. 執行目前專案的 Production Build，記錄修改前基準。
3. 列出預計「保留／修改／新增」檔案；有同用途檔案時擴充既有檔案，不建立第二套。
4. 保留所有既有內容、slug、圖片路徑、三語資料與 Semantic HTML；不得以 Placeholder 覆蓋已存在資料。
5. 不得重新建立 Demo、複製整份參考 HTML、集中至 `App.vue` 或改寫 Router 架構。
6. 每完成一個模組即 Build；若破壞橫向導航，先停止該模組，不得推翻主 Track 配合效果。

## 7.2 Title 與語言切換

### 字體

- 首頁主標與各 `.section-heading` 使用 `LXGW WenKai Mono TC`。
- 正文沿用 Noto Sans TC／JP；英文工具標籤沿用 Space Mono。
- 透過 Google Fonts 載入並保留系統 fallback。
- `>=1920px` 時標題不換行，但須縮小整體標題字級與設定安全行高，不能發生行間或圖文重疊。
- 中文、英文、日文逐一測試；不以硬編碼 `<br>` 解決特定語言。

建議方向：

```css
@media (min-width: 1920px) {
  .hero-title,
  .section-heading__title {
    white-space: nowrap;
    font-size: clamp(3rem, 4.6vw, 6.75rem);
    line-height: 1.08;
  }
}
```

實際 Selector 以現有專案為準，不要為套用範例而改壞既有命名。

### 語言切換 Bug

將目前「同一按鈕連按三次循環中／英／日」改為三個獨立按鈕：

```text
中　EN　日
```

- 每顆按鈕只設定一個明確語言：`zh-Hant`、`en`、`ja`。
- 使用 `button type="button"`，目前語言加入 Active 樣式與 `aria-pressed="true"`。
- 切換語言後維持目前 Section／子面板、網址與捲動位置。
- 切換語言不重播首頁首次進場。
- 語言長度改變後觸發一次版面重新量測，更新 Section Offset、Track Width 與 Navigation 位置。

## 7.3 桌面與手機導航

### 桌面

- 移除 Pointer Drag 及其事件、狀態、CSS Class 與 `grab`／`grabbing` Cursor。
- 保留滑鼠滾輪、Trackpad、左右方向鍵、Section Navigation 與 URL Hash。
- 滾輪一次只前進／後退一個可視主面板，需有合理節流，不能一次跳過多屏。
- Featured 與 Artworks 可包含子面板；通過子面板期間父 Section 狀態不變。

### Section Navigation

使用者所稱的「Skip Link」在本規格中正名為 `.section-navigation` 的章節連結。真正的無障礙 Skip Link 仍維持跳至主要內容。

目前章節連結同時具備：

- 字重提高。
- 文字變為品牌深色或章節 Accent。
- 底線。
- 圓點或小型圖形。
- `aria-current="page"` 或符合現有語意的目前位置屬性。

## 7.4 Responsive Picture 與圖片載入

擴充既有圖片元件或新增單一共用 `ResponsivePortfolioImage.vue`，不得為 Project 與 Artwork 分別複製相同邏輯。

支援：

- `<picture>`。
- AVIF、WebP 與原始格式 fallback。
- `srcset`、`sizes`。
- `loading="lazy"`、`decoding="async"`。
- `width`、`height` 或固定 `aspect-ratio`，避免 Layout Shift。
- 三語 Alt。
- Transition 使用 `img.currentSrc`，不可假定 `src` 即實際顯示檔。

首頁 LCP／Hero 與初始可視的重要圖片不得 Lazy Load；其餘 Projects、Artworks 與詳情圖片依可視優先級 Lazy Load。避免桌面與手機來源同時下載。

## 7.5 Home 修改

### Floating Note

- 移除 `.floating-note` 現有文字。
- 使用現有資料夾內追加圖片與現有路徑；不要產生替代素材。
- 依實際用途改為具意義的元件與檔名；純裝飾圖片使用空 Alt／`aria-hidden`，可前往作品者提供三語 Alt 與 Link。

### 首次載入動畫

不用假 Loading、百分比或阻塞式 Preloader。流程：

1. 背景顯示。
2. Hero 圖片 Mask／Reveal。
3. 姓名與標題文字滑入。
4. Header、Language Switcher、Navigation 淡入。

- 總長約 0.8～1.2 秒。
- SPA 內切換 Route 或返回首頁不重播。
- 瀏覽器 Reload 後重播。
- 關閉後重新開啟重播。
- 使用 Vue App 記憶體狀態，不使用 `sessionStorage`／`localStorage` 記錄是否播放。
- Reduced Motion 直接顯示完成狀態。
- 動畫期間不可阻擋必要鍵盤操作超過動畫總長。

## 7.6 Featured：三個水平子面板

採用「加寬 Featured Section」方案，不建立內層上下 Scroll，也不建立第二條水平 Scrollbar。

```text
01 Featured
├── Panel 1：Overview／代表畫面
├── Panel 2：Visual Design／細節與圖像
└── Panel 3：Interaction／製作說明與後續入口
```

- 三個 Panel 都由外層主 Track 控制。
- 通過三屏期間背景、Header、Section Navigation、Hash 皆維持 Featured。
- 顯示小型子頁碼，例如 `01 — 2/3`。
- Navigation 點擊 Featured 時到 Panel 1。
- 從 Projects 往回時，先回到 Featured Panel 3，再依序回退。
- 現有 `project-card--featured` 的資料、圖片與連結必須沿用。
- 圖片 Reveal／Expand 不 Pin、不建立上下滾動陷阱，也不以動畫 width／height 造成頻繁 Layout。

## 7.7 Projects：Hover List

- 將 `.section-heading.compact` 放在 Hover List 最上方。
- 清單從現有 Projects Data 產生，不以 DOM Index 綁定作品。
- 桌面精準滑鼠：Hover／Focus 顯示對應圖片；Pointer 預覽不攔截事件。
- 鍵盤 Focus 可取得和 Hover 相同資訊。
- Card／List Item 保留明確前往詳情的行為。

### 圖片殘留 Bug 強制修正

建立單一 `resetPreview({ immediate })`。下列情況必須 Hard Reset：

- 離開整個 Hover List。
- Projects 不再是 Active Section。
- 滾輪開始前往其他 Section。
- Route Change。
- `window.blur`。
- `document.visibilitychange` 變為 hidden。
- Breakpoint 切換為觸控版。
- Reduced Motion 狀態改變。
- Component Unmount。

Hard Reset 必須立即把 Active Preview 設為 `null`、不可見並取消 Tween／RAF／Timer；不能等待縮小動畫完成才清除。預覽圖設 `pointer-events:none`。

### 手機

- 手機直向：縱向清單＋上方／區域內 Sticky Preview；以 IntersectionObserver 切換圖片及 Active 標題。
- Observer 使用正確 Scroll Root；項目離開時不保留錯誤圖片。
- 手機橫向：圖文子卡／子面板左右 Swipe，不顯示固定浮動圖片。
- 第一次點擊即進入詳情，不採第一次預覽、第二次開啟。

### 作品調整

- 高雄地圖集章移入 Projects，後續追加完整電腦互動版本。
- 訂餐網站移入 Artworks，標記為 `UI Visual Exercise／介面視覺習作`，避免分類誤解。
- 不改寫作品真實狀態，不虛構互動已完成。

## 7.8 Artworks：橫向錯落作品廊

正式名稱使用 `Horizontal Staggered Artwork Gallery`，不是安裝 Masonry Library，也不是把參考頁旋轉。

- Artworks Section 內使用兩列橫向錯落 CSS Grid。
- 透過 `grid-auto-flow: column` 與不同 `layout` 類型呈現 `portrait`、`square`、`wide`。
- 不建立內層 Scrollbar、不建立第二套 Drag。
- 可使用非常輕微的列間位移／Parallax，但不得裁切作品主體或持續在 Viewport 外執行。
- 移除 `.corner-link`。
- 整張 Artwork Card 可點；Hover 與 Focus 顯示 `View Artwork`。
- 使用 RouterLink 語意並提供 Focus Outline、三語 ARIA Label。

### 未來增減資料

首頁不是無限作品庫，採資料驅動策展：

```js
{
  id: 'stable-id',
  slug: 'stable-slug',
  layout: 'portrait', // portrait | square | wide
  published: true,
  showOnOverview: true,
  overviewOrder: 1
}
```

- `/artworks` 顯示所有 `published: true`。
- 首頁顯示 `published && showOnOverview`，依 `overviewOrder` 排序。
- 首頁支援 1～8 件，預設 6 件；超過 8 件只在完整 Artworks 頁顯示並於開發模式提出警告，不得靜默破壞版面。
- 1 件顯示單一 Featured Artwork；2～4 件控制在約一個 Viewport；5～6 件約 1.3～1.6 個 Viewport；7～8 件最多約兩個 Viewport。
- 不使用 `nth-child` 綁定特定作品造型；由 `layout` 欄位控制比例。
- 最後一欄只有一件時可跨兩列或放大，不留下明顯空洞。

### 動態寬度與導覽

不得再使用 `sectionIndex * innerWidth` 假設所有 Section 都是 100vw。使用真實 DOM：

- `offsetLeft`。
- `scrollWidth`。
- Track `scrollWidth`／`clientWidth`。
- `ResizeObserver` 監測語言、圖片、Gallery 與視窗造成的尺寸變化。

Navigation、Active Section、子面板、Hash 與 Kitten 皆使用同一份量測結果。避免每個功能自行建立不同 Offset 計算。

## 7.9 Artwork Card → 詳情頁圖片轉場

沿用附件 `Codex_Project_Detail_Transition_Spec` 的 Vue／GSAP Flip 核心概念，但套用為 Artwork Route Transition，不先開 Preview Overlay：

```text
Artwork Card
→ 讀取被點擊 img.currentSrc 與 bounds
→ 建立唯一暫時 transition image
→ Router 前往 /artworks/:slug
→ Flip 到詳情頁 Hero target
→ 移除暫時圖片
→ 顯示詳情文字
```

- 新增或沿用 `/artworks/:slug`；不破壞 `/artworks` 與現有 Project Router。
- 命名使用 `ArtworkCard`、`selectedArtwork`、`useArtworkTransition`，不要沿用附件中的 Project 命名造成資料混淆。
- 主要 UI 仍由 Vue Template 產生；只允許以程式建立短暫 Transition Image。
- 同時間只能存在一個 Transition；快速重複點擊必須鎖定。
- 若來源圖不存在、離開 DOM、路由失敗或目標未掛載，改用 Fade，不能拋出錯誤或卡住頁面。
- Reduced Motion 直接路由切換。
- 完成、取消、錯誤及 Unmount 都必須 Kill Tween 並移除暫時 DOM。
- 返回列表時優先還原原本橫向位置與 Focus；若來源卡片不存在，不強制 Reverse Flip。
- Transition 使用 `currentSrc`，與 `<picture>` 相容。

## 7.10 Sticky Layout、Footer 與 Magnetic Hover

### Layout

- Header 固定／Sticky 於頂端，沿用現有較穩定方案。
- Section Navigation 固定於底端。
- Footer 只在 About Section 範圍 Sticky，不在 Home～Artworks 全程顯示。
- Footer 進入時，Section Navigation 向上避讓，不能重疊或淡出。
- 外部連結仍可鍵盤操作，Sticky／Fixed 不能遮住錨點、標題或 Focus Ring。

### Magnetic Hover

- 僅套用外部連結與少量指定 CTA。
- 只在 `(hover:hover) and (pointer:fine)` 啟用。
- 保留瀏覽器原生 Cursor，不建立全站 Stretching Cursor。
- 不使用參考碼四倍放大的 Invisible Hover Bounds。
- 位移幅度小，Pointer Out、Blur、Route Change 與 Unmount 歸零。
- Focus 不要求指標位移，但須有等價醒目視覺。

## 7.11 Navigation Kitten

將參考 Kitten 改寫成獨立 Vue 元件，例如 `NavigationKitten.vue`。不可複製其全域 DOM 初始化、兩個永久 Interval 或錯誤 Touch Listener。

### 桌面

- 小貓視覺容器限制在 `.section-navigation` 邊線附近，`pointer-events:none`。
- 可使用單一全域 `pointermove` 資料源，但只有滑鼠進入底部 Navigation 上方 120px 感應帶時才追蹤 X。
- 離開感應帶、視窗失焦、Route Change 時回到目前 Active Section 導覽點。
- Section 改變時沿線移到新位置。
- 允許最高 100px 跳躍；跳躍只能在預留安全區內，不遮擋 CTA、Footer、Navigation 文字或 Focus Ring。
- 只在 `(hover:hover) and (pointer:fine)` 啟用跟隨與跳躍。

### 手機

- 保留小貓，作為 Navigation 上的整體進度指示。
- 位置使用 `scrollLeft / (scrollWidth - clientWidth)`，不是平均 Section Index。
- Swipe 移動期間播放走路；停止後停止腳步動畫。
- Featured／Artworks 加寬區域仍反映連續真實進度。
- Reduced Motion 顯示靜態位置，不播放走路與跳躍。

### 效能與清理

- 建立單一共用 Pointer 資料源，例如 `usePointerPosition`，供 Hover Preview、Magnetic Hover、Kitten 使用。
- 全站最多一個 `window.pointermove` Listener；不得每個元件各自註冊。
- RAF 只在動畫或 Pointer 狀態需要更新時運行，閒置與 Viewport 外停止。
- 不使用永久 `setInterval`。
- Unmount 移除 Listener、取消 RAF／Timer、清除 Class 與狀態。

## 7.12 建議新增／調整模組

先尋找既有同用途檔案；下列名稱只在缺少時建立：

```text
src/components/
├── ResponsivePortfolioImage.vue
├── NavigationKitten.vue
├── MagneticLink.vue
├── HoverPreviewList.vue
├── PointerPreview.vue
├── PortfolioFooter.vue
└── artworks/
    ├── ArtworkCard.vue
    └── HorizontalArtworkGallery.vue

src/composables/
├── usePointerPosition.js
├── useTrackMeasurements.js
├── useElementReveal.js
├── useHoverPreview.js
└── useArtworkTransition.js

src/views/
└── ArtworkDetailView.vue
```

資料繼續集中於現有 `messages.js`、`projects.js`、`artworks.js` 與 `sections.js`；不要把三語文案與圖片路徑複製到元件。

## 7.13 執行順序

1. **基準與清理**：Build、盤點事件與現有 Drag；移除 Drag 後再次驗證所有導航。
2. **量測核心**：完成真實 Section／Panel Offset 與 ResizeObserver，讓 Featured、Artworks 可安全加寬。
3. **字體與語言**：LXGW 字體、1920 標題、三顆語言按鈕與重算寬度。
4. **圖片基礎**：Responsive Picture、Lazy Policy、Alt、尺寸與 `currentSrc`。
5. **Home**：Floating Image 與一次性 App Load 文字滑入。
6. **Featured**：三個子面板及父 Section 狀態。
7. **Projects**：Hover List、手機 Observer 與 Hard Reset。
8. **Artworks**：資料交換、1～8 件橫向錯落 Gallery。
9. **Artwork Route**：靜態詳情路由先完成，再加入 GSAP Flip 銜接。
10. **Sticky／Magnetic／Kitten**：最後加入，避免過早混入多組 Pointer 行為。
11. **整合驗證**：三語、桌面、手機直／橫、鍵盤、Reduced Motion、快速操作與 Route 往返。
12. **冗餘稽核**：刪除未使用 Import、舊 Drag、舊循環語言 Handler、重複 Listener、永久 RAF／Interval、殘留 Overlay、重複 CSS 與已失效元件；不得刪除與本需求無關的使用者程式。

## 7.14 最終驗收

### 架構

- [ ] Vue、Router、五個既有 Section、Data、圖片路徑與三語架構保留。
- [ ] 沒有第二個 Demo、巨型 `App.vue` 或整份參考 HTML。
- [ ] 修改前後 Production Build 成功，Console 無錯誤。
- [ ] 所有新增事件、Observer、RAF、Timer、GSAP Tween 均有清理路徑。

### 導覽與尺寸

- [ ] 桌面沒有 Drag 與全頁手掌游標。
- [ ] Featured 三屏與 Artworks 動態寬度仍由同一主 Track 操作。
- [ ] Section 狀態依真實 Offset 判斷，不使用 `index * innerWidth`。
- [ ] Navigation、頁碼、Hash、Header、背景與 Kitten 同步。
- [ ] Footer 出現時 Navigation 正確向上避讓。

### 字體、語言與圖片

- [ ] Title 使用 LXGW WenKai Mono TC；1920px 以上不換行、不重疊、不溢出。
- [ ] 中／EN／日為三顆獨立按鈕，不再循環切換。
- [ ] 切換語言後留在同一位置並重算 Layout。
- [ ] `<picture>`、Responsive Source、Lazy Policy、尺寸、三語 Alt 正確。
- [ ] Hero／LCP 沒有被 Lazy Loading 延遲。

### 動畫與互動

- [ ] 首次進場只在 App Load 播放；SPA 返回不重播，Reload 重播。
- [ ] Hover Preview 離開 Section 時不殘留。
- [ ] 手機直向 Observer、橫向圖文卡可操作。
- [ ] Artwork Card Hover／Focus 顯示 View Artwork 並前往正確 slug。
- [ ] Flip 成功與 Fallback 都不留下 DOM；快速連點不產生多個 Overlay。
- [ ] Magnetic Hover 不擴大感應範圍干擾鄰近連結。
- [ ] Kitten 桌面感應帶、100px 跳躍、歸位與手機進度皆正確。
- [ ] 全站只有一個共用 Global Pointer Listener。
- [ ] Reduced Motion 關閉所有非必要位移，資訊仍完整。

### 內容與未來增減

- [ ] 高雄地圖集章位於 Projects，訂餐網站位於 Artworks 並標示 UI Visual Exercise。
- [ ] Artworks 首頁可透過 Data 增減 1～8 件，不修改元件或手動寬度。
- [ ] 超過 8 件仍出現在 `/artworks`，首頁不失控。
- [ ] 作品圖片、連結、狀態、角色與成果沒有被虛構。

### 交付回報

Codex 完成後必須回報：

1. 保留、修改、新增與刪除的檔案。
2. 每個功能放在哪個 Component／Composable。
3. Build、互動、Responsive、鍵盤與 Reduced Motion 測試結果。
4. 找到並移除的冗餘程式。
5. 尚待使用者提供的圖片、文案、slug 或詳情資料。
6. 已知限制與後續 Case Study／Artworks 詳情製作項目。
