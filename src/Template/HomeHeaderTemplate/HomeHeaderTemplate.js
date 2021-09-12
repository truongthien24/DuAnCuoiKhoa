import HeaderComponent from "../../Component/HeaderComponent";
import {Route} from 'react-router-dom';
import {useState} from 'react'
import { Fragment } from "react";
import HeaderComponentMobile from "../../Component/HeaderComponentMobile";
import FooterComponent from "../../Component/FooterComponent";
import Contact from "../../Component/Contact";

export const HomeHeaderTemplate = (props) => {

    const [state,setState] = useState(true); //True là desktop , false là mobile

    window.onresize = () => {
        let {innerWidth, innerHeight} = window;
        if(innerWidth <= 780) {
            setState(false);
        }else {
            setState(true);
        }
    }

    window.onload = () => {
        let {innerWidth, innerHeight} = window;
        if(innerWidth <= 780) {
            setState(false);
        }else {
            setState(true);
        }
    }

    const renderComponent = (propsRoute) => {
        if(state) {
            return <Fragment>
                <HeaderComponent {...propsRoute}/>
                <props.component {...propsRoute}/>
                <FooterComponent {...propsRoute}/>
                <Contact {...propsRoute}/>
            </Fragment>
        }else {
            return <Fragment>
                <HeaderComponentMobile {...propsRoute}/>
                <props.componentMobile {...propsRoute}/>
                <FooterComponent {...propsRoute}/>
                <Contact {...propsRoute}/>
            </Fragment>
        }
    }

    return <Route exact path={props.path} render={(propsRoute)=> {
        return <div>
            {renderComponent(propsRoute)}
        </div>
    }}/>
}