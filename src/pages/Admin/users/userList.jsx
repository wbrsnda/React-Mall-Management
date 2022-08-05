import { Button, Card, Popconfirm, Table } from 'antd';
import React, { useEffect } from 'react';
import {delOne} from '../../../services/users';
import {serverUrl} from '../../../utils/config';
import {connect} from 'react-redux';
import {loadUser} from '../../../store/action/user';
import './userList.css';


function List(props){

    const { list,  total } = props;
    // console.log(list,total);
    useEffect(()=>{
        props.dispatch(
            loadUser({
              page: 1
            })
          );
    },[]);

    const loadData = page =>{
        props.dispatch(
            loadUser({
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
    },{
        title:'userName',
        dataIndex:'userName'
    },{
        title:'avatar',
        dataIndex:'avatar',
            render:(txt,record)=>
                record.avatar?(
                <img 
                    src={serverUrl+record.avatar} 
                    alt={record.userName} 
                    style={{width:'120px',height:'90px'}}
                />
                ):(
                    '暂无图片'
                )
    },{
        title:'nickName',
        dataIndex:'nickName'
    // },{
    //     title:'password',
    //     dataIndex:'password',
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
                    props.history.push(`/admin/users/userEdit/${record._id}`);
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
                <Button style={{margin:"0 1rem"}} type='primary' size='small' onClick={()=>{
                    props.history.push(`/admin/users/ViewID/${record._id}`);
                }}>view</Button>
            </div>
            );
        }
    }];
        return (
            
            <Card title="users list" extra={
                <Button type='primary' size='small' 
                onClick={()=>props.history.push("/admin/users/userEdit")}
                >new</Button>
            }>
                <Table 
                    rowClassName="userList"
                    rowKey="_id" 
                    pagination={{total,defaultPageSize:5,onChange:p => {
                        props.dispatch(loadUser({ page: p }));
                      }}} 
                    columns={colums} 
                    bordered 
                    dataSource={list}
                />
            </Card>
        );
    }


export default connect(state => state.user)(List);
