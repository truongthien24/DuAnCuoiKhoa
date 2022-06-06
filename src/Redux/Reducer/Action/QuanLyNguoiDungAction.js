import axios from 'axios';
import { ACCESS_TOKEN, maNhom, USER_LOGIN } from '../../../Util/Settings';
import { Alert } from 'antd';
import HeaderComponent from '../../../Component/HeaderComponent';
import Home from '../../../Page/Home/Home';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { history } from '../../../App';
import Swal from 'sweetalert2';
 //Xử lý nghiệp vụ đăng nhập
export const DangNhap = (userAccount) => {

    return async dispatch => {
        try {   
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap',
                method: 'post',
                data: userAccount,
            })
            dispatch({
                type: 'DANG_NHAP',
                payload: result.data.content
            })
            console.log({result})

            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken);
            localStorage.setItem(USER_LOGIN,JSON.stringify(result.data.content));

            document.querySelector('#loginModal').style.display = 'none';

            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
                showConfirmButton: false,
                timer: 1500
              })

            if(result.data.content.maLoaiNguoiDung == 'QuanTri') {
                history.push('/admin/films')
            }

        }catch(error) {
            console.log({error});
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập thất bại',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
}

//Xử lý nghiệp vụ đăng nhập
export const DangKy = (userAccount) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy',
                method: 'POST',
                data: userAccount
            })
            dispatch({
                type: 'DANG_KY',
                payload: result.data.content
            })
            console.log(result.data.content)
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công!',
                showConfirmButton: false,
                timer: 1000               
            })
            document.querySelector('#registerModal').style.display = 'none';
            document.querySelector('#loginModal').style.display = 'block';
        }catch(error) {
            console.log({error});
            document.querySelector('#loginModal').style.display = 'none';
            document.querySelector('#registerModal').style.display = 'block';
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký thất bại!',
                showConfirmButton: false,
                timer: 1000               
            })
        }
    }
}

//Xử lý nghiệp vụ lấy thông tin tài khoản người dùng 
export const ThongTinTaiKhoan = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })
            dispatch({
                type: 'GET_PROFILE',
                payload: result.data.content
            })
        }catch(error) {
            console.log({error});
        }
    }
}

//Xử lý nghiệp vụ layDanhSachNguoiDung 
export const layDanhSachNguoiDung = () => {
    return async dispatch => {
        try { 
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`,
                method: 'GET',
            })
            dispatch({
                type: 'GET_DANHSACH_NGUOIDUNG',
                payload: result.data.content
            })
            console.log({result});
        } catch (error) {
            console.log({error});
        }
    }
}

//Xử lý nghiệp vụ xóa người dùng
export const XoaNguoiDungAction = (taiKhoan) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
                method: 'delete',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })

            console.log({result});

            alert('Xóa người dùng thành công ');   

            
            dispatch(layDanhSachNguoiDung());
        }
        catch(error) {
            console.log({error});
        }
    }
}

//Xử lý nghiệp vụ thêm người dùng 
export const ThemNguoiDungAction = (frmData) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThemNguoiDung',
                method: 'post',
                data: frmData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })
            console.log({result});
            alert('Thêm thành công !');
        }
        catch (error) {
            console.log({error});
        }
    }
}