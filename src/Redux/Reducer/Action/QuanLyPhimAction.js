import React from "react";
import axios from "axios";
import {ACCESS_TOKEN, maNhom} from '../../../Util/Settings';
import { USER_LOGIN } from "../../../Util/Settings";

//Xử lý nghiệp vụ LayDanhSachBanner 
export const LayDanhSachBanner = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
                method: 'get'
            });
            dispatch({
                type: 'LOAD_DANH_SACH_BANNER',
                payload: result.data.content,
            })
            console.log({result});
        }catch(error) {
            console.log(error.erro)
        }
    }
}


//Xử lý nghiệp vụ lấy danh sách phim
export const LayDanhSachPhim = () => {
    return async dispatch => {
        try {   
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
                method: 'get'
            })
            dispatch({
                type: 'LOAD_DANH_SACH_PHIM',
                payload: result.data.content
            })
        }catch(error) {
            console.log(error.error);
        }
    }
}

//Nghiệp vụ search phim
export const SearchPhim = (tenPhim) => {
    return async dispatch => {
        try {   
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`,
                method: 'get'
            })
            dispatch({
                type: 'LOAD_DANH_SACH_PHIM',
                payload: result.data.content
            })
        }catch(error) {
            console.log(error.error);
        }
    }
}

//Xử lý nghiệp vụ lấy thông tin phim
export const layThongTinPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_THONG_TIN_PHIM',
                payload: result.data.content
            })
            console.log({result});
        }catch(error) {
            console.log({error});
        }
    }
}

//Xử lý nghiệp vụ thêm phim 
export const themPhimAction = (data) => {
    return async (dispatch,getState) => {
        try {
            let result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/ThemPhimUploadHinh',
                method: 'post',
                data: data,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })
            console.log({result});
            await dispatch(LayDanhSachPhim(maNhom));
            
        }catch(error) {
            console.log(error);
        }
    }
}

//Xử lý nghiệp vụ cập nhật phim
export const CapNhatPhimAction = (formData) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/CapNhatPhimUpload',
                method: 'post',
                data: formData,
                mode: 'no-cros',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            });
            console.log({result});
            await dispatch(LayDanhSachPhim(maNhom));
        }catch(error) {
            console.log({error});
        }
    }
}

//Xử lý nghiệp vụ xóa phim
export const XoaPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })
            await dispatch(LayDanhSachPhim(maNhom));
            console.log({result});
        }
        catch(error) {
            console.log({error})
        }
    }
}