import React, { useEffect, useState } from 'react';
import MainTitleBlock from '../../component/MainTitleBlock';
import MainProductBlock from './MainProductBlock.jsx';
import axios from 'axios';
import { motion } from 'framer-motion'; 

export default function MainBestProducts() {
    const [bestList, setBestList] = useState([]);

    useEffect(() => {
        axios.post("http://15.165.205.38:9000/main/bestItem")
                    .then(res => setBestList(res.data))
                    .catch(err => console.log(err));
    }, []);

    return (
        <div className='main-contents-best'>
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
                <MainTitleBlock
                    divClassName="main-contents-best-top"
                    title="Best Product"
                    des="조선미녀의 베스트상품을 만나보세요"
                />
                <div className='main-contents-best-products'>
                    <MainProductBlock
                        bestList={bestList}
                        className="main-contents-best-products" 
                    />
                </div>
            </motion.div>
        </div>
    );
}