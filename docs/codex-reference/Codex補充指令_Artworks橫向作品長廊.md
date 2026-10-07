# Codex 補充指令：Artworks 滾輪驅動橫向作品長廊

## 指令定位

本文件只覆寫主執行指令中 Artworks 首頁展示方式。其餘 Vue 架構、Router、三語、圖片、Design System、Kitten、Footer、Navigation 與驗收規格繼續有效。

正式取代下列舊方案：

- Horizontal Staggered Artwork Gallery。
- 雙排自動無限圖片 Marquee。
- 三欄垂直圖片跑馬燈。
- 固定／Sticky Artworks Title。

最終形式為：

> Scroll-driven Horizontal Artwork Archive／滾輪驅動橫向作品長廊

## 修改前必讀

Codex 必須先閱讀並對照：

1. `Codex執行企劃_第一階段橫向作品集.md`。
2. `Codex補充說明_Design_System實作規範.md`。
3. `Codex_Project_Detail_Transition_Spec.md`。
4. `reference-page-source.txt`，特別是原始碼中的 Granular Details：HTML 429–452、CSS 206–212、JS 634–642、645–678。
5. `artworks-current-layout.png`，作為目前色彩、Title、八項作品與版面基準。
6. 現有 Vue 專案實際 Artworks Section、Card、Data、Router、主 Track、Navigation 與 CSS。

任何必讀檔案或現有關鍵原始碼無法取得時，必須先指出缺失；不得自行想像設計後實作。

## 參考碼理解

Granular Details 不是自動跑馬燈，而是：

- 置中引言。
- 三個人工建立的垂直欄位。
- 不同比例圖片。
- 欄位起始高度錯落。
- 捲動驅動的欄位差速 Parallax。
- 圖片 Mask Reveal。
- 圖片遮罩內部 Parallax。
- Hover Scale 與色彩恢復。

不得直接複製原始 DOM、全域 Query Selector、垂直 ScrollTrigger、Unsplash 圖片、Body Class 切換或原始英文文案。

## 最終互動流程

```text
Projects
→ 進入 Artworks Title
→ 主頁滾輪持續向右
→ Title 自然向左離開
→ Artwork 圖片依序進入
→ Hover 顯示局部 VIEW Cursor
→ 點擊圖片
→ /artworks/:slug
→ 最後離開 Artworks 進入 About
```

Artworks 可比一個 Viewport 寬，但整段必須維持：

- Header：Artworks。
- Section Navigation：Artworks Active。
- Artworks背景色。
- Artworks Hash。
- Kitten與總進度依實際 Track 距離移動。

直到最後一張 Artwork 通過後才進入 About。

## Title

保留目前：

- `03・創作`。
- `藝術與工藝`。
- 現有三語資料、背景與字體層級。

Title 是 Track 內的普通內容，不使用 `position:fixed` 或 `position:sticky`，必須隨主 Track 自然離開。

建議寬度為 `clamp(22rem, 38vw, 42rem)`；實際使用既有 Token。

## Gallery

將參考頁三欄垂直錯落轉譯為兩列橫向錯落：

```text
上排：wide／square／portrait／wide
下排：portrait／wide／square／portrait
```

要求：

- 使用 CSS Grid。
- `grid-template-rows: repeat(2, minmax(0, 1fr))`。
- `grid-auto-flow: column`。
- `grid-auto-columns`使用`clamp()`。
- `width:max-content`。
- 實際寬度由資料和 DOM 量測。
- 不建立內層 Scrollbar。
- 不建立第二套 Pointer Drag。
- 不建立自動無限 Marquee。
- 不寫死 `300vw`。
- 不使用 `index * innerWidth`。
- 不以 `nth-child` 綁定特定作品。

首頁支援1～8件，預設6件；超過8件的公開作品只在`/artworks`顯示。

## 首頁圖片資訊

首頁可只顯示圖片，不顯示類別、標題、參與內容或說明文字，但資料不得刪除。

每張圖片必須是語意正確的 RouterLink，並具有：

- 三語 Accessible Name。
- 三語 Alt。
- 視覺隱藏的作品名稱。
- 圖片失敗Fallback。
- 鍵盤 Focus Ring。
- 正確 `/artworks/:slug`。

不得使用 `div @click`。

## 視覺效果

可以保留：

- 不同比例圖片。
- 高低錯落。
- 第一次進入時由右向左 Mask Reveal。
- 圖片內部約 -6% 至 +6%的水平 Parallax。
- Hover時1.02～1.04 Scale。
- Hover時輕微灰階恢復與亮度提升。

Card外框必須維持穩定；不可讓可點擊 Card 本身持續漂移。

返回列表時不重播 Reveal；Reduced Motion直接顯示。

## VIEW Cursor

桌面 Fine Pointer在 Artwork Card 上時顯示局部 `VIEW`圓形標籤：

- 保留系統 Cursor。
- 只在 Artwork Card 顯示。
- 沿用全站單一 `usePointerPosition`。
- 不新增 Global Pointer Listener。
- `pointer-events:none`。
- 離開 Card／Section、Route Change、Blur、頁籤Hidden、Breakpoint Change或Unmount時立即Hard Reset。
- 不等待縮小動畫結束才清除。

