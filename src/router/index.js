import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'hello',
    path: '/hello',
    component: () => import('@/components/HelloWorld.vue')
  }
]

export default new VueRouter({
  routes
})