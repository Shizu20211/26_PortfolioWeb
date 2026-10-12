import mapBackground from '@/assets/images/artworks/map/map-full.png'
import brochureFront from '@/assets/images/artworks/map/brochure-f.png'
import brochureBack from '@/assets/images/artworks/map/brochure-b.png'
import dragon from '@/assets/images/artworks/map/spot_Dragon.png'
import museum from '@/assets/images/artworks/map/spot_museum.png'
import dadong from '@/assets/images/artworks/map/spot_dadong.png'
import weiwuying from '@/assets/images/artworks/map/spot_Weiwuying.png'
import pier from '@/assets/images/artworks/map/spot_per2.png'
import stamp1 from '@/assets/images/artworks/map/stamp-01.png'
import stamp2 from '@/assets/images/artworks/map/stamp-02.png'
import stamp3 from '@/assets/images/artworks/map/stamp-03.png'
import stamp4 from '@/assets/images/artworks/map/stamp-04.png'
import stamp5 from '@/assets/images/artworks/map/stamp-05.png'
import photo1 from '@/assets/images/artworks/map/stamp-photo-1.jpg'
import photo2 from '@/assets/images/artworks/map/stamp-photo-2.jpg'

const text = (zh, en, ja) => ({ 'zh-Hant': zh, en, ja })
export const kaohsiungMap = {
  mapBackground,
  brochureBack,
  cover: { src: brochureFront, width: 4252, height: 2481 },
  title: text('高雄旅遊地圖', 'Kaohsiung Travel Map', '高雄の旅マップ'),
  ui: {
    eyebrow: 'GRAPHIC / MAP / PLAY',
    backToArtworks: text('返回創作', 'Back to artworks', '作品へ戻る'),
    concept: text(
      '在旅程中，找到那記憶裡的景象',
      'Find a remembered scene along the journey',
      '旅の中で、記憶にある風景を見つける',
    ),
    conceptText: text(
      '將旅程視為一段可以慢慢感受的體驗。手繪文字與插畫讓紙本保有人手留下的痕跡；地圖整理方向，也保留留白，讓真正走進城市的人有發現風景的餘地。',
      'A journey is time to look and feel. Hand-drawn lettering and illustrations keep traces of the hand on paper. The map offers direction while leaving room for discoveries made in the city itself.',
      '旅を、ゆっくり見て感じる時間として捉えました。手描きの文字とイラストに手の温もりを残し、地図で方向を整理しながらも余白を設け、街を歩く人の発見を受け止めます。',
    ),
    front: text('摺頁正面', 'Brochure front', 'リーフレット表面'),
    back: text('摺頁背面', 'Brochure back', 'リーフレット裏面'),
    scenery: text('走進當下的風景', 'Step into the scene before you', 'いま、目の前の風景へ'),
    sceneryText: text(
      '手繪並非為了完整複製景點，而是留下風景中值得停步的線索。透過插畫與留白，引導使用者把視線從紙面移向眼前，在行走、觀察與尋找之間，感受當下的城市。',
      'The drawings do not seek to reproduce every detail of a place. They leave clues to moments worth pausing for. Illustration and open space invite readers to look up from the paper and experience the city through walking, observing, and searching.',
      '手描きは、スポットをそのまま再現するためではなく、足を止めたくなる風景の手がかりを残すために。イラストと余白を通して紙面から目の前へと視線を誘い、歩く、観察する、探すという行為の中で、いまの街を感じてもらいます。',
    ),
    game: text(
      '從地圖到大地遊戲',
      'From a map to a game in the city',
      '地図から、街を舞台にした遊びへ',
    ),
    gameText: text(
      '將地圖作為探索的起點，以地方紋樣設計線索，再透過集章留下到訪的記號。把資訊、視覺與行動串連，讓紙本導覽成為一場可以親身參與的大地遊戲。',
      'The map begins the exploration; local patterns become clues, and stamps leave a record of each visit. Information, imagery, and action come together to turn a printed guide into a game people can take part in on the streets.',
      '地図を探索の出発点に、土地の文様を手がかりに、スタンプを訪れた記しに。情報、視覚表現、行動をつなぎ、紙のガイドを街の中で自ら参加できる遊びへと展開します。',
    ),
    patternText: text(
      '從鐵窗花、壓花玻璃與花的紋樣提取造形，讓地方的記憶成為尋找與辨識的線索，也成為能帶走的旅程片刻。',
      'Forms from decorative window grilles, patterned glass, and floral motifs turn local memories into clues to recognize—and small moments to carry home.',
      '鉄窓花、型押しガラス、花の文様から形を取り出し、土地の記憶を探し、見分ける手がかりに。そして、持ち帰れる旅のひとときに。',
    ),
    journeyText: text(
      '從觀察風景、尋找紋樣，到走進地方、集章留記，讓紙上的提示逐步轉化為身體參與的旅程。',
      'From observing a scene and finding its patterns to exploring a place and keeping a stamp, the clues on paper gradually become a journey experienced in person.',
      '風景を観察し、文様を探し、街を歩き、スタンプを残す。紙の上の手がかりが、少しずつ身体で参加する旅へと変わっていきます。',
    ),
    stampAlt: text(
      '地方紋樣印章圖案',
      'Stamp design inspired by local patterns',
      '土地の文様を取り入れた印章図案',
    ),
    photoAlt: text(
      '實體印章與試印成果',
      'Physical stamps and printed impressions',
      '実物の印章と試し押し',
    ),
  },
  spots: [
    { id: 'dragon', image: dragon, title: text('龍虎塔', 'Dragon and Tiger Pagodas', '龍虎塔') },
    {
      id: 'museum',
      image: museum,
      title: text('高雄市立美術館', 'Kaohsiung Museum of Fine Arts', '高雄市立美術館'),
    },
    { id: 'pier', image: pier, title: text('駁二藝術特區', 'Pier-2 Art Center', '駁二芸術特区') },
    { id: 'weiwuying', image: weiwuying, title: text('衛武營', 'Weiwuying', '衛武営') },
    {
      id: 'dadong',
      image: dadong,
      title: text('大東文化藝術中心', 'Dadong Arts Center', '大東文化芸術センター'),
    },
  ],
  stamps: [stamp1, stamp2, stamp3, stamp4, stamp5],
  photos: [photo1, photo2],
}
