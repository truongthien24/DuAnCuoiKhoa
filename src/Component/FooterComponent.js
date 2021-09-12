import React from 'react'

export default function FooterComponent(props) {
    return (
        <div id="footer" style={{backgroundImage: 'url(/img/bg-footer-wall.jpg)'}}>
            <div className="container-fuild footer__wrap">
                <div className="row m-0">
                    <div className="col-12 col-md-6 footer__left">
                        <img className="footer__logo" src="/img/logo.jpg.svg"/>
                        <div className="footer__location">
                            <p>180 Đại học Công nghệ Sài Gòn</p>
                            <p>Quận 8, Thành phố Hồ Chí Minh</p>
                        </div>
                        <div className="footer__contact">
                            <span>Call us: </span>
                            <a href="tel:0390884505">(+84)&nbsp;39&nbsp;888&nbsp;4505</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 footer__right">
                        <div className="row m-0">
                            <div className="col-6 footer__policy d-flex flex-column align-items-center">
                                <h5 className="footer__right-heading">Chính Sách</h5>
                                <ul className="footer__right-list">
                                    <li>
                                        <a href="#">Terms of Use</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Sercurity</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 footer__account d-flex flex-column align-items-center">
                                <h5 className="footer__right-heading">Tài Khoản</h5>
                                <ul className="footer__right-list">
                                    <li>
                                        <a href="#">My account</a>
                                    </li>
                                    <li>
                                        <a href="#">Watchlist</a>
                                    </li>
                                    <li>
                                        <a href="#">Collections</a>
                                    </li>
                                    <li>
                                        <a href="#">User Guide</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay"></div>
            <p className="myName">Nguyễn Lê Trường Thiện @2021</p>
        </div>
    )
}
