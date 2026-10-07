# Codex 補充說明：Design System 實作規範

## 0. 文件定位

本文件必須與《Codex 執行指令：第一階段橫向作品集（最終增量修改版）》一起閱讀。

本文件只補強 Design Token、元件狀態、輸入方式、無障礙、內容邊界與 QA 規則，不是整站重做指示，也不取代主執行指令。若兩份文件有衝突：

1. 現有 Vue 專案實際架構與使用者資料必須保留。
2. 主執行指令中的功能、路由、版面與互動決策優先。
3. 本文件只決定如何一致、安全且可測試地實作。

阿蘇さとう農園只作為「設計系統文件寫法」參考。不得移植其品牌、內容、Audience、字體、色碼、字級、行高、間距、圓角、陰影、頁面密度或網站結構。

## 1. Context and Goals

### 1.1 Design Intent

本次修改必須在不改變現有 Vue 3 架構、作品資料與橫向資訊架構的前提下，建立一致、可維護、支援中／英／日、鍵盤、滑鼠、Trackpad 與觸控的求職作品集視覺系統。

網站必須優先讓招募者理解：

- 使用者具有平面設計與美術基礎。
- 能以 Figma 進行 UI／UX 設計。
- 能以 Vue、HTML、CSS 與 JavaScript 實作互動介面。
- 能清楚區分個人職責、練習作品、Figma-only 與已完成前端作品。

### 1.2 Audience

- 互動娛樂／數位內容公司的招募人員。
- 前端、UI／UX、視覺設計與互動設計主管。
- 需要在短時間內判斷作品品質、角色與技術能力的人。

### 1.3 Product Surface

Creative Front-end／UI／UX 求職作品集，不是一般 Content Site，也不是阿蘇さとう農園的品牌網站。

## 2. Requirement Language

- **必須／must**：不可妥協的架構、功能、安全、資料與無障礙條件。
- **應／should**：為一致性、可讀性與使用體驗採用的建議；若不採用，Codex 必須說明原因。
- **可／may**：裝飾或試作效果；若影響操作、效能或無障礙，必須降級或移除。

所有非協商規則必須使用「必須」；不得以「建議」弱化驗收條件。

## 3. Design Token Architecture

### 3.1 單一來源

- 必須沿用現有 `src/assets/styles/tokens.css`。
- 不得新增第二套 Token 檔、Tailwind Config 或元件內平行 Design System。
- 本輪新增或修改的元件必須使用 Semantic Token。
- 舊元件只在本輪碰觸時逐步遷移，不得為統一命名而重寫不相關頁面。
- 原始 Hex／RGB 值只允許出現在 Foundation Token 定義處；動態計算透明度除外，但應優先使用既有 Token。

### 3.2 三層結構

```text
Foundation Token
色彩、間距、字體、圓角、陰影、時間
        ↓
Semantic Token
文字、背景、互動、邊線、Focus、狀態
        ↓
Component Token
Navigation、Card、Button、Gallery、Footer
```

建議增補方式：

```css
:root {
  /* Foundation：沿用主指令既有品牌值 */
  --palette-ink-900: #29303f;
  --palette-teal-700: #3e6e64;
  --palette-cream-100: #fff7ea;

  /* Semantic */
  --color-text-primary: var(--palette-ink-900);
  --color-text-secondary: #68716f;
  --color-interactive: var(--palette-teal-700);
  --color-focus-ring: var(--palette-teal-700);
  --color-surface-primary: var(--palette-cream-100);
  --color-border-subtle: rgb(62 110 100 / 22%);

  /* Component */
  --navigation-text-color: var(--color-text-secondary);
  --navigation-active-color: var(--color-interactive);
  --artwork-card-background: var(--color-surface-primary);
}
```

以上數值只能映射現有品牌 Token；實作時不得另創相近但重複的色彩。

### 3.3 Token 命名與禁止事項

必須依用途命名：

