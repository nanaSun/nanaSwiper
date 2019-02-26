import React from 'react';

import Swiper,{SwiperSlider} from '../../index'
import {SliderSpriteTemplate} from '../template/SliderSpriteTemplate'
import {SliderDefaultTemplate} from  '../template/SliderDefaultTemplate'
import img1 from "../images/test1.jpg"
import img1Bkg from "../images/test1_bkg.jpg"
import img3 from "../images/test3.jpg"
import img3Bkg from "../images/test3_bkg.jpg"

const data=[
    {
        width:window.innerWidth,
        height:300,
        spriteImg:img1,
        spriteConf:[3,1,222,350],
        speed:6,
        img:img1Bkg,
        tpl:SliderSpriteTemplate
    },
    {
        text:"text",
        tpl:SliderDefaultTemplate
    },
    {
        width:window.innerWidth,
        height:300,
        spriteImg:img3,
        spriteConf:[3,1,222,350],
        speed:6,
        img:img3Bkg,
        tpl:SliderSpriteTemplate
    }
]
export function LoopSlider(){
   return (<div className="SwiperContainer">
    <Swiper
        sensitive={.2} 
        isLoop={true}
        width={window.innerWidth}
        height={300}>
            {data.map((d,index)=>{
                return <SwiperSlider key={`LoopSlider${index}`} render={(props)=><d.tpl {...d} {...props}/>}/>
            })}
        </Swiper>
    </div>)
}