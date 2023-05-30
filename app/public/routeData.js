let adminRoute = [
    {
        path: '/layout',
        name: 'layout',
        redirect: '/group',
        component: 'layout',
        children: [
            {
                path: '/group',
                name: 'group',
                redirect: '/dashboard',
                meta: {
                    type: 'first',
                    name: '导航一',
                    icon: 'Menu'
                },
                children: [
                    {
                        path: '/dashboard',
                        name: 'Dashboard',
                        component: 'group/asidefirst/dashboard',
                        meta: {
                            type: 'second',
                            name: '首页',
                            icon: 'House'
                        }
                    },
                ]
            },
            {
                path: '/adminCenter',
                name: 'adminCenter',
                component: 'group/adminCenter',
                meta: {
                    type: 'first',
                    name: '配置中心',
                    icon: 'Setting'
                }
            },
            {
                path: '/personCenter',
                name: 'PersonCenter',
                component: 'group/asidefirst/personCenter',
                meta: {
                    type: 'first',
                    name: '个人中心',
                    icon: 'UserFilled'
                }
            }
        ]
    },
]

let personRoute = [
    {
        path: '/layout',
        name: 'layout',
        redirect: '/adminCenter',
        component: 'layout',
        children: [
            {
                path: '/adminCenter',
                name: 'adminCenter',
                component: 'group/adminCenter',
                meta: {
                    type: 'first',
                    name: '配置中心',
                    icon: 'Setting'
                }
            },
            {
                path: '/personCenter',
                name: 'PersonCenter',
                component: 'group/asidefirst/personCenter',
                meta: {
                    type: 'first',
                    name: '个人中心',
                    icon: 'UserFilled'
                }
            }
        ]
    },
]
module.exports = {
    adminRoute,
    personRoute
}