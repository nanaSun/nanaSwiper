import React from 'react';
import Swiper from '../src/Swiper';
//import TestRenderer from 'react-test-renderer';
import touch from './touchHelper';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';
configure({ adapter: new Adapter() });
const winwidth=window.innerWidth;
const data=[{id:"1"},{id:"2"},{id:"3"}]
//没有做y上的处理，所以这里全部为0，并不影响结果
/**
 * 宽度是整屏宽
 * 灵敏度是移动偏差为宽度*0.2的时候，触发滚动
 * 非循环,小于第一屏和大于最后一屏幕会回弹
 */
const baseComponent = {
    width:winwidth,
    sensitive:.2,
    componment:null
};
baseComponent.componment=(<Swiper 
    sensitive={baseComponent.sensitive} 
    isLoop={false}
    width={baseComponent.width}
    height={300}
    data={data}/>)

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
    const tree=mount(baseComponent.componment)
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

/**
 * 宽度是整屏宽
 * 灵敏度是移动偏差为宽度*0.2的时候，触发滚动
 * 循环,小于第一屏会跳转至下一屏
*/
const loopComponent={
    width:winwidth,
    sensitive:.2,
    componment:null
};
loopComponent.componment=(<Swiper 
    slideType={"flatCoverFlow"}
    sensitive={loopComponent.sensitive} 
    isLoop={true}
    width={loopComponent.width}
    height={280}
    data={data}/>)
describe('Swiper loop test', () => {
    const loopPoints=[
        [[winwidth*.5,0],[winwidth*.29,0],[winwidth*.29,0],2,"sensitive bigger then .2 and move left slider come to next"],//偏差大于.2，向左
        [[winwidth*.5,0],[winwidth*.2,0],[winwidth*.2,0],3,"sensitive bigger then .2 and move left slider come to last"],//偏差小于.2，向左
        [[winwidth*.5,0],[winwidth*.1,0],[winwidth*.1,0],1,"sensitive bigger then .2 and move right slider come to first"],//偏差小于.2，向左，loop至第一个
        [[winwidth*.5,0],[winwidth*.9,0],[winwidth*.9,0],3,"sensitive bigger then .2 and move right slider come to last"],//偏差小于.2，向右，返回最后一个
    ]
    const tree=mount(loopComponent.componment)
    const c = tree.instance()
    it("has plus two slider and init slider's index is 1", () => {
        expect(c.currentSliderIndex).toBe(1);
        expect(c.sliders.length).toBe(data.length+2);
    });
    for(let point of loopPoints){
        it(point[4], () => {
            c.touchstart(touch.emulateTouchEvent('touchstart',point[0]))
            c.touchmove(touch.emulateTouchEvent('touchmove',point[1]))
            c.touchend(touch.emulateTouchEvent('touchend',point[2]))
            c.transitionend()
            expect(c.currentSliderIndex).toBe(point[3]);
        });
    }
});