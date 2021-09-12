import {combineReducers, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import { QuanLyPhimReducer } from './Reducer/QuanLyPhimReducer';
import { QuanLyHeThongRapReducer } from './Reducer/QuanLyHeThongRapReducer';
import { QuanLyNguoiDungReducer } from './Reducer/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './Reducer/QuanLyDatVeReducer';
const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyHeThongRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));