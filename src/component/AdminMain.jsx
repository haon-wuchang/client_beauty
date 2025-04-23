import React, { useState, useRef } from 'react';
import axios from 'axios';
import AdminProductUploadMulti from '../component/AdminProductUploadMulti.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MypageContext } from '../context/MypageContext.js';
import { useMypage } from '../hooks/useMypage.js';

export default function AdminMain() {
    const navigate = useNavigate();
    const [fnames, setFnames] = useState({});
    let [formData, setFormData] = useState({});
    const [preview, setPreview] = useState('');
    const productNameRef = useRef(null);
    const productPriceRef = useRef(null);
    const productCategoryRef = useRef(null);
    const productSubCategoryRef = useRef(null);
    const productSaleRef = useRef(null);
    const [previewList, setPreviewList] = useState([]);
    const { getLastPid } = useMypage();


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setFormData({ ...formData, [name]: value });
    }

    const getFileName = (filesNames) => {
        setFnames(filesNames);
        setPreview(`http://15.165.205.38:9000/${filesNames.uploadFileName}`);
        setPreviewList(filesNames.uploadFileName);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productNameRef.current.value === '') {
            alert('상품명을 입력해주세요.');
            productNameRef.current.focus();
            return false;
        } else {
            formData = ({
                ...formData,
                'upload_file': fnames.uploadFileName,
                'source_file': fnames.sourceFileName
            });

            axios.post('http://15.165.205.38:9000/uploads/dbupload', formData)
                .then(res => {
                    if (res.data.result_rows === 1) {
                        alert('상품등록 완료');
                        productNameRef.current.value = '';
                        productPriceRef.current.value = '';
                        productCategoryRef.current.value = '';
                        productSubCategoryRef.current.value = '';
                        productSaleRef.current.value = '';
                        navigate('/admin');
                        getLastPid();
                    } else {
                        alert('상품등록 실패');
                    }
                })
                .catch(error => {
                    alert('상품등록 실패');
                    console.log(error);
                });
        }
    }




    return (
        <div className='admin-flex'>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label>상품명</label>
                        <input type="text" name='productName'
                            onChange={handleChange}
                            ref={productNameRef}
                        />
                    </li>
                    <li>
                        <label>가격</label>
                        <input type="text" name='productPrice'
                            onChange={handleChange}
                            ref={productPriceRef}
                        />
                    </li>
                    <li>
                        <label>카테고리</label>
                        <input type="text" name='category'
                            onChange={handleChange}
                            ref={productCategoryRef}
                        />
                    </li>
                    <li>
                        <label>서브카테고리</label>
                        <input type="text" name='sub_category'
                            onChange={handleChange}
                            ref={productSubCategoryRef}
                        />
                    </li>
                    <li>
                        <label>할인율</label>
                        <input type="text" name='sale'
                            onChange={handleChange}
                            ref={productSaleRef}
                        />
                    </li>
                    <li>
                        <label htmlFor="">이미지 업로드(멀티) </label>
                        <AdminProductUploadMulti getFileName={getFileName} />
                    </li>
                    {previewList && previewList.map((preview) =>
                        <img src={`http://15.165.205.38:9000/${preview}`} alt="미리보기" style={{ 'width': '200px' }} />
                    )}
                    <li>
                        <input type="hidden" name='uploadFile' value={fnames.uploadFileName} />
                        <input type="hidden" name='sourceFile' value={fnames.sourceFileName} />
                    </li>
                    <li>
                        <button type='submit'>상품등록</button>
                        <button type='reset'>취소</button>
                    </li>
                </ul>
            </form>
            <div>
                <table>
                    <tr>
                        <td>카테고리</td>
                        <td>번호</td>
                    </tr>
                    <tr>
                        <td>스킨케어</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>바디케어</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td>라이프스타일</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <td>세트</td>
                        <td>400</td>
                    </tr>
                </table>
            </div>
            <div>
                <table>
                    <tr>
                        <td>서브카테고리</td>
                        <td>번호</td>
                    </tr>
                    <tr>
                        <td>선케어</td>
                        <td>001</td>
                    </tr>
                    <tr>
                        <td>세럼</td>
                        <td>002</td>
                    </tr>
                    <tr>
                        <td>젤 / 크림</td>
                        <td>003</td>
                    </tr>
                    <tr>
                        <td>토너 / 에센스</td>
                        <td>004</td>
                    </tr>
                    <tr>
                        <td>클렌저</td>
                        <td>005</td>
                    </tr>
                    <tr>
                        <td>각질제거</td>
                        <td>006</td>
                    </tr>
                    <tr>
                        <td>마스크팩</td>
                        <td>007</td>
                    </tr>
                    <tr>
                        <td>기타</td>
                        <td>008</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

