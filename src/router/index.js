import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'
import {
  cantAccessPatientRoutes
} from './../notifications/auth'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

// Zastita za /patient rute, gdje korisnik mora imati rolu pacijenta
router.beforeEach((to, from, next) => {
  if (to.path.includes("/patient/") || to.path == "/patient") {
    if (store.getters.getRole == "patient" && store.getters.getJwt != "") {
      next()
    } else {
      cantAccessPatientRoutes()
      next(false)
    }
  } else {
    next();
  }
  if (to.path.includes("/doctor/derm/") || to.path == "/doctor/derm") {
    if (store.getters.getRole == "dermatologist" && store.getters.getJwt != "") {
      next()
    } else {
      cantAccessPatientRoutes()
      next(false)
    }
  } else {
    next();
  }
  if (to.path.includes("/doctor/pharm") || to.path == "/doctor/pharm") {
    if (store.getters.getRole == "pharmacist" && store.getters.getJwt != "") {
      next()
    } else {
      cantAccessPatientRoutes()
      next(false)
    }
  } else {
    next();
  }
})

export default router;
