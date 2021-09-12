import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt, Redirect } from 'react-router-dom';
import { DatVe, LayDanhSachPhongVe } from '../../Redux/Reducer/Action/QuanLyDatVeAction';
import { primary_color, USER_LOGIN } from '../../Util/Settings';
import { gsap } from 'gsap';
import { Alert } from 'antd';


export default function TicketRoom(props) {

    const { id } = props.match.params;

    const [initialTime, setinitialTime] = useState(null);
    const [startTime, setStartTime] = useState(false);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(10);
    const [state, setState] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const action = LayDanhSachPhongVe(id);
        dispatch(action);
        // const demGio = () => {
        //     let element = document.querySelector("#soGiay");
        //     if(typeof(element) != null || typeof(element) != 'undefined') {
        //         let soGiay = Number(document.querySelector('#soGiay').innerHTML);
        //         let soPhut = Number(document.querySelector('#soPhut').innerHTML);
        //         window.setInterval(function(){
        //             if(soGiay === 0) {
        //                 soPhut -= 1;
        //                 soGiay = 59; 
        //                 document.querySelector('#soGiay').innerHTML = soGiay;
        //                 document.querySelector('#soPhut').innerHTML = soPhut;
        //             }else {
        //                 soGiay -= 1; 
        //                 document.querySelector('#soGiay').innerHTML = soGiay;
        //             }
        //             if(soPhut === 0 && soGiay === 0 ) {
        //                 window.location.reload();
        //                 if(window.confirm("Hết giờ") === true) {
        //                     props.history.goBack();
        //                 }
        //             }
        //         },1000)
        //     }else {
        //         return ;
        //     }
        // }
        // demGio();
        // return () => {
        //     window.clearTimeout();
        // }
        gsap.from('.startBooking__note-icon', { x: -150, opacity: 0, duration: 1 })
        gsap.from('.startBooking__note-text', { x: 150, opacity: 0, duration: 1 })
    }, []);

    useEffect(() => {

        if (initialTime > 0) {

            setTimeout(function () {
                setinitialTime(initialTime - 1);
            }, 1000)

            if (second === 0) {
                setMinute(minute - 1);
                setSecond(59);
            } else {
                setSecond(second - 1);
            }
        }

        if (initialTime === 0) {
            if (window.confirm("Hết giờ") === true) {
                props.history.goBack();
            }
        }


    }, [initialTime], [startTime]);

    const thongTinPhim = useSelector(state => state.QuanLyDatVeReducer.thongTinPhim);

    const danhSachGhe = useSelector(state => state.QuanLyDatVeReducer.danhSachGhe);

    const { danhSachGheDangChon } = useSelector(state => state.QuanLyDatVeReducer);

    let tongTien = 0;

    const danhSachVe = [];

    if (danhSachGheDangChon.length > 0) {
        console.log('Dang Sach Ghe Dang Chon', danhSachGheDangChon);
        for (let item of danhSachGheDangChon) {
            tongTien += Number(item.giaVe);
            let ve = {
                "maGhe": item.maGhe,
                "giaVe": item.giaVe
            }
            danhSachVe.push(ve);
        }
    }

    const renderGhe = () => {
        return danhSachGhe.map((item, index) => {
            let cssLoaiGhe = '';

            if (item.loaiGhe === 'Vip') {
                cssLoaiGhe = 'gheVip';
            }

            let dangChon = '';

            if (danhSachGheDangChon.findIndex(ghe => ghe === item) !== -1) {
                dangChon = 'dangChon';
            }

            let iconDaDat = 'none';
            let disabled = false;
            let daDat = '';

            if (item.daDat === true) {
                iconDaDat = 'block';
                disabled = true;
                daDat = 'daDat';
            }

            // if(item.nguoi)

            return <div className="rowSeats__module-item" key={index}>
                <button className={`rowSeats__module-btn ${cssLoaiGhe} ${dangChon} ${daDat}`} disabled={disabled} style={{ cursor: 'pointer' }} onClick={() => {
                    if (danhSachGheDangChon.findIndex(ghe => ghe === item) !== -1) {
                        const action1 = {
                            type: 'HUY_GHE',
                            payload: item,
                        }
                        dispatch(action1);
                    }
                    else {
                        const action2 = {
                            type: 'CHON_GHE',
                            payload: item
                        }
                        dispatch(action2);
                    }
                    console.log(item.maGhe);
                }}>
                    <i class="fas fa-times" style={{ display: `${iconDaDat}`, color: 'red' }}></i>
                </button>
            </div>
        })
    }

    const renderGheChon = () => {
        return danhSachGheDangChon.map((item, index) => {
            let tenGhe = '';
            let stt = Number(item.stt);
            if(stt > 0 && stt <= 16) {
                tenGhe = 'A';
            }
            else if(stt > 16 && stt <= 32) {
                tenGhe = 'B';
                stt -= 16;
            }
            else if(stt > 32 && stt <= 48) {
                tenGhe = 'C';
                stt -= 16*2;
            }
            else if(stt > 48 && stt <= 64) {
                tenGhe = 'D';
                stt -= 16*3;
            }
            else if(stt > 64 && stt <= 80) {
                tenGhe = 'E';
                stt -= 16*4;
            }
            else if(stt > 80 && stt <= 96) {
                tenGhe = 'F';
                stt -= 16*5;
            }
            else if(stt > 96 && stt <= 112) {
                tenGhe = 'G';
                stt -= 16*6;
            }
            else if(stt > 112 && stt <= 128) {
                tenGhe = 'H';
                stt -= 16*7;
            }
            else if(stt > 128 && stt <= 144) {
                tenGhe = 'I';
                stt -= 16*8;
            }
            else {
                tenGhe = 'K';
                stt -= 16*9;
            }
            return <span key={index}>
                <span style={{color: `${primary_color}`}}>{tenGhe}{stt}</span> - {item.giaVe.toLocaleString()} VNĐ, &ensp;
            </span>
        })
    }

    return (
        <Fragment>
            <div id="ticketRoom" style={{ backgroundImage: `url(${thongTinPhim.hinhAnh})` }}>
                <div className="container ticketRoom__wrap">
                    <div className="row">
                        <div className="col-12 col-lg-7 ticketRoom__theater">
                            <div className="row ticketRoom__about align-items-center">
                                <div className="col-6 ticketRoom__about-date">
                                    <span>{thongTinPhim.ngayChieu} </span>
                                    - <span>{thongTinPhim.gioChieu} </span>
                                    - <span>{thongTinPhim.tenRap}</span>
                                </div>
                                <div className="col-6 d-flex flex-column align-items-center text-white ticketRoom__about-enforcement">
                                    <h5 className="about__enforcement-heading">Thời gian giữ ghế</h5>
                                    <div className="about__enforcement-text">
                                        <span id="soPhut">{minute}</span>
                                        <span>:</span>
                                        <span id="soGiay">{second}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row ticketRoom__rowSeats justify-content-center">
                                <div className="col-10 col-md-12 ticketRoom__rowSeats-screen"></div>
                                <div className="col-12 ticketRoom__rowSeats-module">
                                    <div className="row rowSeats__module-wrap">
                                        <div className="col-1 rowSeats__module-name">
                                            <div>A</div>
                                            <div>B</div>
                                            <div>C</div>
                                            <div>D</div>
                                            <div>E</div>
                                            <div>F</div>
                                            <div>G</div>
                                            <div>H</div>
                                            <div>I</div>
                                            <div>K</div>
                                        </div>
                                        <div className="col-11 rowSeats__module-list">
                                            {renderGhe()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row ticketRoom__note">
                                <div className="col-3 ticketRoom__note-item">
                                    <button disabled className="ticketRoom__note-btn"></button>
                                    <span>Ghế trống</span>
                                </div>
                                <div className="col-3 ticketRoom__note-item">
                                    <button disabled className="ticketRoom__note-btn dangChon"></button>
                                    <span>Ghế đang chọn</span>
                                </div>
                                <div className="col-3 ticketRoom__note-item">
                                    <button disabled className="ticketRoom__note-btn">
                                        <i class="fas fa-times" style={{ color: 'red' }}></i>
                                    </button>
                                    <span>Ghế đã đặt</span>
                                </div>
                                <div className="col-3 ticketRoom__note-item">
                                    <button disabled className="ticketRoom__note-btn gheVip"></button>
                                    <span>Ghế VIP</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 ticketRoom__booking">
                            <div className="ticketRoom__booking-wrap">
                                <div className="container-fluid ticketRoom__booking-list">
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <h3 className="ticketRoom__booking-heading">{thongTinPhim.tenPhim}</h3>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-6">
                                            <span>Ngày chiếu / Giờ chiếu</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span>{thongTinPhim.ngayChieu}</span>
                                            <span> - </span>
                                            <span style={{ color: `${primary_color}` }}>{thongTinPhim.gioChieu}</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-6">
                                            <span>Cụm rạp</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span>{thongTinPhim.tenCumRap}</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-6">
                                            <span>Rạp</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span>{thongTinPhim.tenRap}</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-4 p-0">
                                            <span>Ghế chọn</span>
                                        </div>
                                        <div className="col-8 p-0 text-right">
                                            {renderGheChon()}
                                        </div>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-6">
                                            <span>Ưu đãi</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span>0%</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-6">
                                            <span>Tổng tiền</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span>{tongTien.toLocaleString()} VNĐ</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center ticketRoom__booking-item">
                                        <div className="col-12">
                                            <button className="ticketRoom__booking-btn" onClick={() => {
                                                if(danhSachGheDangChon.length > 0) {
                                                    if(!localStorage.getItem(USER_LOGIN)) {
                                                        alert('Đăng nhập để đặt vé');
                                                        document.querySelector('#loginModal').style.display = 'block';
                                                    }else {
                                                        const action = DatVe({
                                                            "maLichChieu": `${id}`,
                                                            "danhSachVe": danhSachVe
                                                        });
                                                        dispatch(action);
                                                        console.log(danhSachVe);
                                                        const action2 = LayDanhSachPhongVe(id);
                                                        dispatch(action2);
                                                        setState(false);
                                                    }
                                                }else {
                                                    alert('Bạn chưa chọn ghế !');
                                                }
                                            }}>BOOKING TICKET</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay"></div>
                <div className="startBooking">
                    <button className="startBooking-btn" onClick={() => {
                        setinitialTime(10 * 60);
                        setStartTime(true);
                        document.querySelector('.startBooking').style.display = 'none';
                    }}>Bắt đầu</button>
                    <div className="startBooking__note">
                        <i className="fas fa-exclamation-triangle startBooking__note-icon"></i>
                        <span style={{ display: 'inline-block' }} className="startBooking__note-text">Bạn có 10 phút để đặt vé</span>
                    </div>
                </div>
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
            <Prompt when={state} message={(location)=> {
                console.log(location);
                return "Bạn có muốn rời đi ~";
            }}/>
        </Fragment>
    )
}
