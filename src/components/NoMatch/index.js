import React from 'react'
import styles from './index.scss'


export default function index({status}) {
  console.log(status)
  return (
    <div className={styles.notFount}>
      <p>{status} 浏览器地址不存在</p>
    </div>
  )
}