```text
--color-text-primary
--color-surface-raised
--color-interactive-hover
--duration-normal
--navigation-active-color
```

禁止：

```text
--green2
--new-color
--card-blue
--final-spacing
--animation-test
```

元件內不得新增沒有語意的 Magic Number。確實只屬於單一元件且不值得全域化的尺寸，必須以元件區域變數命名。

## 4. Typography and Spacing

### 4.1 字體系統

- 首頁主標與 Section Heading 必須使用 `LXGW WenKai Mono TC`。
- 正文必須沿用 Noto Sans TC／JP 與既有系統 fallback。
- 英文工具、日期與標籤應使用 Space Mono。
- 手寫字體只能用於短註記，不得用於長篇正文。
- Google Fonts 載入失敗時，內容仍必須可讀且不得造成版面消失。

### 4.2 排版規則

- 正文基準字級不應小於 16px。
- 正文行高應介於約 1.5～1.75，不得採用 `12px/12px`。
- `>=1920px` 的首頁及章節大標可不換行，但必須同時控制 `clamp()`、最大寬度與安全行高。
- 中文、英文、日文必須分別測試；不得以固定 `<br>` 只修正一種語言。
- 小螢幕必須允許自然換行，不得縮小到難以閱讀。
- 標題、Role、Tools 與 CTA 不得互相重疊。

### 4.3 間距

- 必須沿用現有規則化間距，不採用參考網站的 5、6、9、11、12、14、15、18px 零碎比例。
- 新間距應先映射至既有 `--space-*`；缺少時才增補。
- 相同層級的 Section Heading、Card Meta、CTA 與 Footer 必須使用相同間距規則。
- 不得以大量單次 `margin-left`、`top`、`transform` 修補版面。

## 5. Component Rule Template

Codex 新增或修改每個互動元件時，必須記錄：

1. Anatomy：構成區域。
2. Data／Props：資料來源。
3. Variants：尺寸或用途差異。
4. States：Default、Hover、Focus-visible、Active、Disabled、Loading、Error。
5. Pointer Behavior。
6. Keyboard Behavior。
7. Touch Behavior。
8. Responsive Behavior。
9. Long Content／Overflow／Empty State。
10. Cleanup：Listener、Observer、RAF、Timer、Tween。

不適用的狀態必須標記 N/A 並說明原因；不得為靜態元件建立沒有功能意義的假 Loading 或 Error。

## 6. Component State Rules

### 6.1 Language Switcher

| 狀態 | 必須行為 |
|---|---|
| Default | 顯示 `中／EN／日` 三顆獨立按鈕 |
| Hover | 只強化目前指向的按鈕 |
| Focus-visible | 顯示清楚 Focus Ring |
| Active | 目前語言使用文字、色彩及 `aria-pressed="true"` 表示 |
| Disabled | N/A，除非語言資料缺失 |
| Loading | N/A |
| Error | 翻譯鍵缺失時使用安全 fallback 並在開發環境警告 |

切換語言後必須維持目前 Section／Panel，且重新量測橫向版面；不得重播 Home 進場。

### 6.2 Section Navigation

| 狀態 | 必須行為 |
|---|---|
| Default | 次要文字色，保持可讀 |
| Hover | 改色並出現底線或圖形回饋 |
| Focus-visible | 高對比 Focus Ring，不能被 Kitten 或 Footer 遮住 |
| Active | 加粗、品牌色、底線、圓點／小圖形與 `aria-current` |
| Disabled | N/A |
| Loading | N/A |
| Error | 量測失敗時仍可用 Section ID 導航，不得整組失效 |

Kitten 只能提供裝飾／進度提示，不得成為判斷目前章節的唯一方式。

### 6.3 Project Hover List

