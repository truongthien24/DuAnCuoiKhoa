import axios from "axios"
import { ACCESS_TOKEN } from "../../../Util/Settings"

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
            console.log({result});
        }catch(error) {
            console.log({error});
        }
    }
}

