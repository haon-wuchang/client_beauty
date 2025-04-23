import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { OrderContext } from '../../context/orderContext.js';
import Modal from 'react-modal';
import PaymentDestinationModify from './PaymentDestinationModify.jsx';

export default function PaymentDestination() {
    const { member } = useContext(OrderContext);
    const [isOpen, setIsOpen] = useState(true); // 섹션 탭 화살표 클릭 이벤트 관리
    const [modalOpen, setModalOpen] = useState(false); // 배송지 수정 모달창 관리

    /* 섹션 화살표 클릭 이벤트 */
    const clickArrow = () => {
        setIsOpen(!isOpen);
    }

    /* 배송지 변경 모달 스타일 */
    const customModalStyles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "500px",
            height: "500px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            justifyContent: "center",
            overflow: "auto",
            padding: "0",
        },
    };

    return (
        <div className='payment-destination-block'>
            <div className='payment-block-title'>
                <span>배송지</span>
                <span onClick={clickArrow}>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>
            <div style={{ display: isOpen ? "block" : "none" }}>
                <div className='payment-destination-info'>
                    <ul className='payment-destination-detail'>
                        <li>
                            <div>
                                <span>[기본]</span>
                                <span>{member.name}</span>
                            </div>
                            <button onClick={() => setModalOpen(!modalOpen)}>배송지 수정</button>
                            <Modal
                                isOpen={modalOpen}
                                onRequestClose={() => setModalOpen(false)}
                                style={customModalStyles}
                                ariaHideApp={false}
                                contentLabel="Search Modal"
                            >
                                <PaymentDestinationModify setModalOpen={setModalOpen} />
                            </Modal>
                        </li>
                        <li>[{member.zipcode}] {member.address} {member.extra_address}</li>
                        <li>{member.phone}</li>
                        <li>{member.email}</li>
                    </ul>
                    <div className='paymnet-destination-plus'>
                        <div>
                            <input type="checkbox" /><span>기본 배송지로 저장</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}