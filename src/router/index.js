import { createRouter, createWebHistory } from 'vue-router'
import PortfolioOverviewView from '@/views/PortfolioOverviewView.vue'

const projectSlugs = ['taipei-water-park', 'snake-maze', 'vue-travel', 'marathon-redesign', 'fantasy-booking', 'food-ordering']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'portfolio', component: PortfolioOverviewView },
    { path: '/projects/:slug', name: 'project', component: () => import('@/views/ProjectPlaceholderView.vue'), beforeEnter: (to) => projectSlugs.includes(to.params.slug) || '/' },
    { path: '/artworks', name: 'artworks', component: () => import('@/views/ArtworksView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
