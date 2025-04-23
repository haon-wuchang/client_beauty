import React from 'react';

export default function DetailImages({ images }) {
  return (
    <div className='product-detail-imgs'>
      {images && images.map((item, index) => (
        <img key={index} src={item} className="detail-img" alt="detail" />
      ))}
    </div>
  );
}