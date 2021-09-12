import React from 'react'
import Banner from '../../Banner/Banner'
import Films from './Films/Films'
import CommingSoon from './CommingSoon/CommingSoon'
import ShowTimesMobile from './ShowTimes/ShowTimesMobile'
import { Alert } from 'antd';

export default function HomeMobile(props) {
    return (
        <div>
            <Banner/>
            <Films/>
            <CommingSoon/>
            <ShowTimesMobile/>
            <div className="animate__animated animate__backInRight" id="loginSuccess" style={{position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000'}}>
                <Alert message="Đăng nhập thành công" type="success" closable="false" showIcon />
            </div>
            <div className="animate__animated animate__backInRight" id="loginError" style={{position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000'}}>
                <Alert message="Đăng nhập thất bại" type="error" showIcon closable="false"/>
            </div>
            <div className="animate__animated animate__backInRight" id="registerSuccess" style={{position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000'}}>
                <Alert message="Đăng ký thành công" type="success" closable="false" showIcon />
            </div>
            <div className="animate__animated animate__backInRight" id="registerError" style={{position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000'}}>
                <Alert message="Đăng ký thất bại" type="error" showIcon closable="false"/>
            </div>
        </div>
    )
}