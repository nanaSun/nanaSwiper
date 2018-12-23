import React,{Fragment} from  'react'
export function SliderUserTemplate(props){
    if(process.env.NODE_ENV==="development")  console.log(props)
    return (
        <Fragment>
            <div className="defaultSlider"  style={{backgroundImage:`url(${props.data.img})`}}>
            </div>
        </Fragment>
    )
}