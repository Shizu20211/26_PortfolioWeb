import { kaohsiungMap } from '@/data/kaohsiungMap'
import { threeDWorks } from '@/data/threeDWorks'
import temporaryArtworkImage from '@/assets/images/intro/intro-flower-window-wide.png'
import boathouseCardImage from '@/assets/images/artworks/3d/boathouse-card.png'

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
    legacySlugs: ['vtuber-backgrounds'],
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
    legacySlugs: ['maya-3d', 'botanical-traditional-dyeing'],
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
    ...temporaryArtworkMedia,
    key: 'metalwork',
    slug: 'metalwork',
    layout: 'portrait',
    published: true,
    showOnOverview: true,
    overviewOrder: 8,
    title: { 'zh-Hant': '金工', en: 'Metalwork', ja: '金工' },
    type: 'Craft',
    contribution: null,
  },
]

const cursorLabels = {
  water: 'ART',
  graphic: 'DESIGN',
  'three-d': '3D',
  printmaking: 'PRINT',
  metalwork: 'CRAFT',
}
for (const artwork of artworks) artwork.cursorLabel ??= cursorLabels[artwork.key] ?? 'VIEW'

artworks.sort((a, b) => a.overviewOrder - b.overviewOrder)
