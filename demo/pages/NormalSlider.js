import React,{Fragment} from 'react';

import Swiper,{SwiperSlider} from '../../index'

const data=[
    {
        text:"text1"
    },
    {
        text:"text2"
    },
    {
        text:"text3"
    }
]
export function NormalSlider(){
   return (
       <Fragment>
           <p>类似于router这样，一个个router子函数写好</p>
           <div className="SwiperContainer">
                <Swiper
                    initSliderIndex={2}
                    sensitive={.2} 
                    isLoop={true}
                    width={window.innerWidth}
                    height={300}>
                        <SwiperSlider  render={()=>(<div className="defaultSlider">
                            slider-ahahah
                            </div>)}/>
                        <SwiperSlider render={()=>(<div className="defaultSlider">
                            slider-gasdffds
                            </div>)}/>
                        <SwiperSlider render={()=>(<div className="defaultSlider">
                            slider-werqwerq
                        </div>)}/>
                </Swiper>
            </div>
            <p>带循环的slider</p>
            <div className="SwiperContainer">
                <Swiper
                    sensitive={.2} 
                    isLoop={true}
                    width={window.innerWidth}
                    height={300}>
                        {data.map((d,index)=>{
                            return <SwiperSlider key={`NormalSlider2${index}`} render={()=>(<div className="defaultSlider">
                            slider-{d.text}
                            </div>)}/>
                        })}
                </Swiper>
            </div>
            <p>非循环的slider</p>
            <div className="SwiperContainer">
                <Swiper
                    sensitive={.2} 
                    isLoop={false}
                    width={window.innerWidth}
                    height={300}>
                        {data.map((d,index)=>{
                            return <SwiperSlider key={`NormalSlider3${index}`} render={()=>(<div className="defaultSlider">
                            slider-{d.text}
                            </div>)}/>
                    })}
                </Swiper>
            </div>
        </Fragment>
    )
}