import React, { useEffect } from 'react'

import { Input, Space, Table } from 'antd';
import { AudioOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachPhim } from '../../../Redux/Reducer/Action/QuanLyPhimAction';
import { Fragment } from 'react';
import { history } from '../../../App';
import { NavLink } from 'react-router-dom';
import {XoaPhimAction} from '../../../Redux/Reducer/Action/QuanLyPhimAction';

const { Search } = Input;


export default function Films(props) {
    const {arrPhim} = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    
    const onSearch = value => {
        // console.log(value);
         //gọi api lấy danh sách phim
         dispatch(LayDanhSachPhim(value));
    };
    
    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter:(a,b)=>a.maPhim - b.maPhim,
    
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render:(text,film,index) =>{return <Fragment>
                <img src={film.hinhAnh} alt={film.hinhAnh} width={50} height={50} onError={(e)=>{e.target.onerror = null; e.target.src=`https://picsum.photos/id/${index}/100/100`}}/>
            </Fragment>}
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
        
            sorter:(a,b)=>{
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimb = b.tenPhim.toLowerCase().trim();
                if(tenPhimA > tenPhimb){
                    return 1;
                }return -1;
            },
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '30%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
        
            sorter:(a,b)=>{
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if(moTaA > moTaB){
                    return 1;
                }return -1;
            },
            render:(text,film) =>{return <Fragment>
                {film.moTa.length >100 ? film.moTa.substring(0,100) + '...': film.moTa}
            </Fragment>},
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '40%',
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
        
            
            render:(text,film) =>{return <Fragment>
                {<div className="d-flex justify-content-center">
                    <NavLink to={`/admin/filmsEdit/${film.maPhim}`} className="list__btn"><EditOutlined style={{color: '#006400'}}/></NavLink>
                    <button className="list__btn"><DeleteOutlined style={{color: 'red'}} onClick={()=> {
                        if (window.confirm('Bạn có chắc muốn xóa phim ' + film.tenPhim)) {
                            //gọi action
                            const action = XoaPhimAction(film.maPhim);
                            dispatch(action);
                        }
                    }}/></button>
    
                    </div>}
            </Fragment>},
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '15%',
        },
    ];
    
    
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    console.log({arrPhim});
    useEffect(() => {
        dispatch(LayDanhSachPhim());
    },[]);
    const data = arrPhim;
    return (
        <div id="adminFilm">
            <h3 className="text-center">Quản lý phim</h3>
            <button className="btn btn-outline-success mb-3" onClick={()=> {
                history.push('/admin/addNew');
            }}>Thêm phim</button><br/>
            <Space direction="vertical" className="mb-3">

                <Search
                    placeholder="tìm kiếm phim"
                    enterButton="Search"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                />
            </Space>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
