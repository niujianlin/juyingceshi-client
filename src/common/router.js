import { createRouter, createWebHashHistory } from 'vue-router'

let routes = [
    // { path: "/ceshi", component: () => import("../views/profile/MainBody.vue")},
    { path: "/", redirect:"/login" },
    { path: "/home", component: () => import("../views/HomePage.vue") },
    { path: "/login", component: () => import("../views/Login.vue") },
    

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router, routes }