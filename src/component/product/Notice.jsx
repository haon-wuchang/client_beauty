import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function NoticeSection({ isToggled, clickDetailToggle }) {
  return (
    <ul className='product-detail-notice'>
      {["Payment", "Delivery", "Refund & Exchange"].map((title, i) => (
        <li key={i}>
          <div className='product-detail-notice-item'>
            <span>{title}</span>
            <span className='info-toggle-icon' onClick={() => clickDetailToggle(i)}>
              {isToggled[i] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          <div className={isToggled[i] ? 'toggle-show' : 'toggle-hide'}>
            {title === 'Payment' && (
              <>
                <p>고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.</p><br />
                <p>무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다. 주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.</p>
              </>
            )}
            {title === 'Delivery' && (
              <p>
                배송 방법 : 택배 <br />
                배송 지역 : 전국지역 <br />
                배송 비용 : 3,000원 <br />
                배송 기간 : 3일 ~ 7일 <br />
                배송 안내 : 고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
              </p>
            )}
            {title === 'Refund & Exchange' && (
              <div className='refundDes'>
                <p><span> 교환 및 반품 주소</span><br /><span>xx시 xx구 10층 (주)팀플팀플 (102호) 우편번호 : 12345</span></p>
                <p><span>반품</span><br /><span>상품 수령 후 7일 이내에 반품 요청이 가능합니다. 수령 후 7일이 지나면 환불이나 교환이 불가능합니다. 미개봉 상품에 한하여 가능하며, 상품은 받아보셨던 상태와 동일하게 패킹되어야 합니다. 반송시 반품 지정된 창고로 보내야 하며, 반품비는 고객 부담으로 왕복 배송비 5,000원이 부담됩니다.</span></p>
                <p><span>제품 파손 또는 오배송</span><br /><span>배송된 상품이 파손되었거나 주문하신 상품과 다른 경우 고객 서비스팀(2eo2yeo@gmail.com)로 이메일을 보내주시면 최대한 빠른 시일 내에 처리하여 드리겠습니다. 반품 및 교환비는 조선미녀에서 부담합니다. 상품의 파손이나 오배송된 사실을 확인하기 위해 사진을 요청할 수 있으니 참고 부탁드립니다.</span></p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
