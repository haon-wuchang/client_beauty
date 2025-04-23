import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

export default function MainTopSlide() {
    const [imgList, setImgList] = useState([]);

    useEffect(() => {
        axios.get("data/main.json")
            .then(res => setImgList(res.data.mainTopSlide))
            .catch(err => console.log(err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };

    return (
        <div className='main-top-slide-section'>
            <Slider {...settings}>
                { imgList && imgList.map((item, i) => 
                    <img style={{width:"100%"}} src={item.image} alt={`ad${i + 1}`} />
                ) }
            </Slider>
        </div>
    );
}