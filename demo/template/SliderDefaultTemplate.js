import React,{Fragment} from  'react'
export function SliderDefaultTemplate(props){
    //if(process.env.NODE_ENV==="development")  console.log(props)
    return (
        <Fragment>
            <div className="defaultSlider">
                slider-{props.data.id}
            </div>
        </Fragment>
    )
}