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

//Xử lý nghiệp vụ thêm phim 
export const themPhimAction = (data) => {
    return async dispatch => {
        try {
            const result = await axios({
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