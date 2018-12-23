import React from 'react';

import {Swiper} from '../../src/index'
import {SliderSpriteTemplate} from '../template/SliderSpriteTemplate'
import img1 from "../images/test1.jpg"
import img1Bkg from "../images/test1_bkg.jpg"
import img2 from "../images/test2.jpg"
import img2Bkg from "../images/test2_bkg.jpg"
import img3 from "../images/test3.jpg"
import img3Bkg from "../images/test3_bkg.jpg"

export function SpirteSlider(props){
   return (<div className="SwiperContainer">
    <Swiper 
        sensitive={.2} 
        isLoop={true}
        data={[
        {
            tpl:SliderSpriteTemplate,
            spriteImg:img1,
            spriteConf:[3,1,222,350],
            speed:1,
            img:img1Bkg
        },{
            //tpl:SliderSpriteTemplate,
            spriteImg:img2,
            spriteConf:[3,1,222,350],
            speed:10,
            img:img2Bkg
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