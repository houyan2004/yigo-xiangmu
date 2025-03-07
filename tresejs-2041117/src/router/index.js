import {createRouter, createWebHashHistory} from 'vue-router'
import routers from './routers'

const router = createRouter({
  history: createWebHashHistory(),
    routes: routers
})

//前置路由守卫
router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.requireAuth)
    const userLoggedIn = localStorage.getItem('token')
    if (requireAuth && !userLoggedIn) {
        console.log('未登录')
        next('/')
    }
    next()
})

export default router