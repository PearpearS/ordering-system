import React, { Component } from 'react'
import styles from './index.scss'
import { connect } from 'dva'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className={styles['home']}>
      <div className={styles.background}>
        <h1>你好哇，李银河</h1>
        <h2>你好哇</h2>
        <p>{this.props.text}</p>
      </div>
    </div>
    )
  }
}

// 关联home.js(models)和当前组件的index.js(home组件)
export default connect(({home}) => ({...home})) (index)
