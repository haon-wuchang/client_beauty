import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ProductContext } from '../../context/productContext.js';
import { useProduct } from '../../hooks/useProduct.js';

export default function MainCategory() {
    const navigate = useNavigate();
    const { selectedCategory, setSelectedCategory } = useContext(ProductContext);
    const { getCategoryItems } = useProduct();
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get("data/main.json")
            .then(res => setCategoryList(res.data.mainCategory))
            .catch(err => console.log(err));
    }, []);

    const clickCategory = (id) => {
        console.log("확인 --> ", id);
        getCategoryItems(id);
        navigate("/product/list");
    }

    return (
        <div className='main-contents-category-wrap'>
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
                <div className='main-contents-category-top'>
                    <p className='main-contents-category-title'>MODERN HANBANG</p>
                    <p className='main-contents-category-des'>
                        <p>조선시대의 단장은 화려한 꾸밈보다 단정하게 가꾸기를 게을리하지 않는 것이었습니다.</p>
                        <p>조선미녀는 옛사람들의 지혜를 따라 시간이 흘러도 변치 않는 아름다움과 그 안에 담긴 자연의 전통비법을 현대적으로 풀어냅니다.</p>
                    </p>
                    <button>Brand story</button>
                </div>
            </motion.div>
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
                <div className='main-contents-category-container'>
                    <p>Treat Your Skin Concern with Hanbang + Modern Ingredients</p>
                    <ul className='main-contents-category-list'>
                        {
                            categoryList && categoryList.map((list) => 
                                <li onClick={() => clickCategory(list.id)}>
                                    <img src={list.img} alt="" />
                                    <p>{list.title}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}