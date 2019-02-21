import React from 'react';

import Swiper from '../../index'
import {SliderSpriteTemplate} from '../template/SliderSpriteTemplate'
import {SliderDefaultTemplate} from  '../template/SliderDefaultTemplate'
import img1 from "../images/test1.jpg"
import img1Bkg from "../images/test1_bkg.jpg"
import img2 from "../images/test2.jpg"
import img2Bkg from "../images/test2_bkg.jpg"
import img3 from "../images/test3.jpg"
import img3Bkg from "../images/test3_bkg.jpg"

console.log(Swiper)
export function SpirteSlider(props){
   return (<div className="SwiperContainer">
    <Swiper
        sensitive={.2} 
        isLoop={true}
        width={window.innerWidth}
        height={300}
        data={[//自行定义，这边只是例子
        {
            tpl:SliderSpriteTemplate,
            spriteImg:img1,
            spriteConf:[3,1,222,350],
            speed:6,
            img:img1Bkg
        },{
            tpl:SliderDefaultTemplate,
            id:"mixed 模板"
        },{
            tpl:SliderSpriteTemplate,
            spriteImg:img3,
            speed:10,
            spriteConf:[3,1,222,350],
            img:img3Bkg
        }
        ]}/>
    </div>)
}