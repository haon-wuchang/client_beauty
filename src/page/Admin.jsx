import React, { useState} from 'react';
import AdminDesc from '../component/AdminDesc.jsx';
import AdminMain from '../component/AdminMain.jsx';

export default function Admin() {
    const [tab, setTab] = useState('main');

    return (
        <div className='admin-all'>
            <div className='admin-tab'>
                <h1 onClick={() => { setTab('main') }} 
                className={tab === 'main' ? 'admin-title' : 'admin-none'}>메인, 슬라이드 상품등록</h1>
                <h1 onClick={() => { setTab('desc')}}
                    className={tab === 'desc' ? 'admin-title' : 'admin-none'}>상세설명 상품등록</h1>
            </div>
            { tab === 'main' && <AdminMain /> }
            { tab === 'desc' && <AdminDesc /> }
            
        </div>
    );
}