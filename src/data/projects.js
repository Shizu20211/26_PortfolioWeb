import waterParkBanner from '@/assets/images/featured/WaterParkBanner.png'
import ambiguousStructureAfter from '@/assets/images/projects/taipei-water-park/AmbiguousStructureA.png'
import ambiguousStructureBefore from '@/assets/images/projects/taipei-water-park/AmbiguousStructureB.png'
import restructuredInformationArchitecture from '@/assets/images/projects/taipei-water-park/RestructuredInformationArchitectureA.png'
import waterparkSiteMap from '@/assets/images/projects/taipei-water-park/site-map.png'
import unclearKeyInformation from '@/assets/images/projects/taipei-water-park/UnclearKeyInformationB.png'
import waterparkUiDesign from '@/assets/images/projects/taipei-water-park/ui-design.webp'
import weakVisualBefore from '@/assets/images/projects/taipei-water-park/WeakVisualB.png'
import beforeAfterVideo from '@/assets/images/projects/taipei-water-park/video/before_after.mp4'
import interactiveMapVideo from '@/assets/images/projects/taipei-water-park/video/interactive-map.mp4'
import navigationRedesignVideo from '@/assets/images/projects/taipei-water-park/video/navigation-redesign.mp4'
import venueRentalAfterVideo from '@/assets/images/projects/taipei-water-park/video/VenueRentalA.mp4'
import venueRentalBeforeVideo from '@/assets/images/projects/taipei-water-park/video/VenueRentalB.mp4'
import venuePlanningVideo from '@/assets/images/projects/taipei-water-park/video/venue-planning.mp4'
import waterparkLogoVideo from '@/assets/images/projects/taipei-water-park/video/waterpark-logo.mp4'
import weakVisualAfterVideo from '@/assets/images/projects/taipei-water-park/video/WeakVisualA.mp4'

