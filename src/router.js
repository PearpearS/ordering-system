import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './pages/IndexPage';
// import Home from './pages/Home'
// import About from './pages//About'
// import Admin from './pages//Admin'
// import Menus from './pages//Menus'
// import Login from './pages//Users/Login'
// import Register from './pages//Users/Register'
import  SubRoutes  from './utils/SubRoutes'

// 私有路由开关
const isAuthority = true


// 配置路由，循环遍历路由
const RouteConfig = [
  {
    path: '/',
    component: () => import ('./pages/IndexPage'),
    model: [],
    routes: [
      {
        path: '/home',
        component: () => import ('./pages/Home'),
        model: [import('./models/home')],
        redirect: true,
        isAuthority
      },
      {
        path: '/menus',
        component: () => import ('./pages/Menus'),
        model: [],
        isAuthority
      },
      {
        path: '/about',
        component: () => import ('./pages/About'),
        model: [],
        isAuthority,
        routes: [
          {
            path: '/about/contact',
            component: () => import ('./pages/About/Contact'),
            model: [],
            routes:[
              {
                path: '/about/contact/phone',
                model: [],
                component: () => import ('./pages/About/Phone')
              },
              {
                path: '/about/contact/address',
                model: [],
                component: () => import ('./pages/About/Address')
              }
            ]
          },
          {
            path: '/about/delivery',
            component: () => import ('./pages/About/Delivery'),
            model: [],
          },
          {
            path: '/about/history',
            component: () => import ('./pages/About/History'),
            model: [],
          },
          {
            path: '/about/orderingGuide',
            component: () => import ('./pages/About/OrderingGuide'),
            model: [],
          },
        ]
      },
      {
        path: '/admin',
        component: () => import ('./pages/Admin'),
        model: [],
        isAuthority
      },
      {
        path: '/login',
        component: () => import ('./pages/Users/Login'),
        model: [],
      },
      {
        path: '/register',
        component: () => import ('./pages/Users/Register'),
        model: [],
      },
    ]
  }
]

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" component={IndexPage} /> */}
        {
          RouteConfig.map((item,index) => (
            // 调用封装组件
            <SubRoutes key={index} {...item} app={app} />
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
