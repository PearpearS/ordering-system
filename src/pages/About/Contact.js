import React, { Component } from 'react'
import { Switch, Link } from "dva/router"
import SubRoutes, { RedirectRoute } from '../../utils/SubRoutes'
import styles from './tabPhone.scss'

export default class Contact extends Component {
  
  render() {
    const { routes, app } = this.props
    return (
      <div className={styles.contact}>
        <p>联系我们</p>
        <div className={styles.linkBox}>
          <Link to='/about/contact/phone' className={styles.link}>电话</Link>
          <Link to='/about/contact/address' className={styles.link}>地址</Link>
        </div>
        <div>
          {/* 三级路由 */}
          <Switch>
            {
              routes.map((item,index) => (
                // 调用封装组件
                <SubRoutes key={index} {...item} app={app} />
              ))
            }
            <RedirectRoute exact={true} from={'/about/contact'} routes={routes} />
          </Switch>
        </div>
      </div>
    )
  }
  
  
}
