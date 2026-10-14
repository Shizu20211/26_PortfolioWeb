import { kaohsiungMap } from '@/data/kaohsiungMap'
import { threeDWorks } from '@/data/threeDWorks'
import temporaryArtworkImage from '@/assets/images/intro/intro-flower-window-wide.png'
import boathouseCardImage from '@/assets/images/artworks/3d/boathouse-card.png'
import metalworkClock01 from '@/assets/images/artworks/metalwork/clock01.png'
import metalworkClock02 from '@/assets/images/artworks/metalwork/clock02.png'
import metalworkClock03 from '@/assets/images/artworks/metalwork/clock03.png'
import metalworkClock04 from '@/assets/images/artworks/metalwork/clock04.png'
import lacquerMix from '@/assets/images/artworks/suri/mixP.jpg'
import lacquerNunome from '@/assets/images/artworks/suri/nunome.jpg'
import lacquerNunomeProcess from '@/assets/images/artworks/suri/nunomeP.jpg'
import lacquerWagami from '@/assets/images/artworks/suri/wagami.jpg'
import lacquerWagamiProcess from '@/assets/images/artworks/suri/wagamiP.jpg'
import printmakingInstallation from '@/assets/images/artworks/printmaking/installation-view.jpg'
import printmakingInstallationThumb from '@/assets/images/artworks/printmaking/thumb-installation-view.jpg'
import printmakingWindowFrame from '@/assets/images/artworks/printmaking/window-frame-detail.jpg'
import printmakingWindowFrameThumb from '@/assets/images/artworks/printmaking/thumb-window-frame-detail.jpg'
import printmakingStitching from '@/assets/images/artworks/printmaking/stitching-process.jpg'
import printmakingStitchingThumb from '@/assets/images/artworks/printmaking/thumb-stitching-process.jpg'
import printmakingDyedPattern from '@/assets/images/artworks/printmaking/dyed-pattern-detail.jpg'
import printmakingDyedPatternThumb from '@/assets/images/artworks/printmaking/thumb-dyed-pattern-detail.jpg'
import printmakingTransparent from '@/assets/images/artworks/printmaking/print-transparent.jpg'
import printmakingTransparentThumb from '@/assets/images/artworks/printmaking/thumb-print-transparent.jpg'
import printmakingReflection from '@/assets/images/artworks/printmaking/print-reflection.jpg'
import printmakingReflectionThumb from '@/assets/images/artworks/printmaking/thumb-print-reflection.jpg'
import printmakingWayHome from '@/assets/images/artworks/printmaking/print-way-home.jpg'
import printmakingWayHomeThumb from '@/assets/images/artworks/printmaking/thumb-print-way-home.jpg'
import botanicalOverview from '@/assets/images/artworks/Botanical-dye/Botanical1.jpg'
import botanicalOverviewThumb from '@/assets/images/artworks/Botanical-dye/thumb-Botanical1.jpg'
import botanicalSummerFlowers from '@/assets/images/artworks/Botanical-dye/sumflower.jpg'
import botanicalSummerFlowersThumb from '@/assets/images/artworks/Botanical-dye/thumb-sumflower.jpg'
import botanicalMountains from '@/assets/images/artworks/Botanical-dye/mountain.jpg'
import botanicalMountainsThumb from '@/assets/images/artworks/Botanical-dye/thumb-mountain.jpg'
import botanicalBlossoms from '@/assets/images/artworks/Botanical-dye/flower.jpg'
import botanicalBlossomsThumb from '@/assets/images/artworks/Botanical-dye/thumb-flower.jpg'
import botanicalStencilCarving from '@/assets/images/artworks/Botanical-dye/katahori.jpg'
import botanicalStencilCarvingThumb from '@/assets/images/artworks/Botanical-dye/thumb-katahori.jpg'
import botanicalPasteResist from '@/assets/images/artworks/Botanical-dye/kataoki.jpg'
import botanicalPasteResistThumb from '@/assets/images/artworks/Botanical-dye/thumb-kataoki.jpg'
import botanicalShinshi from '@/assets/images/artworks/Botanical-dye/jinnji.jpg'
import botanicalShinshiThumb from '@/assets/images/artworks/Botanical-dye/thumb-jinnji.jpg'
import botanicalGroundDyeing from '@/assets/images/artworks/Botanical-dye/jizome.jpg'
import botanicalGroundDyeingThumb from '@/assets/images/artworks/Botanical-dye/thumb-jizome.jpg'

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
    overviewOrder: 5,
    title: { 'zh-Hant': 'VTuber 背景', en: 'VTuber Backgrounds', ja: 'VTuber 背景' },
    type: 'Illustration',
    contribution: {
      'zh-Hant': '公開範圍與權利資訊待確認',
      en: 'Public scope and usage rights awaiting confirmation',
      ja: '公開範囲と使用権を確認中',
    },
  },
  {
    key: 'printmaking',
    slug: 'window-impressions',
    legacySlugs: ['graphic-design'],
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 4,
    title: {
      'zh-Hant': '窗景印象－互動式複合作品',
      en: 'Impressions Through the Window — An Interactive Mixed-Media Installation',
      ja: '窓景の印象―インタラクティブ・ミクストメディア作品',
    },
    type: {
      'zh-Hant': '版畫・複合媒材',
      en: 'Printmaking / Mixed Media',
      ja: '版画・ミクストメディア',
    },
    cursorLabel: 'PRINT',
    caseStudy: 'printmaking',
    cover: {
      src: printmakingInstallation,
      width: 4032,
      height: 2268,
    },
    alt: {
      'zh-Hant': '展場牆面陳列版畫，右側為舊木窗框、染布與版畫構成的立體作品',
      en: 'Gallery wall displaying prints beside an installation made from old wooden window frames, dyed fabric, and printmaking',
      ja: '版画作品と、古い木製窓枠、染布、版画で構成した立体作品を展示した会場風景',
    },
    focalPosition: '50% 50%',
    parallaxStrength: 0.35,
    statement: {
      'zh-Hant': [
        '本作是首次嘗試融合染織、版畫與空間表現的立體作品。重新利用被視為廢材的老木窗框，配置染布所形成的紋樣，在空間中重構「隔窗所見的風景」。',
        '作品中的紋樣以臺灣鐵窗花與壓花玻璃的造形為起點，也喚起曾經存在於生活之中的視覺記憶。',
        '當觀者站在作品前，便能透過承載時間痕跡的窗框，產生凝視布面風景的感受。本作不僅止於視覺呈現，更希望觀者透過紋樣，親身感受過去與現在靜靜重疊的過程，並將這段身體經驗體會為一幅「風景」。',
      ],
      en: [
        'This is my first three-dimensional work to explore the convergence of textile dyeing, printmaking, and spatial expression. By reusing discarded wooden window frames and arranging patterns created through dyed fabric, the work reconstructs the idea of a landscape seen through a window within physical space.',
        'The patterns draw from forms found in Taiwanese iron window grilles and patterned glass, recalling visual memories once embedded in everyday life.',
        'When viewers stand before the work, the timeworn window frames invite them to peer into landscapes drawn across the fabric. More than a visual presentation, the work creates a bodily experience in which past and present quietly overlap through pattern and are encountered as a single landscape.',
      ],
      ja: [
        '本作は、染織、版画、空間表現の融合を試みた、初めての立体作品である。廃材となった古い木製の窓枠を再利用し、染布によって生み出した文様を組み合わせることで、「窓越しに見る風景」を空間の中に再構成した。',
        '文様は、台湾の鉄窓花や型押しガラスに見られる造形を起点としており、かつて人々の暮らしの中に存在した視覚的な記憶を呼び起こす。',
        '観客が作品の前に立つと、時間の痕跡を宿した窓枠を通して、布の上に描かれた風景を覗き込むような感覚が生まれる。単なる視覚的な提示にとどまらず、文様を介して過去と現在が静かに重なり合う一連の身体的体験を、一つの「風景」として感じてもらうことを意図している。',
      ],
    },
    gallery: [
      {
        id: 'installation',
        src: printmakingInstallation,
        thumbnailSrc: printmakingInstallationThumb,
        width: 4032,
        height: 2268,
        orientation: 'landscape',
        title: { 'zh-Hant': '展場全景', en: 'Installation View', ja: '展示風景' },
        meta: {
          'zh-Hant': '互動式複合媒材裝置',
          en: 'Interactive mixed-media installation',
          ja: 'インタラクティブ・ミクストメディア作品',
        },
        caption: {
          'zh-Hant': '版畫、染布與舊木窗框共同構成一幅可走近觀看的窗景。',
          en: 'Prints, dyed fabric, and old wooden frames form a window scene that viewers can approach and look through.',
          ja: '版画、染布、古い木製窓枠によって、近づいて覗き込むことのできる窓景を構成した。',
        },
        alt: {
          'zh-Hant': '展場牆面陳列多件版畫，右側放置舊木窗框與染布構成的立體作品',
          en: 'Gallery wall displaying prints beside a three-dimensional work made from old wooden window frames and dyed fabric',
          ja: '複数の版画と、古い木製窓枠と染布による立体作品を展示した会場風景',
        },
      },
      {
        id: 'window-frame',
        src: printmakingWindowFrame,
        thumbnailSrc: printmakingWindowFrameThumb,
        width: 4000,
        height: 6000,
        orientation: 'portrait',
        title: { 'zh-Hant': '老家花窗', en: 'The Window at Home', ja: '実家の花窓' },
        meta: {
          'zh-Hant': '舊木窗框與染布',
          en: 'Old wooden frame and dyed fabric',
          ja: '古い木窓と染布',
        },
        caption: {
          'zh-Hant': '老家的木窗，承載著無數次不小心太過用力而夾到手的疼痛記憶。',
          en: 'The old wooden window at home carries memories of all the times I pushed a little too hard and caught my fingers in it.',
          ja: '実家の木窓には、うっかり力を入れすぎて指を挟んだ、あの痛い記憶がいくつも残っている。',
        },
        alt: {
          'zh-Hant': '老木窗框中嵌入深色染布與白色花窗紋樣',
          en: 'An old wooden window frame holding dark dyed fabric with a pale window-grille pattern',
          ja: '古い木製窓枠に、淡い花窓文様を施した濃色の染布を組み込んだ細部',
        },
      },
      {
        id: 'stitching',
        src: printmakingStitching,
        thumbnailSrc: printmakingStitchingThumb,
        width: 2160,
        height: 2125,
        orientation: 'square',
        title: {
          'zh-Hant': '老家花窗－刺子繡',
          en: 'The Window at Home — Sashiko',
          ja: '実家の花窓―刺し子',
        },
        meta: {
          'zh-Hant': '刺子繡製作過程',
          en: 'Sashiko stitching process',
          ja: '刺し子の制作過程',
        },
        caption: {
          'zh-Hant': '一針一線，我想用針與線的交織，把那片花窗重新縫製回來。',
          en: 'Stitch by stitch, I sought to bring the patterned window back through the meeting of needle and thread.',
          ja: '一針ずつ、針と糸を重ねながら、あの花窓をもう一度縫い戻そうとした。',
        },
        alt: {
          'zh-Hant': '深色布面正在縫製白色幾何花窗紋樣，旁邊放置針線與剪刀',
          en: 'A pale geometric window pattern being stitched onto dark fabric beside a needle, thread, and scissors',
          ja: '針、糸、はさみのそばで、濃色の布に淡い幾何学的な花窓文様を縫っている制作風景',
        },
      },
      {
        id: 'dyed-pattern',
        src: printmakingDyedPattern,
        thumbnailSrc: printmakingDyedPatternThumb,
        width: 6000,
        height: 4000,
        orientation: 'landscape',
        title: {
          'zh-Hant': '老家花窗－糊染',
          en: 'The Window at Home — Paste Resist Dyeing',
          ja: '実家の花窓―糊防染',
        },
        meta: {
          'zh-Hant': '糊染與網版',
          en: 'Paste resist and screen printing',
          ja: '糊防染とスクリーンプリント',
        },
        caption: {
          'zh-Hant': '以豆漿、白膠與網版，將記憶裡的花窗重新放回那扇失去玻璃的窗。',
          en: 'Using soy milk, adhesive, and screen printing, I returned the patterned window from memory to the frame that had lost its glass.',
          ja: '豆乳、接着剤、スクリーンプリントを用い、記憶の中の花窓を、ガラスを失った窓へもう一度戻していく。',
        },
        alt: {
          'zh-Hant': '深色舊木窗框中放置印有黃色果實與花朵紋樣的染布',
          en: 'Dyed fabric printed with yellow fruit and floral motifs placed within a dark old wooden frame',
          ja: '黄色い実と花の文様を刷った染布を、濃色の古い木製窓枠に収めた細部',
        },
      },
      {
        id: 'transparent',
        src: printmakingTransparent,
        thumbnailSrc: printmakingTransparentThumb,
        width: 3466,
        height: 2332,
        orientation: 'landscape',
        title: { 'zh-Hant': '透', en: 'Through', ja: '透' },
        meta: {
          'zh-Hant': '銅版畫（蝕刻）・97 × 73 cm・2023',
          en: 'Etching・97 × 73 cm・2023',
          ja: '銅版画（エッチング）・97 × 73 cm・2023',
        },
        caption: {
          'zh-Hant': '透過花窗灑落的光影，承載著多少午後流光溢彩的記憶。',
          en: 'The light and shadows filtering through patterned windows carry the shimmering colours of countless afternoons.',
          ja: '花窓を通して差し込む光と影には、幾度もの午後のきらめきが重なっている。',
        },
        alt: {
          'zh-Hant': '兩幅並置的黑白蝕刻版畫，描繪植物、鐵窗花與窗邊光影',
          en: 'Two black-and-white etchings depicting plants, iron window grilles, and light around a window',
          ja: '植物、鉄窓花、窓辺の光を描いた二点組の白黒エッチング',
        },
      },
      {
        id: 'reflection',
        src: printmakingReflection,
        thumbnailSrc: printmakingReflectionThumb,
        width: 3945,
        height: 2381,
        orientation: 'landscape',
        title: { 'zh-Hant': '映', en: 'Reflection', ja: '映' },
        meta: {
          'zh-Hant': '銅版畫（蝕刻）・97 × 73 cm・2023',
          en: 'Etching・97 × 73 cm・2023',
          ja: '銅版画（エッチング）・97 × 73 cm・2023',
        },
        caption: {
          'zh-Hant': '不知道窗外的景色有多麼燦爛，但我知道，映著你身影的那片斑斕是最美的片刻。',
          en: 'I may never know how dazzling the view outside was, but I know the colours reflecting your silhouette formed the most beautiful moment.',
          ja: '窓の外の景色がどれほど鮮やかだったのかは分からない。それでも、あなたの姿を映したあの色彩こそが、最も美しい瞬間だったことを知っている。',
        },
        alt: {
          'zh-Hant': '深色蝕刻版畫中描繪月亮、窗簾、鐵窗與坐在窗邊的人影',
          en: 'A dark etching depicting the moon, curtains, iron window grilles, and a seated figure by a window',
          ja: '月、カーテン、鉄窓花、窓辺に座る人影を描いた暗色のエッチング',
        },
      },
      {
        id: 'way-home',
        src: printmakingWayHome,
        thumbnailSrc: printmakingWayHomeThumb,
        width: 2730,
        height: 3500,
        orientation: 'portrait',
        title: { 'zh-Hant': '回家路上', en: 'The Way Home', ja: '帰り道' },
        meta: {
          'zh-Hant': '銅版畫（蝕刻）・72 × 85.5 cm・2023',
          en: 'Etching・72 × 85.5 cm・2023',
          ja: '銅版画（エッチング）・72 × 85.5 cm・2023',
        },
        caption: {
          'zh-Hant': '無論去過多少地方，我始終尋找著回家時抬頭所見的那片景色。',
          en: 'No matter how many places I visit, the scene I keep searching for is the one I see when I look up on my way home.',
          ja: 'どれほど多くの場所を訪れても、私が探し続けているのは、帰り道にふと見上げたあの景色なのだ。',
        },
        alt: {
          'zh-Hant': '藍黑色蝕刻版畫，以仰視角度描繪老屋、鐵窗、電線與巷弄天空',
          en: 'A blue-black etching looking upward through old houses, iron windows, overhead wires, and an alley sky',
          ja: '古い家屋、鉄窓、電線、路地の空を見上げる視点で描いた青黒いエッチング',
        },
      },
    ],
    contribution: null,
  },
  {
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
    key: 'dyeing',
    slug: 'botanical-traditional-dyeing',
    layout: 'wide',
    published: true,
    showOnOverview: true,
    overviewOrder: 3,
    title: {
      'zh-Hant': '植物染與傳統染織',
      en: 'Botanical & Traditional Dyeing',
      ja: '植物染めと伝統染織',
    },
    type: { 'zh-Hant': '植物染・型染', en: 'Botanical Dyeing / Katazome', ja: '植物染め・型染め' },
    cursorLabel: 'TEXTILE',
    caseStudy: 'botanical-dyeing',
    cover: { src: botanicalOverview, width: 6000, height: 4000 },
    alt: {
      'zh-Hant': '以臺灣鐵窗花與花磚為靈感製作的植物染與型染作品',
      en: 'Botanical-dyed and katazome textiles inspired by Taiwanese iron window grilles and patterned tiles',
      ja: '台湾の鉄窓花と花磚を着想源とした植物染めと型染めの作品',
    },
    focalPosition: '50% 50%',
    parallaxStrength: 0.35,
    statement: {
      'zh-Hant': [
        '延續過往的染織經驗，我嘗試以不同素材與技法，重新製作記憶中的圖樣。透過公開文獻與網路影像逐步研究日本友禪染的工序，也由此展開這次創作。',
        '從雕刻型紙（型彫り）、調製米糊與上糊（糊伏せ），到反覆刷染底色（地染め），每一道步驟都經過多次實驗與修正。在不斷試錯的過程中，我逐漸掌握材料與色彩的變化，最終完成心中想要留下的圖樣。',
      ],
      en: [
        'Building on my previous experience in textile dyeing, I explored new materials and techniques to reconstruct patterns held in memory. Using publicly available references and videos, I studied the processes of Japanese yūzen dyeing and gradually developed them into this body of work.',
        'From stencil carving（型彫り）and applying rice-paste resist（糊伏せ）to repeatedly brushing the ground colour（地染め）, each stage involved experimentation and revision. Through this process, I learned to respond to the behaviour of the materials and colours, eventually arriving at the patterns I had envisioned.',
      ],
      ja: [
        'これまでの染織経験をもとに、異なる素材と技法を用いて、記憶の中にある文様をかたちにすることを試みた。公開資料や映像を手がかりに友禅染の工程を学び、本制作へと発展させている。',
        '型紙の彫刻（型彫り）から米糊の調合と上糊（糊伏せ）、刷染め（地染め）まで、一つひとつの工程を繰り返し実験した。試行錯誤を重ねながら素材と色彩の変化を確かめ、思い描いていた文様へと近づけていった。',
      ],
    },
    gallery: [
      {
        id: 'botanical-overview',
        src: botanicalOverview,
        thumbnailSrc: botanicalOverviewThumb,
        width: 6000,
        height: 4000,
        orientation: 'landscape',
        kind: 'artwork',
        title: {
          'zh-Hant': '植物染與型染',
          en: 'Botanical Dyeing and Katazome',
          ja: '植物染めと型染め',
        },
        meta: { 'zh-Hant': '作品全景・2025', en: 'Collection view・2025', ja: '作品全景・2025' },
        caption: {
          'zh-Hant': '以植物色彩與型染工序，重新構成記憶中的鐵窗花與花磚紋樣。',
          en: 'Botanical colours and katazome processes reconstruct window-grille and patterned-tile motifs held in memory.',
          ja: '植物の色と型染めの工程を通して、記憶の中の鉄窓花と花磚文様を再構成した。',
        },
        alt: {
          'zh-Hant': '植物染與型染作品全景',
          en: 'Overview of botanical-dyed and katazome works',
          ja: '植物染めと型染め作品の全景',
        },
      },
      {
        id: 'summer-flowers',
        src: botanicalSummerFlowers,
        thumbnailSrc: botanicalSummerFlowersThumb,
        width: 4903,
        height: 3268,
        orientation: 'landscape',
        kind: 'artwork',
        title: { 'zh-Hant': '夏花', en: 'Summer Flowers', ja: '夏花' },
        meta: {
          'zh-Hant': '棉布、型染・41 × 240 cm・2025',
          en: 'Cotton, katazome・41 × 240 cm・2025',
          ja: '綿布、型染め・41 × 240 cm・2025',
        },
        caption: {
          'zh-Hant': '以荔枝葉染、豆汁打底與木灰媒染，引出花磚紋樣中如夕陽般溫暖的橘色。',
          en: 'Lychee-leaf dye, a soy-milk ground, and wood-ash mordant draw a sunset-like orange from the patterned-tile motif.',
          ja: 'ライチの葉、豆汁下地、木灰媒染によって、花磚文様に夕陽を思わせる温かな橙色を引き出した。',
        },
        alt: {
          'zh-Hant': '名為夏花的橘色植物染型染作品',
          en: 'Orange botanical-dyed katazome work titled Summer Flowers',
          ja: '橙色に染めた型染め作品「夏花」',
        },
      },
      {
        id: 'mountains-rivers',
        src: botanicalMountains,
        thumbnailSrc: botanicalMountainsThumb,
        width: 6000,
        height: 4000,
        orientation: 'landscape',
        kind: 'artwork',
        title: { 'zh-Hant': '山川', en: 'Mountains and Rivers', ja: '山川' },
        meta: {
          'zh-Hant': '棉布、型染・42.5 × 144 cm（褐）、40 × 190 cm（靛）・2025',
          en: 'Cotton, katazome・42.5 × 144 cm (brown), 40 × 190 cm (indigo)・2025',
          ja: '綿布、型染め・42.5 × 144 cm（褐）、40 × 190 cm（紺）・2025',
        },
        caption: {
          'zh-Hant': '將防染糊造成的暈染轉化為表現，加入木灰描繪鐵窗花隨時間鏽蝕的質感。',
          en: 'Blurred resist edges became an expressive device, while wood ash evokes iron window grilles weathering into rust.',
          ja: '防染糊による滲みを表現へと転じ、木灰を加えて鉄窓花が錆びゆく質感を描いた。',
        },
        alt: {
          'zh-Hant': '褐色與靛色的山形鐵窗花型染作品',
          en: 'Brown and indigo katazome works based on mountain-shaped iron grilles',
          ja: '山形の鉄窓花をもとにした褐色と紺色の型染め作品',
        },
      },
      {
        id: 'blossoms',
        src: botanicalBlossoms,
        thumbnailSrc: botanicalBlossomsThumb,
        width: 6000,
        height: 4000,
        orientation: 'landscape',
        kind: 'artwork',
        title: { 'zh-Hant': '繁花', en: 'Blossoms', ja: '繁花' },
        meta: {
          'zh-Hant': '棉布、型染・44 × 196 cm・2025',
          en: 'Cotton, katazome・44 × 196 cm・2025',
          ja: '綿布、型染め・44 × 196 cm・2025',
        },
        caption: {
          'zh-Hant':
            '將交錯的鐵窗花轉化為春梅，以蘇芳染出暖紅；接紋的微小錯位也成為技術成長的記錄。',
          en: 'Intersecting iron-grille forms become spring plum blossoms in warm sappanwood red; slight misalignments record the process of learning.',
          ja: '交差する鉄窓花を春の梅に見立て、蘇芳で温かな赤に染めた。継ぎ目のわずかなずれも、技術を磨く過程の記録として残している。',
        },
        alt: {
          'zh-Hant': '蘇芳染製作的紅色梅花型染作品',
          en: 'Red plum-blossom katazome work dyed with sappanwood',
          ja: '蘇芳で染めた赤い梅花文様の型染め作品',
        },
      },
      {
        id: 'stencil-carving',
        src: botanicalStencilCarving,
        thumbnailSrc: botanicalStencilCarvingThumb,
        width: 2308,
        height: 1498,
        orientation: 'landscape',
        kind: 'process',
        title: {
          'zh-Hant': '雕刻型紙（型彫り）',
          en: 'Stencil Carving（型彫り）',
          ja: '型紙の彫刻（型彫り）',
        },
        meta: { 'zh-Hant': '製作過程', en: 'Process', ja: '制作工程' },
        caption: {
          'zh-Hant': '在厚牛皮紙上雕刻紋樣（型彫り），製作用於防染的型紙。',
          en: 'Carving the pattern（型彫り）into heavy kraft paper to create the resist stencil.',
          ja: '厚手のクラフト紙に文様を彫り（型彫り）、防染用の型紙を制作する。',
        },
        alt: {
          'zh-Hant': '在厚牛皮紙上雕刻型染紋樣',
          en: 'Carving a katazome pattern into heavy kraft paper',
          ja: '厚手のクラフト紙に型染め文様を彫る工程',
        },
      },
      {
        id: 'paste-resist',
        src: botanicalPasteResist,
        thumbnailSrc: botanicalPasteResistThumb,
        width: 2308,
        height: 1498,
        orientation: 'landscape',
        kind: 'process',
        title: {
          'zh-Hant': '型置與上糊（糊伏せ）',
          en: 'Applying the Resist（糊伏せ）',
          ja: '型置きと上糊（糊伏せ）',
        },
        meta: { 'zh-Hant': '製作過程', en: 'Process', ja: '制作工程' },
        caption: {
          'zh-Hant': '將型紙固定於布面，刮入米糊（糊伏せ）以留下防染紋樣。',
          en: 'Applying rice-paste resist（糊伏せ）through the stencil to form the pattern.',
          ja: '型紙を布の上に置き、米糊を置く（糊伏せ）ことで防染文様をつくる。',
        },
        alt: {
          'zh-Hant': '透過型紙將米糊刮在布面',
          en: 'Applying rice paste to cloth through a stencil',
          ja: '型紙を通して布に米糊を置く工程',
        },
      },
      {
        id: 'shinshi-stretching',
        src: botanicalShinshi,
        thumbnailSrc: botanicalShinshiThumb,
        width: 2308,
        height: 1498,
        orientation: 'landscape',
        kind: 'process',
        title: {
          'zh-Hant': '伸子（シンシ）張布',
          en: 'Shinshi（シンシ）Stretching',
          ja: '伸子（シンシ）張り',
        },
        meta: { 'zh-Hant': '製作過程', en: 'Process', ja: '制作工程' },
        caption: {
          'zh-Hant': '以伸子（シンシ）將布面撐開，避免刷染時產生皺褶。',
          en: 'Stretching the cloth with shinshi rods（シンシ）to prevent creasing during dyeing.',
          ja: '伸子（シンシ）で布を張り、刷染めの際に皺が生じないよう整える。',
        },
        alt: {
          'zh-Hant': '以伸子撐開準備染色的布',
          en: 'Cloth stretched with shinshi rods for dyeing',
          ja: '染色に向けて伸子で張った布',
        },
      },
      {
        id: 'ground-dyeing',
        src: botanicalGroundDyeing,
        thumbnailSrc: botanicalGroundDyeingThumb,
        width: 2308,
        height: 1498,
        orientation: 'landscape',
        kind: 'process',
        title: {
          'zh-Hant': '刷染底色（地染め）',
          en: 'Ground Dyeing（地染め）',
          ja: '刷染め（地染め）',
        },
        meta: { 'zh-Hant': '製作過程', en: 'Process', ja: '制作工程' },
        caption: {
          'zh-Hant': '刷染底色（地染め）時交替刷上染液與媒染劑，逐步堆疊理想的色彩深度。',
          en: 'During ground dyeing（地染め）, dye and mordant are alternated to gradually build the desired depth of colour.',
          ja: '刷染め（地染め）では、染液と媒染剤を交互に刷き、求める色の深さまで重ねていく。',
        },
        alt: {
          'zh-Hant': '在張開的布面逐層刷上植物染液',
          en: 'Brushing layers of botanical dye onto stretched cloth',
          ja: '張った布に植物染料を重ねて刷く工程',
        },
      },
    ],
    contribution: null,
  },
  {
    key: 'lacquerware',
    slug: 'lacquerware',
    layout: 'square',
    published: true,
    showOnOverview: true,
    overviewOrder: 7,
    title: { 'zh-Hant': '漆器', en: 'Lacquerware', ja: '漆芸' },
    type: { 'zh-Hant': '漆藝', en: 'Lacquer Art', ja: '漆芸' },
    cursorLabel: 'URUSHI',
    caseStudy: 'lacquerware',
    cover: {
      src: lacquerMix,
      width: 1700,
      height: 1699,
    },
    alt: {
      'zh-Hant': '布目塗與和紙塗漆器作品組合',
      en: 'A composition of nunome-nuri and washi-nuri lacquerware',
      ja: '布目塗と和紙塗による漆芸作品の組み合わせ',
    },
    focalPosition: '50% 50%',
    parallaxStrength: 0.35,
    date: { 'zh-Hant': '2024.07', en: 'July 2024', ja: '2024年7月' },
    works: [
      {
        id: 'nunome',
        title: { 'zh-Hant': '布目塗－樹影', en: 'Nunome-nuri — Tree Shadows', ja: '布目塗―樹影' },
        description: {
          'zh-Hant':
            '以合板製作胎體，使用米糊調製的糊漆貼合網布；待塗層穩定後，再以紅漆描繪樹影紋樣。',
          en: 'A plywood base was covered with mesh using nori-urushi prepared with rice-flour paste. After the layers settled, the tree-shadow motif was painted in red lacquer.',
          ja: '合板の素地に、米粉から作った糊漆で網布を貼り、塗膜を整えた後、赤漆で樹影の文様を描いた。',
        },
        processImage: {
          src: lacquerNunomeProcess,
          width: 1700,
          height: 1700,
        },
        image: {
          src: lacquerNunome,
          width: 4093,
          height: 2894,
        },
      },
      {
        id: 'wagami',
        title: { 'zh-Hant': '和紙塗－地磚', en: 'Washi-nuri — Floor Tiles', ja: '和紙塗―床タイル' },
        description: {
          'zh-Hant':
            '將和紙與自選紋樣結合，依序塗覆兩層色漆，再研磨上層漆面，使下層色彩逐漸顯露，形成如地磚般的圖樣。',
          en: 'Washi paper was combined with a selected motif and coated with two layers of coloured lacquer. The upper layer was then polished back to reveal the colour beneath, forming a pattern reminiscent of floor tiles.',
          ja: '和紙と選んだ文様を組み合わせ、二層の色漆を塗り重ねた後、上層を研ぎ出して下の色を現し、床タイルを思わせる模様に仕上げた。',
        },
        processImage: {
          src: lacquerWagamiProcess,
          width: 1700,
          height: 1700,
        },
        image: {
          src: lacquerWagami,
          width: 4093,
          height: 2894,
        },
      },
    ],
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
  printmaking: 'PRINT',
  dyeing: 'TEXTILE',
  'three-d': '3D',
  lacquerware: 'URUSHI',
  metalwork: 'CRAFT',
}
for (const artwork of artworks) artwork.cursorLabel ??= cursorLabels[artwork.key] ?? 'VIEW'

artworks.sort((a, b) => a.overviewOrder - b.overviewOrder)
