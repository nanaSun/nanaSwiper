import React,{Fragment} from 'react';

import Swiper,{SwiperSlider} from '../../index'

export function FreeModeSlider(){
   return (
       <Fragment>
           <div className="SwiperContainer">
                <Swiper
                    sensitive={.2} 
                    isLoop={false}
                    isFreeMode={true}
                    width={window.innerWidth}
                    height={300}>
                        <SwiperSlider  render={()=>(<div className="userDefaultSlider1">
                            slider-ahahah
                            </div>)}/>
                        <SwiperSlider render={()=>(<div className="userDefaultSlider2">
                            slider-gasdffds
                            </div>)}/>
                        <SwiperSlider render={()=>(<div className="userDefaultSlider3">
                            slider-werqwerq
                        </div>)}/>
                </Swiper>
            </div>
        </Fragment>
    )
}