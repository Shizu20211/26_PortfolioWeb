# Phase 8 檢核：Artworks 滾輪驅動橫向作品長廊

狀態：使用者已確認通過；正式作品素材加入後須回頭複審。

## 階段目標

將首頁 Artworks 從固定 2 × 4 文字卡片改為由 Portfolio 主 Track 驅動的橫向作品長廊，並轉譯參考程式 Granular Details 的圖片比例、留白、Mask Reveal、遮罩內視差及 Hover 視覺。

本階段不建立內層 Scrollbar、Pointer Drag、Marquee、Sticky Title、Lenis 或獨立 ScrollTrigger Track。

## 資料與素材

- 保留既有八筆 Artwork 名稱、類型與 Contribution。
- 每筆資料加入唯一英文 `slug`、`layout`、公開狀態及首頁排序。
- `layout` 支援 `portrait`、`square`、`wide`。
- 正式圖片尚未提供，暫時共用 `intro-flower-window-wide.png`。
- 正式圖片預定放在 `src/assets/images/artworks/`。
- 每張圖片可由 `focalPosition` 調整裁切焦點，由 `parallaxStrength` 調整視差強度。

## 首頁版面

- Artworks Title 是主 Track 的普通內容，隨橫向捲動自然離場。
- 第一排依序顯示 01–04；第二排依序顯示 05–08。
- 上下排使用兩條獨立、內容寬度驅動的 Row，避免不同圖片比例共用 Grid 欄寬造成大空白。
- 上下排共用相同起點與終點；以實際較寬的一排作為共同寬度。
- 較短的一排由卡片彈性吸收寬度差，利用不同圖片比例讓接縫錯開，形成磚牆式排列，不以整排位移製造空白。
- 首尾保留安全空間，直到最後一張作品離場才進入 About。
- Artworks 全程保持相同背景、Hash、Navigation Active 與 Kitten 真實進度。

## 動畫與互動

- 每張 Card 由橫向 IntersectionObserver 獨立判斷進場。
- 圖片進入可視區約 12% 後才開始 Reveal，不以整個 Section 為觸發單位。
- Mask Reveal 約 1350ms；圖片內部進場約 1200ms。
- Reveal 播放一次；從詳情頁返回時不重播。
- Card 外框固定，只讓圖片在遮罩內進行小幅水平視差。
- 桌面 Fine Pointer 顯示局部 VIEW；保留系統 Cursor。
- Hover 使用克制的色彩恢復及 `1.10 → 1.13` Scale。
- Keyboard Focus 顯示固定「查看作品」提示及 Focus Ring。
- Reduced Motion 停用 Reveal 位移、Parallax、VIEW 跟隨與 Flip 位移。

## 路由與詳情

- 保留 `/artworks` 完整列表。
- 新增共用 `/artworks/:slug` 詳情路由。
- Card 使用 RouterLink 語意及三語 Accessible Name。
- 正式圖片存在時可使用 temporary image 與 GSAP Flip；圖片缺失時使用直接路由／Fade fallback。
- 返回首頁時恢復原 Artworks Track 位置。
- 詳情目的圖片與文字在 Flip 抵達前保持隱藏；抵達後以短 Crossfade 接替 temporary image，避免重複圖片閃現。

## 主 Track 邊界交接

- Featured／Artworks 內部仍由主 Track 連續捲動。
- 加寬 Section 抵達首尾後，直接依主章節索引前往上一章／下一章，不再透過內部作品停留點推算。
- 桌機滑鼠滾輪可以單獨完成 Projects → Artworks → About 與反向流程。
- Trackpad 水平輸入及手機 Swipe 保留原生操作。

## Artworks Intro

- `03・創作` 小標與 `藝術與工藝` Title 保留於獨立 Intro Header。
- 小標具有獨立間距、層級與可視規則，不受泛用 Heading Paragraph 樣式影響。
- Intro 仍是普通 Track 內容，會與 Title 一起自然離場，不做 Sticky。

