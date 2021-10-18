import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { themPhimAction } from '../../../Redux/Reducer/Action/QuanLyPhimAction';

export default function AdminAddNew(props) {

    const [state, setState] = useState('https://picsum.photos/id/50/200/300')

    const [componentSize, setComponentSize] = useState('default');

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            danhGia: '',
            dangChieu: '',
            sapChieu: '',
            hot: '',
            hinhAnh: null
        },
        onSubmit: (values) => {
            //Biến đổi json thành formData
            let frmData = new FormData();
            for(let key in values) {
                
                if(key!=='hinhAnh') {
                    frmData.append(key,values[key]);
                }else {
                    if(values.hinhAnh) {
                        frmData.append(key, values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }

            dispatch(themPhimAction(frmData));
            console.log(values);
        }
    })

    const handleChangeInput = (event) => {
        let {name,value} = event.target;
        formik.setFieldValue(name,value);
    }

    const handleChangeDatePicker = (date,dateString) => {
        console.log('date', date);
        console.log('dateString', dateString);
        //Dùng moment xử lý dữ liệu lấy từ dataPicker
        const sDate = moment(date).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu',sDate);
    }

    const handleChangeInputNumber = (value) => {
        formik.setFieldValue('danhGia',value);
    }

    const handleChangeSwitch = (checked,event) => {
        let {name} = event.target;
        formik.setFieldValue(name,checked);
    }

    const handleChangeInputFile = async (event) => {
        if(event.target.files.length > 0) {
            let file = event.target.files[0];
            console.log("file", file);
            await formik.setFieldValue('hinhAnh', file);
    
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e) => {
                await setState(e.target.result);
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>Thêm phim mới</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        initialValues={{ size: componentSize }}
                        size={componentSize}
                        onFinish={formik.handleSubmit}
                    >
                        <Form.Item label="Tên phim">
                            <Input name="tenPhim" onChange={handleChangeInput}/>
                        </Form.Item>
                        <Form.Item label="Trailer">
                            <Input name="trailer" onChange={handleChangeInput}/>
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <Input name="moTa" onChange={handleChangeInput}/>
                        </Form.Item>
                        <Form.Item label="Ngày khởi chiếu">
                            <DatePicker name="ngayKhoiChieu" format="DD/MM/YYYY" onChange={handleChangeDatePicker}/>
                        </Form.Item>
                        <Form.Item label="Đánh giá">
                            <InputNumber min="0" max="10" onChange={handleChangeInputNumber}/>
                        </Form.Item>
                        <Form.Item label="Đang chiếu">
                            <Switch name="dangChieu" onChange={handleChangeSwitch}/>
                        </Form.Item>
                        <Form.Item label="Sắp chiếu">
                            <Switch name="sapChieu" onChange={handleChangeSwitch}/>
                        </Form.Item>
                        <Form.Item label="Hình Ảnh">
                            <input type="file" name="hinhAnh" onChange={handleChangeInputFile} accept="image/png, image/jpeg, image/jpg"/>
                            <br></br>
                            <img src={state} style={{width: '50%'}}></img>
                        </Form.Item>
                        <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                            <button className="btn btn-success" type="submit">Thêm phim mới</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
