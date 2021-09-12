import { USER_LOGIN } from "../../Util/Settings";

let usAccount = null;

if(localStorage.getItem(USER_LOGIN)) {
    usAccount = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userAccount: usAccount,
    profile: {},
    thongTinDatVe: [],
}

export const QuanLyNguoiDungReducer = (state=stateDefault, action) => {
    switch(action.type) {
        case 'DANG_NHAP': {
            state.userAccount = action.payload;
            return {...state};
        }
        break;
        case 'GET_PROFILE': {
            state.profile = action.payload;
            state.thongTinDatVe = action.payload.thongTinDatVe;
            return {...state};
        }
        break;
        default: return state;
    }
}