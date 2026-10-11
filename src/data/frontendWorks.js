import raceCover from '@/assets/images/frontend-works/marathon-redesign/figma01.png'
import nos01 from '@/assets/images/frontend-works/shaker-maker/nos01.png'
import nos02 from '@/assets/images/frontend-works/shaker-maker/nos02.png'
import nos03 from '@/assets/images/frontend-works/shaker-maker/nos03.png'
import gui01 from '@/assets/images/frontend-works/city-guide/gui01.png'
import gui02 from '@/assets/images/frontend-works/city-guide/gui02.png'
import gui03 from '@/assets/images/frontend-works/city-guide/gui03.png'
import per01 from '@/assets/images/frontend-works/perfume-gallery/per01.png'
import per02 from '@/assets/images/frontend-works/perfume-gallery/per02.png'
import per03 from '@/assets/images/frontend-works/perfume-gallery/per03.png'
import poke01 from '@/assets/images/frontend-works/my-pokedex/poke01.png'
import poke02 from '@/assets/images/frontend-works/my-pokedex/poke02.png'
import poke03 from '@/assets/images/frontend-works/my-pokedex/poke03.png'
import wea01 from '@/assets/images/frontend-works/live-weather-card/wea01.png'
import wea02 from '@/assets/images/frontend-works/live-weather-card/wea02.png'
import wea03 from '@/assets/images/frontend-works/live-weather-card/wea03.png'
import choco01 from '@/assets/images/frontend-works/booking/choco01.png'
import choco02 from '@/assets/images/frontend-works/booking/choco02.png'
import choco03 from '@/assets/images/frontend-works/booking/choco03.png'
import raceDesktop from '@/assets/images/frontend-works/marathon-redesign/figma_pc.png'
import raceMobile from '@/assets/images/frontend-works/marathon-redesign/figma_mob.png'

