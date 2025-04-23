import React from 'react';

export default function OtherPay({className}) {
    return (
        <ul className={className}>
            <li className={`${className}-naver`}>
                    <span className='naver-text'></span>
                    <span className='naver-img'></span>
                <div>
                    <button className='w-btn2'>찜</button>
                </div>
            </li>
            <li className={`${className}-kakao`}>
                <div className='kakao-text'>
                    <p className='f13'>kakao</p>
                    <p className='f12'>톡체크아웃</p>
                </div>
                    <span className='kakao-img'></span>
                <div>
                    <button className='w-btn2'>찜</button>
                </div>
            </li>
        </ul>
    );
}