## Responsive

### 桌機

- 兩排磚牆式橫向作品列。
- 滾輪透過現有主 Track 連續前進。
- 啟用 VIEW、Reveal 與輕量圖片內視差。

### 手機橫向

- 沿用主 Track Swipe，不建立 Artworks 內層 Swipe。
- 維持上下排共同邊界，並縮小卡片與圖片視差。
- 不顯示跟隨式 VIEW。
- 所有圖片高度保持在 Section 與 Navigation 安全範圍內。

### 手機直向

- Title 位於作品之前。
- 作品改為靜態兩欄 Grid。
- 改為規則兩欄，取消內部視差及跟隨 VIEW。
- 320 CSS px 下仍可閱讀與操作。

## 元件與 Composable 分工

- `ArtworksSection.vue`：篩選首頁作品、分成上下兩排並提供 Track Panel。
- `ArtworkPreviewCard.vue`：RouterLink、Responsive Image、VIEW、Focus 與 Transition 來源。
- `useArtworkArchiveMotion.js`：逐張 IntersectionObserver、Reveal 記錄與可見圖片視差。
- `useArtworkTransition.js`：Artwork route transition、fallback 與返回位置。
- `usePointerPosition.js`：Artwork VIEW 與 Kitten 共用的單一 Pointer 資料源。
- `useTrackMeasurements.js`：共用真實 Section、Panel 與 Track 尺寸。
- `useHorizontalNavigation.js`：Artworks 加寬區段的主滾輪操作。
- 倒退進入加寬 Section 時，以該 Section 的最後可視位置為停靠點，避免落入內部錯誤停靠點。
- Artworks 標題下方保留三語說明欄位；目前使用「說明內容待補充」暫代。
- 詳情圖片轉場縮短交接時間，有圖片時交接前不顯示白色容器底。
- Artworks 與相鄰 Section 的切換統一使用單一動畫控制，完成後才恢復 Scroll Snap。
- 全域邊界裝飾改用實際 Section 量測位置，並穩定手機直向的章節可視比例判定。

## 瀏覽器驗收清單

### 版面

- [ ] 第一排為 01–04，第二排為 05–08。
- [ ] 上下排起點、終點一致，圖片接縫呈磚牆式錯位。
- [ ] 不同圖片比例之間沒有非預期的大空白。
- [ ] 所有卡片與動畫均未超出 Section 高度。
- [ ] 最後作品與 About 之間沒有突兀底色斷層。

### 動畫與操作

- [ ] 每張圖實際進入畫面後才獨立播放 Reveal。
- [ ] Reveal 速度柔和，沒有整區同時播放。
- [ ] 返回列表不重播已顯示作品。
- [ ] Hover、Focus、Touch 均能進入正確 slug。
- [ ] VIEW、Observer、RAF、Tween 與 temporary DOM 不殘留。
- [ ] 詳情目的圖片不會提前閃現，Temporary Image 交接沒有斷落感。

### Responsive 與無障礙

- [ ] 桌機滾輪、Trackpad、方向鍵及底部 Navigation 正常。
- [ ] 只使用滑鼠滾輪即可離開 Artworks 並進入 About。
- [ ] 手機橫向 Swipe 可進出 Artworks，沒有內層滾動陷阱。
- [ ] 手機直向兩欄排列沒有水平 overflow。
- [ ] 中／英／日切換後維持位置並重新量測。
- [ ] Reduced Motion、鍵盤及 Focus Ring 正常。

## 待補資料

- 八件作品的正式圖片與各尺寸來源。
- 每張圖片的中／英／日 Alt。
- 作品年份、媒材、製作過程與公開權利。
- 詳情頁正式文案與外部連結。

## 通過紀錄

使用者已確認 Phase 8 通過。建立 `v0.8.0-phase8` Git Tag 前仍須保持 Clean Working Tree。
