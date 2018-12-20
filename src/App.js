import React, { Component } from 'react';
import Swiper from './components/Swiper'
import SliderTpl from './components/SliderTpl'
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
        </ul>
        {/* // 用于固定Swiper大小 */}
        <div className="SwiperContainer">
            <Swiper SliderTpl={SliderTpl} sensitive={.2} 
            data={[
              {
                img:"./images/"
              },
              {},
            ]}/>
        </div>
      </div>
    );
  }
}

export default App;
