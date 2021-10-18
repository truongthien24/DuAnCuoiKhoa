import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Input, Space, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { LayDanhSachPhim } from '../../../Redux/Reducer/Action/QuanLyPhimAction';

export default function AdminFilms(props) {

    const { Search } = Input;

    const dispatch = useDispatch();

    //Load dữ liệu danh sách phim
    useEffect(()=> {
        const action = LayDanhSachPhim();
        dispatch(action);
    }, []);

    const {arrPhim} = useSelector(state=>state.QuanLyPhimReducer);

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    //Biến data để đưa dữ liệu vào table
    let data = [];

    //renderDanhSachPhim 
    const renderDanhSachPhim = () => {
        let stt = 1;
        for(let item of arrPhim) {
            let itemArrPhim = {
                key: `${stt}`,
                maPhim: `${item.maPhim}`,
                tenPhim: `${item.tenPhim}`,
                hinhAnh: <img src={item.hinhAnh} style={{maxWidth: '400px', maxHeight: '100px'}}/>,
                age: 32,
                moTa: <p style={{maxWidth: '400px'}}>{item.moTa}</p>,
                address: 'New York No. 1 Lake Park',
                hanhDong: <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-dark">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-outline-dark">
                        <i className="far fa-trash-alt"></i>
                    </button>
                </div>
            };
            data.push(itemArrPhim);
            stt +=1;
            console.log(item);
        }
    }

    renderDanhSachPhim();

    const columns = [
        {
          title: 'Mã phim',
          dataIndex: 'maPhim',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.maPhim.indexOf(value) === 0,
        //   sorter: (a, b) => a.maPhim.length - b.maPhim.length,
          sortDirections: ['descend'],
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',

        },
        {
          title: 'Tên phim',
          dataIndex: 'tenPhim',
          defaultSortOrder: 'descend',
        },
        {
          title: 'Mô tả',
          dataIndex: 'moTa',
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          columnWidth: 1,
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
        }
      ];

    
    const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    }

    const onSearch = value => console.log(value);

    return (
        <div>
            <h1>Quản lý phim</h1>
            <div className="my-3">
                <button className="btn btn-outline-dark">Thêm phim</button>
            </div>
            <div className="my-3">
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
            <div className="my-3">
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
        </div>
    )
}
