import React from 'react';
import '../nanaDesign.scss'
import {Swiper} from '../../src/index'
import {SliderUserTemplate} from '../template/SliderUserTemplate'
import img1Bkg from "../images/test1_bkg.jpg"
import img2Bkg from "../images/test2_bkg.jpg"
import img3Bkg from "../images/test3_bkg.jpg"
export function UserDefineSlider(props){
   return (<div className="SwiperContainer">
    <Swiper 
        customStyleClassName="nanaDesign"
        customNavStyleClassName="navigationUser"
        sensitive={.2} 
        isLoop={false}
        data={[
        {
            id:"1",
            tpl:SliderUserTemplate,
            img:img1Bkg
        },{
            id:"2",
            tpl:SliderUserTemplate,
            img:img2Bkg
        },{
            id:"3",
            tpl:SliderUserTemplate,
            img:img3Bkg
        }
        ]}/>
    </div>)
}