import React, { Fragment, useEffect, useState } from 'react'
import { Table, Input, Button, Space } from 'antd';
import { AudioOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachNguoiDung } from '../../../Redux/Reducer/Action/QuanLyNguoiDungAction';
import { XoaNguoiDungAction } from '../../../Redux/Reducer/Action/QuanLyNguoiDungAction';

export default function AdminUser(props) {
    const { dsNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    // console.log('quanLyNguoiDung', quanLyNguoiDung);
    useEffect(() => {
      dispatch(layDanhSachNguoiDung());
    }, [])
  
  
  
    //table
    const data = dsNguoiDung;
    const [state, setState] = useState({
      searchText: '',
      searchedColumn: '',
    });
  
    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              state.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
  
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => state.searchInput.select(), 100);
        }
      },
      render: text =>
        state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setState({ searchText: '' });
    };
  
    const columns = [
      {
        title: 'Tài khoản',
        dataIndex: 'taiKhoan',
        key: 'taiKhoan',
        ...getColumnSearchProps('taiKhoan'),
      },
      {
        title: 'Mật khẩu',
        dataIndex: 'matKhau',
        key: 'matKhau',
  
      },
      {
        title: 'Họ và tên ',
        dataIndex: 'hoTen',
        key: 'hoTen',
        ...getColumnSearchProps('hoTen'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
  
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'soDt',
        key: 'soDt',
  
      },
      {
        title: 'Loại người dùng',
        dataIndex: 'maLoaiNguoiDung',
        key: 'maLoaiNguoiDung',
        ...getColumnSearchProps('maLoaiNguoiDung'),
      },
      {
        title: 'Thao tác',
        render: (text, user) => {
          console.log({user});
          return <Fragment>
            {<div className="d-flex justify-content-center">
              <NavLink to={`/admin/changeUser/${user.email}`} key={1} className="text-2xl "><EditOutlined style={{ color: '#006400' }} /></NavLink>
              <button  key={2}  style={{margin: 'auto', cursor: 'pointer', border: 'none', outline: 'none', backgroundColor: 'transparent'}}><DeleteOutlined style={{ color: 'red' }} onClick={()=>{
                //gọi action xóa user
                if(window.confirm('bạn có chắc là muốn xóa người dùng ' + user.hoTen)){
                  //gọi action
                  dispatch(XoaNguoiDungAction(user.taiKhoan))
                }
              }} /></button>
              
  
            </div>}
          </Fragment>
        },
        
  
  
  
      },
    ];
  
    return (
  
      <div>
        <h3 className="text-center text-3xl">Quản lý user</h3>
        <button className="btn btn-outline-success mb-3" onClick={() => {
          history.push('/admin/addUser')
        }}>Thêm người dùng </button>
        <Table columns={columns} dataSource={data} />
      </div>
  
    )
}
