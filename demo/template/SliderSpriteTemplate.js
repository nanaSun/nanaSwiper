import React,{Fragment,Component} from  'react'
import {Sprite} from  '../../index'

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