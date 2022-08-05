import { Card,Form,Input,Button, message,Icon,Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import {createApi, getOneById, modifyOne} from '../../../services/products';
import {serverUrl} from '../../../utils/config';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

function Edit(props) {
    const { getFieldDecorator } = props.form;
        // console.log(props);
        //props.match.params.id 存在即表示修改，否则为新增
        const [currentData,setCurrentData] = useState({});
        const [imageUrl, setImageUrl] = useState("");
        const [loading,setLoading] = useState(false);
        const [editorState,setEditorState] = useState(BraftEditor.createEditorState(''))
        
        const uploadButton = (
            <div>
              <Icon type={loading ? "loading" : "plus"} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );

        // 图片上传
        const handleChange = info => {
            if (info.file.status === "uploading") {
            setLoading(true);
            return;
            }
            if (info.file.status === "done") {
            // 上传成功
            // Get this url from response in real world.
            setLoading(false);
            // console.log(info);
            setImageUrl(info.file.response.info);
            }
        };
        //富文本编辑器
        const handleEditorChange = (v) => {
            setEditorState(v)
          }
        
        // 初始化的时候执行
        useEffect(()=>{
            if(props.match.params.id){
                getOneById(props.match.params.id)
                    .then(res => {
                        console.log(res);
                        setCurrentData(res);
                        setImageUrl(res.coverImg);
                        setEditorState(BraftEditor.createEditorState(res.content));
                    })
            //         getOneByCategory(props.match.params.id)
            //         .then(res => {
            //                     console.log(res[0]);
            //                     setCurrentData(res[0]);
            //                     setImageUrl(res[0].coverImg);
            //                     setEditorState(BraftEditor.createEditorState(res[0].content));
            //                 })
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
                        modifyOne(props.match.params.id,{...values,coverImg:imageUrl,content:editorState.toHTML()})
                        .then(res => {
                        console.log(res);
                        props.history.push("/admin/products");
                        })
                        .catch(err => {
                            console.log(err);
                        });  
                    }else{
                        createApi({...values,coverImg:imageUrl,content:editorState.toHTML()})
                        .then(res => {
                            // console.log(res);
                            props.history.push("/admin/products");
                        })
                        .catch(err => {
                            console.log(err);
                        });  
                }
            }else{
                message.error('please print correct content')
            }
        })
    }
    // 价格限制
    // const priceValidate = (rule,value,callback)=>{
    //     if(value*1>100){
    //         callback("price should lower than 100");
    //     }else{
    //         callback();
    //     }
    // }
        
        return (
            <Card title='goods edit'  extra={
                <Button type="primary" onClick={() => props.history.push("/admin/products")}>
                  返回
                </Button>
              }>
                <Form onSubmit={handleSubmit}>
                    <Form.Item label="productCategory">
                        {getFieldDecorator('productCategory', {
                            rules: [{ 
                                required: true, 
                                message: '请输入商品分类!' 
                            }],
                            initialValue:currentData.productCategory
                        })(<Input placeholder="请输入商品分类"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="name">
                        {getFieldDecorator('name', {
                            rules: [{ 
                                required: true, 
                                message: '请输入商品名称!' 
                            }],
                            initialValue:currentData.name
                        })(<Input placeholder="请输入商品名称"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="price">
                        {getFieldDecorator('price', {
                            rules: [{ 
                                required: true, 
                                message: '请输入商品价格!'
                            // },{
                            //     validator:priceValidate
                            }],
                            initialValue:currentData.price
                        })(<Input placeholder="请输入商品价格"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="picture">
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={serverUrl + "/api/v1/common/file_upload"}
                            onChange={info => handleChange(info)}
                        >
                            {imageUrl ? (<img 
                                src={ serverUrl+imageUrl} 
                                alt="avatar" 
                                style={{ width: '100%' }} /> 
                                ):( 
                                    uploadButton 
                                )}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="详情">
                        <BraftEditor
                            value={editorState}
                            onChange={(e)=>handleEditorChange(e)}
                        />               
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">save</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    
}

export default Form.create({name:'productEdit'})(Edit);
