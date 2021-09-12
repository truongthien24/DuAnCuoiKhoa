import axios from "axios"
import { maNhom } from "../../../Util/Settings"

//Xử lý nghiệp vụ load danh sách hệ thống rạp phim
export const LayThongTinHeThongRap = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinHeThongRap',
                method: 'get'
            })
            dispatch({
                type: 'LOAD_THONG_TIN_RAP',
                payload: result.data.content
            })
            console.log({result})
        }catch(error) {
            console.log(error.error)
        }
    }
}

//Xử lý nghiệp vụ load thông tin cụm rạp theo hệ thống
export const LayThongTinCumRapTheoHeThong = (maCumRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maCumRap}`,
                method: 'get',
            })
            dispatch({
                type: 'LOAD_DANH_SACH_CUM_RAP_THEO_HE_THONG',
                payload: result.data.content
            })
        }catch(error) {
            console.log(error.error)
        }
    }
}


//Xử lý nghiệp vụ lấy thông tin lịch chiếu hệ thống rạp
export const LayThongTinLichChieuHeThongRap = (maHeThongRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`,
                method: 'get'
            })
            console.log({result});
            dispatch({
                type: 'LOAD_THONG_TIN_LICH_CHIEU_HE_THONG_RAP',
                payload: result.data.content
            })
        }catch(error) {
            console.log(error.error);
        }
    }
}

//Xử lý nghiệp vụ lấy thông tin lịch chiếu phim
export const LayThongTinLichChieuPhim = (maPhim) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
                method: 'get'
            });

            console.log({result});
            
            dispatch({
                type: 'LOAD_PHIM',
                payload: result.data.content
            })
        }catch(error) {
            console.log({error})
        }
    }
}