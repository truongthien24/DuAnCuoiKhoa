import React, { useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LayThongTinLichChieuPhim } from '../../Redux/Reducer/Action/QuanLyHeThongRapAction';
import { primary_color } from '../../Util/Settings';
const { TabPane } = Tabs;


export default function FilmInfo(props) {

    const dispatch = useDispatch();

    const { id } = props.match.params;

    useEffect(() => {
        const action = LayThongTinLichChieuPhim(id);
        dispatch(action);
    }, []);


    const thongTinLichChieuPhim = useSelector(state => state.QuanLyHeThongRapReducer.thongTinLichChieuPhim);

    const arrHeThongRapChieu = useSelector(state => state.QuanLyHeThongRapReducer.arrHeThongRapChieu);

    const renderGioChieu = (lichChieu) => {
        return lichChieu.map((item, index) => {
            const gioChieu = item.ngayChieuGioChieu;
            return <Fragment>
                <NavLink to={`/ticketroom/${item.maLichChieu}`} key={index} className="showtimes__item-times-btn">
                    {gioChieu.slice(-8, gioChieu.length)}
                </NavLink>
            </Fragment>
        })
    }

    const renderLichPhim = (lichPhim) => {
        return lichPhim.map((item, index) => {
            return <Fragment>
                <div className="row my-3" key={index} style={{ borderBottom: '1px solid gray' }} class="tabPane__showtimes-item">
                    <div className="d-flex justify-content-start mb-3 col-12 showtimes__item-info">
                        <img src={item.hinhAnh} style={{ width: '70px', height: '70px' }} />
                        <div style={{ marginLeft: '10px' }}>
                            <h5 style={{ color: `${primary_color}` }}>{item.tenCumRap}</h5>
                            <span style={{ color: 'white' }}>{item.diaChi}</span>
                        </div>
                    </div>
                    <div className="col-12 d-flex showtimes__item-content">
                        <div className="d-flex align-items-center text-white showtimes__item-content-left" style={{ width: '30%' }}>
                            <i class="fas fa-history"></i>
                            <span style={{ marginLeft: '10px' }}>VIEWING TIMES</span>
                        </div>
                        <div className="showtimes__item-right" style={{ width: '70%' }}>
                            {renderGioChieu(item.lichChieuPhim)}
                        </div>
                    </div>
                </div>
            </Fragment>
        })
    }


    const renderHeThongRap = () => {
        return arrHeThongRapChieu.map((item, index) => {
            return <TabPane tab={
                <img src={item.logo} style={{ width: '45px', height: '45px' }} />
            } key={index}>
                <Tabs tabPosition="top">
                    <TabPane tab="Thứ 2" key="1">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                    <TabPane tab="Thứ 3" key="2">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                    <TabPane tab="Thứ 4" key="3">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                    <TabPane tab="Thứ 5" key="4">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                    <TabPane tab="Thứ 6" key="5">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                    <TabPane tab="Thứ 7" key="6">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                    <TabPane tab="Chủ nhật" key="7">
                        <div className="container-fluid p-0">
                            {renderLichPhim(item.cumRapChieu)}
                        </div>
                    </TabPane>
                </Tabs>
            </TabPane>
        })
    }

    return (
        <Fragment>
            <div id="filmInfo" style={{ backgroundImage: `url(${thongTinLichChieuPhim.hinhAnh})` }}>
                <div className="container filmInfo__wrap">
                    <div className="row">
                        <div className="col-12 col-md-4 filmInfo__img">
                            <img src={thongTinLichChieuPhim.hinhAnh} />
                        </div>
                        <div className="col-12 col-md-8 filmInfo__content">
                            <h2 className="filmInfo__heading text-white">
                                {thongTinLichChieuPhim.tenPhim}
                            </h2>
                            <div className="filmInfo__reaction">
                                <div className="filmInfo__reaction-number">
                                    <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{thongTinLichChieuPhim.danhGia}</span>
                                    <span>/10</span>
                                </div>
                                <div className="filmInfo__reaction-rate">
                                    <span>Rate This Movie: </span>
                                </div>
                            </div>
                            <div className="filmInfo__about">
                                <Tabs tabPosition="top" className="filmInfo__about-tab">
                                    <TabPane tab="OVERVIEW" key="1" className="about__tabPane-overview">
                                        <p className="about__tabPane-overview-text"> {thongTinLichChieuPhim.moTa}</p>
                                    </TabPane>
                                    <TabPane tab="REVIEWS" key="2">
                                        <span className="text-white">Chưa có Review</span>
                                    </TabPane>
                                    <TabPane tab="SHOWTIMES" key="3" className="about__tabPane-showtimes">
                                        <Tabs tabPosition="left" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
                                            {renderHeThongRap()}
                                        </Tabs>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <div className="animate__animated animate__backInRight" id="loginSuccess" style={{ position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000' }}>
                <Alert message="Đăng nhập thành công" type="success" closable="false" showIcon />
            </div>
            <div className="animate__animated animate__backInRight" id="loginError" style={{ position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000' }}>
                <Alert message="Đăng nhập thất bại" type="error" showIcon closable="false" />
            </div>
            <div className="animate__animated animate__backInRight" id="registerSuccess" style={{ position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000' }}>
                <Alert message="Đăng ký thành công" type="success" closable="false" showIcon />
            </div>
            <div className="animate__animated animate__backInRight" id="registerError" style={{ position: 'fixed', top: '80px', right: '40px', display: 'none', zIndex: '2000' }}>
                <Alert message="Đăng ký thất bại" type="error" showIcon closable="false" />
            </div>
        </Fragment>
    )
}
