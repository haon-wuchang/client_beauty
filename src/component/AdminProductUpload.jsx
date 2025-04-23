import React from 'react';
import Form from 'react-bootstrap/Form'; 
import axios from 'axios'; 
import { useState } from 'react';

export default function AdminProductUpload({getFileName}) {
    const formData = new FormData(); 											   
    const [oldFile,setOldFile] = useState('');

    const handleFileUpload = (e) => {
        formData.append('file',e.target.files[0]); 
        formData.append('oldFile',oldFile); 
        
        axios.post('http://15.165.205.38:9000/uploads',formData,{
            headers :{ 'Content-Type':'multipart/form-data'},             
            })
            .then(res => {console.log('이미지서버전송결과',res.data)
                getFileName(res.data); 
                setOldFile(res.data.oldFile); 
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Form.Control 
                type='file' onChange={(e)=>{handleFileUpload(e)}}>
            </Form.Control>
                       
        </div>
    );
}