| 狀態 | 必須行為 |
|---|---|
| Default | 顯示名稱、類型、年份或狀態 |
| Hover | 顯示對應預覽，不遮擋文字與 Pointer Target |
| Focus-visible | 顯示與 Hover 等價的預覽與 Focus Ring |
| Active | 點擊／Enter 前往正確詳情 |
| Disabled | 未公開項目不得渲染為可點擊控制 |
| Loading | 預覽尚未完成時顯示保留比例的背景 |
| Error | 圖片失敗時仍顯示名稱與詳情入口 |

離開 List、Section、Route、視窗或斷點時必須 Hard Reset；不得留下跟隨圖片。

### 6.4 Artwork Card

| 狀態 | 必須行為 |
|---|---|
| Default | 顯示圖片、作品名稱與類別 |
| Hover | 顯示 `View Artwork` |
| Focus-visible | 顯示 `View Artwork` 與 Focus Ring |
| Active | 提供點擊回饋並啟動唯一 Route Transition |
| Disabled | 未公開作品不出現在公開列表 |
| Loading | 保留圖片比例，避免 Layout Shift |
| Error | 顯示替代背景、作品名稱與仍可使用的詳情連結 |

整張 Card 前往路由時必須使用 RouterLink 語意；不能只有 `div @click`。

### 6.5 Magnetic Link

- Default：保持原生 Link／Button 外觀與 Cursor。
- Hover：只在 Fine Pointer 小幅位移。
- Focus-visible：使用清楚 Ring，不要求位移。
- Active：提供短暫按壓回饋。
- Touch：不得啟動 Magnetic 位移。
- Pointer Out、Blur、Route Change 與 Unmount 必須歸零。
- 不得使用放大四倍的 Invisible Hover Bounds。

### 6.6 Navigation Kitten

- Desktop：只在底部120px感應帶內跟隨，離開後回到 Active Section。
- Mobile：以真實 Track Progress 移動，Swipe 時走路、停止後停下。
- Reduced Motion：顯示靜態位置。
- 必須 `pointer-events:none`，不得遮住 Focus Ring、文字或 CTA。
- 100px 跳躍若超出預留安全區或遮蔽內容，必須降級或停止。
- 必須沿用全站單一 Pointer 資料源，不得自行再註冊 Global Listener。

### 6.7 Sticky Footer

- Footer 只在 About 範圍 Sticky。
- Footer 出現時 Section Navigation 必須向上避讓。
- Focus Element 不得位於可視範圍之外或被兩個固定層覆蓋。
- 小螢幕高度不足時應回到正常文流，不得強制 Sticky。

## 7. Input Behavior Matrix

| 元件 | Pointer | Keyboard | Touch |
|---|---|---|---|
| Language Switcher | Click | Tab＋Enter／Space | Tap |
| Section Navigation | Hover＋Click | Tab＋Enter | Tap |
| Project Hover List | Hover Preview＋Click | Focus Preview＋Enter | 直向 Sticky Preview／橫向圖文卡＋Tap |
| Artwork Card | Hover 顯示 CTA＋Click | Focus 顯示 CTA＋Enter | Tap 直接前往詳情 |
| Magnetic Link | 小幅位移 | Focus 視覺，不位移 | 不啟用 Magnetic |
| Navigation Kitten | 感應帶跟隨 | 不承擔功能 | 依 Track Progress 移動 |
| Artwork Route Transition | Click 啟動 | Enter 啟動 | Tap 啟動；Reduced Motion／低效能可降級 Fade |

任何資訊不得只透過 Hover 取得。

## 8. Responsive and Edge Cases

### 8.1 長內容與三語

- 英文或日文變長時，標題必須換行、縮放或調整內容欄寬，不得溢出 Viewport。
- Tools、Role 與標籤可換行；不得以隱藏文字解決。
- 語言切換後必須更新 Section／Panel Offset、Track Width、Navigation 與 Kitten Progress。
- 200%文字縮放時，主要操作必須仍可使用。

### 8.2 Artwork 數量

