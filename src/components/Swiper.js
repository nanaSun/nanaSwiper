import React,{Component} from 'react'
import SwiperCSS from '../styles/Swiper.module.css'
class Swiper extends Component{
    //控制手势
    startPoint=0//开始滑动的点touchstart
    movePoint=0//移动的点touchmove
    endPoint=0//结束的点touchend
    moveingStart=false//判断是否开始touchstart
    
    swiperWidth="100%"//幻灯片的宽度
    swiperHeight="100%"//幻灯片的高度
    initMovex=0//幻灯片开始的位置
    currentSliderIndex=0//初始幻灯片
    sensitive//灵明度
    constructor(props){
        super(props)
        this.sensitive=props.sensitive||0.5;
        this.initMovex=props.initMovex||0;
        this.swiper=(refs)=>{
            console.log(refs,this.initMovex)
            if(refs){
                this.initMovex=this.initMovex*refs.offsetWidth
                this.swiperWidth=refs.offsetWidth-this.initMovex*2
                this.swiperHeight=refs.offsetHeight
            }
        }
        this.bounds={
            min:0,
            max:2
        }
        this.state={
            moveX:0,
            isMoving:0,//判断是否正在移动touchmove -1 左 1 右
            isTransition:false,
            isLoaded:false
        }
        
    }
    componentDidMount(){
        this.setState({
            moveX:this.initMovex,
            isLoaded:true
        })
    }
    getPointX(e){
        return e.touches[0].clientX||false
    }
    touchstart(e){
        e.preventDefault();
        this.startPoint=this.getPointX(e)
        this.movePoint=this.startPoint
        this.endPoint=this.startPoint
        this.moveingStart=true;
        
    }
    touchmove(e){
        e.preventDefault();
        this.endPoint=this.getPointX(e)
        let changePos=this.endPoint-this.movePoint+this.state.moveX;
        this.movePoint=this.endPoint
        this.isMoving=this.movePoint-this.startPoint>0?-1:1
        //mark这边触发渲染
        this.setState({
            isTransition:false,
            moveX:changePos
        })
        
    }
    touchend(){
        this.moveingStart=false;
        if(this.startPoint!==this.endPoint){
            this.slideTo(this.calculateSlider())
        }else{
            this.isMoving=0
        }
        e.preventDefault();
    }
    calculateSlider(){
        let {min,max}=this.bounds
        let MoveSlider=Math.abs(this.state.moveX/this.swiperWidth)
        let slideIndex=this.currentSliderIndex
        //计算当前slider和滑动的差值
        let difference=MoveSlider-slideIndex
        if(this.isMoving===1&&difference>this.sensitive){//向右边，向左滑动
            slideIndex=Math.ceil(MoveSlider)
        }else if(this.isMoving===-1&&difference<-this.sensitive){//向左边
            slideIndex=Math.floor(MoveSlider)
        }
        slideIndex=slideIndex<min?0:slideIndex>max?max:slideIndex
        return slideIndex
    }
    slideTo(slideIndex){
        //若果没有滑动，活着正在滑动，就🔙
        if(this.moveingStart||this.isMoving===0) return
        this.currentSliderIndex=slideIndex
        this.setState({
            isTransition:true,
            moveX:-slideIndex*this.swiperWidth+this.initMovex
        })
        
    }
    transitionend(){
        this.isMoving=0
        this.setState({
            isTransition:false
        })
    }
    renderTpl(item,index){
        if(!this.state.isLoaded) return ""
        let SliderTpl=item.tpl;
        return <SliderTpl 
        width={this.swiperWidth} 
        height={this.swiperHeight} 
        data={item} 
        isMoving={this.isMoving}
        isActive={this.currentSliderIndex===index}/>
    }
    render(){
        let {moveX,isTransition}=this.state
        let transitionDuration=isTransition?"300ms":"0ms",
            transformX=`translate3d(${moveX}px, 0px, 0px)`;
        return (
            <div
                ref={this.swiper}
                className={SwiperCSS.SwiperWrapper}
                onTouchStart={(e)=>{this.touchstart(e)}}
                onTouchMove={(e)=>{this.touchmove(e)}}
                onTouchEnd={(e)=>{this.touchend(e)}}
                onTransitionEnd={(e)=>{this.transitionend()}}
                style={{         
                    WebkitTransitionDuration:transitionDuration,
                    transitionDuration:transitionDuration,
                    WebkitTransform:transformX,
                    transform:transformX,
                    height:this.swiperHeight
                }}
            >
            {this.props.data.map((item,index)=><div 
                className={SwiperCSS.SwiperSlider+(index===this.currentSliderIndex?(" "+SwiperCSS.SwiperActive):"")}
                style={{width:this.swiperWidth}} 
                key={"SwiperSlider"+index}>
                {this.renderTpl(item,index)}
            </div>)}
            </div>
        )
    }
}
export default Swiper