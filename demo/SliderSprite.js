import React,{Fragment} from  'react'
import Sprite from  './Sprite'
export default function SliderTpl(props){
    console.log(props.isActive,props.isMoving)
    return (
        <Fragment>
        {props.isActive?<Sprite {...props}/>:""}
        </Fragment>
    )
}