import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch}  from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user';

export default function KaKao(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    useEffect(async() => {
        await dispatch(userActions.kakaoLogin(code))
        },[]);
       

    return ( 
        <h1>로그인중</h1>
    )
 
};


