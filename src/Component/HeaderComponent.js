import React, { Fragment } from 'react'
import { NavLink, Prompt } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DangKy, DangNhap } from '../Redux/Reducer/Action/QuanLyNguoiDungAction';
import { ACCESS_TOKEN, USER_LOGIN } from '../Util/Settings';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Input } from 'antd';

export default function HeaderComponent(props) {

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
            taiKhoan: yup.string().required('Không được bỏ trống !').min(6, 'Tài khoản từ 6 - 32 ký tự').max(32, 'Tài khoản từ 6 - 32 ký tự'),
            matKhau: yup.string().required('Không được bỏ trống !').min(6, 'Tài khoản từ 6 - 32 ký tự').max(32, 'Tài khoản từ 6 - 32 ký tự'),
            email: yup.string().required('Không được bỏ trống !').email('Không đúng định dạng email (taiKhoan@gmail.com)'),
            soDt: yup.number().required('Không được bỏ trống!'),
            hoTen: yup.string().required('Không được bỏ trống!'),
        }),

        onSubmit: (values) => {
            console.log('userAccount', values);
            const action = DangKy(values);
            dispatch(action);
        }
    })

    return (
        <Fragment>
            <div className="container-fluid p-0">
                <div id="headerComponent">
                    <div className="header__brand">
                        <NavLink to="/home" className="header__brand-link">
                            <img src="/img/logo.jpg.svg"></img>
                        </NavLink>
                    </div>
                    <div className="header__menu">
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <a href="#home" className="header__menu-link">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="header__menu-item">
                                <a href="#" className="header__menu-link">
                                    Liên hệ
                                </a>
                            </li>
                            <li className="header__menu-item">
                                <a href="#" className="header__menu-link">
                                    Phim
                                </a>
                            </li>
                            <li className="header__menu-item">
                                <a href="#" className="header__menu-link">
                                    Tin tức
                                </a>
                            </li>
                        </ul>
                    </div>
                    {userAccount ?
                        <Fragment>
                            <div className="header__user">
                                <div className="header__user-link">
                                    <img src="/img/userLogin.png" />
                                    {userAccount.hoTen}
                                    <div className="user__info-wrap animate__animated animate__bounceInRight">
                                        <ul className="user__info-list">
                                            <li className="user__info-item">
                                                <NavLink to="/profile" className="user__info-link" href="#">
                                                    <i class="fas fa-user-alt"></i>
                                                    <span>Profile</span>
                                                </NavLink>
                                            </li>
                                            <li className="user__info-item">
                                                <a className="user__info-link" href="#" onClick={ async () => {
                                                    localStorage.removeItem(USER_LOGIN);
                                                    localStorage.removeItem(ACCESS_TOKEN);
                                                    await Swal.fire({
                                                        icon: 'success',
                                                        title: 'Đăng xuất thành công!',
                                                        showConfirmButton: false,
                                                        timer: 1000
                                                    })
                                                    window.location.reload();
                                                }}>
                                                    <i class="fas fa-sign-out-alt"></i>
                                                    <span>Đăng xuất</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                        :
                        <div className="header__user">
                            <a href="#" className="header__user-link" onClick={() => {
                                document.querySelector('#loginModal').style.display = 'block';
                            }}>Đăng nhập</a>
                        </div>
                    }
                </div>
            </div>
            <div className="modalUser" id="loginModal" style={{ display: 'none' }}>
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
                                            <input className="form-control" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="text-danger">{formik.errors.taiKhoan}</div>) : ''}
                                        </div>
                                        <div className="form-group">
                                            <h5>Password: </h5>
                                            <input className="form-control" name="matKhau" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
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
                                    <button className="modalUser__social-register" onClick={() => {
                                        // $('#loginModal').style.display = 'none';
                                        document.querySelector('#registerModal').style.display = 'block';
                                        document.querySelector('#loginModal').style.display = 'none';
                                    }}>Chưa có tài khoản ?</button>
                                </div>
                            </div>
                        </div>
                        <p className="modalUser__name">Nguyễn Lê Trường Thiện @2021</p>
                        <button className="modalUser__close" onClick={() => {
                            document.querySelector('#loginModal').style.display = 'none';
                        }}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="modalUser" id="registerModal" style={{ display: 'none' }}>
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
                                            <Input.Password className="form-control" name="matKhau" type="password" onChange={formikDangKy.handleChange} onBlur={formikDangKy.handleBlur} />
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
                                    <button className="modalUser__social-register" onClick={() => {
                                        // $('#loginModal').style.display = 'none';
                                        document.querySelector('#registerModal').style.display = 'none';
                                        document.querySelector('#loginModal').style.display = 'block';
                                    }}>Đăng nhập</button>
                                </div>
                            </div>
                        </div>
                        <p className="modalUser__name">Nguyễn Lê Trường Thiện @2021</p>
                        <button className="modalUser__close" onClick={() => {
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
