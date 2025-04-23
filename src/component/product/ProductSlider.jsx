import React from 'react';
import Slider from 'react-slick';

export default function ProductSlider({ images, settings }) {
  return (
    <div className='product-imgs-slider'>
      <Slider {...settings}>
        {images && images.map((item, index) => (
          <img key={index} src={item} className="slide-img" alt="slide" />
        ))}
      </Slider>
    </div>
  );
}