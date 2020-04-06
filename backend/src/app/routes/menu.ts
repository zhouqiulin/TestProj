
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

const articleManage={
    text:'资讯管理',
    link:'/article',
    icon:'icon-note',
    submenu: [
        {
            text: '资讯列表',
            link: '/article/list'
        },
        {
            text: '资讯类别',
            link: '/article/type'
        },

    ]
}
const productManage={
    text:'产品管理',
    link:'/article',
    icon:'icon-handbag',
    submenu:[
        {
            text:'产品列表',
            link:'/product/list'
        },
        {
            text:'产品类别',
            link:'/product/type'
        }
    ]
}

const pageManage={
    text:'单页管理',
    link:'/page',
    icon:'icon-docs',
    submenu:[
        {
            text:'单页列表',
            link:'/page/list'
        },
        {
            text:'单页类别',
            link:'/page/type'
        }
    ]
}
const menuManage={
    text:'菜单管理',
    link:'/menu',
    icon:'icon-menu',
    submenu:[
        {
            text:'菜单列表',
            link:'/product/list'
        }
    ]
}

const systemManage={
    text:'系统管理',
    link:'/tree',
    icon:'icon-settings'
}

export const menu = [
    headingMain,
    Home,
    articleManage,
    productManage,
    pageManage,
    menuManage,
    systemManage
];
