import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';
import './login.css';
import {setToken} from '../utils/auth';
import {loginApi} from '../services/auth';


class Login extends Component {
    handleSubmit=e=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            // console.log('Received values of form: ', values);
            // setToken(values.username);
            // this.props.history.push("/admin");
            loginApi({
                userName:values.username,
                password:values.password
            })
              .then(res=>{
                  if(res.code==='success'){
                      message.success("login success!");
                      setToken(res.token);
                      this.props.history.push("/admin");
                  }else{
                      message.info(res.message);
                  }
                //   console.log(res);
              })
              .catch(err=>{
                //   console.log(err);
                message.error('User does not exist!');
              });
            }
        }); 
    };   
    render() { 
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title='Admin Login' className="login-form">
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create({name:'loginForm'})(Login);
