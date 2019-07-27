import { Table, Button, Icon, Row, Col } from 'antd'
import styles from './index.scss'
import React, { Component } from 'react'
import Request from '../../utils/Request'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      menus: []
    }
  }

  // 获取菜单数据
  getMenusData = () => {
    Request('/menu.json')
      .then((res) => {
        if(res && res.status === 200 && res.data) {
          this.setState({
            menus: res.data
          })
        }
      })
  }

  componentDidMount() {
    this.getMenusData()
  }

  renderMenusTable() {
    const columns = [
      {
        key: 'size',
        title: '尺寸',
        dataIndex: 'size',
        render: (text, record) => {
          if(record.price) {
            return <span>{text}</span>
          } 
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 2
            }
          }
          
        }
      },
      {
        key: 'price',
        title: '价格',
        dataIndex: 'price',
        render: (text) => {
          return <span>{text}</span>
        }
      },
      {
        key: 'action',
        title: '加入',
        render: (text, record) => {
          const obj = {
            children: (
              <Button className={styles['add-btn']} onClick={() => handleAddMenus(record)}>
                <Icon type='plus'></Icon>
              </Button>
            ),
            props: []
          }
          if(!record.price) {
            obj.props.colSpan = 0
          }
          return obj
        }
      }, 
    ]

    const handleAddMenus = (record) =>{
      // const { name, price, size } = record

      let { cart } = this.state
      const index = cart.findIndex(item => item.key === record.key)
      index >= 0 ? cart.splice(index, 1, {
        ...cart[index],
        count: cart[index].count + 1
      }) :
        (cart = [
          ...cart,
          {
            ...record,
            count:1
          }
        ])
      this.setState({
        cart
      })
    }
    const data = this.state.menus
    let dataSource = []
    for(let key in data) {
      let item = data[key]
      dataSource.push({
        key: item.name,
        size: item.name
      })
      item.options.forEach((ele, index) => {
        dataSource.push({...ele,name: item.name, key:key + '-' + index})
      })
    }  
    return (
      <Table className={'menu-table'} columns={columns} dataSource={dataSource} pagination={false} />
    )
  }

  renderCartTable() {
    const columns = [
      {
        key: 'count',
        title: '数量',
        dataIndex: 'count',
        render: (text, record) => {
          return <span>
            <Button className={styles['cart-btn']} onClick={() => handleDecrease(record)}>-</Button>
            <span>{record.count}</span>
            <Button className={styles['cart-btn']} onClick={() => handleIncrease(record)}>+</Button>
          </span>
        }
      },
      {
        key: 'name',
        title: '菜单',
        dataIndex: 'name'
      },
      {
        key: 'price',
        title: '价格',
        dataIndex: 'price'
      }
    ]
    // 减
  const handleDecrease = record => {
    let { cart } = this.state
    const index = cart.findIndex(item => item.key === record.key)
    const current = cart[index]
    if(current.count <= 1) {
      cart.splice(index,1)
    } else {
      cart.splice(index, 1, {
        ...current,
        count: current.count - 1
      })
    }
    this.setState({
      cart
    })
  }

  // 加
  const handleIncrease = record => {
    let { cart } = this.state
    const index = cart.findIndex(item => item.key === record.key)
    const current = cart[index]
    cart.splice(index, 1, {
      ...current,
      count: current.count + 1
    })
    this.setState({
      cart
    })
  }
    return (
      <Table 
      className={'menu-table cart'} 
      columns={columns} 
      dataSource={this.state.cart} 
      pagination={false} 
      locale={{emptyText: '购物车暂无信息'}}
      />
    )
  }

  
  render() {
    const totalPrice = this.state.cart.reduce((total, item) =>(total += item.price * item.count),0)
    return (
      <Row>
        <Col sm={24} md={16}>{this.renderMenusTable()}</Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={styles['total-price']}>总价: {totalPrice}</p>
          <Button type='primary' className={styles['submit-btn']}>提交</Button>
        </Col>
      </Row>
    )
  }
}

export default index;
