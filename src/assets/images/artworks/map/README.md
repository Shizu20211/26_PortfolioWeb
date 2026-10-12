# 高雄旅遊地圖：目前使用素材

- brochure-f.png：作品卡片與詳情封面，共用同一 URL，不重複輸出圖片。
- brochure-b.png：錯位摺頁背面。
- map-full.png：20% 透明度的背景地圖。
- spot\_\*.png：五件手繪景點區域插畫。
- stamp-01.png 至 stamp-05.png：五款地方紋樣印章。
- stamp-photo-1.jpg、stamp-photo-2.jpg：實體印章與試印照片。

資料與三語文字集中於 src/data/kaohsiungMap.js；三個主要畫面及 scoped 樣式位於 src/components/KaohsiungMapCaseStudy.vue。一般插畫與照片使用 lazy loading，摺頁封面保留優先載入以支援既有轉場。沒有原圖／PDF 超連結、地圖熱點或路線底圖展示。

2026-10-13 清理：已依使用者要求刪除未使用的舊 cover、map-base、跨頁 PDF／預覽共八個檔案，不保留暫存備份。

目前視覺設定保留：兩件較大插畫 scale(0.8)、背景位置／裁切、20% 透明度、噪點、輕微視差與局部滾輪緩動。
