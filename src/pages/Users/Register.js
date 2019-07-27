import React, { Component } from 'react'
import icon from '../../assets/icon.jpg'
import styles from './account.scss'
import { Form, Input, Button } from 'antd'
import { email_reg, pwd_reg } from '../../utils/Regexp.js'
import Request from '../../utils/Request'

class Register extends Component {
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
              // initialValue: this.state.email
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
                placeholder="请输入6-16位字母、数字或特殊字符的密码"
              />
            )}
          </Form.Item>
          <Form.Item label='确认密码'>
          {getFieldDecorator('aPwd',{
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                }, 
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message: '请输入正确的密码格式'
                },
                {
                  validator: this.validatorPwd,
                  message: '两次输入的密码不一致'
                }
                
              ],
            })(<Input 
              maxLength={16}
              type='password'
              placeholder='请输入确认密码'
            />)}
          </Form.Item>
          <Form.Item >
            <Button type='primary' onClick={this.handleSubmit}>注册</Button>
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
  };

  // 自定义校验两次密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
    } else {
      callback();
    }
  }

  // 注册请求
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values)
      if (!err) {
        const { email, pwd } = values
        Request('/users.json', {
          method: 'post',
          data: { email, pwd }      
        })
        .then(res => {
          // console.log(res)
          if(res.status === 200 && res.data) {
            this.props.history.push('/login')
          }
        })
      }
    });
  }
}

export default Form.create()(Register)