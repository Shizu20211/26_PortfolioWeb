# Phase 0 現況基準

記錄日期：2026-09-11

本文件只記錄增修開始前的實際狀態，不代表後續功能已完成。

## Build 基準

- `npm run format:check`：通過。
- `npm run build`：通過。
- Vite：8.2.2（lockfile 實際安裝版本）。
- Build 完成模組：50。
- 首頁 JavaScript：約 111.43 kB，gzip 約 44.25 kB。
- Intro PNG：約 1,038.25 kB。

## 既有路由基準

下列路由在本機開發伺服器均回應 HTTP 200：

```text
/
/projects/taipei-water-park
/projects/snake-maze
/projects/vue-travel
/projects/marathon-redesign
/projects/fantasy-booking
/projects/food-ordering
/artworks
```

尚未建立：

```text
/artworks/:slug
```

## 既有架構

- `App.vue` 僅負責最外層 `RouterView`。
- `PortfolioOverviewView.vue` 組合五個 Section。
- 首頁包含 Home、Featured、Projects、Artworks、About 五章。
- Project、Artwork、Section 與三語內容分別集中在 `src/data`。
- Active Section 由 `useActiveSection.js` 的 IntersectionObserver 管理。
- 橫向操作集中在 `useHorizontalNavigation.js`。

## 既有導航與事件

目前保留且後續需要驗證：

- 滑鼠垂直滾輪逐章切換。
- Trackpad 原生水平輸入。
- 左右方向鍵。
- Section Navigation。
- URL Hash。
- 手機原生 Swipe。

目前仍存在、預定於 Phase 1 移除：

- Track `pointerdown`、`pointermove`、`pointerup`、`pointercancel`。
- Pointer Capture。
- `.is-dragging` 狀態。
- `grab`／`grabbing` Cursor。

## 目前素材

| 素材                           |    實際尺寸 | 狀態                                   |
| ------------------------------ | ----------: | -------------------------------------- |
| `intro-flower-window-wide.png` | 3100 × 2067 | 現有 Hero 圖片，保留                   |
| `cloudA.png`                   |   370 × 183 | 使用者提供，Phase 2 接入 FloatingCloud |
| `cloudB.png`                   |   372 × 123 | 使用者提供，Phase 2 接入 FloatingCloud |
| `FlowerBlue.png`               |   233 × 232 | 使用者提供，Phase 2 作為 Home 純裝飾   |
| `FlowerPink.png`               |   231 × 231 | 使用者提供，Phase 2 作為 Home 純裝飾   |

五張圖片均為 RGBA PNG。

## Phase 0 納入基準的既有未提交內容

- 上一輪 README 與 Editing Guide 更新。
- 單一循環語言切換器及其 CSS；Phase 1 將依最新規格改成三顆獨立按鈕。
- 四張使用者提供的雲朵與花卉 PNG。
- 素材資料夾已有圖片後，原 `.gitkeep` 的移除。

## 已知後續工作

- 真實 Section／Panel Offset 與 ResizeObserver 尚未建立。
- 桌面 Pointer Drag 尚未移除。
- 語言切換仍是單一循環按鈕。
- Featured 尚未擴充成三個 Panel。
- Projects 尚未改為 Hover List。
- Artworks 尚未配置 slug 與動態錯落 Gallery。
- `/artworks/:slug`、GSAP Flip、Footer、Magnetic Hover 與 Navigation Kitten 尚未建立。
