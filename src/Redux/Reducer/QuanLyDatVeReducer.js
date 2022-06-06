import Swal from 'sweetalert2'

const stateDefault = {
    thongTinPhim: {},

    danhSachGhe: [],

    danhSachGheDangChon: [],

}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'LOAD_DANH_SACH_PHONG_VE': {
            state.thongTinPhim = action.payload.thongTinPhim;
            state.danhSachGhe = action.payload.danhSachGhe;
            state.danhSachGheDangChon = [];
            return {...state};
        }
        break;
        case 'CHON_GHE': {
            if(state.danhSachGheDangChon.length >= 20) {
                alert('Đã quá số lượng ghế chọn !');
            }
            else {
                const newDanhSachGheDangChon = state.danhSachGheDangChon;
                newDanhSachGheDangChon.push(action.payload);
                state.danhSachGheDangChon = newDanhSachGheDangChon;
            }
            return {...state};
        }
        break;
        case 'HUY_GHE': {
            const newDanhSachGheDangChon = state.danhSachGheDangChon.filter(ghe=> ghe != action.payload);
            state.danhSachGheDangChon = newDanhSachGheDangChon;
            return {...state};
        }
        break;
        case 'DAT_VE': {
            state.danhSachGheDangChon = [];
            return {...state};
        }
        break;
        default: return state;
    }
}