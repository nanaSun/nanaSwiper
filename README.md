# Nana's Swiper

It's a slider that only supports horizonal slide. Just for now，I'll develop vertical slide in the next version.

The reason why develop such a swiper,just because a project need sliders with sprit and react. And it's hard to find a 3rd plugin which support for slider,react and canvas. It's easy to find a lot of plugins that support canvas and react or react and slider. That's why I develop such a plugin.

You can check my demo on [my website](https://www.cherryvenus.com/slider/)

If you want to play with this project, you can clone the repositor and then use following directions to start the project.

play with demo
`npx webpack --config webpack.config.demo`

start a webpack server
 `node .\webpackDevServer.js`

This Swiper's config:

|参数名字|作用|默认|
| ------------- |:-------------:| -----:|
|tplOpts|用于模板的额外参数，不影响swiper的参数|{}|
|slideType|暂时只设置了flatCoverFlow这个特效|""|
|customStyleClassName|用户自定义swiper的类名,e.g: "Sprite"是最外层的wrapper slider 就是"SpriteSlider" 当前就是"SpriteActive"|""|
|customNavStyleClassName|用户自定义导航的类名 ,e.g: "Nav"是最外层的导航 导航点就是"NavItem" 当前就是"NavActive"|""|
|isFreeMode|是否自由模式，不支持loop|false|
|sensitive|滑动灵敏度，0.2就是划过20%的slider，就会进入下一张或上一张|0.5|
|initMovex|用于计算，如果需要定义slider的尺寸，就需要计算这个|0|
|sliders|sliders的数据|[]|
|isLoop|是否循环，无限模式，1张slider和freemode下不支持loop|false|
|initSliderIndex|初始定位的slider|0|

如何使用

安装
`npm i -s nanaswiper`

引用
`import {Swiper} from 'nanaswiper'`

使用
```
<Swiper 
    sensitive={.2} 
    isLoop={false}
    data={[//自行定义，这边只是例子
        {
            id:"1",
            tpl:SliderDefaultTemplate,//在Swiper中被引用
            img:img1Bkg
        }
    ]}
/>
```

所有模板都需要自行定义，所以这边给出一个例子，如何使用内置的canvas序列帧插件
```SliderSpriteTemplate.js
import {Sprite} from  'nanaswiper'
export function SliderSpriteTemplate(props){
    return (
        <Fragment>
            {props.isActive?<Sprite {...props}/>:""}
        </Fragment>
    )
}
```

Sprite支持的参数

|参数名|用途|默认值|
|:--:|:--:|:--:|
|width|必须，自定义|""|
|height|必须，自定义|""|
|data.speed|速度，默认1秒60帧，如果设置2，就是2秒60帧|1|
|data.spriteImg|必须，序列帧参数，帧图|""|
|data.spriteConf|帧参数包含（row行,col列,fpsWidth：1帧图宽,fpsHeight：1帧图高）|{}|

感觉自己做的好复杂，溜了溜了

下一版计划：
* 修复freemode下，首尾滑动不流畅
* 序列帧支持导入json配置
* 来个垂直滑动
