/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react'
import styles from './index.scss'
import { Menu, Dropdown, Icon } from 'antd'
import { Link } from 'dva/router'

const menus = [
	{
		key: 'home',
		path: '/home',
		name: '主页'
	},
	{
		key: 'menus',
		path: '/menus',
		name: '菜单'
	},
	{
		key: 'admin',
		path: '/admin',
		name: '管理'
	},
	{
		key: 'about',
		path: '/about',
		name: '关于我们'
	},
	{
		key: 'login',
		path: '/login',
		name: '登陆',
		className: styles.login,
		isAuthority: true
	},
	{
		key: 'register',
		path: '/register',
		name: '注册',
		className: styles.register,
		isAuthority: true
	},
]

export default class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedKeys: []
		}
	}

	componentDidMount() {
		this.handleSelectedKeys(this.props.location.pathname)
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { pathname } = this.props
		if(pathname !== nextProps.location.pathname) {
			this.handleSelectedKeys(nextProps.location.pathname)
		}
	}


	handleSelectedKeys(pathName) {
		const temp = pathName.split('/')
		const key = temp && temp.length < 2 ? 'home':temp[1]
		this.setState({
			selectedKeys:[key]
		})
	}

	// 退出
	handleClickMenu = ({ key }) => {
		if(key === 'logOut') {
			window.localStorage.clear() // 清除信息缓存
			this.props.history.push('/login')
		}
	}

	menu = (
		<Menu onClick={this.handleClickMenu}>
			<Menu.Item key='logOut'>
				<span>退出</span>
			</Menu.Item>
  	</Menu>
	)


	render() {
		return (
			<nav  className={styles['header']}>
				<a href='#' className={styles['logo']}><svg viewBox="64 64 896 896"  data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg></a>
				<Menu className={styles['menu-left']} mode='horizontal' defaultSelectedKeys={['home']} selectedKeys={this.state.selectedKeys}>
					{
						menus.filter(
              ({ isAuthority }) =>
                !(isAuthority && localStorage.key && localStorage.email)
            )
						.map(({key, path, name, className}) => {
							return <Menu.Item key={key} className={className}>
												<Link to={path}>{name}</Link>
											</Menu.Item>
						})
					}
				</Menu>
				{/* 用户email&退出 */}
				{localStorage.email && localStorage.key && (
					<Dropdown overlay={this.menu} className={styles['dropdown-menu']}>
					<a className="ant-dropdown-link" href="#">
						<span className={styles.email}>{localStorage.email}</span> <Icon type="down" className={styles.icon}/>
					</a>
				</Dropdown>
				)} 
			</nav>
		)
	}
	
}
