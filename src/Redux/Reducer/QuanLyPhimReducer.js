
const stateDefault = {
    arrBanner: [],

    arrPhim: [],
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'LOAD_DANH_SACH_BANNER': {
            const newArrBanner = action.payload;
            state.arrBanner = newArrBanner;
            return {...state};
        }
        break;
        case 'LOAD_DANH_SACH_PHIM': {
            const newArrPhim = action.payload;
            state.arrPhim = newArrPhim;
            return {...state};
        }
        break;
        default: return state;
    }
}