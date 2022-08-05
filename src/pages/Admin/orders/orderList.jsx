import { Button, Card, Popconfirm, Table } from 'antd';
import React, { useEffect } from 'react';
import {delOne, modifyOne} from '../../../services/orders';
import {connect} from 'react-redux';
import {loadOrder} from '../../../store/action/order';
import './list.css'



function List(props){

    const { list,  total } = props;
    // console.log(list,total);
    useEffect(()=>{
        props.dispatch(
            loadOrder({
              page: 1
            })
          );
    },[]);

    const loadData = page =>{
        props.dispatch(
            loadOrder({
              page: page
            })
        );
    };
    //组件初始化时执行
    const colums=[{
        title:'id',
        key:'_id',
        with:80,
        align:'center',
        render:(txt,record,index)=>index+1 
    // },{
    //     title:'no',
    //     dataIndex:'no'
    },{
        title:'receiver',
        dataIndex:'receiver'
    // },{
    //     title:'user',
    //     dataIndex:'user'
    },{
        title:'regions',
        dataIndex:'regions'
    },{
        title:'address',
        dataIndex:'address',
    },{
        title:'price',
        dataIndex:'price',
    },{
        title:'isPayed',
        dataIndex:'isPayed',
        render:(txt,record)=> (record.isPayed?"已支付":"未支付")
    },{
        title:'control',
        render:(txt,record,index)=>{
            return(
            <div>
                {/* 修改 */}
                <Popconfirm title="Are u sure?" 
                onCancel={()=>console.log("user cancel")} 
                onConfirm={()=>{
                    //点击修改携带id作为参数跳转至edit页面
                    props.history.push(`/admin/orders/orderEdit/${record._id}`);
                }}
                //调用API操作
                >
                <Button type='primary' size='small' >edit</Button>
                </Popconfirm>

                {/* 删除 */}
                <Popconfirm title="Are u sure?" 
                onCancel={()=>console.log("user cancel")} 
                onConfirm={()=>{
                    delOne(record._id).then(res=>{
                        loadData();
                    });
                }}
                //调用API操作
                >
                <Button style={{margin:"0 1rem"}} type='danger' size='small'>delete</Button>
                </Popconfirm>
                <Button size='small' onClick={()=>{
                    //修改在售状态
                    modifyOne(record._id,{ isPayed: !record.isPayed }).then(res => {
                        loadData();
                    });
                }}>{record.isPayed?"已支付":"未支付"}</Button>
            </div>
            );
        }
    }];
        return (
            
            <Card title="orders list" extra={
                <Button type='primary' size='small' 
                onClick={()=>props.history.push("/admin/orders/orderEdit")}
                >new</Button>
            }>
                <Table 
                    rowClassName={record => (record.isPayed ? "":"bg-color")}
                    rowKey="_id" 
                    pagination={{total,defaultPageSize:5,onChange:p => {
                        props.dispatch(loadOrder({ page: p }));
                      }}} 
                    columns={colums} 
                    bordered 
                    dataSource={list}
                />
            </Card>
        );
    }


export default connect(state => state.order)(List);
