import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {ACCESS_TOKEN, USER_LOGIN} from '../Util/Settings';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DangKy, DangNhap } from '../Redux/Reducer/Action/QuanLyNguoiDungAction';

export default function HeaderComponentMobile(props) {

    const dispatch = useDispatch();

    const userAccount = useSelector(state => state.QuanLyNguoiDungReducer.userAccount);

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },

        validationSchema: yup.object().shape({
            taiKhoan: yup.string().required('Không được bỏ trống !'),
            matKhau: yup.string().required('Không được bỏ trống !'),
        }),

        onSubmit: (values) => {
            console.log('userAccount', values)
            const action = DangNhap(values);
            dispatch(action);
        }
    })

    const formikDangKy = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: 'GP01',
            hoTen: '',
        },

        validationSchema: yup.object().shape({
            taiKhoan: yup.string().required('Không được bỏ trống !').min(6,'Tài khoản từ 6 - 32 ký tự').max(32, 'Tài khoản từ 6 - 32 ký tự'),
            matKhau: yup.string().required('Không được bỏ trống !').min(6,'Tài khoản từ 6 - 32 ký tự').max(32, 'Tài khoản từ 6 - 32 ký tự'),
            email: yup.string().required('Không được bỏ trống !').email('Không đúng định dạng email (taiKhoan@gmail.com)'),
            soDt: yup.number().required('Không được bỏ trống!'),
            hoTen: yup.string().required('Không được bỏ trống!'),
        }),

        onSubmit: (values) => {
            console.log('userAccount', values)
            const action = DangKy(values);
            dispatch(action);
            console.log(action);
        }
    })

    return (
        <Fragment>
            <div className="container-fluid" id="headerComponentMobile" style={{ position: 'fixed', top: '0', left: '0', width: '100%', backgroundColor: 'black', zIndex: '101', boxShadow: '0px 15px 15px rgba(0,0,0,.6)' }}>
                <div className="row">
                    <div className="col-4 header__brand d-flex flex-column justify-content-end align-items-center">
                        {/* <i class="fab fa-android"></i> */}
                        <NavLink to="/">
                            <img src="/img/logo.jpg.svg" style={{width: '100%'}}/>
                        </NavLink>
                    </div>
                    <div className="col-8 header__menu d-flex flex-column justify-content-center align-items-end">
                        <button onClick={() => {
                            document.querySelector('#menu-fade').style.width = "100%";
                            document.querySelector('#menu-fade').style.opacity = "1";
                        }}>
                            <i class="fas fa-align-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* Menu-fade */}
            <div className="menu-fade" id="menu-fade">
                <div className="menu-fade-wrap">
                    <div className="menu-brand">
                        <i className="fab fa-react"></i>
                    </div>
                    <div className="container-fluid" style={{ height: '40%' }}>
                        <ul className="menu-fade-list">
                            <li className="menu-fade-item">
                                <a className="menu-fade-link" href="#banner">Trang chủ</a>
                            </li>
                            <li className="menu-fade-item">
                                <a href="#" className="menu-fade-link">Phim</a>
                            </li>
                            <li className="menu-fade-item">
                                <a href="#film" className="menu-fade-link">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="container d-flex flex-column justify-content-around align-items-center" style={{ height: '30%'}}>
                        {userAccount ?
                            <Fragment>
                                <NavLink className="row" to="/profile">
                                    <div className="col-2">
                                        <img src="/img/userLogin.png" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img>
                                    </div>
                                    <div className="col-10 d-flex align-items-center justify-content-center">
                                        <span className="text-white text-center">{userAccount.hoTen}</span>
                                    </div>
                                </NavLink>
                                <a className="text-white" href="#" style={{transform: 'translateY(-60px)'}} onClick={()=> {
                                    localStorage.removeItem(USER_LOGIN);
                                    localStorage.removeItem(ACCESS_TOKEN);
                                    window.location.reload();
                                }}>
                                    <i class="fas fa-sign-out-alt"></i>
                                </a>
                            </Fragment>
                            :
                            <div>
                                <a className="text-white" href="#" onClick={()=> {
                                    document.querySelector('#loginModal').style.display = "block";
                                }}>Đăng nhập</a>
                            </div>
                        }
                        {/* fdasfdaf */}
                    </div>
                    <button className="hide-menu-btn" onClick={() => {
                        document.querySelector('#menu-fade').style.width = "0";
                        document.querySelector('#menu-fade').style.opacity = "0";
                    }}>
                        <i class="fas fa-angle-right"></i>
                    </button>
                </div>
            </div>
            <div className="modalUser" id="loginModal" style={{display: 'none'}}>
                <div className="modalUser__dialog">
                    <div className="modalUser__content">
                        <div className="modalUser__header text-center">
                            <h3>Đăng nhập</h3>
                        </div>
                        <div className="modalUser__body container-fluid">
                            <div className="row">
                                <div className="col-6 modalUser__form">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <h5>Username: </h5>
                                            <input className="form-control" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="text-danger">{formik.errors.taiKhoan}</div>) : ''}
                                        </div>
                                        <div className="form-group">
                                            <h5>Password: </h5>
                                            <input className="form-control" name="matKhau" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.matKhau && formik.touched.matKhau ? (<div className="text-danger">{formik.errors.matKhau}</div>) : ''}
                                        </div>
                                        <button className="btn modalUser__form-btn" type="submit">Đăng nhập</button>
                                    </form>
                                </div>
                                <div className="col-6 modalUser__social">
                                    <h5>Login With</h5>
                                    <ul className="modalUser__social-list">
                                        <li className="modalUser__social-item">
                                            <a href="#" className="modalUser__social-link facebook">
                                                <i class="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li className="modalUser__social-item">
                                            <a href="#" className="modalUser__social-link instargam">
                                                <i class="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li className="modalUser__social-item">
                                            <a href="#" className="modalUser__social-link envelope">
                                                <i class="far fa-envelope"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <button className="modalUser__social-register" onClick={()=> {
                                        // $('#loginModal').style.display = 'none';
                                        document.querySelector('#registerModal').style.display = 'block';
                                        document.querySelector('#loginModal').style.display = 'none';
                                    }}>Chưa có tài khoản ?</button>
                                </div>
                            </div>
                        </div>
                        <p className="modalUser__name">Nguyễn Lê Trường Thiện @2021</p>
                        <button className="modalUser__close" onClick={()=> {
                            document.querySelector('#loginModal').style.display = 'none';
                        }}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="modalUser" id="registerModal" style={{display: 'none'}}>
                <div className="modalUser__dialog">
                    <div className="modalUser__content">
                        <div className="modalUser__header text-center">
                            <h3>Đăng Ký</h3>
                        </div>
                        <div className="modalUser__body container-fluid">
                            <div className="row">
                                <div className="col-6 modalUser__form">
                                    <form onSubmit={formikDangKy.handleSubmit}>
                                        <div className="form-group">
                                            <h5>Tài khoản: </h5>
                                            <input className="form-control" name="taiKhoan" onChange={formikDangKy.handleChange} onBlur={formikDangKy.handleBlur} />
                                            {formikDangKy.errors.taiKhoan && formikDangKy.touched.taiKhoan ? (<div className="text-danger">{formikDangKy.errors.taiKhoan}</div>) : ''}
                                        </div>
                                        <div className="form-group">
                                            <h5>Mật khẩu: </h5>
                                            <input className="form-control" name="matKhau" type="password" onChange={formikDangKy.handleChange} onBlur={formikDangKy.handleBlur} />
                                            {formikDangKy.errors.matKhau && formikDangKy.touched.matKhau ? (<div className="text-danger">{formikDangKy.errors.matKhau}</div>) : ''}
                                        </div>
                                        <div className="form-group">
                                            <h5>Email: </h5>
                                            <input className="form-control" name="email" type="text" onChange={formikDangKy.handleChange} onBlur={formikDangKy.handleBlur} />
                                            {formikDangKy.errors.email && formikDangKy.touched.email ? (<div className="text-danger">{formikDangKy.errors.email}</div>) : ''}
                                        </div>
                                        <div className="form-group">
                                            <h5>Số điện thoại: </h5>
                                            <input className="form-control" name="soDt" type="number" onChange={formikDangKy.handleChange} onBlur={formikDangKy.handleBlur} />
                                            {formikDangKy.errors.soDt && formikDangKy.touched.soDt ? (<div className="text-danger">{formikDangKy.errors.soDt}</div>) : ''}
                                        </div>
                                        <div className="form-group">
                                            <h5>Họ tên: </h5>
                                            <input className="form-control" name="hoTen" type="text" onChange={formikDangKy.handleChange} onBlur={formikDangKy.handleBlur} />
                                            {formikDangKy.errors.hoTen && formikDangKy.touched.hoTen ? (<div className="text-danger">{formikDangKy.errors.hoTen}</div>) : ''}
                                        </div>
                                        <button className="btn modalUser__form-btn" type="submit">Đăng ký</button>
                                    </form>
                                </div>
                                <div className="col-6 modalUser__social">
                                    <h5>Login With</h5>
                                    <ul className="modalUser__social-list">
                                        <li className="modalUser__social-item">
                                            <a href="#" className="modalUser__social-link facebook">
                                                <i class="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li className="modalUser__social-item">
                                            <a href="#" className="modalUser__social-link instargam">
                                                <i class="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li className="modalUser__social-item">
                                            <a href="#" className="modalUser__social-link envelope">
                                                <i class="far fa-envelope"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <button className="modalUser__social-register" onClick={()=> {
                                        // $('#loginModal').style.display = 'none';
                                        document.querySelector('#registerModal').style.display = 'none';
                                        document.querySelector('#loginModal').style.display = 'block';
                                    }}>Đăng nhập</button>
                                </div>
                            </div>
                        </div>
                        <p className="modalUser__name">Nguyễn Lê Trường Thiện @2021</p>
                        <button className="modalUser__close" onClick={()=> {
                            document.querySelector('#registerModal').style.display = 'none';
                        }}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
