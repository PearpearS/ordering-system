import React, { Component } from 'react'
import { Tabs } from 'antd'
import styles from './index.scss'
import { Switch, } from "dva/router"
import SubRoutes, { RedirectRoute } from '../../utils/SubRoutes'

const { TabPane } = Tabs

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { routes, app} = this.props
    return (
      <div className={styles.about} >
        <Tabs className={styles.tab} tabPosition={'left'} onChange={this.handleChangeTab} activeKey={this.props.location.pathname}>
          <TabPane tab="历史订餐" key="/about/history">
          </TabPane>
          <TabPane tab="联系我们" key="/about/contact">
          </TabPane>
          <TabPane tab="点餐文档" key="/about/orderingGuide">
          </TabPane>
          <TabPane tab="快递信息" key="/about/delivery">
          </TabPane>
        </Tabs>
        <div className={styles.routes}>
          {/* 二级路由 */}
          <Switch>
            {
              routes.map((item,index) => (
                // 调用封装组件
                <SubRoutes key={index} {...item} app={app} />
              ))
            }
            <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </div>
      </div>
    )
  }

  handleChangeTab = (key) => {
    // console.log(this.props)
    if(this.props.location.pathname !== key) {
      this.props.history.push(key)
    }
  }
}
