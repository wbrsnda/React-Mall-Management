import { Button, Card, Popconfirm, Table, Input } from 'antd';
import React, { useEffect } from 'react';
import {delOne, modifyOne,getOneByName} from '../../../services/products';
import './list.css'
import {serverUrl} from '../../../utils/config';
import {connect} from 'react-redux';
import {loadProduct} from '../../../store/action/product';
// import {screening} from '../../../store/action/screening';


function List(props){

    const { list,  total } = props;
    // console.log(list,total);
    const { Search } = Input;
    useEffect(()=>{
        props.dispatch(
            loadProduct({
              page: 1
            })
          );
    },[]);

    const loadData = page =>{
        props.dispatch(
            loadProduct({
              page: page
            })
        );
    };
    // const loadScreening = (name,page) =>{
    //     props.dispatch(
    //         screening({
    //           name:name,
    //           page: page
    //         })
    //     );
    // };
    //组件初始化时执行
    const colums=[{
        title:'id',
        key:'_id',
        with:80,
        align:'center',
        render:(txt,record,index)=>index+1 
    // },{
    //     title:'productCategory',
    //     dataIndex:'productCategory'
    },{
        title:'name',
        dataIndex:'name'
    },{
        title:'picture',
        dataIndex:'coverImg',
            render:(txt,record)=>
                record.coverImg?(
                <img 
                    src={serverUrl+record.coverImg} 
                    alt={record.name} 
                    style={{width:'120px'}}
                />
                ):(
                    '暂无图片'
                )
    },{
        title:'price',
        dataIndex:'price'
    },{
        title:'onSale',
        dataIndex:'onSale',
        render:(txt,record)=> (record.onSale?"在售":"已下架")
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
                    props.history.push(`/admin/products/edit/${record._id}`);
                }}
                //调用API操作
                >
                <Button type='primary' size='small' >change</Button>
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
                    modifyOne(record._id,{ onSale: !record.onSale }).then(res => {
                        loadData();
                    });
                }}>{record.onSale?"下架":"上架"}</Button>
            </div>
            );
        }
    }];
        return (
            <Card title="goods list" extra={
                <div>
                <div style={{float:'left'}}>
                    <Button type='primary' size='large' 
                    onClick={()=>props.history.push("/admin/products/edit")}
                    >new</Button>
                    </div>
                    <div style={{float:'right'}}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => {
                            // getOneByName(value)
                            // .then(res => {
                                // console.log(value);
                                // console.log(res);
                                
                                props.history.push(`/admin/products/ScreeningList/${value}`);
                                // loadScreening(value,1);
                                // console.log(list);
                            // })
                            // console.log(props);
                        }
                        }/>
                </div>
                </div>
            }>
                <Table 
                    rowKey="_id" 
                    rowClassName={record => (record.onSale ? "":"bg-color")}
                    pagination={{total,defaultPageSize:5,onChange:p => {
                        props.dispatch(loadProduct({ page: p }));
                      }}} 
                    columns={colums} 
                    bordered 
                    dataSource={list}
                />
            </Card>
        );
    }


export default connect(state => state.product)(List);
