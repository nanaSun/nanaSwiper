import React,{Fragment} from  'react'
import Sprite from  './Sprite'
export default function SliderTpl(props){
    return (
        <Fragment>
        {props.isActive?<Sprite width={props.width} isMoving={props.isMoving} height={props.height} sprite={props.data.spriteImg} conf={props.data.spriteConf}/>:""}
        </Fragment>
    )
}