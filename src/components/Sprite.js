import React, { Component } from 'react';

export class Spirit extends Component {
    canvasWidth=0
    canvasHeight=0
    image=new Image()
    loaded=false
    // row=10
    // col=4
    row=3
    col=1
    fpsWidth=0
    fpsHeight=0
    currentRow=0
    currentCol=0
    fps=0
    stop=true
    animationTimeout=null
    constructor(props){
        super(props)
        this.canvas=(refs)=>{
            if(refs) {
                this.context=refs.getContext("2d")
            }
        }
    }
    componentDidMount(){
        this.currentRow=0
        this.currentCol=0
        this.stop=false
        if(!this.loaded){
            if(this.props.image) this.loadImg().then(()=>{
                this.animate()
                this.loaded=true
            },(e)=>console.log(e)) 
            if(this.props.config&&this.props.config.length===4) [this.row,this.col,this.fpsWidth,this.fpsHeight]=this.props.config
        }else{
            this.animate()
        }
    }
    componentWillUnmount(){
        this.stop=true
        if(this.context.clearRect) this.context.clearRect(0,0,640,1040)
    }
    animate(){
        if(this.fps>=4){
            this.fps=0
            let cr=this.currentRow, cc=this.currentCol;
            if(cr===this.row){
                this.currentRow=0
                this.currentCol++
            }else{
                this.currentRow++
            }
            if(cc>this.col){
                this.currentCol=0
            }
            this.drawSpirt()
        }
        this.fps++
        if(!this.stop&&this.context) window.requestAnimationFrame(this.animate.bind(this))
        else{ console.log(this)}
    }
    drawSpirt(){
        let cr=this.currentRow, cc=this.currentCol;
        if(this.context.drawImage) this.context.drawImage(this.image,cr*this.fpsWidth,cc*this.fpsHeight,this.fpsWidth,this.fpsHeight,0,0,640,1040)
    }
    loadImg(){
        this.image.src=this.props.image
        return new Promise((rs,rj)=>{
            this.image.onload=rs
            this.image.onerror=rj
        })
    }
    render(){
        let { canvasWidth,canvasHeight}=this.props
        return <canvas width="640" height="1040" style={{width:canvasWidth,height:canvasHeight}} ref={this.canvas}></canvas>
    }
}
export default Spirit