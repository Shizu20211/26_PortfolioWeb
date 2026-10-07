# Codex 參考包使用說明

## 為什麼需要這個資料夾

ChatGPT對話中的附件、暫存工作區與Library檔案不會自動出現在本機Codex的檔案系統。本包必須解壓縮後放進Vue專案，Codex才能依指令實際讀取。

## 建議位置

將整個資料夾放入：

```text
<你的Vue專案>/docs/codex-reference/
```

不要只把ZIP放進專案；必須先解壓縮。

## 檔案用途

| 檔名 | 用途 |
|---|---|
| `Codex執行企劃_第一階段橫向作品集.md` | 主執行指令 |
| `Codex補充說明_Design_System實作規範.md` | Token、元件狀態、無障礙與QA |
| `Codex補充指令_Artworks橫向作品長廊.md` | 最新Artworks覆寫指令 |
| `reference-page-source.txt` | 參考頁HTML／CSS／JS原始碼 |
| `artworks-current-layout.png` | 目前Artworks畫面基準 |
| `Codex_Project_Detail_Transition_Spec.md` | Card至詳情頁圖片轉場規格 |
| `Home_interactive_kitten.md` | Navigation Kitten參考 |
| `Sticky_Stretching_Cursor.md` | Sticky／Magnetic Hover參考；不得直接移植全站Cursor |

## 給Codex的啟動訊息

```text
參考檔已放在專案的 docs/codex-reference/。

請先完整閱讀：
1. docs/codex-reference/Codex執行企劃_第一階段橫向作品集.md
2. docs/codex-reference/Codex補充說明_Design_System實作規範.md
3. docs/codex-reference/Codex補充指令_Artworks橫向作品長廊.md
4. docs/codex-reference/reference-page-source.txt
5. docs/codex-reference/artworks-current-layout.png
6. docs/codex-reference/Codex_Project_Detail_Transition_Spec.md

再對照現有Vue原始碼。不得只依文件自行想像專案結構。

本輪以 Codex補充指令_Artworks橫向作品長廊.md 覆寫主指令中舊的Artworks Gallery／Marquee規格，其餘主指令與Design System規則繼續有效。

請先只回報：
- 實際找到的Artworks元件、Data、Router與主Track
- 文件與現況差異
- 保留／修改／新增檔案
- 參考Granular Details會保留及不移植的效果

確認必讀檔皆可開啟且修改前Production Build成功後，才開始實作。
```

## 注意

- 若本機檔名與文件不同，應先以實際用途對照並回報。
- 不得將參考頁整份貼入Vue。
- 不得使用參考頁Stock圖片或文案。
- 不得重新建立Demo或集中至App.vue。
- 任一必讀檔仍無法開啟時，Codex應指出精確路徑，而不是自行猜測。

