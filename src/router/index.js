import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import authService from '../services/auth.service'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })


  const validaToken = (token) => {
    return Vue.prototype.$axios.post('validate_token', {accessToken: token})
  }


  Router.beforeEach((to, from, next) => {
    window.$router = Router
    const user = authService.getUserFromLocalStorage()

    if(to.fullPath !== '/login') {
      if(!user) {
        next({path: '/login'})
      }else {
        validaToken(user.token).then(res => {
          if(res.data) {
            next()
          }else {
            next({path: '/login'})
          }
        })
      }
    }else {
      if(user) {
        validaToken(user.token).then(res => {
          if(res.data) {
            next({path: from.path})
          }else {
            authService.logout()
            next({path: '/login'})
          }
        })
      }else {
        next()
      }
    }
  });

  window.$router = Router

  return Router
}
