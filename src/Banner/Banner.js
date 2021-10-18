import React, { Fragment, useState, useEffect } from 'react';
import Slider from "react-slick";
import FsLightbox from 'fslightbox-react';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachBanner } from '../Redux/Reducer/Action/QuanLyPhimAction';

export default function Banner(props) {

    const [toggler, setToggler] = useState(false);

    const dispatch = useDispatch();

    //Sau khi render => call api
    useEffect(() => {
        const action = LayDanhSachBanner();
        dispatch(action);
    }, []);

    const arrBanner = useSelector(state => state.QuanLyPhimReducer.arrBanner);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const renderBanner = () => {
        return arrBanner.map((item, index) => {
            return <div>
                    <div className="slick__item" style={{backgroundImage: `url(${item.hinhAnh})`}}>
                    <div className="slick__content"></div>
                    <div className="overlay"></div>
                </div>
            </div>
        })
    }

    return (
        <Fragment>
            <div id="banner">
                <Slider {...settings} style={{ width: '100%' }}>
                    {renderBanner()}
                </Slider>
            </div>
        </Fragment>
    )
}
