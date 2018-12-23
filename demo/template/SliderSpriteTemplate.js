import React,{Fragment} from  'react'
import {Sprite} from  '../../src/index'
export function SliderSpriteTemplate(props){
    //if(process.env.NODE_ENV==="development")  console.log(props)
    return (
        <Fragment>
        {props.isActive?<Sprite {...props}/>:""}
        </Fragment>
    )
}