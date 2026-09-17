import { createRouter, createWebHistory } from 'vue-router'
import PortfolioOverviewView from '@/views/PortfolioOverviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'portfolio', component: PortfolioOverviewView },
    { path: '/artworks', name: 'artworks', component: () => import('@/views/ArtworksView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
