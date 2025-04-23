import logo from './logo.svg';
import './style/common.css';
import './style/haon.css';
import './style/yuna.css';
import './style/dahee.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './page/Layout.jsx';
import Home from './page/Home.jsx';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import Mypage from './page/Mypage.jsx';
import Products from './page/Products.jsx';
import ProductDetail from './page/ProductDetail.jsx';
import SignupPopup from './page/SignupPopup.jsx';
import RedirectPage from './utils/RedirectPage.js';
import Cart from './page/Cart.jsx';
import Payment from './page/Payment.jsx';
import UserInfoFind from './page/UserInfoFind.jsx';
import { AuthProvider } from './auth/AuthContext.js';
import { MypageProvider } from './context/MypageContext.js';
import { SearchProvider } from './context/SearchContext.js';
import { CartProvider } from './context/cartContext.js';
import { OrderProvider } from './context/orderContext.js';
import { ProductProvider } from './context/productContext.js';
import Search from './page/Search.jsx';
import Admin from './page/Admin.jsx';
import PaymentSuccess from './page/PaymentSuccess.jsx';
import ScrollTop from './component/ScrollTop.jsx';
import BrandStory from './page/BrandStory.jsx';
import SubProducts from './page/SubProducts.jsx';

export default function App() {
  return (    
    <ProductProvider>
    <OrderProvider>
    <CartProvider>
    <AuthProvider>
      <SearchProvider>
      <MypageProvider>
        <BrowserRouter>
        <ScrollTop />
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup/find/:finfo' element={<UserInfoFind />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/mypage' element={<Mypage />} />
              <Route path='/product/list' element={<Products />} />
              <Route path='/product/list/sub' element={<SubProducts />} />
              <Route path='/product/detail/:pid' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/payment/success' element={<PaymentSuccess />} />
              <Route path='/search' element={<Search />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/brand' element={<BrandStory />} />
            </Route>  
            <Route element={< SignupPopup/>}>
              <Route path='/signup/redirect/:provider' element={<RedirectPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MypageProvider>
      </SearchProvider>
    </AuthProvider>
    </CartProvider>
    </OrderProvider>
    </ProductProvider>
  );
}

