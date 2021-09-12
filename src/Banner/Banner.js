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
                    {/* <img src={item.hinhAnh}></img> */}
                    <div className="slick__content">
                        <button className="slick__content-btn" onClick={() => {
                            setToggler(!toggler);
                        }}>
                            <i class="far fa-play-circle"></i>
                        </button>
                    </div>
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
            <FsLightbox
                toggler={toggler}
                sources={[
                    'https://i.imgur.com/fsyrScY.jpg',
                    'https://www.youtube.com/watch?v=xshEZzpS4CQ',
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                ]}
            />
        </Fragment>
    )
}