export const projects = [
  {
    slug: 'taipei-water-park',
    featured: true,
    title: {
      'zh-Hant': '臺北自來水園區網站重構',
      en: 'Taipei Water Park Website Redesign',
      ja: '臺北自来水園区ウェブサイト・リデザイン',
    },
    summary: {
      'zh-Hant': '以資訊層級、視覺敘事與互動導覽重新梳理園區網站體驗。',
      en: 'Reframing the park experience through information hierarchy, visual storytelling, and interactive navigation.',
      ja: '情報設計、ビジュアルストーリーテリング、インタラクティブな案内を通して園区体験を再構成。',
    },
    role: {
      'zh-Hant': '使用者研究 / 資訊架構 / 介面設計 / 插畫 / 前端開發',
      en: 'UX Research / Information Architecture / UI Design / Illustration / Front-end Development',
      ja: 'ユーザー調査 / 情報設計 / UIデザイン / イラスト / フロントエンド開発',
    },
    tools: ['Figma', 'HTML5', 'CSS3', 'Vue 3', 'GSAP'],
    tags: ['UI/UX', 'Visual', 'Interaction'],
    media: {
      type: 'image',
      src: waterParkBanner,
      width: 2996,
      height: 1502,
      alt: {
        'zh-Hant': '臺北自來水園區網站重構主視覺',
        en: 'Taipei Water Park website redesign key visual',
        ja: '臺北自来水園区ウェブサイト・リデザインのキービジュアル',
      },
    },
    caseStudy: {
      externalUrl: 'https://fcu-11504-waterpark.dev-hub.io',
      eyebrow: {
        'zh-Hant': '網站重構 / UI・UX / 前端開發',
        en: 'Website Redesign / UI・UX / Front-end Development',
        ja: 'ウェブサイト・リデザイン / UI・UX / フロントエンド開発',
      },
      heroTitleLines: {
        'zh-Hant': ['臺北自來水園區', '網站重構'],
        en: ['Taipei Water Park', 'Website Redesign'],
        ja: ['臺北自来水園区', 'ウェブサイト・リデザイン'],
      },
      heroMedia: {
        type: 'video',
        src: beforeAfterVideo,
        mimeType: 'video/mp4',
        fit: 'cover',
        alt: {
          'zh-Hant': '臺北自來水園區網站重構前後畫面',
          en: 'Before and after views of the Taipei Water Park website redesign',
          ja: '臺北自来水園区ウェブサイトのリデザイン前後画面',
        },
      },
      processTitle: {
        'zh-Hant': '設計流程',
        en: 'Design Process',
        ja: 'デザインプロセス',
      },
      introduction: {
        'zh-Hant': '以使用者需求為起點，重新整理公共資訊與網站操作流程。',
        en: 'Reorganizing public information and website flows around user needs.',
        ja: '利用者のニーズを起点に、公共情報とウェブサイトの操作導線を再構成しました。',
      },
      overview: {
        title: {
          'zh-Hant': '為什麼重新設計？',
          en: 'Why redesign it?',
          ja: 'なぜ再設計するのか？',
        },
        body: {
          'zh-Hant': [
            '在進行臺北自來水園區網站研究時，發現本站雖為臺北市極具教育意義與親子遊憩之場所，但在網頁上的操作卻仍有許多地方能夠去更新與改善。',
            '故在本次重構專案練習時，我們以一般民眾的使用需求出發，重新檢視網站的資訊架構、視覺層級與操作流程。希望透過重新整理內容、整合相關功能及優化畫面編排，讓使用者能更直覺地操作。',
          ],
          en: [
            'While researching the Taipei Water Park website, we found that although the park is an educational and family-friendly destination in Taipei, many parts of its online experience could still be updated and improved.',
            'For this redesign exercise, we began with the needs of everyday visitors and re-examined the information architecture, visual hierarchy, and interaction flow. By reorganizing content, integrating related functions, and refining the layout, we aimed to make the website more intuitive to use.',
          ],
          ja: [
            '臺北自来水園区のウェブサイトを調査する中で、教育的価値が高く家族で楽しめる施設である一方、ウェブ上の操作には更新・改善できる点が多く残されていることが分かりました。',
            'そこで本リデザインでは、一般利用者のニーズを起点に、情報設計、視覚階層、操作導線を見直しました。内容の再整理、関連機能の統合、画面構成の改善を通して、より直感的に操作できるサイトを目指しました。',
          ],
        },
      },
      beforeAfter: [
        {
          ratio: '16 / 5',
          beforeMedia: {
            type: 'image',
            src: unclearKeyInformation,
            width: 1487,
            height: 339,
            fit: 'contain',
            alt: {
              'zh-Hant': '核心資訊不明顯的調整前畫面',
              en: 'Before view with unclear key information',
              ja: '重要情報が目立たない調整前の画面',
            },
          },
          afterMedia: {
            type: 'image',
            src: restructuredInformationArchitecture,
            width: 1346,
            height: 389,
            fit: 'contain',
            alt: {
              'zh-Hant': '重整資訊架構後的畫面',
              en: 'After view with restructured information architecture',
              ja: '情報設計を再構成した調整後の画面',
            },
          },
          before: {
            'zh-Hant': '核心資訊不明顯',
            en: 'Unclear key information',
            ja: '重要情報が目立たない',
          },
          beforeDetail: {
            'zh-Hant': '使用者較難直覺的從導覽列上找尋資訊。',
            en: 'Users found it difficult to locate information intuitively through the navigation.',
            ja: '利用者がナビゲーションから直感的に情報を見つけにくい状態でした。',
          },
          after: {
            'zh-Hant': '重整資訊架構',
            en: 'Restructured architecture',
            ja: '情報設計を再構築',
          },
          afterDetail: {
            'zh-Hant': '重新規劃資訊架構與導覽結構。',
            en: 'Replanned the information and navigation structure.',
            ja: '情報構造とナビゲーションを再設計しました。',
          },
        },
        {
          ratio: '16 / 9',
          beforeMedia: {
            type: 'video',
            src: venueRentalBeforeVideo,
            mimeType: 'video/mp4',
            fit: 'contain',
            alt: {
              'zh-Hant': '場地租借調整前的分散操作流程',
              en: 'Fragmented venue rental flow before redesign',
              ja: '調整前の分散した会場レンタル操作フロー',
            },
          },
          afterMedia: {
            type: 'video',
            src: venueRentalAfterVideo,
            mimeType: 'video/mp4',
            fit: 'contain',
            alt: {
              'zh-Hant': '場地租借內容與功能整合後的操作流程',
              en: 'Integrated venue rental content and flow after redesign',
              ja: '会場レンタルの情報と機能を統合した調整後の操作フロー',
            },
          },
          before: {
            'zh-Hant': '使用流程不連貫',
            en: 'Fragmented user flow',
            ja: '操作フローが分断されている',
          },
          beforeDetail: {
            'zh-Hant': '相關內容與操作入口分散，需於不同頁面中找尋資訊。',
            en: 'Related content and actions were scattered across different pages, making information difficult to locate.',
            ja: '関連情報と操作入口が複数のページに分散し、必要な情報を探しにくい状態でした。',
          },
          after: {
            'zh-Hant': '整合內容與功能',
            en: 'Integrated content and actions',
            ja: '情報と機能を統合',
          },
          afterDetail: {
            'zh-Hant': '以場地預約為例，將所有預約相關內容重新整合。',
            en: 'Using venue reservations as an example, all reservation-related content was reorganized into a unified flow.',
            ja: '会場予約を例に、予約に関する情報を一つの流れへ再編しました。',
          },
        },
        {
          ratio: '6 / 5',
          beforeMedia: {
            type: 'image',
            src: ambiguousStructureBefore,
            width: 1706,
            height: 1434,
            fit: 'contain',
            alt: {
              'zh-Hant': '版面結構意圖不明確的調整前畫面',
              en: 'Layout with an ambiguous structure before redesign',
              ja: 'レイアウト構造の意図が不明確な調整前の画面',
            },
          },
          afterMedia: {
            type: 'image',
            src: ambiguousStructureAfter,
            width: 1623,
            height: 1482,
            fit: 'contain',
            alt: {
              'zh-Hant': '重新安排資訊層級後的畫面',
              en: 'Layout after rebuilding the information hierarchy',
              ja: '情報階層を再構成した調整後の画面',
            },
          },
          before: {
            'zh-Hant': '版面結構意圖不明確',
            en: 'Ambiguous structure',
            ja: 'レイアウトの意図が不明確',
          },
          beforeDetail: {
            'zh-Hant': '資訊分類與版面關係不夠明確。',
            en: 'Content groups and layout relationships lacked clarity.',
            ja: '情報分類とレイアウトの関係が曖昧でした。',
          },
          after: { 'zh-Hant': '重整資訊層級', en: 'Rebuilt hierarchy', ja: '情報階層を再構成' },
          afterDetail: {
            'zh-Hant': '重新安排資訊層級，使重要入口更加明確。',
            en: 'Reordered the hierarchy to clarify essential entry points.',
            ja: '情報の優先順位を整理し、主要な入口を明確にしました。',
          },
        },
        {
          ratio: '1 / 1',
          beforeMedia: {
            type: 'image',
            src: weakVisualBefore,
            width: 1285,
            height: 1315,
            fit: 'contain',
            alt: {
              'zh-Hant': '視覺權重不足的調整前畫面',
              en: 'Visual design with weak emphasis before redesign',
              ja: '視覚的な強調が不足していた調整前の画面',
            },
          },
          afterMedia: {
            type: 'video',
            src: weakVisualAfterVideo,
            mimeType: 'video/mp4',
            fit: 'contain',
            alt: {
              'zh-Hant': '優化畫面平衡後的動態展示',
              en: 'Animated view after improving visual balance',
              ja: '画面バランスを改善した調整後の動的表示',
            },
          },
          before: {
            'zh-Hant': '視覺權重不足',
            en: 'Weak visual emphasis',
            ja: '視覚的な優先度が弱い',
          },
          beforeDetail: {
            'zh-Hant': '缺乏明確的閱讀重點。',
            en: 'The page lacked clear reading priorities.',
            ja: '読むべき箇所の優先度が不明確でした。',
          },
          after: {
            'zh-Hant': '優化畫面平衡',
            en: 'Balanced visual weight',
            ja: '画面バランスを最適化',
          },
          afterDetail: {
            'zh-Hant': '調整字級、間距、色彩與畫面平衡。',
            en: 'Adjusted type, spacing, color, and overall balance.',
            ja: '文字サイズ、余白、色彩、画面全体のバランスを整えました。',
          },
        },
      ],
      process: [
        {
          key: 'site-map',
          label: { 'zh-Hant': '網站地圖', en: 'Site Map', ja: 'サイトマップ' },
          note: {
            'zh-Hant': '重新整理園區資訊架構與主要導覽層級。',
            en: 'Reorganized the park information architecture and primary navigation hierarchy.',
            ja: '園区の情報設計と主要なナビゲーション階層を再構成しました。',
          },
          media: {
            type: 'image',
            src: waterparkSiteMap,
            alt: {
              'zh-Hant': '臺北自來水園區網站地圖設計',
              en: 'Site map for the Taipei Water Park website redesign',
              ja: '臺北自来水園区ウェブサイトのサイトマップ設計',
            },
          },
          ratio: '16 / 10',
        },
        {
          key: 'ui-design',
          side: 'right',
          label: { 'zh-Hant': '介面設計', en: 'UI Design', ja: 'UIデザイン' },
          note: {
            'zh-Hant': '整合資訊層級、園區視覺與響應式操作的介面完稿。',
            en: 'Final responsive interface integrating information hierarchy and the park’s visual language.',
            ja: '情報階層と園区のビジュアルを統合したレスポンシブUIの完成画面です。',
          },
          media: {
            type: 'image',
            src: waterparkUiDesign,
            alt: {
              'zh-Hant': '臺北自來水園區網站介面設計完稿',
              en: 'Final interface design for the Taipei Water Park website',
              ja: '臺北自来水園区ウェブサイトの最終UIデザイン',
            },
          },
          ratio: '16 / 10',
        },
      ],
      highlights: [
        {
          key: 'navigation',
          title: {
            'zh-Hant': '導覽列重構',
            en: 'Navigation Redesign',
            ja: 'ナビゲーション再設計',
          },
          description: {
            'zh-Hant': '重新設計導覽列，改善資訊入口、分類方式與主要操作流程。',
            en: 'Redesigned navigation to clarify information entry points, categories, and key actions.',
            ja: '情報入口、分類方法、主要な操作導線を明確にするため、ナビゲーションを再設計しました。',
          },
          contribution: {
            'zh-Hant': ['使用者研究', '資訊架構', '介面設計'],
            en: ['UX Research', 'Information Architecture', 'UI Design'],
            ja: ['ユーザー調査', '情報設計', 'UIデザイン'],
          },
          media: {
            type: 'video',
            src: navigationRedesignVideo,
            mimeType: 'video/mp4',
            alt: {
              'zh-Hant': '臺北自來水園區新版導覽列操作示範',
              en: 'Navigation redesign interaction demo for the Taipei Water Park website',
              ja: '臺北自来水園区ウェブサイトのナビゲーション操作デモ',
            },
          },
        },
        {
          key: 'visual-identity',
          title: {
            'zh-Hant': '視覺識別與插畫',
            en: 'Visual Identity',
            ja: 'ビジュアル・アイデンティティ',
          },
          description: {
            'zh-Hant': '重新製作園區 Logo 與圖像語言，統整水波、建築輪廓與園區記憶。',
            en: 'Reworked the park logo and visual language through water, architecture, and local memory.',
            ja: '水、建築、地域の記憶をもとに、園区ロゴとビジュアル言語を再構成しました。',
          },
          contribution: {
            'zh-Hant': ['Logo 設計', '插畫', '視覺系統'],
            en: ['Logo Design', 'Illustration', 'Visual System'],
            ja: ['ロゴデザイン', 'イラスト', 'ビジュアルシステム'],
          },
          media: {
            type: 'video',
            src: waterparkLogoVideo,
            mimeType: 'video/mp4',
            translateY: '-10%',
            compactTranslateY: '0%',
            mobileTranslateY: '0%',
            alt: {
              'zh-Hant': '臺北自來水園區 Logo 動態設計',
              en: 'Animated Taipei Water Park logo design',
              ja: '臺北自来水園区ロゴのモーションデザイン',
            },
          },
        },
        {
          key: 'interactive-map',
          title: {
            'zh-Hant': '互動地圖',
            en: 'Interactive Map',
            ja: 'インタラクティブマップ',
          },
          description: {
            'zh-Hant': '加入互動地圖，協助使用者理解園區設施位置與相關資訊。',
            en: 'Added an interactive map to make park locations and information easier to understand.',
            ja: '園区内の施設位置と情報を理解しやすくするインタラクティブマップを制作しました。',
          },
          contribution: {
            'zh-Hant': ['介面設計', '插畫', '前端開發'],
            en: ['UI Design', 'Illustration', 'Front-end Development'],
            ja: ['UIデザイン', 'イラスト', 'フロントエンド開発'],
          },
          media: {
            type: 'video',
            src: interactiveMapVideo,
            mimeType: 'video/mp4',
            translateY: '-16%',
            compactTranslateY: '0%',
            mobileTranslateY: '0%',
            alt: {
              'zh-Hant': '臺北自來水園區互動地圖操作示範',
              en: 'Interactive map demo for the Taipei Water Park website',
              ja: '臺北自来水園区ウェブサイトのインタラクティブマップ操作デモ',
            },
          },
        },
        {
          key: 'venue-planning',
          title: {
            'zh-Hant': '場地與規劃介面',
            en: 'Venue & Planning Interface',
            ja: '会場・計画インターフェース',
          },
          description: {
            'zh-Hant': '重新設計場地租借與使用規劃表格，讓複雜資訊更容易閱讀與操作。',
            en: 'Redesigned venue rental and planning forms to make complex information easier to read and use.',
            ja: '複雑な情報を読みやすく操作しやすくするため、会場レンタルと利用計画画面を再設計しました。',
          },
          contribution: {
            'zh-Hant': ['使用者研究', '介面設計', 'Vue 3'],
            en: ['UX Research', 'UI Design', 'Vue 3'],
            ja: ['ユーザー調査', 'UIデザイン', 'Vue 3'],
          },
          media: {
            type: 'video',
            src: venuePlanningVideo,
            mimeType: 'video/mp4',
            alt: {
              'zh-Hant': '臺北自來水園區場地租借與規劃介面操作示範',
              en: 'Venue rental and planning interface demo for the Taipei Water Park website',
              ja: '臺北自来水園区ウェブサイトの会場レンタル・計画画面操作デモ',
            },
          },
        },
      ],
      reflection: {
        'zh-Hant': [
          '本次重構專案中，我們將焦點放在所面對的使用者客群上，尤其著重視覺上的直覺性與操作的便捷性。',
          '透過重新分析使用者需求，思考如何讓公共資訊更容易理解與使用。',
        ],
        en: [
          'This redesign focused on the people who use the website, with particular attention to visual clarity and ease of interaction.',
          'By reconsidering user needs, we explored how public information could become easier to understand and use.',
        ],
        ja: [
          '本リデザインでは、実際の利用者層に焦点を当て、視覚的な分かりやすさと操作のしやすさを特に重視しました。',
          '利用者のニーズをあらためて分析し、公共情報をより理解しやすく、使いやすくする方法を検討しました。',
        ],
      },
    },
  },
]
