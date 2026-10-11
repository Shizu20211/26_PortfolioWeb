# 前端作品圖片

| 資料夾            | 作品             | 目前 slug         |
| ----------------- | ---------------- | ----------------- |
| shaker-maker      | 記憶萬花筒       | snake-maze        |
| city-guide        | 北歐城市旅遊導覽 | vue-travel        |
| marathon-redesign | 全國賽事網站重構 | marathon-redesign |
| booking           | 幻想島嶼訂房     | booking           |
| perfume-gallery   | 香水收藏圖鑑     | food-ordering     |
| my-pokedex        | My Pokédex       | my-pokedex        |
| live-weather-card | 即時天氣小卡     | live-weather-card |

每件作品的圖片放入對應資料夾。建議使用 cover.webp（列表封面）與 01.webp、02.webp、03.webp（詳細頁順序）；PNG、JPG 也可以，先保留原比例，不必裁成統一尺寸。建議準備完整介面及主要互動畫面；不要將數個畫面合成過長截圖。

目前已接入各作品的 01、02、03 圖片；hover 與列表封面採用 01。實際檔名前綴為 nos、gui、choco、per、poke、wea。更換圖片可沿用現有檔名；新增圖片需同步更新 src/data/frontendWorks.js 中的 galleries。

全國賽事作品使用「figma_pc.png」及「figma_mob.png」作為桌面、手機長圖，hover 使用 figma01.png。詳細頁桌面採子母畫面，低高度及窄視窗改成切換；長圖自動展示後循環，滑鼠停留或鍵盤聚焦時暫停，觸控或滾輪操作後改為手動捲動；不顯示控制列。減少動態效果模式只提供手動閱讀。

一般作品圖片滿版等比裁切，以每張約 5 秒、淡入淡出 0.4 秒自動循環；不顯示控制列。減少動態效果模式顯示首張。
