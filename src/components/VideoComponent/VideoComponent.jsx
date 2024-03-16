import React from 'react';
import { Carousel } from 'antd';
import video3 from '../../assets/images/video.webm';
import { VideoWrapper } from './style';

const VideoSlider = () => {
  return (
    <div>
      <Carousel autoplay effect="fade" style={{overflow: 'hidden',textOverflow: 'ellipsis' }}>
        <VideoWrapper>
          <video width={1270} height={715} autoPlay  muted loop>
            <source src={video3} type="video/webm" />
          </video>
        </VideoWrapper>
      </Carousel>
         </div>
  );
};
export default VideoSlider;