import aboutIcon from '@/assets/icons/contact/about.webp'
import emailIcon from '@/assets/icons/contact/email.webp'
import githubIcon from '@/assets/icons/contact/github.webp'
import instagramIcon from '@/assets/icons/contact/instagram.webp'

const publicDocument = (fileName) => `${import.meta.env.BASE_URL}draco/documents/${fileName}`

export const aboutDocuments = {
  'zh-Hant': publicDocument('ResumeCH.pdf'),
  en: publicDocument('ResumeEN.pdf'),
  ja: publicDocument('ResumeJP.pdf'),
}

export const contactItems = [
  {
    key: 'email',
    label: 'Email',
    detail: 'jean890712@gmail.com',
    icon: emailIcon,
    href: 'mailto:jean890712@gmail.com',
  },
  {
    key: 'github',
    label: 'GitHub',
    detail: '@Shizu20211',
    icon: githubIcon,
    href: 'https://github.com/Shizu20211',
    external: true,
  },
  {
    key: 'about',
    label: { 'zh-Hant': '關於我', en: 'About Me', ja: '私について' },
    detail: {
      'zh-Hant': '檢視履歷 PDF',
      en: 'View résumé PDF',
      ja: '履歴書PDFを見る',
    },
    icon: aboutIcon,
    documents: aboutDocuments,
    external: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    detail: '@bang_dang.a',
    icon: instagramIcon,
    href: 'https://www.instagram.com/bang_dang.a?vrfl=d2E3ODF3ZHBnejFh&utm_source=qr',
    external: true,
  },
]
