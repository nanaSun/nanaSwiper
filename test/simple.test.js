import React from 'react';
import Swiper from '../src/Swiper';
//import TestRenderer from 'react-test-renderer';
import touch from './touchHelper';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';
configure({ adapter: new Adapter() });
const baseComponent = (<Swiper 
    sensitive={.2} 
    isLoop={false}
    width={window.innerWidth}
    height={300}
    data={[
    {
        id:"1"
    },{
        id:"2"
    },{
        id:"3"
    }
    ]}/>);
const coverFlowComponent=(<Swiper 
    slideType={"flatCoverFlow"}
    initMovex={window.innerWidth*0.1}//space between
    sensitive={.2} 
    isLoop={true}
    width={window.innerWidth*0.8}
    height={280}
    data={[
    {
        id:"1"
    },{
        id:"2"
    },{
        id:"3"
    }
    ]}/>)

// test('Swiper simple test', () => {
//     const tree=mount(baseComponent)
//     console.log(tree,window.innerWidth)
//     const c = tree.instance()
//     let touchstart = touch.emulateTouchEvent('touchstart',[1000,0])
//     let touchmove = touch.emulateTouchEvent('touchmove',[0,0])
//     let touchend = touch.emulateTouchEvent('touchend',[0,0])
//     c.touchstart(touchstart)
//     c.touchmove(touchmove)
//     c.touchend(touchend)
//     c.transitionend()
//     console.log(c.state)
//     touchstart = touch.emulateTouchEvent('touchstart',[1000,0])
//     touchmove = touch.emulateTouchEvent('touchmove',[0,0])
//     touchend = touch.emulateTouchEvent('touchend',[0,0])
//     c.touchstart(touchstart)
//     c.touchmove(touchmove)
//     c.touchend(touchend)
//     c.transitionend()
//     touchstart = touch.emulateTouchEvent('touchstart',[1000,0])
//     touchmove = touch.emulateTouchEvent('touchmove',[0,0])
//     touchend = touch.emulateTouchEvent('touchend',[0,0])
//     c.touchstart(touchstart)
//     c.touchmove(touchmove)
//     c.touchend(touchend)
//     c.transitionend()
//     console.log(c.state)
// });
test('Swiper coverFlowComponent test', () => {
    const tree=mount(coverFlowComponent)
    const c = tree.instance()
    let touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    let touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    let touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    console.log(c.currentSliderIndex)
    c.touchmove(touchmove)
    console.log(c.currentSliderIndex)
    c.touchend(touchend)
    console.log(c.currentSliderIndex)
    c.transitionend()
    console.log(c.currentSliderIndex)
    touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    c.touchmove(touchmove)
    c.touchend(touchend)
    c.transitionend()
    console.log(c.state)
    touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    c.touchmove(touchmove)
    c.touchend(touchend)
    c.transitionend()
    console.log(c.state)
    touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    c.touchmove(touchmove)
    c.touchend(touchend)
    c.transitionend()
    console.log(c.state)
    touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    c.touchmove(touchmove)
    c.touchend(touchend)
    c.transitionend()
    console.log(c.state)
    touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    c.touchmove(touchmove)
    c.touchend(touchend)
    c.transitionend()
    console.log(c.state)
    touchstart = touch.emulateTouchEvent('touchstart',[500,0])
    touchmove = touch.emulateTouchEvent('touchmove',[0,0])
    touchend = touch.emulateTouchEvent('touchend',[0,0])
    c.touchstart(touchstart)
    c.touchmove(touchmove)
    c.touchend(touchend)
    c.transitionend()
    console.log(c.state)
});