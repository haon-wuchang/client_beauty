import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext.js";
import { CartContext } from "../context/cartContext.js";
import { ProductContext } from "../context/productContext.js";
import { useCart } from "../hooks/useCart.js"
import { useProduct } from "../hooks/useProduct.js"
import { FiPlus, FiMinus } from "react-icons/fi";
import axios from 'axios';
import '../style/product.scss';
import ProductSlider from '../component/product/ProductSlider.jsx'; // slick슬라이더
import DetailImages from '../component/product/DetailImages.jsx'; // 상세이미지 map
import Review from '../component/product/Review.jsx'; // 리뷰
import OtherPay from '../component/product/OtherPay.jsx'; // 카카오페이 등 출력화면
import Notice from '../component/product/Notice.jsx' // 주문관련 공지사항

export default function ProductDetail() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const handleDeleteReview = (pid) => {
    const id = localStorage.getItem("user_id");
  
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
  
    axios.post("http://15.165.205.38:9000/review/delete", {
      pid,
      id
    }).then(res => {
      alert("리뷰가 삭제되었습니다.");
      getReview(pid); // 리뷰 다시 불러오기
    });
  };
  

  const { isLoggedIn } = useContext(AuthContext);
  const { pid } = useParams();
  const { cartList } = useContext(CartContext);
  const {  reviews } = useContext(ProductContext);
  const { updateCartList, saveToCartList } = useCart();
  const { addWishList, getReview } = useProduct();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [slideImgList, setSlideImgList] = useState([]);
  const [detailImgList, setDetailImgList] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isToggled, setIsToggled] = useState([false, false, false]);
  const [showReview, setShowReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '600px',
      overflow: 'auto',
      padding: '20px',
      background: '#fff',
      borderRadius: '10px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 10
    },
  };

  useEffect(() => {
    axios.post("http://15.165.205.38:9000/product/detail", { pid })
      .then((res) => {
        const data = res.data;
        setProduct(data);
        setSlideImgList(data.SlideImgList);
        setDetailImgList(data.descImgList);
        

        let price = data.price;
        if (data.discount_rate) {
          price -= Math.floor((price * data.discount_rate) / 100);
        }

        if (data.price) {
          setDiscountedPrice(price);
          setTotalPrice(price);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getReview(pid);
  }, [pid]);

  const addHeart = () => {
    if (!isLoggedIn) {
      alert('로그인 후 사용가능 한 서비스 입니다')
      navigate('/login')
      return;
    }
    alert('위시리스트에 추가되었습니다.')
    addWishList(product.pid);
  };

  const addCartItem = () => {
    if (isLoggedIn) {
      const cartItem = { pid: product.pid, qty };
      const findItem = cartList && cartList.find(item => item.pid === product.pid);

      if (findItem) {
        const result = updateCartList(findItem.cid, "increase", qty);
        result && alert("장바구니에 추가되었습니다.")
      } else {
        const id = localStorage.getItem("user_id");
        const formData = { id, cartList: [cartItem] };
        const result = saveToCartList(formData);
        result && alert("장바구니에 추가되었습니다.")
      }
    } else {
      if (window.confirm("로그인 서비스가 필요합니다. \n로그인 하시겠습니까?")) {
        navigate('/login');
      }
    }
  };

  const handleQtyChange = (type) => {
    if (!product.price) return;
    const updatedQty = type === "increase" ? qty + 1 : qty - 1;
    if (updatedQty < 1) return;
    setQty(updatedQty);
    setTotalPrice(updatedQty * discountedPrice);
  };

  const clickDetailToggle = (i) => {
    setIsToggled(prev => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };

  return (
    <div className='p-common'>
      <ProductSlider images={slideImgList} settings={settings} />

      <div className='product-detail-contents'>
        {/* 왼쪽 - 상세이미지, 리뷰 */}
        <div className='product-detail-left'>
          <DetailImages images={detailImgList} />
          <Review
            pid={product.pid}
            reviews={reviews}
            showReview={showReview}
            setShowReview={setShowReview}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalStyle={modalStyle}
          />
        </div>

        {/* 오른쪽 - 이미지 외 상품 상세 정보, notice */}
        <div className='product-detail-right'>
          <div className='product-detail-info'>
            <p className='f22 w600'>{product.pname}</p>
            <div className='product-detail-price'>
              {product.discount_rate ? (
                <>
                  <p className='product-detail-price-cancle'>{product.price?.toLocaleString()}원</p>
                  <div className='order-price'>
                    <div className='dc'>{`${product.discount_rate.toLocaleString()}%`}</div>
                    <div>{`${(product.price - Math.floor(product.price * (product.discount_rate / 100))).toLocaleString()}원`}</div>
                  </div>
                </>
              ) : (
                <p className='product-detail-price-origin'>{product.price?.toLocaleString()}원</p>
              )}
            </div>

            <ul className='product-detail-delivery'>
              <li><p>배송방법</p><p>택배</p></li>
              <li><p>배송비</p><p>3,000원 (20,000원 이상 구매 시 무료)</p></li>
            </ul>
          </div>

          <div className='product-detail-qty'>
            <p className='product-detail-qty-name'>{product.pname}</p>
            <div className='product-detail-qty-box'>
              <div>
                <button className='decrease' onClick={() => handleQtyChange("decrease")}><FiMinus /></button>
                <span>{qty}</span>
                <button className='increase' onClick={() => handleQtyChange("increase")}><FiPlus /></button>
              </div>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          <div className='product-detail-total-price space-between'>
            <p>Total</p>
            <p>{totalPrice.toLocaleString()}원</p>
          </div>

          <div className='btn-wrap'>
            <button className='w-btn' onClick={addHeart}>Wish</button>
            <button className='b-btn' onClick={addCartItem}>Add to Cart</button>
          </div>

          {/* <OtherPay className='product-detail-payments' /> */}
          <Notice isToggled={isToggled} clickDetailToggle={clickDetailToggle} />

          <ul className='product-detail-bottom-notice'>
            <li>최소주문수량 1개 이상</li>
            <li>수량을 선택해주세요.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
