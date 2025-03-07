const routers = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/page/LoginCo.vue'),
    },
    {
        path: "/user",
        name: "user",
        component: () => import("../page/user/User.vue"),
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/ai",
        name: "ai",
        component: () => import("../page/ai/Ai.vue")
    },
    {
        path: "/product",
        redirect: "/product/productArr",
        name: "product",
        meta: {
            requireAuth: true
        },
        component: () => import("../page/product/Product.vue"),
        children: [
            {
                path: "productArr",
                name: "productArr",
                component: () => import("../page/product/productItem/ProductArr.vue")
            },
            {
                path: "productClassify",
                name: "productClassify",
                component: () => import("../page/product/productItem/ProductClassify.vue")
            }
        ]
    },
    {
        path: "/",
        redirect: '/login'
    },
]

export default routers