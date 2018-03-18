import Vue from 'vue'
import Router from 'vue-router'
import cubeOne from '@/components/origami/cube-one'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cube-one',
      component: cubeOne
    }
  ]
})
