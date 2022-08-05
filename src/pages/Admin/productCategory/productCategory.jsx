import { Button, Card, Popconfirm, Table } from 'antd';
import React, { useEffect } from 'react';
import {delOne} from '../../../services/productCategory';
import {serverUrl} from '../../../utils/config';
import {connect} from 'react-redux';
import { loadProductCategory } from '../../../store/action/productCategory';
// import {getOneById,getOneByCategory} from '../../../services/products';
// import {loadProduct} from '../../../store/action/product';
// import {screening} from '../../../store/action/screening';

function List(props){

    const { list,  total } = props;
    // console.log(props);
    // console.log(list,total);
    useEffect(()=>{
        props.dispatch(
            loadProductCategory({
              page: 1
            })
          );
    },[]);

    const loadData = page =>{
        props.dispatch(
            loadProductCategory({
              page: page
            })
        );
    };
    // const loadScreeningData = (id) =>{
    //     props.dispatch(
    //         screening({
    //           id: id,
    //         //   page: page
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
    },{
        title:'name',
        dataIndex:'name'
    },{
        title:'descriptions',
        dataIndex:'descriptions'
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
        title:'control',
        render:(txt,record,index)=>{
            return(
            <div>
                {/* 修改 */}
                <Popconfirm title="Are u sure?" 
                onCancel={()=>console.log("user cancel")} 
                onConfirm={()=>{
                    //点击修改携带id作为参数跳转至edit页面
                    props.history.push(`/admin/productCategory/productCategoryEdit/${record._id}`);
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
                <Button style={{margin:"0 1rem"}} type='primary' size='small' onClick={()=>{
                    // console.log(record._id);
                    // getOneByCategory(record._id).then(res => {
                    
                        // loadScreeningData(record._id);
                        // props.dispatch(screening({id:record._id}))
                        // console.log(res);
                        // console.log(props);
                        
                    // }).catch(err => {
                    //     alert(err);
                    //     console.log(err);
                    // });
                    props.history.push(`/admin/productCategory/ViewID/${record._id}`);
                }}>view</Button>
            </div>
            );
        }
    }];

        return (
            <Card title="Product Category" extra={
                <Button type='primary' size='small' 
                onClick={()=>props.history.push("/admin/productCategory/productCategoryEdit")}
                >new</Button>
            }>
                <Table 
                    rowKey="_id" 
                    pagination={{total,defaultPageSize:5,onChange:p => {
                        props.dispatch(loadProductCategory({ page: p }));
                      }}} 
                    columns={colums} 
                    bordered 
                    dataSource={list}
                />
            </Card>
        );
    }


export default connect(state => state.productCategory)(List);