鍵盤 Focus 時在圖片內顯示固定 `View Artwork` 與 Focus Ring；手機不顯示跟隨Cursor，Tap一次直接前往詳情。

## Artwork Route Transition

沿用詳情轉場規格的 Vue＋GSAP Flip核心概念，改成Artwork命名與路由：

```text
點擊 Artwork Card
→ 暫停主 Track輸入
→ 記錄 scrollLeft與來源Card
→ 讀取 img.currentSrc及bounds
→ 建立唯一Transition Image
→ Router前往 /artworks/:slug
→ 等待Hero Target
→ Flip到Target
→ 顯示內容
→ 移除暫時DOM
```

- 使用`ArtworkCard`、`selectedArtwork`、`useArtworkTransition`。
- 不混用Project資料。
- 同時只能有一個Transition。
- 快速連點鎖定。
- 找不到來源、目標或Route失敗時使用Fade。
- Reduced Motion直接Route／Fade。
- Success、Cancel、Error與Unmount均清除Tween和暫時DOM。
- 返回列表時恢復原位置與Focus；找不到來源時不強制Reverse Flip。

## Responsive

### Desktop

- Title隨Track離開。
- 兩列橫向錯落圖片。
- 局部VIEW Cursor。
- 輕微圖片內部Parallax。
- 不啟用Pointer Drag。

### 手機橫向

- 由主Track Swipe。
- Title先出現再離開。
- Gallery可降為單列大圖或較矮兩列。
- 不顯示跟隨VIEW。
- 不建立Artworks內層Swipe。
- Tap一次前往詳情。

### 手機直向

- Title位於Gallery上方。
- 一欄或兩欄靜態Grid。
- 不啟用水平內層Gallery、VIEW Cursor或Parallax。

### Reduced Motion

- 停用Mask位移、Parallax、VIEW跟隨與Flip位移。
- 圖片、Focus與Route功能仍完整。

## 真實尺寸

Artworks寬度必須由共用量測取得：

- Intro Width。
- Gallery `scrollWidth`。
- Gap與Padding。
- Section `offsetLeft`與總寬。
- Track `scrollWidth`與`clientWidth`。

Navigation、背景、Header、Hash、Section Progress與Kitten必須共用同一份量測，不得各自推算。

## 圖片與效能

- 沿用`<picture>`、AVIF／WebP／Fallback、`srcset`、`sizes`、尺寸、Lazy Policy與三語Alt。
- Transition使用`currentSrc`。
- 即將出現的第一批Artworks不得因過度Lazy而空白。
- 離開Artworks後停止Reveal與Parallax更新。
- 不使用永久RAF或`setInterval`。
- 不增加全域Pointer Listener。
- 圖片載入、語言或Viewport改變後使用既有ResizeObserver重新量測。

## 禁止事項

不得：

- 自行建立作品圖片、名稱、角色或完成狀態。
- 加入自動無限Marquee。
- 固定Title。
- 建立內層Scrollbar或Drag。
- 刪除Accessible Name。
- 使用全站Stretching Cursor。
- 讓Card本體持續Parallax漂移。
- 直接搬運參考頁的文字、圖片、品牌或Body Class切換。
- 為本效果重建App、Router、Data或第二套Design System。

## 執行順序

1. 閱讀必讀檔與實際Vue結構並回報對照。
2. 執行修改前Production Build。
3. 完成Title＋Gallery同一水平Track及真實量測。
4. 完成純圖片RouterLink Semantic。
5. 完成1～8件兩列橫向Grid。
6. 完成Active Section範圍。
7. 加入Mask Reveal與圖片內部Parallax。
8. 加入VIEW Cursor與Hard Reset。
9. 先確認靜態詳情Route可用，再加入GSAP Flip。
10. 完成Desktop、手機橫向、手機直向與Reduced Motion。
11. 清除舊Gallery、重複Listener、RAF、Timer、Tween與無用CSS。
12. Production Build與QA。

## 驗收

- [ ] 修改前已閱讀所有必讀檔與目前截圖。
- [ ] 沒有自行想像或加入未提供素材。
- [ ] Title會隨主Track離開。
- [ ] 圖片自然接續進入，沒有自動Marquee或內層Scrollbar。
- [ ] Artworks整段維持相同章節狀態。
- [ ] 作品增減1～8件不需修改元件CSS。
- [ ] Hover顯示局部VIEW，Focus有等價提示。
- [ ] Card以RouterLink進入正確slug。
- [ ] VIEW與Transition不殘留。
- [ ] 返回時恢復位置與Focus。
- [ ] 手機橫向與直向Fallback正確。
- [ ] Reduced Motion資訊完整。
- [ ] 全站仍只有一個Global Pointer Listener。
- [ ] Production Build成功且Console無錯誤。

## 完成回報

完成後必須回報：

1. 保留、修改、新增與刪除檔案。
2. 參考Granular Details的轉譯方式。
3. 未移植的參考效果及原因。
4. Artworks寬度、Active範圍與Kitten進度算法。
5. VIEW Cursor與共用Pointer的整合。
6. Route Transition成功與Fallback流程。
7. Desktop、手機、鍵盤與Reduced Motion測試。
8. 清除的冗餘程式與待補素材。

