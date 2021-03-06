import axios from "axios"
import { ACCESS_TOKEN } from "../../../Util/Settings"
import Swal from 'sweetalert2'

//Xử lý nghiệp vụ Lấy danh sách phòng vé
export const LayDanhSachPhongVe = (ID) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${ID}`,
                method: 'get'
            })
            dispatch({
                type: 'LOAD_DANH_SACH_PHONG_VE',
                payload: result.data.content
            })
            console.log({result})
        }catch(error) {
            console.log({error})
        }
    }
}

//Xử lý nghiệp vụ Tạo lịch chiếu
export const DatVe = (thongTinLichChieu) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyDatVe/DatVe',
                method: 'post',
                data: thongTinLichChieu,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })
            dispatch({
                type: 'DAT_VE'
            })
            Swal.fire({
                icon: 'success',
                title: 'Đặt vé thành công',
                showConfirmButton: false,
                timer: 1500
              })
            console.log({result});
        }catch(error) {
            console.log({error});
        }
    }
}

//Xử lý nghiệp vụ tạo lịch chiếu
export const TaoLichChieuAction = (lichChieu) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyDatVe/TaoLichChieu',
                method: 'post',
                data: lichChieu,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                }
            })
        }catch(error) {
            console.log({error});
        }
    }
}