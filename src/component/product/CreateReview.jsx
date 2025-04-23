/**************************************************************
    리뷰 작성 컴포넌트
    작성자 : 정서령 
********************************************************************/
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MdAddAPhoto } from "react-icons/md";
import { Form } from 'react-bootstrap';
import axios from 'axios';

export default function CreateReview({ closeModal }) {
    /* 해당 컴포넌트 상태 관리 외 */
    const { pid } = useParams();
    const [uploadFileName, setUploadFileName] = useState([]); // 서버 저장용
    const [orgFileName, setOrgFileName] = useState([]);       // 원본 이름
    const [oldFile, setOldFile] = useState([]);
    const [previewList, setPreviewList] = useState([]); // preview 이미지
    const [formData, setFormData] = useState({})
    /* ref */
    const reviewSubjectRef = useRef(null); // 리뷰 제목
    const reviewContentRef = useRef(null); // 리뷰 내용
    const fileInputRef = useRef(null); // 리뷰 사진 업로드

    /* 리뷰 사진 업로드 이벤트 */
    const handleIconClick = () => {
        fileInputRef.current.click();
    };
    const handlePhotosUpload = (e) => {
        const formData = new FormData();
        const files = e.target.files;

        for (const file of files) formData.append("files", file);
        formData.append("oldFile", oldFile)        
        axios
            .post(`http://15.165.205.38:9000/product/reviewPhotos?maxFiles=${files.length}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(res => {
                setUploadFileName(res.data.uploadFileName);
                setOrgFileName(res.data.sourceFileName);
                setPreviewList(res.data.uploadFileName);
            })
            .catch(error => console.log(error));
    }
    // 폼 입력시 값을 formData로 추가
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value })
    }

    // 등록 이벤트 처리
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {};
        if (reviewSubjectRef.current.value === "") {
            alert('리뷰 제목을 입력해주세요');
            reviewSubjectRef.current.focus();
            return false;
        } else if (reviewContentRef.current.value === "") {
            alert('리뷰 내용을 입력해주세요');
            reviewContentRef.current.focus();
            return false;
        } else {
            const id = localStorage.getItem('user_id');
            data = {
                id,
                pid,
                reviewSubject: reviewSubjectRef.current.value,
                reviewContent: reviewContentRef.current.value,
                orgFileName,
                uploadFileName,
            };        
            axios
                .post('http://15.165.205.38:9000/product/review', data)
                .then(res => {
                    if (res.data.result_rows === 1) {
                        alert('리뷰가 등록되었습니다.');
                        closeModal();
                        window.location.reload(); // 닫히면서 새로고침
                    } else {
                        alert('리뷰 등록 실패');
                    }
                })
                .catch(error => {
                    alert('리뷰 등록 실패');
                    console.log(error);
                });
        };

    }
    /* 스타일 혼용 우려가 있어서 이 페이지에서 적용함!! */

    // 해당 폼 전체 설정
    const rvWrap = {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        margin: '15px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        justifyContent: 'center'
    };
    // 해당 폼 타이틀
    const title = {
        width: '90%',
        textAlign: 'left',
        fontSize: '20px',
        fontWeight: 'bold',
        marginLeft: '-3%'
    }
    // 리뷰 제목 작성
    const rvSubjectinput = {
        width: '90%',
        height: 'auto',
        border: '1px solid #e5e5e5',
        borderRadius: '5px',
        padding: '10px'
    }
    // 리뷰 내용 작성 
    const rvContentInput = {
        width: '90%',
        height: '300px',
        border: '1px solid #e5e5e5',
        borderRadius: '5px',
        resize: 'vertical',
        padding: '10px',
    }
    // 리뷰 사진 추가
    const addPhoto = {
        fontSize: '40px',
        cursor: 'pointer'
    }
    const prevWrap = {
        display : 'flex',
        gap : '20px',
        width: '90%',
        textAlign: 'left',
        marginLeft : '-3%'
    }
    const prevImg = {
        width: '70px', 
        height: '70px',
        objectFit: 'cover', 
        marginRight: '10px',
        borderRadius: '5px',
    }
    // 리뷰 관련 버튼
    const rvBtnWrap = {
        width: '90%',
        height: 'auto',
        display: 'flex',
        gap: '10px'
    }
    const rvBtn = {
        backgroundColor: '#e5e5e5',
        border: '0',
        borderRadius: '5px',
        padding: '10px',
        fontSize: '16px',
        width: '50%',
        width: '50%',
    }

    return (
        <form onSubmit={handleSubmit}>
                <div style={rvWrap}>
                <span style={title}>리뷰 작성</span>
                <input type="text" name='reviewSubject' style={rvSubjectinput} placeholder='제목을 작성해주세요.' ref={reviewSubjectRef} onChange={handleChange} />

                <textarea type="text" name='reviewContent' style={rvContentInput} placeholder='리뷰 내용을 1,000자 이내로 작성해주세요.'
                ref={reviewContentRef}
                onChange={handleChange} 
                />
                  <div style={prevWrap}>
                <MdAddAPhoto style={addPhoto} onClick={handleIconClick} /> 
                <Form.Control
                    type="file"
                    multiple
                    onChange={handlePhotosUpload}
                    ref={fileInputRef}
                    style={{ display: 'none'}}
                />
                <div>
                        {previewList && previewList.map((fileName, idx) => (
                            <img key={idx}
                                src={`http://15.165.205.38:9000/upload_review_photos/${fileName}`
                                }
                            style={prevImg}
                            />
                        ))}
                    </div>

                </div>
                <div style={rvBtnWrap}>
                  
                    <button style={rvBtn} type='reset' onClick={closeModal}>취소하기</button>
                    <button style={rvBtn} type='submit'>리뷰등록</button>

                </div>
        </div>
            </form>

    );

}