- 首頁必須支援1～8件資料驅動作品，預設6件。
- 超過8件必須保留在 `/artworks`，不得使首頁無限延長。
- 只有1件時顯示 Featured Artwork；最後一欄只有1件時可跨列。
- 0件時顯示三語 Empty State，不顯示空白 Grid 或失效連結。
- 新增、刪除、排序時不得修改元件 CSS 或 Section 固定寬度。

### 8.3 圖片

- `<picture>` 必須使用 AVIF／WebP／Fallback 與正確 `srcset`／`sizes`。
- LCP／Hero 不得 Lazy Load；畫面外圖片應 Lazy Load。
- 圖片必須提供尺寸或比例。
- Transition 必須使用 `currentSrc`。
- 圖片失敗後，作品名稱、類型與詳情入口仍必須存在。

### 8.4 版面高度

- 手機橫向高度不足時，Sticky、Kitten Jump、巨大標題與 Meta 必須避免重疊。
- Footer 與 Section Navigation 沒有足夠避讓空間時，Footer 應回到正常文流。
- 虛擬鍵盤、瀏覽器工具列或動態 Viewport 改變時，不得鎖死畫面。

## 9. Accessibility Requirements

目標為 WCAG 2.2 AA。下列條件必須具有可測試的 Pass／Fail 結果：

- 所有功能必須可只使用鍵盤完成。
- Tab 順序必須符合閱讀及畫面順序。
- Focus Indicator 必須可見，且不能被 Sticky Header、Navigation、Footer、Kitten 或 Transition Layer 遮住。
- Hover 顯示的內容必須在 Focus 時同樣顯示。
- Active 狀態不得只依靠顏色；必須同時使用字重、底線、圖形或文字屬性。
- 圖片、Button、Link 必須有符合當前語言的名稱或替代文字。
- 裝飾圖必須使用空 Alt 或 `aria-hidden="true"`。
- Reduced Motion 下必須停止 Parallax、Magnetic Shift、Kitten Jump、走路、Marquee 與 Flip 位移；資訊仍完整。
- 320 CSS px 寬度下，手機直向內容必須可閱讀，不得要求旋轉才能取得核心資訊。
- 200%文字縮放下，主要內容、CTA與導覽不得重疊或被裁切。
- 路由轉場失敗、圖片失敗或資料為空時，使用者仍必須能返回列表或前往詳情。
- 顏色對比必須以實際 Token 組合測試；不得因參考網站宣稱 AA 就視為通過。

## 10. Content and Tone

### 10.1 語氣

文案應簡潔、可信、專業，避免為了模仿參考網站加入與作品無關的抽象英文標語。

推薦：

```text
視覺設計、UI／UX與Vue互動實作
Visual Design, UI/UX and Vue Interaction
ビジュアルデザイン、UI/UX、Vueによるインタラクション実装
```

避免：

```text
World-changing digital magic
革命性的使用者成果
```

除非有真實依據，不得宣稱商業成果、測試數據、客戶關係或團隊職責。

### 10.2 Action Label

必須使用明確動作：

- `View Project`
- `View Artwork`
- `View Case Study`
- `Back to Artworks`
- `Download Résumé`

避免：

- `Click Here`
- `More`
- `Go`
- 只有圖形、沒有 Accessible Name 的按鈕。

## 11. Anti-patterns and Prohibited Implementations

Codex 不得：

- 使用阿蘇さとう農園的顏色、游 Gothic 字體、12px／12px正文或頁面內容。
- 根據參考密度建立97個連結、8個列表或固定卡片數。
- 建立第二套 Token、Tailwind Config 或 UI Framework。
- 在元件內散落 Raw Hex、重複 Transition Duration 或無名稱 Magic Number。
- 為每個 Component 各自建立 `window.pointermove`。
- 使用永久 RAF、永久 `setInterval` 或未清除 Timer。
- 使用全站 Stretching Cursor 或放大四倍的 Hover Bounds。
- 使用 `div @click` 取代 Link／Button。
- 使用 `innerHTML` 拆三語文字。
- 使用 `index * innerWidth` 假設所有 Section 一樣寬。
- 使用 `nth-child` 把特定 Artwork 綁死在固定造型。
- 使用 Hover 作為唯一資訊來源。
- 隱藏 Focus Outline。
- 讓 Loading、Error 或空資料造成無法導航。
- 因套用 Token 而大量重寫與本輪無關的 CSS。
- 讓視覺效果優先於作品圖片、內容可讀性與求職資訊。

