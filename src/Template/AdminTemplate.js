import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { USER_LOGIN } from '../Util/Settings';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Route } from 'react-router-dom';
import Admin from '../Page/Admin/Admin';
import { history } from '../App';

export const AdminTemplate = (props) => {
    const [collapse, setCollapse] = useState(false);

    const userLogin = JSON.parse(localStorage.getItem(`${USER_LOGIN}`));
    console.log(userLogin)
    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập !');
        return <Redirect to="/home" />
    }

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapse(!collapse)
    };

    return <Route exact path={props.path} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />} onClick={()=> {
                                history.push('/admin/user');
                            }}>
                            User
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Films">
                            <Menu.Item key="2" onClick={()=> {
                                history.push('/admin/films');
                            }}>Films</Menu.Item>
                            <Menu.Item key="3" onClick={()=> {
                                history.push('/admin/addNew');
                            }}>Add news</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="4" icon={<FileOutlined />} onClick={()=> {
                            history.push('/admin/showtimes');
                        }}>
                            Show times
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <img src={userLogin.hinhAnh}/>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <props.component {...propsRoute}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Nguyễn Lê Trường Thiện @2021</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}
