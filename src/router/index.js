import Vue from 'vue'
import Router from 'vue-router'
import ChallengeFlow from '@/components/ChallengeFlow'
import PongGame from '@/components/PongGame/PongGame'
// import Store from '@/store/store.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ChallengeFlow',
      component: ChallengeFlow
    },
    {
      path: '/game',
      name: 'PongGame',
      component: PongGame
    }
  ]
})

export default router
