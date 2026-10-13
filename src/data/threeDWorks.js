import littleHouseModel from '@/assets/models/3d/little-house/flower_house.glb?url'
import boathouseModel from '@/assets/models/3d/boathouse/boathouse-draco.glb?url'

export const threeDWorks = [
  {
    id: 'little-house',
    title: {
      'zh-Hant': '街角的花房',
      en: 'The Flower House Around the Corner',
      ja: '街角の花の家',
    },
    summary: {
      'zh-Hant':
        '以 Maya 建立的花房場景，想像在某秋日午後，在轉角裡遇見的場景，目前使用 GLB 驗證網頁互動展示。',
      en: 'A flower-house scene created in Maya, inspired by the imagined encounter waiting around a corner on an autumn afternoon. It is currently presented as an interactive GLB experience on the web.',
      ja: 'Mayaで制作した花の家のシーン。ある秋の午後、街角でふと出会う風景を思い描きながら形にしました。現在はGLBを用いたWeb上のインタラクティブ展示として公開しています。',
    },
    lightingProfile: 'flower-house',
    modelUrl: littleHouseModel,
    displayBounds: {
      min: [-0.55, -0.1, -0.65],
      max: [0.55, 1.2, 0.65],
    },
  },
  {
    id: 'boathouse',
    title: {
      'zh-Hant': '船屋咖啡',
      en: 'Boathouse Café',
      ja: 'ボートハウス・カフェ',
    },
    summary: {
      'zh-Hant':
        '以 Maya 建立的船屋咖啡廳，在濱海地區的沙灘餐廳，總有這種氛圍感，如果他能在海上漂浮能有多好呢?在哪個夏日的夜晚從冰箱裡拿走一罐清涼的可樂一口喝完一定很暢快！',
      en: 'A boathouse café created in Maya, inspired by the atmosphere of seaside restaurants. What if it could drift gently on the water? On a summer night, taking an ice-cold cola from the fridge and finishing it in one go would surely feel wonderfully refreshing.',
      ja: 'Mayaで制作したボートハウス・カフェ。海辺のビーチレストランが持つ独特の空気感から着想を得ました。もしこの建物が海の上を漂えたなら。夏の夜、冷蔵庫から冷たいコーラを取り出して一気に飲み干せば、きっと格別に爽快なはずです。',
    },
    lightingProfile: 'boathouse',
    dayLighting: {
      ambientIntensity: 2.7,
      sunIntensity: 2.5,
      exposure: 1.4,
    },
    modelUrl: boathouseModel,
    initialViewScale: 2.5,
    boundsIgnoreNodes: ['pPlane1'],
  },
]
