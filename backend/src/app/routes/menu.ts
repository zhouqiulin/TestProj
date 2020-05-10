
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

const articleManage = {
    text: '资讯管理',
    link: '/articles',
    icon: 'icon-note',
    submenu: [
        {
            text: '资讯列表',
            link: '/articles/list'
        },
        {
            text: '新增资讯',
            link: '/articles/details'
        },

    ]
};
const productManage = {
    text: '产品管理',
    link: '/article',
    icon: 'icon-handbag',
    submenu: [
        {
            text: '产品列表',
            link: '/products/list'
        },
        {
            text: '新增产品',
            link: '/products/details'
        }
    ]
};

const pageManage = {
    text: '单页管理',
    link: '/pages',
    icon: 'icon-docs',
    submenu: [
        {
            text: '单页列表',
            link: '/pages/list'
        },
        {
            text: '新增单页',
            link: '/pages/details'
        }
    ]
};


const systemManage = {
    text: '系统管理',
    link: '/tree',
    icon: 'icon-settings'
};

export const menu = [
    headingMain,
    Home,
    articleManage,
    productManage,
    pageManage,
    systemManage
];
