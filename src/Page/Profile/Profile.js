import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { USER_LOGIN } from '../../Util/Settings'
import {Redirect} from 'react-router';
import { ThongTinTaiKhoan } from '../../Redux/Reducer/Action/QuanLyNguoiDungAction';

export default function Profile(props) {

    const dispatch = useDispatch();

    const {profile} = useSelector(state=>state.QuanLyNguoiDungReducer);
    const {thongTinDatVe} = useSelector(state=>state.QuanLyNguoiDungReducer);

    useEffect(()=> {
        if(!localStorage.getItem(USER_LOGIN)) {
            alert('Đăng nhập trước khi vào trang này !');
            // document.querySelector('#loginModal').style.display = 'block';
            document.querySelector('#loginModal').style.display = 'block';
        }
        else {
            const action = ThongTinTaiKhoan();
            dispatch(action);
        }
    }, [])

    //Render thông tin đặt vé
    const renderInfoBooking = () => {
        return thongTinDatVe.map((item,index)=> {
            return <div className="row profile__booking-item m-0" key={index}>
                <div className="col-4 booking__item-info">
                    <img src={item.hinhAnh}/>
                    <span>{item.tenPhim}</span>
                </div>
                <div className="col-8 booking__item-ticket">
                    {renderDanhSachGhe(item.danhSachGhe)}
                </div>
            </div>
        })
    }

    //Render danh sách ghế đã đặt
    const renderDanhSachGhe = (dsGhe) => {
        return dsGhe.map((item,index)=> {
            let tenGhe = 0;
            let soHieu = '';
            if(Number(item.tenGhe) >= 1 && Number(item.tenGhe) <=16) {
                tenGhe = item.tenGhe;
                soHieu = 'A';
            }else if (Number(item.tenGhe) >= 17 && Number(item.tenGhe) <= 32) {
                tenGhe = 32 - item.tenGhe + 1;
                soHieu = 'B';
            }else if (Number(item.tenGhe) >= 33 && Number(item.tenGhe) <= 48) {
                tenGhe = 48 - item.tenGhe + 1;
                soHieu = 'C';
            }else if (Number(item.tenGhe) >= 49 && Number(item.tenGhe) <= 64) {
                tenGhe = 64 - item.tenGhe + 1;
                soHieu = 'D';
            }else if (Number(item.tenGhe) >= 65 && Number(item.tenGhe) <= 80) {
                tenGhe = 80 - item.tenGhe + 1;
                soHieu = 'E';
            }else if (Number(item.tenGhe) >= 81 && Number(item.tenGhe) <= 96) {
                tenGhe = 96 - item.tenGhe + 1;
                soHieu = 'F';
            }else if (Number(item.tenGhe) >= 97 && Number(item.tenGhe) <= 112) {
                tenGhe = 112 - item.tenGhe + 1;
                soHieu = 'G';
            }else if (Number(item.tenGhe) >= 113 && Number(item.tenGhe) <= 128) {
                tenGhe = 128 - item.tenGhe + 1;
                soHieu = 'H';
            }else if (Number(item.tenGhe) >= 129 && Number(item.tenGhe) <= 144) {
                tenGhe = 144 - item.tenGhe + 1;
                soHieu = 'I';
            }else {
                tenGhe = 160 - item.tenGhe + 1;
                soHieu = 'K';
            }
            
            return <div className="row booking__ticket-list" key={index}>
                <div className="col-6 booking__ticket-item">
                    <span>{item.tenHeThongRap}</span>
                </div>
                <div className="col-3 booking__ticket-item">
                    <span>{item.tenRap}</span>
                </div>
                <div className="col-3 booking__ticket-item">
                    <span>{soHieu} {tenGhe}</span>
                </div>
            </div>
        })
    }

    return (
        <div id="profile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-5 profile__info">
                        <div className="profile__info-wrap">
                            <div className="profile__info-img">
                                <img src="/img/userLogin.png"/>
                            </div>
                            <div className="profile__info-content">
                                <h5>
                                    <span className="text-white">Xin chào ! </span>
                                    {profile.hoTen}
                                </h5>
                                <div className="info__content-item">
                                    <i className="far fa-user"></i>
                                    <span>{profile.taiKhoan}</span>
                                </div>
                                <div className="info__content-item">
                                    <i className="fas fa-unlock-alt"></i>
                                    <span>{profile.matKhau}</span>
                                </div>
                                <div className="info__content-item">
                                    <i className="far fa-envelope"></i>
                                    <span>{profile.email}</span>
                                </div>
                                <div className="info__content-item">
                                    <i className="fas fa-signature"></i>
                                    <span>{profile.hoTen}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 profile__booking">
                        <h2>Danh Sách Ghế Đã Đặt</h2>
                        <div className="profile__booking-wrap">
                            {renderInfoBooking()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
