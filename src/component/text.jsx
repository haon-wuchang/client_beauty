import React from 'react';

export default function Text() {
    return (
        <div className='mypage-delivery-all'>
                <div className='mypage-update-info-title mypage-title'>배송지 관리</div>
                <div className='mypage-delivery-table'>
                    <table>
                        <tr>
                            <td></td>
                            <td>수령인</td>
                            <td>휴대전화</td>
                            <td>주소</td>                               
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>김민지</td>
                            <td>010-5555-5555</td>
                            <td>
                                <span>우편번호 </span>
                                <span>주소 </span>
                                <span>상세주소</span>
                            </td>
                        </tr>
                    </table>
                    <div className='mypage-delivery-btns'>
                        <button>기본배송지 지정</button>
                        <button>배송지 추가</button>
                    </div>
                </div>
                <div className='mypage-delivery-desc'>
                    <div>배송주소록 유의사항</div>
                    <ul>
                        <li>배송 주소록은 최대 3개까지 등록할 수 있으며, 별도로 등록하지 않을 경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.</li>
                        <li>자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된 주소록은 업데이트 대상에서 제외됩니다.</li>
                        <li>기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로 설정하시면 기본 배송지가 변경됩니다.</li>
                    </ul>
                </div>
            </div> 
    );
}

