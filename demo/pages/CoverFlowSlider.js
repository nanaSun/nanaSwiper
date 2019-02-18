import React from 'react';

import Swiper from '../../index'
import {SliderDefaultTemplate} from '../template/SliderDefaultTemplate'
import img1Bkg from "../images/test1_bkg.jpg"
import img2Bkg from "../images/test2_bkg.jpg"
import img3Bkg from "../images/test3_bkg.jpg"

export function CoverFlowSlider(props){
   return (<div className="SwiperContainer">
    <Swiper 
        slideType={"flatCoverFlow"}
        initMovex={.1}//space between
        sensitive={.2} 
        isLoop={true}
        width={window.innerWidth}
        height={300}
        data={[
        {
            id:"1",
            tpl:SliderDefaultTemplate,
            img:img1Bkg
        },{
            id:"2",
            tpl:SliderDefaultTemplate,
            img:img2Bkg
        },{
            id:"3",
            tpl:SliderDefaultTemplate,
            img:img3Bkg
        }
        ]}/>
    </div>)
}