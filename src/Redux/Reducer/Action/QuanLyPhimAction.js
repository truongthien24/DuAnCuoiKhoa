import React from "react";
import axios from "axios";
import {maNhom} from '../../../Util/Settings';

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