## 12. Migration Rules

1. 先建立現況 Build 與視覺基準。
2. 盤點現有 Token，建立舊 Token→Semantic Token 對照表。
3. 只遷移本輪會修改的元件。
4. 每遷移一個元件即測試三語、鍵盤、Pointer、Touch 與 Reduced Motion。
5. 不得同時保留兩個同用途變數或兩套元件。
6. 若刪除舊 Class、Composable 或 Listener，必須先確認沒有其他頁面引用。
7. 若新規範會改變既有視覺，應優先保留既有品牌表現並回報差異。

## 13. QA Checklist

### Tokens and Consistency

- [ ] 新增／修改元件使用 Semantic Token，沒有散落 Raw Hex。
- [ ] 沒有第二套 Design System 或重複變數。
- [ ] 相同層級文字、間距、圓角與動畫時間一致。
- [ ] Token 命名表示用途，不表示暫時顏色或版本。

### Component States

- [ ] 每個互動元件記錄 Default、Hover、Focus-visible、Active、Disabled、Loading、Error；不適用者標記 N/A。
- [ ] Hover 與 Focus 提供等價資訊。
- [ ] Loading、Error、Empty State 不會造成失效連結或 Layout Shift。
- [ ] Pointer Out、Blur、Route Change、Breakpoint Change 與 Unmount 都能歸零互動狀態。

### Input and Responsive

- [ ] 滑鼠、鍵盤與觸控皆能完成主要流程。
- [ ] 桌面沒有 Pointer Drag 或全頁手掌 Cursor。
- [ ] 手機直向可閱讀，手機橫向可 Swipe。
- [ ] 三語切換後版面重新量測且保持目前位置。
- [ ] 320px、200%文字縮放、短高度橫向畫面均無關鍵內容重疊。

### Accessibility

- [ ] Focus 可見且未被固定層遮住。
- [ ] Active 狀態不只依靠顏色。
- [ ] Accessible Name、Alt、ARIA State 與目前語言一致。
- [ ] Reduced Motion 停止非必要位移，所有資訊與導航仍可使用。
- [ ] 實際前景／背景 Token 組合通過 WCAG 2.2 AA 對比檢查。

### Performance and Cleanup

- [ ] Hero／LCP 載入策略正確，其餘圖片依需要 Lazy Load。
- [ ] 全站只有一個共用 Global Pointer Listener。
- [ ] Viewport 外動畫停止。
- [ ] 沒有未清除 Listener、Observer、RAF、Timer、Tween 或 Transition Image。
- [ ] Production Build 成功，Console 無 Error／未處理 Promise／重複 Key。

### Content Integrity

- [ ] 高雄地圖集章與訂餐網站位於已確認分類。
- [ ] Role、Tools、完成狀態與成果沒有被虛構。
- [ ] 首頁 Artworks 可透過 Data 增減1～8件，不修改元件版面。
- [ ] 所有 Action Label 清楚描述目的。

## 14. Codex 完成回報

完成後必須補充回報：

1. 新增或調整的 Foundation、Semantic、Component Tokens。
2. 本輪遷移至 Semantic Token 的元件。
3. 各互動元件的狀態與 Pointer／Keyboard／Touch 測試結果。
4. WCAG 2.2 AA 檢查結果與任何未通過項目。
5. Long Content、Empty、Loading、Error、圖片失敗與 Reduced Motion 的測試結果。
6. 移除的重複 Token、Magic Number、Listener、RAF、Timer、Tween 與未使用程式。
7. 仍需使用者提供或確認的素材與文案。
