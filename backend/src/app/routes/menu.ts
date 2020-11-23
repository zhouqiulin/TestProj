/*
 * @LastEditTime: 2020-11-23 19:52:04
 */
const articleManage = {
  text: '资讯管理',
  icon: 'icon-note',
  submenu: [
    {
      text: '资讯列表',
      link: '/article/list',
    },
    {
      text: '新增资讯',
      link: '/article/details',
    },
  ],
};
const productManage = {
  text: '产品管理',
  icon: 'icon-handbag',
  submenu: [
    {
      text: '产品列表',
      link: '/product/list',
    },
    {
      text: '新增产品',
      link: '/product/details',
    },
  ],
};

const pageManage = {
  text: '单页管理',
  link: '/pages',
  icon: 'icon-docs',
  submenu: [
    {
      text: '单页列表',
      link: '/pages/list',
    },
    {
      text: '新增单页',
      link: '/pages/details',
    },
  ],
};

const systemManage = {
  text: '系统管理',
  link: '/system',
  icon: 'icon-settings',
  submenu: [
    {
      text: '菜单管理',
      link: '/system/menu',
    },
    {
      text: '分类管理',
      link: '/system/tree',
    },
  ],
};

export const menu = [articleManage, productManage, pageManage, systemManage];
