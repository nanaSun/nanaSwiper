import React,{Component} from 'react'
import PropTypes from "prop-types";
import SwiperContext from "./SwiperContext";
class SwiperSlider extends Component {
    render() {
      return (
        <SwiperContext.Consumer>
        {context => {
            const {currentSliderIndex,isMoving,SwiperSlider,SwiperActive}=context
            const {index,width,height}=this.props
            return (
                <div 
                style={{width:width?width:"100%",height:height?height:"300px"}}
                className={`${SwiperSlider} ${currentSliderIndex===index?SwiperActive:""}`}>
                    {this.props.render({
                        ...this.props,
                        isMoving:isMoving,
                        isActive:currentSliderIndex===index
                    })}
                </div>
            )
       }}
       </SwiperContext.Consumer>
      )
      ;
    }
}
SwiperSlider.propTypes = {
    render:PropTypes.func.isRequired,
    index: PropTypes.number
};

export default SwiperSlider