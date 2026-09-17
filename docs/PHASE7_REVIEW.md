# Phase 7 檢核：Footer、Magnetic Hover、Kitten 與總整合

狀態：待使用者瀏覽器檢核。

## 本階段範圍

- About Footer：版權資訊與返回首頁操作。
- Magnetic Hover：只套用標記 `data-magnetic` 的主要操作，限桌面細指標裝置。
- CatFollower：使用 PSD 拆分的八層 PNG，限制在底部 Navigation 附近，跟隨水平 Pointer 並約每秒判斷跳躍。
- 總整合：三語文案、Reduced Motion、Touch 隔離、事件與計時器清理、文件更新。

## 瀏覽器檢核清單

### 桌面

- [ ] Header、語言、Home 主操作、Navigation、詳情返回及 Footer 返回首頁具有輕量磁吸，不影響點擊。
- [ ] 小貓只在 Navigation 上方移動，不進入作品主體或遮擋導覽操作。
- [ ] Pointer 左右移動時小貓正確轉向，停止後腳部動畫停止。
- [ ] 頭、身體、尾巴、瞳孔與四腳維持正確圖層，瞳孔朝 Pointer 方向小幅追蹤。
- [ ] 步行時四腳交錯且頭身起伏；Idle 尾巴持續擺動；Jump 時前後腳收起。
- [ ] Pointer 位於導覽上方內容區時，小貓約每秒判斷並觸發一次跳躍。
- [ ] About Footer 不覆蓋長文、聯絡資料或底部 Navigation。
- [ ] Footer 返回首頁後 Active Section、頁碼及網址 Hash 同步。

### 手機橫向與直向

- [ ] 小貓與 Magnetic Hover 不執行，不攔截 Swipe／Touch。
- [ ] Footer 仍可閱讀，返回首頁按鈕可觸碰。
- [ ] 五個 Section 原有的橫向／直向操作未受影響。

### 無障礙與穩定性

- [ ] 鍵盤 Focus Ring 清楚，磁吸位移不影響 Tab 順序。
- [ ] 開啟 Reduced Motion 後磁吸、小貓移動與跳躍停止。
- [ ] 切換三種語言後 Footer 文案正確且不跑版。
- [ ] Project Detail 開關後動態加入的按鈕仍可正常使用，沒有殘留位移。

## 通過後

使用者確認本階段通過時建立 `v0.7.0-phase7` Git Tag；建立前保持 Clean Working Tree。
