import { kaohsiungMap } from '@/data/kaohsiungMap'
import { threeDWorks } from '@/data/threeDWorks'
import temporaryArtworkImage from '@/assets/images/intro/intro-flower-window-wide.png'
import boathouseCardImage from '@/assets/images/artworks/3d/boathouse-card.png'
import metalworkClock01 from '@/assets/images/artworks/metalwork/clock01.png'
import metalworkClock02 from '@/assets/images/artworks/metalwork/clock02.png'
import metalworkClock03 from '@/assets/images/artworks/metalwork/clock03.png'
import metalworkClock04 from '@/assets/images/artworks/metalwork/clock04.png'

const temporaryArtworkMedia = {
  cover: {
    src: temporaryArtworkImage,
    width: 3100,
    height: 2067,
  },
  alt: {
    'zh-Hant': '花景窗台插畫，暫作作品預覽圖',
    en: 'Floral window illustration used as a temporary artwork preview',
    ja: '作品プレビューに暫定使用している花景色の窓辺イラスト',
  },
  focalPosition: '50% 48%',
  parallaxStrength: 0.7,
}

export const artworks = [
  {
    ...temporaryArtworkMedia,
    key: 'water',
    slug: 'water-park-illustration-map',
    layout: 'portrait',
    published: true,
    showOnOverview: true,
    overviewOrder: 2,
    title: {
      'zh-Hant': '自來水插畫與地圖',
      en: 'Water Park Illustration & Map',
      ja: '水道園区のイラストと地図',
    },
    type: 'Illustration / Map',
    contribution: null,
  },
  {
    ...temporaryArtworkMedia,
    key: 'kaohsiung',
    slug: 'kaohsiung-stamp-map',
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 1,
    title: kaohsiungMap.title,
    type: 'Graphic / Map',
    cursorLabel: 'MAP',
    cover: kaohsiungMap.cover,
    alt: kaohsiungMap.title,
    focalPosition: '50% 50%',
    parallaxStrength: 0.35,
    caseStudy: 'kaohsiung-map',
    contribution: null,
  },
  {
    ...temporaryArtworkMedia,
    key: 'vtuber',
    slug: 'vtuber-backgrounds',
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 3,
    title: { 'zh-Hant': 'VTuber 背景', en: 'VTuber Backgrounds', ja: 'VTuber 背景' },
    type: 'Illustration',
    contribution: {
      'zh-Hant': '公開範圍與權利資訊待確認',
      en: 'Public scope and usage rights awaiting confirmation',
      ja: '公開範囲と使用権を確認中',
    },
  },
  {
    ...temporaryArtworkMedia,
    key: 'graphic',
    slug: 'graphic-design',
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 4,
    title: { 'zh-Hant': '平面設計', en: 'Graphic Design', ja: 'グラフィックデザイン' },
    type: 'Graphic Design',
    contribution: null,
  },
  {
    ...temporaryArtworkMedia,
    key: 'three-d',
    slug: '3d-creation',
    legacySlugs: ['maya-3d'],
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 6,
    title: {
      'zh-Hant': '3D 創作',
      en: '3D Creations',
      ja: '3D制作',
    },
    type: '3D / Maya',
    cursorLabel: '3D',
    caseStudy: '3d-creation',
    works: threeDWorks,
    cover: {
      src: boathouseCardImage,
      width: 1024,
      height: 768,
    },
    alt: {
      'zh-Hant': '船屋咖啡 3D 場景',
      en: 'Boathouse Café 3D scene',
      ja: 'ボートハウス・カフェの3Dシーン',
    },
    focalPosition: '50% 50%',
    parallaxStrength: 0.35,
    contribution: {
      'zh-Hant': '3D 建模、場景構成與網頁互動展示',
      en: '3D modeling, scene composition, and interactive web presentation',
      ja: '3Dモデリング、シーン構成、Webインタラクティブ表示',
    },
  },
  {
    ...temporaryArtworkMedia,
    key: 'dyeing',
    slug: 'botanical-traditional-dyeing',
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 5,
    title: {
      'zh-Hant': '植物染與傳統染織',
      en: 'Botanical & Traditional Dyeing',
      ja: '植物染めと伝統染織',
    },
    type: 'Textile Craft',
    contribution: null,
  },
  {
    ...temporaryArtworkMedia,
    key: 'printmaking',
    slug: 'printmaking',
    layout: 'square',
    published: true,
    showOnOverview: true,
    overviewOrder: 7,
    title: { 'zh-Hant': '版畫', en: 'Printmaking', ja: '版画' },
    type: 'Printmaking',
    contribution: null,
  },
  {
    key: 'metalwork',
    slug: 'metalwork',
    layout: 'portrait',
    published: true,
    showOnOverview: true,
    overviewOrder: 8,
    title: { 'zh-Hant': '貓的白日夢', en: "A Cat's Daydream", ja: '猫の白昼夢' },
    type: {
      'zh-Hant': '金工 / 砂模鑄造',
      en: 'Metalwork / Sand Casting',
      ja: '金工 / 砂型鋳造',
    },
    caseStudy: 'metalwork',
    cover: {
      src: metalworkClock01,
      width: 1343,
      height: 1407,
    },
    alt: {
      'zh-Hant': '鋁鑄窗景時鐘作品《貓的白日夢》',
      en: "A Cat's Daydream, a cast-aluminium window-scene clock",
      ja: 'アルミ鋳造による窓景の時計作品「猫の白昼夢」',
    },
    focalPosition: '50% 50%',
    parallaxStrength: 0.35,
    gallery: [
      {
        id: 'front',
        src: metalworkClock01,
        width: 1343,
        height: 1407,
        alt: {
          'zh-Hant': '《貓的白日夢》正面全貌',
          en: "Front view of A Cat's Daydream",
          ja: '「猫の白昼夢」の正面全景',
        },
      },
      {
        id: 'side',
        src: metalworkClock02,
        width: 1408,
        height: 1440,
        alt: {
          'zh-Hant': '作品側面與鋁鑄厚度',
          en: 'Side view showing the depth of the cast aluminium',
          ja: 'アルミ鋳造の厚みが見える側面',
        },
      },
      {
        id: 'window-detail',
        src: metalworkClock03,
        width: 1408,
        height: 1440,
        alt: {
          'zh-Hant': '窗花與鑄造表面細節',
          en: 'Window-pattern and cast-surface details',
          ja: '窓飾りと鋳造表面のディテール',
        },
      },
      {
        id: 'texture-detail',
        src: metalworkClock04,
        width: 1408,
        height: 1408,
        alt: {
          'zh-Hant': '鋁鑄紋理與景深細節',
          en: 'Close-up of the cast-aluminium texture',
          ja: 'アルミ鋳造の質感を捉えた接写',
        },
      },
    ],
    process: {
      'zh-Hant':
        '從保麗龍原型、砂模製作到鋁液澆鑄，在一次次塑形與修整之間，逐步尋找作品在材料、記憶與日常之中的位置。',
      en: "From shaping the polystyrene prototype and preparing the sand mould to pouring the aluminium, I gradually searched—through repeated forming and refinement—for the work's place between material, memory, and everyday life.",
      ja: '発泡スチロールによる原型制作から砂型の成形、アルミニウムの鋳造まで、造形と修整を重ねながら、素材と記憶、そして日常の間にある作品の位置を探っていった。',
    },
    concept: {
      'zh-Hant':
        '將逐漸消逝的臺灣「窗景」轉譯為材料，拾起那些埋藏於日常之中的時間層次。願這件作品如同窗景本身，靜靜刻下跨越世代的歲月，持續記錄沉默之中所棲居的美。它既是我個人的記憶，也是遞向未來的一枚小小路標。',
      en: "By translating Taiwan's gradually disappearing window scenes into material form, I seek to recover layers of time buried within everyday life. I hope this work will quietly mark the passage of generations and continue to preserve the beauty held in silence. It is both a vessel for my own memory and a small marker to be passed on to the future.",
      ja: '私は、失われつつある台湾の「窓景」を素材へと置き換えることで、日常の奥に埋もれてきた時間の層をすくい上げようとしている。この作品が、幾世代もの時を静かに刻み続けること。沈黙のなかに宿る美を記録し続けること。それは私自身の記憶であると同時に、未来へ手渡すための小さな道標でもある。',
    },
    material: { 'zh-Hant': '鋁', en: 'Aluminium', ja: 'アルミニウム' },
    date: { 'zh-Hant': '2024.01', en: 'January 2024', ja: '2024年1月' },
    contribution: null,
  },
]

const cursorLabels = {
  vtuber: 'ART',
  water: 'ART',
  graphic: 'DESIGN',
  dyeing: 'TEXTILE',
  'three-d': '3D',
  printmaking: 'PRINT',
  metalwork: 'CRAFT',
}
for (const artwork of artworks) artwork.cursorLabel ??= cursorLabels[artwork.key] ?? 'VIEW'

artworks.sort((a, b) => a.overviewOrder - b.overviewOrder)
