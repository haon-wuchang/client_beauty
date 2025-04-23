import React from 'react';
import MainTitleBlock from '../../component/MainTitleBlock';
import MainSunCareProducts from './MainSunCareProducts';
import { motion } from 'framer-motion'; // 스크롤 애니메이션 라이브러리

export default function MainSunCare() {
    return (
        <div className='main-contents-suncare-wrap'>
            <div className='main-contents-suncare-top'>
                <img className='main-contents-suncare-top-img' src="images/main_suncare.jpg" alt="sunblock_img" />
                <div className='main-contents-suncare-info'>
                    <p>Suncare Essentials</p>
                    <p>올바른 스킨케어의 마무리, 선케어</p>
                    <p>
                        <p>피부 본연의 아름다움을 중시한 조선시대의 단장은 화려한 꾸밈이 아닌,</p>
                        <p>단정하고 깨끗하게 가꾸기를 게을리하지 않는 것이었습니다.</p>
                        <p>조선시대 미의 철학을 새기며, 매일 실천해야 할 선케어 3종을 소개합니다.</p>
                        <p>당신의 피부에 꼭 맞는 한방 선케어를 찾아보세요.</p>
                    </p>
                </div>
            </div>
            <div>
                <MainTitleBlock 
                    divClassName="suncare-title"
                    title="Suncare Product"
                />
                <motion.div
                    initial={{ opacity: 0, y: 100}}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        ease: "easeInOut",
                        duration: 2,
                        y: { duration: 2},
                    }}
                >
                    <MainSunCareProducts className="main-contents-suncare" />
                </motion.div>
            </div>
        </div>
    );
}