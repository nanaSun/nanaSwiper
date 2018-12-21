import React, { Component } from 'react';
import Swiper from './components/Swiper'
import SliderTpl from './components/SliderTpl'
import SliderSprite from './components/SliderSprite'
import './App.css';
import img1 from "./images/test1.jpg"
import img1Bkg from "./images/test1_bkg.jpg"
import img2 from "./images/test2.jpg"
import img2Bkg from "./images/test2_bkg.jpg"
import img3 from "./images/test3.jpg"
import img3Bkg from "./images/test3_bkg.jpg"
class App extends Component {
  render() {
    return (
      <div className="App">
        <p>先实现一个建议版本的Swiper</p>
        <p>功能有：</p>
        <ul>
          <li>1、可以滑动</li>
          <li>2、可以自动滑动到下一页</li>
          <li>3、可以自定义模板</li>
          <li>4、设置灵敏度</li>
          <li>5、特效</li>
          <li>6、无限轮播图</li>
        </ul>
        {/* // 用于固定Swiper大小 */}
        <div className="SwiperContainer">
            <Swiper 
            initMovex={.1}
            sensitive={.2} 
            data={[
              {
                tpl:SliderSprite,
                spriteImg:img1,
                spriteConf:[3,1,222,350],
                img:img1Bkg
              },{
                tpl:SliderTpl,
                spriteImg:img2,
                spriteConf:[3,1,222,350],
                img:img2Bkg
              },{
                tpl:SliderSprite,
                spriteImg:img3,
                spriteConf:[3,1,222,350],
                img:img3Bkg
              }
            ]}/>
        </div>
      </div>
    );
  }
}

export default App;