export const frontendWorks = [
  {
    slug: 'snake-maze',
    demoUrl: 'https://shizu20211.github.io/26frontend-mini-projects/Shaker_Maker/',
    title: {
      'zh-Hant': '記憶萬花筒',
      en: 'Memory Kaleidoscope',
      ja: '記憶の万華鏡',
    },
    summary: {
      'zh-Hant':
        '以日常記憶中的小物為素材，打造自由編排的互動式畫面，在製作與互動裡找回觸動自己記憶裡那個片刻。\n使用者可匯入圖片，透過拖曳、旋轉、縮放與圖層調整組合個人化收藏，探索搖動與動態效果帶來的視覺變化。',
      en: 'An interactive canvas made from the small objects held in everyday memory—a place to rediscover a moment that still resonates, through making and play.\nImport images, then drag, rotate, scale, and reorder layers to compose a personal collection, exploring how shaking and motion reshape the scene.',
      ja: '日常の記憶にある小物から、自由に組み立てられるインタラクティブな画面を制作。つくること、触れることを通じて、心に残るあの一瞬をもう一度見つける体験を目指しました。\n画像を取り込み、ドラッグ・回転・拡大縮小・重なり順の調整で自分だけのコレクションを構成し、揺れや動きが生む画面の変化を探ります。',
    },
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    details: {
      'zh-Hant':
        '整合素材匯入、物件編輯與即時視覺回饋，將編排狀態與動態物理效果分開管理，讓使用者能自由調整物件並產生不同的畫面組合。',
      en: 'Combines asset import, object editing, and immediate visual feedback. Arrangement state and dynamic physics effects are managed separately, allowing users to adjust objects freely and create different compositions.',
      ja: '素材の取り込み、オブジェクト編集、即時の視覚フィードバックを統合。配置の状態と動的な物理効果を分けて管理し、自由な調整と多様な画面構成を可能にしました。',
    },
  },
  {
    slug: 'vue-travel',
    demoUrl: 'https://shizu20211.github.io/26city-guide/',
    title: {
      'zh-Hant': '北歐城市旅遊導覽',
      en: 'Nordic City Guide',
      ja: '北欧シティガイド',
    },
    summary: {
      'zh-Hant':
        '以斯德哥爾摩、哥本哈根與赫爾辛基為主題，使用 Vue 建立城市旅遊導覽網站。透過城市切換與景點詳細頁，練習單頁應用的元件架構、路由及資料呈現。',
      en: 'A Vue travel guide to Stockholm, Copenhagen, and Helsinki. Moving between cities and attraction details, the project explores how component structure, routing, and data rendering shape a single-page application.',
      ja: 'ストックホルム、コペンハーゲン、ヘルシンキをたどる、Vueで制作した都市観光ガイド。都市の切り替えと観光スポットの詳細ページを通して、SPAのコンポーネント構成、ルーティング、データ表示を学びました。',
    },
    tools: ['Vue', 'Vite', 'Vue Router', 'JavaScript', 'HTML5', 'CSS3', 'GitHub Pages'],
    details: {
      'zh-Hant':
        '將城市與景點整理為可重複使用的資料，透過路由參數呈現對應內容，並處理響應式排版、圖片路徑與部署設定。',
      en: 'Organizes cities and attractions as reusable data, renders matching content through route parameters, and handles responsive layouts, image paths, and deployment configuration.',
      ja: '都市と観光スポットを再利用可能なデータとして整理し、ルートパラメータに応じた内容を表示。レスポンシブレイアウト、画像パス、デプロイ設定にも対応しました。',
    },
  },
  {
    slug: 'marathon-redesign',
    demoUrl:
      'https://www.figma.com/proto/Gi3iqkXjR1Tt4bXTugugcM/%E9%A6%AC%E6%8B%89%E6%9D%BE%E7%B6%B2?node-id=108-34&starting-point-node-id=108%3A34&t=J4OPK8P6GbrhdXlQ-1',
    title: {
      'zh-Hant': '全國賽事網站重構',
      en: 'Nationwide Race Website Redesign',
      ja: '全国レース情報サイトのリデザイン',
    },
    summary: {
      'zh-Hant':
        '團隊以全國賽事網站為重構對象，分析既有網站在資訊量增加與架構老化下的瀏覽問題，將設計目標設定為一頁式網站。透過多條件篩選、賽事時程整理與分類整合，重新規劃資訊層級及視覺介面，並使用 Figma 製作桌面、手機版設計與互動原型。',
      en: 'A team redesign of a nationwide race-information website. As its content grew and its structure aged, we examined the obstacles to browsing and set a single-page website as our design direction. Multi-criteria filters, clearer schedules, and integrated categories guided a new information hierarchy and visual interface, developed as desktop and mobile designs and an interactive Figma prototype.',
      ja: '全国のレース情報を扱うサイトを、チームでリデザイン。情報量の増加と構造の老朽化による閲覧上の課題を分析し、1ページで情報をたどれるサイトを目指しました。複数条件での絞り込み、日程情報の整理、カテゴリの統合を軸に情報階層と画面を見直し、Figmaでデスクトップ・モバイル版のデザインとインタラクティブなプロトタイプを制作しました。',
    },
    tools: ['Figma'],
  },
  {
    slug: 'fantasy-booking',
    demoUrl: 'https://shizu20211.github.io/26frontend-mini-projects/bookingweb/',
    title: {
      'zh-Hant': '幻想島嶼訂房',
      en: 'Fantasy Island Booking',
      ja: '幻想の島の宿泊予約',
    },
    summary: {
      'zh-Hant':
        '以奇幻住宿為主題的訂房介面練習，結合房型展示、條件篩選與排序、預訂彈窗及地圖互動。',
      en: 'A booking interface exercise set around imagined island stays, bringing together room displays, filtering and sorting, booking modals, and map interactions.',
      ja: '幻想の島での滞在をテーマにした、宿泊予約インターフェースの練習作品。客室表示、条件による絞り込みと並べ替え、予約モーダル、地図操作を一つの体験にまとめています。',
    },
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Font Awesome'],
    details: {
      'zh-Hant':
        '使用原生 JavaScript 處理 DOM 與事件，依入住人數篩選房型、依價格或評分排序，並整合預訂資訊彈窗與地圖拖曳縮放，建立連貫的介面操作流程。',
      en: 'Uses vanilla JavaScript for DOM manipulation and events, filters rooms by guest count, sorts by price or rating, and combines booking-information modals with map dragging and zooming to create a coherent interaction flow.',
      ja: 'ネイティブJavaScriptでDOMとイベントを処理し、宿泊人数による客室の絞り込み、価格・評価による並べ替えを実装。予約情報モーダルと地図のドラッグ・ズームを連携させ、一貫した操作の流れを構築しました。',
    },
  },
  {
    slug: 'food-ordering',
    demoUrl: 'https://shizu20211.github.io/26frontend-mini-projects/collection-gallery-perfume/',
    title: {
      'zh-Hant': '香水收藏圖鑑',
      en: 'Perfume Collection Gallery',
      ja: '香水コレクション図鑑',
    },
    summary: {
      'zh-Hant':
        '以香氣與個人收藏為主題，運用 Vue CDN 與 Tailwind CSS 建立互動圖鑑，結合搜尋分類、卡片翻轉及收藏新增與編輯。',
      en: 'An interactive gallery centered on fragrance and personal collections, built with Vue via CDN and Tailwind CSS. Search and category filters, card flips, and collection creation and editing bring each entry into view.',
      ja: '香りと個人のコレクションをテーマに、Vue CDNとTailwind CSSで制作したインタラクティブな図鑑。検索・カテゴリによる絞り込み、カードの反転、コレクションの追加・編集を組み合わせ、一つひとつの香りを眺められる画面にまとめました。',
    },
    tools: ['Vue 3（CDN）', 'Tailwind CSS（CDN）', 'JavaScript', 'HTML5', 'CSS3', 'Lucide Icons'],
    details: {
      'zh-Hant':
        '透過響應式資料綁定整合搜尋條件、表單驗證及卡片互動，使用 CSS 3D 效果呈現翻轉畫面，並以 sessionStorage 暫存收藏資料。',
      en: 'Uses reactive data binding to coordinate search criteria, form validation, and card interactions. CSS 3D effects animate card flips, while sessionStorage temporarily preserves collection data.',
      ja: 'リアクティブなデータバインディングで検索条件、フォーム検証、カード操作を連携。CSS 3Dによる反転表現を実装し、sessionStorageでコレクションデータを一時保存します。',
    },
  },
  {
    slug: 'my-pokedex',
    demoUrl: 'https://shizu20211.github.io/26frontend-mini-projects/pokemon-catch/',
    title: {
      'zh-Hant': 'My Pokédex',
      en: 'My Pokédex',
      ja: 'My Pokédex',
    },
    summary: {
      'zh-Hant':
        '串接 PokéAPI，以圖鑑介面呈現神奇寶貝資料，並且支援名稱／編號查詢與類型篩選，練習將外部資料轉換為可瀏覽的視覺內容。',
      en: 'A Pokédex interface that brings Pokémon data from PokéAPI into view. Name or ID lookup and type filtering offer practice in turning external data into visual content that is easy to explore.',
      ja: 'PokéAPIから取得したポケモンのデータを、図鑑として眺められる画面に。名前・番号による検索とタイプ別の絞り込みを通して、外部データを閲覧しやすい視覚コンテンツへ整える実装を学びました。',
    },
    tools: ['HTML5', 'CSS3', 'JavaScript', 'PokéAPI'],
    details: {
      'zh-Hant':
        '使用非同步請求取得角色與類型資料，解析 JSON 後動態更新畫面，整合查詢、篩選及載入提示。',
      en: 'Fetches Pokémon and type data asynchronously, parses JSON to update the interface dynamically, and combines lookup, filtering, and loading indicators.',
      ja: '非同期リクエストでポケモンとタイプのデータを取得し、JSONを解析して画面を動的に更新。検索、絞り込み、読み込み表示を統合しました。',
    },
  },
  {
    slug: 'live-weather-card',
    demoUrl: 'https://shizu20211.github.io/26frontend-mini-projects/weather/',
    title: {
      'zh-Hant': '即時天氣小卡',
      en: 'Live Weather Card',
      ja: 'リアルタイム天気カード',
    },
    summary: {
      'zh-Hant':
        '透過城市搜尋呈現天氣資訊，並依天氣狀態切換背景與動態效果，練習 API 資料與視覺介面的整合。',
      en: 'A city-search weather card whose backgrounds and motion change with the weather. The project explores how API data can give a visual interface a sense of the conditions outside.',
      ja: '都市を検索すると、天気情報とともに、その日の空模様に応じた背景や動きが現れるカード。APIデータを視覚的な表現につなぐ実装を学びました。',
    },
    tools: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'jQuery AJAX',
      'OpenWeatherMap API',
      'Cloudflare Workers',
      'GitHub Pages',
    ],
    details: {
      'zh-Hant':
        '部署 Cloudflare Worker 作為天氣 API 的後端代理服務，建立前端查詢、代理端點與外部 API 之間的資料流程。前端使用 jQuery AJAX 呼叫代理端點，將回傳的天氣資料轉換為文字、圖示與場景效果，並記錄上次查詢的城市，練習串接與部署 Serverless 服務的完整流程。',
      en: 'Deploys a Cloudflare Worker as a backend proxy for the weather API, establishing the data flow between frontend queries, the proxy endpoint, and the external API. The frontend calls the proxy with jQuery AJAX, turns returned weather data into text, icons, and scene effects, and remembers the last searched city. The project practices integrating and deploying a serverless service.',
      ja: '天気APIのバックエンドプロキシとしてCloudflare Workerをデプロイし、フロントエンドの検索、プロキシエンドポイント、外部APIをつなぐデータフローを構築。jQuery AJAXでプロキシを呼び出し、取得した天気データを文字・アイコン・背景演出に反映します。最後に検索した都市も記録し、Serverlessサービスの連携からデプロイまでを学びました。',
    },
  },
]

