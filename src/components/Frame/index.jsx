import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown,Avatar,Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import p1 from './p1.jpg'
import './frame.css'
import { adminRoutes } from '../../Routes';
import {clearToken} from '../../utils/auth'
import {connect} from 'react-redux';

const routes = adminRoutes.filter(route=>route.isShow)
const { Header, Content, Sider } = Layout;


class Index extends Component {
    render() {
        const popMenu=(
            <Menu onClick={(p)=>{
                if(p.key==='logOut'){
                    clearToken();
                    this.props.history.push('/login');
                }else{
                    // message.info(p.key);
                    if(p.key==='noti'){
                        this.props.history.push("/admin/notices");
                    }else if(p.key==='setting'){
                        this.props.history.push("/admin/setting");
                    }
                }
            }}>
                <Menu.Item key='noti'>notification</Menu.Item>
                <Menu.Item key='setting'>setting</Menu.Item>
                <Menu.Item key='logOut'>logOut</Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Header  className="header" style={{height: 100,background: 'black'}}>
                    <div className="logo" >
                        <img src={p1} alt="logo" style={{width: 130,height: 100}}></img>
                    </div>
                    <Dropdown overlay={popMenu}>    
                        <div>
                            <Badge dot={!this.props.isAllRead}>
                                <Avatar size="large" icon="user" />
                            </Badge>
                            <Icon type='setting' style={{fontSize:'1.8em',color:'pink'}}/>
                        </div>
                    </Dropdown>
                </Header>
                <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        {routes.map(route => {
                            return (
                            <Menu.Item 
                                key={route.path}
                                onClick={p => this.props.history.push(p.key)}
                                >
                                <Icon type={route.icon}/>
                                {route.title}
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                    style={{
                        background: '#fff',
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {this.props.children}
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default connect(state=>state.notice)(withRouter(Index));
