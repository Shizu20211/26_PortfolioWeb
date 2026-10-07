import { createRouter, createWebHistory } from 'vue-router'
import PortfolioOverviewView from '@/views/PortfolioOverviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'portfolio', component: PortfolioOverviewView },
    { path: '/artworks', name: 'artworks', component: () => import('@/views/ArtworksView.vue') },
    {
      path: '/projects/:slug',
      name: 'project-case-study',
      component: () => import('@/views/ProjectCaseStudyView.vue'),
    },
    {
      path: '/artworks/:slug',
      name: 'artwork-detail',
      component: () => import('@/views/ArtworkDetailView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
