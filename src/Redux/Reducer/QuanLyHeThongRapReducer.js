
const stateDefault = {
    arrRapChieu: [],

    arrCumRapTheoHeThong: [],

    arrThongTinLichChieuHeThongRap: [],

    thongTinLichChieuPhim: {},

    arrHeThongRapChieu: [],
}

export const QuanLyHeThongRapReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'LOAD_THONG_TIN_RAP': {
            state.arrRapChieu = action.payload;
            return {...state};
        }
        break;
        case 'LOAD_DANH_SACH_CUM_RAP_THEO_HE_THONG': {
            state.arrCumRapTheoHeThong = action.payload;
            return {...state};
        }
        break;
        case 'LOAD_THONG_TIN_LICH_CHIEU_HE_THONG_RAP': {
            state.arrThongTinLichChieuHeThongRap = action.payload[0].lstCumRap;
            return {...state};
        }   
        break;
        case 'LOAD_PHIM': {
            state.thongTinLichChieuPhim = action.payload;
            state.arrHeThongRapChieu = action.payload.heThongRapChieu;
            return {...state};
        }
        break;
        default: return state;
    }
}