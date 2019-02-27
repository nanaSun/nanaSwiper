import React from 'react';
import Swiper,{SwiperSlider} from '../index';
import {SliderSpriteTemplate} from '../demo/template/SliderSpriteTemplate'
//import TestRenderer from 'react-test-renderer';
import touch from './touchHelper';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';
configure({ adapter: new Adapter() });
const winwidth=window.innerWidth;
const data=[
    {
        width:window.innerWidth,
        height:300,
        spriteImg:'img1',
        spriteConf:[3,1,222,350],
        speed:6,
        tpl:SliderSpriteTemplate
    },
    {
        width:window.innerWidth,
        height:300,
        spriteImg:'img3',
        spriteConf:[3,1,222,350],
        speed:6,
        tpl:SliderSpriteTemplate
    },
    {
        width:window.innerWidth,
        height:300,
        spriteImg:'img1',
        spriteConf:[3,1,222,350],
        speed:6,
        tpl:SliderSpriteTemplate
    }
]
const SpirteSlider=(<div className="SwiperContainer">
    <Swiper
        sensitive={.2} 
        isLoop={false}
        width={window.innerWidth}
        height={300}>
            {data.map((d,index)=>{
                return <SwiperSlider key={`SpirteSlider${index}`} render={(props)=><d.tpl {...d} {...props}/>}/>
            })}
        </Swiper>
    </div>)

describe('Swiper simple test', () => {
    const touchPoints=[
        [[winwidth*.5,0],[winwidth*.6,0],[winwidth*.6],0,"sensitive less then .2 and move right slider come back to current"],//偏差小于.2
        [[winwidth*.5,0],[winwidth*.29,0],[winwidth*.29],1,"sensitive bigger then .2 and move left slider come to next "],//偏差大于.2，向左
        [[winwidth*.5,0],[winwidth*.6,0],[winwidth*.6],1,"sensitive less then .2 and move right slider come back to current "],//偏差大于.2，向右
        [[winwidth*.5,0],[winwidth*.2,0],[winwidth*.2],2,"sensitive bigger then .2 and move left slider come to next"],//偏差小于.2，向右
        [[winwidth*.5,0],[winwidth*.9,0],[winwidth*.9],1,"sensitive bigger then .2 and move right slider come to prev"],//偏差小于.2，向右
        [[winwidth*.5,0],[winwidth*.29,0],[winwidth*.29],2,"sensitive bigger then .2 and move left slider come to next"],//偏差大于.2，向左
        [[winwidth*.5,0],[winwidth*.1,0],[winwidth*.1],2,"sensitive bigger then .2 and move left slider come back to current"],//偏差大于.2，向左
        [[winwidth*.5,0],[winwidth*.4,0],[winwidth*.4],2,"sensitive less then .2 and move left slider come back to current "],//偏差大于.2，向左
    ]
    const tree=mount(SpirteSlider)
    const c = tree.instance()
    for(let point of touchPoints){
        it(point[4], () => {
            c.touchstart(touch.emulateTouchEvent('touchstart',point[0]))
            c.touchmove(touch.emulateTouchEvent('touchmove',point[1]))
            c.touchend(touch.emulateTouchEvent('touchend',point[2]))
            c.transitionend()
            expect(c.currentSliderIndex).toBe(point[3]);
        });
    }
});