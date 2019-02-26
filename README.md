# Nana's Swiper

Major change:
    
    Change how to set slider, less configuration and makes it like react-router's style

It's a slider that only supports horizonal slide. Just for now，I'll develop vertical slide in the next version.

The reason why develop such a swiper,just because a project need sliders with sprit and react. And it's hard to find a 3rd plugin which support for slider,react and canvas. It's easy to find a lot of plugins that support canvas and react or react and slider. That's why I develop such a plugin.

You can check my demo on [https://www.cherryvenus.com/slider/](https://www.cherryvenus.com/slider/)

If you want to play with this project, you can clone the repositor and then use following directions to start the project.

build demo

`npx webpack --config webpack.config.demo`

start a webpack server
 `npm start`

This Swiper's config:

|params|function|default|required|
| ------------- |:-------------:| -----:| -----:|
|children|sliders inside swiper is a must|null|yes||sensitive|how sensitive it is when move the swiper to next or prev slider|0.5|no|
|initMovex|calculator initial slider position|0|no|
|isLoop|whether loop. One slider or freemode does not support loop|false|no|
|width|width|window.innerWidth|no|
|height|height|300|no|
|isFreeMode|is Free Mode and not support loop mode|false|no|
|initSliderIndex|inital slider,range from 0 to slider's number minus 1|0|no|
|slideType|`flatCoverFlow` effect，maybe remove after|""|no|

```simple usage
import Swiper,{SwiperSlider} from 'nanaswiper'
<div className="SwiperContainer">
    <Swiper
        initSliderIndex={2}
        sensitive={.2} 
        isLoop={true}
        >
            <SwiperSlider  render={()=>(<div className="defaultSlider">
                slider-ahahah
                </div>)}/>
            <SwiperSlider render={()=>(<div className="defaultSlider">
                slider-gasdffds
                </div>)}/>
            <SwiperSlider render={()=>(<div className="defaultSlider">
                slider-werqwerq
            </div>)}/>
    </Swiper>
</div>
```

Here follow react-router's style, so you can design your slider by `render`

```
<SwiperSlider  render={(props)=>(<div className="defaultSlider">
    slider-ahahah
</div>)}/>
```

here `props` params passed to `render` has following important function:

|params|usage|
|isMoving|whether the swiper is moving,touchmove -1 for left and 1 for right|
|isActive|whether it's current slider|

And if you want an array loop, the following example is for you:

```
const data=[
    {
        text:"text1"
    },
    {
        text:"text2"
    },
    {
        text:"text3"
    }
]
//...
<Swiper //...>
{data.map((d,index)=>{
    return <SwiperSlider key={`NormalSlider2${index}`} render={()=>(<div className="defaultSlider">
    slider-{d.text}
    </div>)}/>
})}
</Swiper>
//...

```

Next part is how to use Sprite with Swiper

First, define a sprite template.

```SliderSpriteTemplate.js
import React,{Fragment,Component} from  'react'
import Swiper,{SwiperSlider} from 'nanaswiper'

class SliderSpriteTemplate extends Component{
    render(){
        return (
            <Fragment>
                {this.props.isActive?<Sprite {...this.props}/>:""}
            </Fragment>
        )
    }
}
export {SliderSpriteTemplate}
```
Next set the sprite's params:

```
const data=[
    {
        width:window.innerWidth,//sprite width must
        height:300,//sprite height must
        spriteImg:img1,//must
        spriteConf:[3,1,222,350],//sprite'position must
        speed:6,//sprite'speed optional
        tpl:SliderSpriteTemplate//you can set any template you like， it's a must for sprite
    },
    //...
]
export function SpirteSlider(){
   return (<div className="SwiperContainer">
    <Swiper
        sensitive={.2} 
        isLoop={false}
        width={window.innerWidth}
        height={300}>
            {data.map((d,index)=>{
                return <SwiperSlider key={`SpirteSlider${index}`}
                    {/*pass all params to template*/} 
                    render={(props)=><d.tpl {...d} {...props}/>}
                />
            })}
        </Swiper>
    </div>)
```

Sprite support params:

|params|function|default|required|
| ------------- |:-------------:| -----:| -----:|
|width|canvas'width|""|yes|
|height|canvas'height|""|yes|
|data.spriteImg|image to animate|""|yes|
|data.spriteConf|sprite's config（row num,col num,fpsWidth：width,fpsHeight：height）|{}|yes|
|data.speed|speed，default 60fps, if set 2 it's 30fps|1|no|

Browser version, you can get it from ` npm run-script broswer`, and then `dist/nanaSwiper.js` is there for you.

How to use? You can directly use it in browser.

```
    <script src="https://cdn.bootcss.com/react/16.8.1/umd/react.profiling.min.js"></script>
    <script src="https://cdn.bootcss.com/react-dom/16.8.1/umd/react-dom.profiling.min.js"></script>
    <script src="./nanaSwiper.js"></script>
    <script>
        const  slider=React.createElement(
            "div",
            {className:"defaultSlider"},
            `slider`
        )
        const tpl1=React.createElement(
            Swiper.SwiperSlider,
            {
                className:"defaultSlider",
                render:()=>slider
            }
        )
        let test=React.createElement(
            Swiper.default,
            {
                sensitive:.2,
                isLoop:true,
                width:window.innerWidth,
                height:300,
            },
            tpl1,
            tpl1,
            tpl1
        )
        let div=React.createElement(
            "div",
            {
                className:"SwiperContainer"
            },
            test
        )
        ReactDOM.render(div, document.getElementById('root'));
    </script>
```



About test, here simulate the touch action, and only test the whether slider is right.

```
npm test
```
.

感觉自己做的好复杂，溜了溜了

下一版计划：
* 修复freemode下，首尾滑动不流畅
* 序列帧支持导入json配置
* 来个垂直滑动
