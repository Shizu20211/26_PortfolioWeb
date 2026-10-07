import aboutIcon from '@/assets/icons/contact/about.webp'
import emailIcon from '@/assets/icons/contact/email.webp'
import githubIcon from '@/assets/icons/contact/github.webp'
import instagramIcon from '@/assets/icons/contact/instagram.webp'

export const aboutDocuments = {
  'zh-Hant': null,
  en: null,
  ja: null,
}

export const contactItems = [
  { key: 'email', label: 'Email', icon: emailIcon, href: null },
  { key: 'github', label: 'GitHub', icon: githubIcon, href: null, external: true },
  {
    key: 'about',
    label: { 'zh-Hant': '關於我', en: 'About Me', ja: '私について' },
    icon: aboutIcon,
    documents: aboutDocuments,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: instagramIcon,
    href: null,
    external: true,
  },
]