const galleries = {
  'snake-maze': [
    { type: 'image', src: nos01, width: 900, height: 900, alt: '作品介面 01' },
    { type: 'image', src: nos02, width: 897, height: 896, alt: '作品介面 02' },
    { type: 'image', src: nos03, width: 784, height: 784, alt: '作品介面 03' },
  ],
  'vue-travel': [
    { type: 'image', src: gui01, width: 798, height: 797, alt: '作品介面 01' },
    { type: 'image', src: gui02, width: 1204, height: 900, alt: '作品介面 02' },
    { type: 'image', src: gui03, width: 804, height: 804, alt: '作品介面 03' },
  ],
  'food-ordering': [
    { type: 'image', src: per01, width: 669, height: 669, alt: '作品介面 01' },
    { type: 'image', src: per02, width: 936, height: 695, alt: '作品介面 02' },
    { type: 'image', src: per03, width: 1332, height: 678, alt: '作品介面 03' },
  ],
  'my-pokedex': [
    { type: 'image', src: poke01, width: 708, height: 708, alt: '作品介面 01' },
    { type: 'image', src: poke02, width: 900, height: 900, alt: '作品介面 02' },
    { type: 'image', src: poke03, width: 734, height: 683, alt: '作品介面 03' },
  ],
  'live-weather-card': [
    { type: 'image', src: wea01, width: 691, height: 691, alt: '作品介面 01' },
    { type: 'image', src: wea02, width: 689, height: 689, alt: '作品介面 02' },
    { type: 'image', src: wea03, width: 661, height: 661, alt: '作品介面 03' },
  ],
  'fantasy-booking': [
    { type: 'image', src: choco01, width: 871, height: 871, alt: '作品介面 01' },
    { type: 'image', src: choco02, width: 843, height: 745, alt: '作品介面 02' },
    { type: 'image', src: choco03, width: 727, height: 727, alt: '作品介面 03' },
  ],
}
const order = [
  'snake-maze',
  'vue-travel',
  'food-ordering',
  'my-pokedex',
  'live-weather-card',
  'fantasy-booking',
  'marathon-redesign',
]
const localizedTags = {
  'snake-maze': [
    {
      'zh-Hant': '創意互動',
      en: 'Creative Interaction',
      ja: '創作とインタラクション',
    },
  ],
  'vue-travel': [
    {
      'zh-Hant': 'Vue 開發',
      en: 'Vue Development',
      ja: 'Vue開発',
    },
  ],
  'food-ordering': [
    {
      'zh-Hant': 'Vue CDN',
      en: 'Vue CDN',
      ja: 'Vue CDN',
    },
    {
      'zh-Hant': '介面互動',
      en: 'UI Interaction',
      ja: 'UIインタラクション',
    },
  ],
  'my-pokedex': [
    {
      'zh-Hant': 'API 串接',
      en: 'API Integration',
      ja: 'API連携',
    },
  ],
  'live-weather-card': [
    {
      'zh-Hant': 'API 串接',
      en: 'API Integration',
      ja: 'API連携',
    },
    {
      'zh-Hant': 'Serverless',
      en: 'Serverless',
      ja: 'Serverless',
    },
  ],
  'fantasy-booking': [
    {
      'zh-Hant': '原生 JavaScript',
      en: 'Vanilla JavaScript',
      ja: 'ネイティブJavaScript',
    },
  ],
  'marathon-redesign': [
    {
      'zh-Hant': 'UI/UX 設計',
      en: 'UI/UX Design',
      ja: 'UI/UXデザイン',
    },
    {
      'zh-Hant': '團隊專案',
      en: 'Team Project',
      ja: 'チーム制作',
    },
  ],
}
for (const work of frontendWorks) {
  work.tags = localizedTags[work.slug] ?? work.tags
  if (galleries[work.slug]) {
    work.images = galleries[work.slug].map((image, index) => ({
      ...image,
      alt: Object.fromEntries(
        Object.entries(work.title).map(([locale, title]) => [locale, `${title} · ${index + 1}`]),
      ),
    }))
    work.media = work.images[0]
  }
  if (['vue-travel', 'fantasy-booking', 'my-pokedex'].includes(work.slug)) {
    work.imageNotice = {
      'zh-Hant': '＊本作品為前端練習，展示圖片取自網路，非本人拍攝或繪製',
      en: '* This is a front-end practice project. Display images were sourced online and were not photographed or illustrated by me.',
      ja: '＊本作品はフロントエンドの練習作品です。掲載画像はインターネットから取得したもので、本人が撮影・制作したものではありません。',
    }
  }
  if (work.slug === 'marathon-redesign') {
    const desktop = {
      type: 'image',
      src: raceDesktop,
      width: 3841,
      height: 13097,
      alt: {
        'zh-Hant': '全國賽事網站桌面版設計',
        en: 'Nationwide race website desktop design',
        ja: '全国レース情報サイトのデスクトップ版デザイン',
      },
    }
    work.longImages = [
      desktop,
      {
        type: 'image',
        src: raceMobile,
        width: 751,
        height: 4065,
        alt: {
          'zh-Hant': '全國賽事網站手機版設計',
          en: 'Nationwide race website mobile design',
          ja: '全国レース情報サイトのモバイル版デザイン',
        },
      },
    ]
    work.media = {
      type: 'image',
      src: raceCover,
      width: 1153,
      height: 899,
      alt: {
        'zh-Hant': '全國賽事網站重構預覽',
        en: 'Nationwide race website redesign preview',
        ja: '全国レース情報サイトのリデザインプレビュー',
      },
    }
    work.details = {
      'zh-Hant':
        '團隊分析原網站後發現，雖然網站提供完整賽事資訊，但隨著資訊量增加與架構老化，篩選、時程辨識、分類與視覺層級逐漸影響瀏覽效率。因此，我們以一頁式網站為重構目標，針對以下問題提出設計調整：\n\n1. 篩選功能不足或錯誤 → 多條件篩選\n整理地區、賽事類型及報名狀態等查找條件。\n\n2. 賽事時間更新不明確 → 時程資訊整理\n透過日期、報名狀態與行事曆呈現，協助辨識賽事時程。\n\n3. 賽程分類雜亂 → 分類與資訊整合\n將賽事、篩選及認證資訊整合於一頁式架構。\n\n4. 缺乏整體視覺規劃 → 直覺介面\n以一致的卡片、導覽及資訊層級，建立桌面與手機的瀏覽體驗。',
      en: 'Our review found that the original site offered comprehensive race information, but growing content and an aging structure made filtering, schedules, categories, and visual hierarchy harder to navigate. We set a single-page website as our redesign goal and addressed these issues:\n\n1. Insufficient or incorrect filters → Multi-criteria filtering\nOrganize search criteria around region, race type, and registration status.\n\n2. Unclear schedule updates → Clearer schedule information\nUse dates, registration status, and calendar views to make key timing easier to identify.\n\n3. Disorganized race categories → Integrated categories and information\nBring race listings, filters, and certification information into a single-page structure.\n\n4. Inconsistent visual planning → An intuitive interface\nEstablish consistent cards, navigation, and information hierarchy across desktop and mobile.',
      ja: '元のサイトには豊富なレース情報がありましたが、情報量の増加と構造の老朽化によって、絞り込み、日程の把握、分類、視覚的な階層に課題が生じていました。そこで、1ページで情報をたどれるサイトを目標に、次の改善を提案しました。\n\n1. 絞り込み機能の不足や誤り → 複数条件での絞り込み\n地域、レースの種類、申込状況などの検索条件を整理。\n\n2. 日程の更新が分かりにくい → 日程情報の整理\n日付、申込状況、カレンダー表示で、重要な時期を把握しやすく。\n\n3. レース分類の混乱 → 分類と情報の統合\nレース、絞り込み、認証情報を1ページの構成に整理。\n\n4. 統一された視覚設計の不足 → 直感的なインターフェース\nカード、ナビゲーション、情報階層をそろえ、デスクトップとモバイルの閲覧体験を整えました。',
    }
  }
}
frontendWorks.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
