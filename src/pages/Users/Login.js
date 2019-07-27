import React, { Component } from 'react'
import styles from './account.scss'
import icon from '../../assets/icon.jpg'
import { Form, Input, Button, Message, Spin } from 'antd'
import { email_reg, pwd_reg } from '../../utils/Regexp.js'
import Request from '../../utils/Request'
import { connect } from 'dva'

@connect()
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.account}>
        <img alt='icon' src={icon} className={styles.logo} />
        <Form >
          <Form.Item label='邮箱'>
            {getFieldDecorator('email',{
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空'
                }, 
                {// 自定义验证规则
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '请输入正确的邮箱格式'
                }
                
              ],
              initialValue: this.state.email
            })(<Input />)}
            
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空，请输入密码！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                // placeholder="请输入6-16位字母、数字或特殊字符的密码"
              />
            )}
          </Form.Item>
          <Form.Item >
          <Button type='primary' onClick={this.handleSubmit}>登陆</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  // 自定义表单规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern) ) {
      callback(rule.message);
    } else {
      callback();
    }
  }

  // 登陆请求
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values)
      if (!err) {
        const { email, pwd } = values
        Request('users.json')
          .then(res => {
            const { data, status } = res
            // console.log(res)
            if(res && status === 200 && data) {
              let users = []
              for(let key in data) {
                // console.log(key)
                users.push({
                  ...data[key],
                  key
                })
              }
              // console.log(users)
              // 账号密码匹配
              users = users.filter((item) => {
                return item.pwd === pwd && item.email === email
              })
              if(users && users.length) {
                // 存一份本地
                localStorage.setItem('email',users[0].email)
                localStorage.setItem('key',users[0].key)
                // 存储到models
                this.props.dispatch({
                  type: 'global/setUserInfo',
                  payload: users[0]
                })
                // 跳转路由
                .then(() => {
                  this.props.history.push('/')
                  Message.success(`登陆成功，欢迎你,${users[0].email}`)
                }) 
              } else {
                Message.error('邮箱或密码错误')
              }
            }
          })
      }
    });
  }
}

export default Form.create()(Login)
