import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';
import { Layout } from 'antd';

// 引入路由组件
import { Switch, } from "dva/router";
import  SubRoutes, { RedirectRoute,NoMatchRoute } from '../utils/SubRoutes'

import NavBar from './NavBar'
// import Home from './Home'
// import About from './About'
// import Admin from './Admin'
// import Menus from './Menus'
// import Login from './Users/Login'
// import Register from './Users/Register'

const { Header, Content } = Layout;

function IndexPage(props) {
  const { routes, app, } = props
  return (
    <Layout className={styles['layout']}>
      <Header className={styles['header']}>
        <NavBar {...props}></NavBar>
      </Header>
      <Content className={styles['content']}>
        {/* 一级路由 */}
        <Switch>
          {/* <Route path='/home' component={Home}></Route>
          <Route path='/about' component={About}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Route path='/menus' component={Menus}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route> */}
          {
            routes.map((item,index) => (
              // 调用封装组件
              <SubRoutes key={index} {...item} app={app} />
            ))
          }

          {/* 重定向 */}
          {/* <Redirect to='/home' /> */}
          <RedirectRoute exact={true} from={'/'} routes={routes} />

          {/* 浏览地址不存在时的跳转 */}
          <NoMatchRoute />
        </Switch>

       
        

        
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
