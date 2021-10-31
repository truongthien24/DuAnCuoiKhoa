import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FsLightbox from 'fslightbox-react';
import Slider from "react-slick";
import { LayDanhSachPhim } from '../../../Redux/Reducer/Action/QuanLyPhimAction';

export default function CommingSoon(props) {
    const [toggler, setToggler] = useState(false);

    const [state, setState] = useState({
        hinhAnh: './img/bg-footer.jpg',
        tenPhim: 'Avenger End-game',
        moTa: 'Và cơn gió như khẽ mơn man lay từng nhành hoa rơi',
        trailer: 'https://www.youtube.com/embed/6ZfuNTqbHE8',
        danhGia: 10,
        ngayKhoiChieu: '24-11-2000',
        maPhim: '',
    })

    useEffect(() => {
        //Gọi sự kiện lấy api sau khi render
        let action = LayDanhSachPhim();
        dispatch(action);
    }, []);

    const arrPhim = useSelector(state => state.QuanLyPhimReducer.arrPhim);

    const dispatch = useDispatch();

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    const renderDanhSachPhimSapChieu = () => {
        return arrPhim.map((item, index) => {
            return <div key={index}>
                <div className="slider__item">
                    <button className='slider__wrap' onClick={()=> {
                        setState({
                            hinhAnh:  `${item.hinhAnh}`,
                            tenPhim: `${item.tenPhim}`,
                            moTa: `${item.moTa}`,
                            danhGia: `${item.danhGia}`,
                            ngayKhoiChieu: `${item.ngayKhoiChieu}`,
                            trailer: `${item.trailer}`,
                            maPhim: `${item.maPhim}`
                        })
                    }}>
                        <div className="slider__content">
                            <img src={item.hinhAnh} onError={(e)=>{e.target.onerror = null; e.target.src="/img/errorImage.png"}}></img>
                            <h5>{item.tenPhim}</h5>
                        </div>
                        <div className="slider__overlay"></div>
                    </button>
                </div>
            </div>
        })
    }

    return (
        <div id="commingSoon" style={{backgroundImage: `url(${state.hinhAnh})`}}>
            <div className="container py-5" style={{position: 'relative', zIndex: '2'}}>
                <div className="commingSoon__wrap">
                    <div className="row mb-5">
                        <h5 className="text-white title">Comming Soon</h5>
                    </div>
                    <div className="row commingSoon__info my-3">
                        <div className="col-6 commingSoon__content p-0">
                            <div className="content__reaction">
                                <div>HOT</div>
                                <div>{state.danhGia}</div>
                            </div>
                            <div className="content__name my-4">
                                <span className="text-white">{state.tenPhim}</span>
                            </div>
                            <div className="content__time">
                                <i className="far fa-calendar-alt"></i>
                                <span>{state.ngayKhoiChieu}</span>
                            </div>
                            <div className="content__introduce py-3">
                                <p>
                                    {state.moTa}
                                </p>
                            </div>
                            <NavLink className="content__link" to={`/detail/${state.maPhim}`}> <span>MORE INFO</span> <i class="fas fa-angle-right"></i></NavLink>
                        </div>
                        <div className="col-6 commingSoon__trailer p-0 d-flex justify-content-center">
                            <div className="trailer__wrap" style={{ backgroundImage: `url(${state.hinhAnh})` }}>
                                <button className="trailer__btn" onClick={() => {
                                    setToggler(!toggler);
                                }}>
                                    <i class="far fa-play-circle"></i>
                                </button>
                                <div className="trailer__overlay"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row commingSoon__slider py-5">
                        <Slider {...settings} className="slider__list">
                            {renderDanhSachPhimSapChieu()}
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="overlay"></div>
            <FsLightbox
                toggler={toggler}
                sources={[
                    `${state.trailer}`
                ]}
            />
        </div>
    )
}
