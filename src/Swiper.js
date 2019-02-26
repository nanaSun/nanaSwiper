import React,{Component,Fragment} from 'react'
import SwiperCSS from './styles/Swiper.module.scss'
import SwiperContext from "./SwiperContext";
import {checkTouch} from './utils'
import PropTypes from "prop-types";

const  supportTouch=checkTouch()

class Swiper extends Component{
    //控制手势
    startPoint=0//开始滑动的点touchstart
    movePoint=0//移动的点touchmove
    endPoint=0//结束的点touchend
    moveingStart=false//判断是否开始touchstart
    isMoving=0//起始滑动为0
    swiperWidth=0//幻灯片的宽度
    swiperHeight=0//幻灯片的高度
    initMovex=0//幻灯片开始的位置
    currentSliderIndex=0//初始幻灯片
    sensitive=0.5//灵明度
    isFreeMode=false
    isLoop=false
    slideType=""
    sliders=[]
    bounds={}
    boundsMove={}
    constructor(props){
        super(props)
        this.slideType=props.slideType||this.slideType;
        this.isFreeMode=props.isFreeMode||this.isFreeMode;
        this.sensitive=props.sensitive||this.sensitive;
        this.sliders=props.children
        this.isLoop=(this.sliders.length>1?props.isLoop:false)||this.isLoop
        this.currentSliderIndex=props.initSliderIndex||0
        this.initMovex=props.initMovex||this.initMovex;
        this.initMovex=(this.initMovex<1?this.initMovex*this.props.width:this.initMovex)
        this.swiperWidth=this.props.width||window.innerWidth
        this.swiperHeight=this.props.height||300
        this.init() 
        this.state={
            moveX:this.initMovex-this.currentSliderIndex*this.swiperWidth,
            isMoving:0,//判断是否正在移动touchmove -1 左 1 右
            isTransition:false,
            isLoaded:true
        }
        
    }
    
