import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LayThongTinCumRapTheoHeThong, LayThongTinHeThongRap, LayThongTinLichChieuHeThongRap } from '../../../Redux/Reducer/Action/QuanLyHeThongRapAction';
import { Tabs, Radio, Space } from 'antd';
import { primary_color } from '../../../Util/Settings';

export default function ShowTimes(props) {

    const { TabPane } = Tabs;

    const dispatch = useDispatch();

    useEffect(() => {
        //Sau khi render => call api    
        const action = LayThongTinHeThongRap();
        dispatch(action);
    }, [])

    const arrRapChieu = useSelector(state => state.QuanLyHeThongRapReducer.arrRapChieu);

    const arrCumRapTheoHeThong = useSelector(state => state.QuanLyHeThongRapReducer.arrCumRapTheoHeThong);

    const arrThongTinLichChieuHeThongRap = useSelector(state => state.QuanLyHeThongRapReducer.arrThongTinLichChieuHeThongRap);

    console.log(arrRapChieu);

    const renderThoiGianChieu = (item) => {
        return item.map((item,index)=> {
            var gioChieu = item.ngayChieuGioChieu;
            return <button className="showtimes__time-btn" key={index}>{gioChieu.slice(-8, gioChieu.length-3)}</button>
        })
    }

    const renderDanhSachPhimTheoCumRap = (item, diaChi) => {
        return item.map((item, index) => {
            return <div className="row py-3" key={index}>
                <div className="col-12 col-md-3">
                    <img style={{ width: '110px', height: '150px' }} src={item.hinhAnh} onError={(e)=>{e.target.onerror = null; e.target.src="/img/errorImage.png"}}/>
                </div>
                <div className="col-12 col-md-9">
                    <h4 style={{ color: `${primary_color}` }}>{item.tenPhim}</h4>
                    <div>
                        <span>{diaChi}</span>
                    </div>
                    <div className="my-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                        {renderThoiGianChieu(item.lstLichChieuTheoPhim)}
                    </div>
                </div>
            </div>
        })
    }

    const renderCumRapTheoHeThong = () => {
        return arrThongTinLichChieuHeThongRap.map((item, index) => {
            return <TabPane tab={
                <div className="d-flex align-items-center justify-content-around" style={{ width: '300px' }}>
                    <div className="tab-img" style={{ width: '50px' }}>
                        <img className="w-100" src={item.hinhAnh}/>
                    </div>
                    <div className="tab-content d-flex flex-column text-left" style={{ width: '240px' }}>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '240px' }}>{item.tenCumRap}</span>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '240px' }}>{item.diaChi}</span>
                    </div>
                </div>
            } key={index}>
                <div className="container-fluid">
                    {renderDanhSachPhimTheoCumRap(item.danhSachPhim, item.diaChi)}
                </div>
            </TabPane>
        })
    }

    const renderRapChieu = () => {
        return arrRapChieu.map((item, index) => {
            return <TabPane tab={
                <button onClick={() => {
                    let action1 = LayThongTinLichChieuHeThongRap(item.maHeThongRap);
                    dispatch(action1);
                }} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                    <img className="tabsPane__theater-img" style={{ width: '50px', height: '50px' }} src={item.logo} />
                </button>
            }
                key={index} className="showtimes__tabsPane-theater">
                <Tabs tabPosition="left" type="line">
                    {renderCumRapTheoHeThong()}
                </Tabs>
            </TabPane>

        })
    }

    return (
        <div id="showtimes">
            <div className="container">
                <h5 className="title">Showtimes MOVIES</h5>
                <div className="row showtimes__content">
                    <Tabs tabPosition="left" type="line" className="showtimes__tabs-theater">
                        {renderRapChieu()}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
