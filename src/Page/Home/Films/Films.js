import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Slider from "react-slick";
import { LayDanhSachPhim } from '../../../Redux/Reducer/Action/QuanLyPhimAction';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {NavLink} from 'react-router-dom';


export default function Films(props) {

    const dispatch = useDispatch();

    useEffect(()=>{
        const action = LayDanhSachPhim();
        dispatch(action);
    }, []);

    const arrPhim = useSelector(state=> state.QuanLyPhimReducer.arrPhim);

    const settings = {
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        slidesToScroll: 2,
        speed: 500,
        rows: 2,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
    };

    const renderPhimSapChieu = () => {
        return arrPhim.map((item,index)=> {
            let classActiveHot = '';
            if(item.hot === true) {
                classActiveHot = 'hot'
            }
            if(item.sapChieu === true) {
                return <div className="films__slider-item" key={index}>
                    <div className={`slider__item-wrap ${classActiveHot}`}>
                        <LazyLoadImage effect="blur" src={item.hinhAnh} onError={(e)=>{e.target.onerror = null; e.target.src="img/errorImage.png"}} alt="Hình ảnh hiện đang load"/>
                            {/* <img src={item.hinhAnh} onError={(e)=>{e.target.onerror = null; e.target.src="img/errorImage.png"}} alt="Hình ảnh hiện đang load"></img> */}
                        <div className="slider__item-content">
                            <h4>{item.tenPhim}</h4>
                        </div>
                        <div className="slider__item-hot">
                            <i class="fas fa-fire-alt"></i>
                        </div>
                        <div className="slider__item-reaction">
                            {item.danhGia}
                        </div>
                    </div>
                    <NavLink className="films__slider-item-overlay" to={`/detail/${item.maPhim}`}>
                        
                    </NavLink>
                </div>
            }
        })
    }

    const renderPhimDangChieu = () => {
        return arrPhim.map((item,index)=> {
            let classActiveHot = '';
            if(item.hot === true) {
                classActiveHot = 'hot'
            }
            if(item.dangChieu === true && item.sapChieu === false) {
                return <div className="films__slider-item" key={index}>
                    <div className={`slider__item-wrap ${classActiveHot}`}>
                        <img src={item.hinhAnh} onError={(e)=>{e.target.onerror = null; e.target.src="img/errorImage.png"}} alt="Hình ảnh hiện đang load"></img>
                        <div className="slider__item-content">
                            <h4>{item.tenPhim}</h4>
                        </div>
                        <div className="slider__item-hot">
                            <i class="fas fa-fire-alt"></i>
                        </div>
                    </div>
                </div>
            }
        })
    }

    return (
        <div id="films">
            {/* Nav tabs */}
            <div className="container">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#phimSapChieu">Phim sắp chiếu</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#phimDangChieu">Phim đang chiếu</a>
                    </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content">
                    <div className="tab-pane active" id="phimSapChieu">
                        <Slider {...settings} className="films__slider-list">
                            {renderPhimSapChieu()}
                        </Slider>
                    </div>
                    <div className="tab-pane container fade" id="phimDangChieu">
                        <Slider {...settings} className="films__slider-list">
                            {renderPhimDangChieu()}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
