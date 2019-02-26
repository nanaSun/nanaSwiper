import React, { Component } from 'react';

import './App.scss';
import {SpirteSlider} from "./pages/SpirteSlider"
import {NormalSlider} from "./pages/NormalSlider"
import {LoopSlider} from "./pages/LoopSlider"
import {CoverFlowSlider} from "./pages/CoverFlowSlider"
import {FreeModeSlider} from "./pages/FreeModeSlider"
import {UserDefineSlider} from "./pages/UserDefineSlider"
import {  Switch,Route, Link } from 'react-router-dom'
import history from './history'
const navs=[
  {
    name:"序列帧滚动",
    path:"/"
  }, 
  {
    name:"普通滚动",
    path:"/simple"
  }
  , 
  {
    name:"无限滚动",
    path:"/loop"
  }
  , 
  {
    name:"coverFlow样式",
    path:"/coverflow"
  }, 
  {
    name:"freeMode",
    path:"/freemode"
  }, 
  {
    name:"用户自定义",
    path:"/userdefine"
  }
]
function PathNav(props){
  return <ul className={`navigation ${props.isShow?"show":""}`}>
    {navs.map((nav,index)=><li key={`nav${index}`} className={props.currentPath===nav.path?"currentPath":""}><Link to={nav.path}>{nav.name}</Link></li>)}
  </ul>
}
class App extends Component {
  state={
    showMenu:false,
    currentPath:history.location.pathname
  }
  componentDidMount(){
    history.listen(()=>{
      this.setState({
        showMenu:false,
        currentPath:history.location.pathname
      })
    })
  }
  clickMenuBtn(){
    this.setState({
      showMenu:!this.state.showMenu
    })
  }
  render() {
    return (
      <div className="App">
        <div className={`menu ${this.state.showMenu?"close":""}`} onTouchStart={()=>{this.clickMenuBtn()}}><span></span></div>
        <PathNav isShow={this.state.showMenu} currentPath={this.state.currentPath}/>
        {/* // 用于固定Swiper大小 */}
        <Switch>
          <Route path="/" exact  render={(context) => {
              return <SpirteSlider/>;
          }}/>
          <Route path="/simple" exact  render={(context) => {
              return <NormalSlider/>;
          }}/>
          <Route path="/loop" exact  render={(context) => {
              return <LoopSlider/>;
          }}/>
          <Route path="/coverflow" exact  render={(context) => {
              return <CoverFlowSlider/>;
          }}/>
          <Route path="/freemode" exact  render={(context) => {
              return <FreeModeSlider/>;
          }}/>
          <Route path="/userdefine" exact  render={(context) => {
              return <UserDefineSlider/>;
          }}/>
          
        </Switch>
        <div className="intro">
          <p>当前演示： {navs.filter((n)=>n.path===this.state.currentPath)[0]["name"]}</p>
          <p>实现了simple的Swiper</p>
          <p>功能有：</p>
          <ol>
            <li>可以滑动</li>
            <li>可以自动滑动到下一页</li>
            
            <li>可以自定义模板</li>
            <li>设置灵敏度</li>
            <li>支持序列帧</li>
            <li>无限轮播图</li>
          </ol>
          <p><a href="https://github.com/nanaSun/nanaSwiper">github地址</a></p>
        </div>
      </div>
       
    );
  }
}

export default App;
