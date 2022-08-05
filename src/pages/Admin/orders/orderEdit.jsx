import { Card,Form,Input,Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {createApi, getOneById, modifyOne} from '../../../services/orders';

function Edit(props) {
    const { getFieldDecorator } = props.form;
        // console.log(props);
        //props.match.params.id 存在即表示修改，否则为新增
        const [currentData,setCurrentData] = useState({});
    

    
        // 初始化的时候执行
        useEffect(()=>{
            if(props.match.params.id){
                getOneById(props.match.params.id)
                    .then(res => {
                        // console.log(res);
                        setCurrentData(res);
                    })
            }
        },[]);// eslint-disable-line

    const handleSubmit = e =>{
        // console.log(e)
        e.preventDefault();
        //验证
        props.form.validateFields((err, values) => {
            if (!err) {
            //   console.log('Received values of form: ', values);
            //   console.log('submit');
              //调用API
                if(props.match.params.id){
                        modifyOne(props.match.params.id,{...values})
                        .then(res => {
                        // console.log(res);
                        props.history.push("/admin/orders");
                        })
                        .catch(err => {
                            console.log(err);
                        });  
                    }else{
                        createApi({...values})
                        .then(res => {
                            // console.log(res);
                            props.history.push("/admin/orders");
                        })
                        .catch(err => {
                            console.log({...values})
                            console.log(err);
                        });  
                }
            }else{
                message.error('please print correct content')
            }
        })
    }
    // const priceValidate = (rule,value,callback)=>{
    //     if(value*1>100){
    //         callback("price should lower than 100");
    //     }else{
    //         callback();
    //     }
    // }
        
        return (
            <Card title='orders edit'  extra={
                <Button type="primary" onClick={() => props.history.push("/admin/orders")}>
                  返回
                </Button>
              }>
                <Form onSubmit={handleSubmit}>
                <Form.Item label="no">
                        {getFieldDecorator('no', {
                            rules: [{ 
                                required: true, 
                                message: '请输入编号!' 
                            }],
                            initialValue:currentData.no
                        })(<Input placeholder="请输入编号"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="receiver">
                        {getFieldDecorator('receiver', {
                            rules: [{ 
                                required: true, 
                                message: '请输入接收人!' 
                            }],
                            initialValue:currentData.receiver
                        })(<Input placeholder="请输入接收人"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="user">
                        {getFieldDecorator('user', {
                            rules: [{ 
                                required: true, 
                                message: '请输入用户ID!' 
                            }],
                            initialValue:currentData.user
                        })(<Input placeholder="请输入用户ID"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="regions">
                        {getFieldDecorator('regions', {
                            rules: [{ 
                                required: true, 
                                message: '请输入地区!' 
                            }],
                            initialValue:currentData.regions
                        })(<Input placeholder="请输入地区"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="address">
                        {getFieldDecorator('address', {
                            rules: [{ 
                                required: true, 
                                message: '请输入地址!' 
                            }],
                            initialValue:currentData.address
                        })(<Input placeholder="请输入地址"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="price">
                        {getFieldDecorator('price', {
                            rules: [{ 
                                required: true, 
                                message: '请输入价格!'
                            // },{
                            //     validator:priceValidate
                            }],
                            initialValue:currentData.price
                        })(<Input placeholder="请输入价格"/>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">save</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    
}

export default Form.create({name:'ordersEdit'})(Edit);
