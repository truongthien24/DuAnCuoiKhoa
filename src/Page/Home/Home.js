import React from 'react'
import Banner from '../../Banner/Banner'
import Films from './Films/Films'
import CommingSoon from './CommingSoon/CommingSoon'
import ShowTimes from './ShowTimes/ShowTimes';
import { Alert } from 'antd';
export default function Home(props) {
    return (
        <div id="home" style={{position: 'relative'}}>
            <Banner/>
            <Films/>
            <CommingSoon/>
            <ShowTimes/>
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
