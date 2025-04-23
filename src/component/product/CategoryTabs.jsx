import React from 'react';

export default function CategoryTabs({ selectedCategory, handleCategoryClick }) {
    const categories = [
        { id: 'all', label: '전 제품' },
        { id: 100, label: '스킨케어' },
        { id: 200, label: '바디케어' },
        { id: 300, label: '라이프스타일' },
        { id: 400, label: '세트' },
    ];

    return (
        <ul className='flex list-none w500'>
            {categories.map(({ id, label }) => (
                <li
                    key={id}
                    onClick={() => handleCategoryClick(id)}
                    className={selectedCategory === id ? 'active' : ''}
                >
                    {label}
                </li>
            ))}
        </ul>
    );
}
