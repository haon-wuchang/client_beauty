import React from 'react';
import MainTopSlide from '../component/main/MainTopSlide.jsx';
import MainBestProducts from '../component/main/MainBestProducts.jsx';
import MainCategory from '../component/main/MainCategory.jsx';
import MainSunCare from '../component/main/MainSunCare.jsx';

export default function Home() {
    return (
        <div className='main-wrap'>
            <MainTopSlide />
            <MainBestProducts />
            <MainCategory />
            <MainSunCare />
            <div className='main-bottom-wrap'>
                <img className='main-bottom-img' src="images/main_membership.jpg" alt="main_membership" />
                <img className='main-bottom-img' src="images/main_sns.jpg" alt="main_sns" />
            </div>
        </div>
    );
}

