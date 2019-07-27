import React, { Component } from 'react'
import { Table, Button, Row, Col, Message } from 'antd'
import styles from './index.scss'
import Newpizza from './Newpizza'
import Request from '../../utils/Request'

export default class index extends Component {
  state = {
    menus: []
  }
  // 获取菜单数据
  getMenusData = () => {
    Request('/menu.json')
      .then((res) => {
        if(res && res.status === 200 && res.data) {
          const { data } = res
          this.setState(() => {
            const menus = []
            for(let key in data) {
               menus.push({
                 key,
                 name:data[key].name
               })
            }
            return { menus }
          })
          
        }
      })
  }

  componentDidMount() {
    this.getMenusData()
  }
  renderMenuTable() {
    const columns = [
      {
        key: 'name',
        title: '品种',
        dataIndex: 'name'
      },
      {
        key: 'action',
        title: '删除',
        render: (text, record) => {
          return <Button className={styles['del-btn']} onClick={() => handleDelete(record)}>
            <span>x</span>
          </Button>
        }
      }
    ]
    const handleDelete = (record) => {
      Request(`/menu/${record.key}.json`, {
        method: 'delete'
      })
        .then((res) => {
          if(res && res.status === 200) {
            Message.success('删除成功')
            window.location.href = '/#/menus'
          } else {
            Message.error('删除失败')
          }
        })
    }

    const dataSource = this.state.menus
    return <Table 
      className={'menu-table'} 
      columns={columns} 
      dataSource={dataSource} 
      pagination={false}
      locale={{emptyText: '菜单没有任何商品'}}
      />
  }

  renderNewPizza() {
    return <Newpizza />
  }

  

  render() {
    return (
     <Row className={styles.admin}>
       <Col className={styles.left} sm={24} md={16}>添加新的披萨
        {this.renderNewPizza()}
       </Col>
       <Col className={styles.right} sm={24} md={8}>
         <h3>菜单</h3>
         {this.renderMenuTable()}
       </Col>
     </Row>
    )
  }
}