    init(){
        if(this.isLoop){
            this.sliders=[
                React.cloneElement(this.sliders.slice(-1)[0],{key:"SwiperFirst",index:0}),
                ...this.sliders.map((s,i)=>{
                    return React.cloneElement(s,
                        {key:"Swiper"+(i+1),index:i+1})
                }),
                React.cloneElement(this.sliders.slice(0,1)[0],{key:"SwiperLast",index:this.sliders.length+1})]
            this.bounds={
                min:1,
                max:this.sliders.length-1
            }
            this.currentSliderIndex++
        }else{
            this.sliders=this.sliders.map((s,i)=>{
                return React.cloneElement(s,
                    {key:"Swiper"+i,index:i})
            })
            this.bounds={
                min:0,
                max:this.sliders.length-1
            }
        }
        this.boundsMove={
            min:-this.bounds.max*this.swiperWidth-this.initMovex,
            max:this.initMovex
        }
        
    }
    componentDidMount(){
    }
    getPointX(e){
        return supportTouch?e.touches[0].clientX:e.clientX
    }
    touchstart(e){
        if((e.type==="mousedown"&&!supportTouch)||(e.type==="touchstart"&&supportTouch)){
            //e.preventDefault();
            this.startPoint=this.getPointX(e)
            this.movePoint=this.startPoint
            this.endPoint=this.startPoint
            this.moveingStart=true;
        }
    }
    touchmove(e){
        if(this.moveingStart&&((e.type==="mousemove"&&!supportTouch)||(e.type==="touchmove"&&supportTouch))){
            e.preventDefault();
            this.endPoint=this.getPointX(e)
            let changePos=this.endPoint-this.movePoint+this.state.moveX;
            //console.log(this.endPoint,this.movePoint,this.state.moveX)
            this.movePoint=this.endPoint
            this.isMoving=this.movePoint-this.startPoint>0?-1:1
            //mark这边触发渲染
            //console.log("touchmove",changePos)
            this.setState({
                isTransition:false,
                moveX:changePos
            })
        }
    }
    touchend(e){
        //console.log("touchend",e.type)
        if(((e.type==="mouseleave"||e.type==="mouseup")&&!supportTouch)||(e.type==="touchend"&&supportTouch)){
            this.moveingStart=false;
            if(this.startPoint!==this.endPoint){
                e.preventDefault()
                this.slideTo(this.calculateSlider())
            }else{
                this.isMoving=0
            }
        }
    }
    calculateSlider(){
        let {min,max}=this.bounds
        let MoveSlider=Math.abs(this.state.moveX/this.swiperWidth)
        let slideIndex=this.currentSliderIndex
        //计算当前slider和滑动的差值
        let difference=MoveSlider-slideIndex
        if(this.isMoving===1&&difference>this.sensitive){//向右边，向左滑动
            slideIndex=Math.ceil(MoveSlider)
            slideIndex=slideIndex-this.currentSliderIndex>1?slideIndex-1:slideIndex
        }else if(this.isMoving===-1&&difference<-this.sensitive){//向左边
            slideIndex=Math.floor(MoveSlider)
            //fix灵敏度不高的情况下 滑动超过1slider
            slideIndex=slideIndex-this.currentSliderIndex<-1?slideIndex+1:slideIndex
        }
        slideIndex=slideIndex<min?0:slideIndex>max?max:slideIndex
        return slideIndex
    }
    fixLoop(){
        if(!this.isLoop) return
        let {min,max}=this.bounds
        if(this.currentSliderIndex<min){
            this.currentSliderIndex=max-1
            this.setState({
                isTransition:false,
                moveX:-this.currentSliderIndex*this.swiperWidth+this.initMovex
            })
        }
        if(this.currentSliderIndex>=max){
            this.currentSliderIndex=1
            this.setState({
                isTransition:false,
                moveX:-this.swiperWidth+this.initMovex
            })
        }
    }
    slideTo(slideIndex,force){
        //若果没有滑动，活着正在滑动，就🔙
        if(this.moveingStart||this.isMoving===0) return
        let {min,max}=this.boundsMove
        this.currentSliderIndex=slideIndex
        if(force||!this.isFreeMode||(this.state.moveX<min||this.state.moveX>max)){
            this.setState({
                isTransition:true,
                moveX:-slideIndex*this.swiperWidth+this.initMovex
            })
        }else{
            this.currentSliderIndex=slideIndex
        }
    }
    clickSlideTo(index){
        this.isMoving=1
        this.slideTo(index,true)
    }
    transitionend(){
        this.isMoving=0
        this.setState({
            isTransition:false
        })
        this.fixLoop()
    }
    render(){
        if(this.sliders.length<1||!this.state.isLoaded){
            return <div></div>
        }
        let {moveX,isTransition}=this.state,
            transitionDuration=isTransition?"300ms":"0ms",
            transformX=`translate3d(${moveX}px, 0px, 0px)`
        const props = {
            ...this.state,
            isMoving:this.isMoving,
            currentSliderIndex:this.currentSliderIndex
        };
        return (<Fragment>
            {/* 滑动主体 */}
            <div 
                className={`${SwiperCSS.SwiperWrapper} ${SwiperCSS[this.slideType]?SwiperCSS[this.slideType]:""}`}
                onTouchStart={(e)=>{this.touchstart(e)}}
                onTouchMove={(e)=>{this.touchmove(e)}}
                onTouchEnd={(e)=>{this.touchend(e)}}
                onMouseDown={(e)=>{this.touchstart(e)}}
                onMouseMove={(e)=>{this.touchmove(e)}}
                onMouseUp={(e)=>{this.touchend(e)}}
                onMouseLeave={(e)=>{this.touchend(e)}}
                onTransitionEnd={(e)=>{this.transitionend()}}
                style={{         
                    WebkitTransitionDuration:transitionDuration,
                    transitionDuration:transitionDuration,
                    WebkitTransform:transformX,
                    transform:transformX,
                    height:this.swiperHeight
                }}
            >
            <SwiperContext.Provider 
                value={props} 
                children={this.sliders || null}
            />
            </div>
            {/* 导航点 */}
            <div className={`${SwiperCSS.SwiperSliderNav}`} >
                {this.sliders.map((color,index)=>
                <Fragment key={`nav_${index}`}>{this.isLoop&&(index===0||index===this.bounds.max)?"":
                <div className={`${SwiperCSS.SwiperItemNav} ${this.currentSliderIndex===index?SwiperCSS.SwiperNavActive:""}`}
                onClickCapture={()=>{this.clickSlideTo(index)}} 
                ></div>}
                </Fragment>
                )}
            </div>
        </Fragment>
        )
    }
}
Swiper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Swiper