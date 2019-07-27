import React from 'react'
import { Route, Redirect } from 'dva/router'
import NoMatch from '../components/NoMatch'
import dynamic from 'dva/dynamic' // 解决动态加载路由
import { connect } from 'dva'

// 路由封装方法一：
// export default function SubRoutes(route) {
//   return (
//     <div>
//       <Route render={ props => <route.component { ...props } routes={route.routes}/> } />
//     </div>
//   )
// }



// 解决动态加载路由
const dynamicCom = (app,models,component,routes, isAuthority,userInfo) => 
  dynamic({
  app,
  models: () => models,
  component: () => component().then(res => {
    if(isAuthority) {
      // 判断id是否有内容
      if(!localStorage.key || !localStorage.email) {
        return () => <Redirect to='/login' />
      }
    }
    const Component = res.default || res
    return props => <Component {...props} app={app} routes={routes} />
  })
});

// 路由封装方法二：
function SubRoutes({routes,component, app, model,isAuthority,userInfo}) {
  return <Route component={dynamicCom(app,model,component,routes,isAuthority,userInfo)} />
}

// 重定向封装
export function RedirectRoute({routes,from,exact}) {
  const routeR = routes.filter((item) => {
    return item.redirect
  })

  const to = routeR.length ? routeR[0].path : routes[0].path
  return <Redirect exact={exact} from={from} to={to} />
}

// 如果网址错误时
export function NoMatchRoute({status = 404}) {
  return <Route render={props => <NoMatch {...props} status={status} /> } />
}


export default connect(({global}) => ({
  userInfo: global.userInfo
})) (SubRoutes)