import React from 'react'
import { Route, Routes } from 'react-router-dom';
import "./scss/main.scss";
import Nav from './components/nav/Nav';
import ProductDetailContainer from './components/productDetail/ProductDetailContainer';
import CartContainer from './components/cart/CartContainer';
import Login from './components/login/Login'
import CreateUserForm from './components/login/CreateUserForm';
import { ToastContainer } from 'react-toastify';
import MainContentContainer from './components/mainContent/MainContentContainer';
import 'react-toastify/dist/ReactToastify.css';
import Address from './components/cart/addressForm/Address';
import Checkout from './components/cart/checkout/Checkout';
import OrderDetailContainer from './components/order/OrderDetailContainer';
import AllOrdersContainer from './components/order/AllOrdersContainer';
import EditNameProfile from './components/login/EditNameProfile';
import EditDirecProfile from './components/login/EditDirecProfile';
// import CategoriesNew from './components/nav/categories/CategoriesNew.jsx';
  // const [ViewCategories, setViewCategories] = useState(true);
import ReviewsFormContainer from './components/reviews/ReviewsFormContainer';
import UserProfile from './components/login/UserProfile';
import Faqs from './components/faq/Faqs';
import { ChangePassword } from './components/login/ChangePassword';
import { RememberPassword } from './components/login/RememberPassword';
import WishListContainer from './components/wishlist/WishListContainer';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path='/' element={<> <MainContentContainer /></>} />
        <Route exact path='/cart' element={<> <CartContainer /></>} />
        <Route exact path='/productDetail/:id' element={<><ProductDetailContainer /> </>} />
        <Route exact path='/address' element={<> <Address /> </>} />
        <Route exact path='/checkout' element={<><Checkout /> </>} />
        <Route exact path='/login' element={<><Login />  </>} />
        <Route exact path='/logInForm' element={<> <CreateUserForm /></>} />
        <Route exact path='/order/:id' element={<OrderDetailContainer />} />
        <Route exact path='/orders/all' element={<AllOrdersContainer />} />
        <Route exact path='/review/:orderId/:productId/:userId' element={<> <ReviewsFormContainer /></>} />
        <Route exact path='/profile' element={<> <UserProfile /> </>} />
        <Route exact path="/profile/editName/:userId" element= {<> <EditNameProfile/> </>} />
        <Route exact path="/profile/editDirec/:direcId" element= {<> <EditDirecProfile/> </>} />
        <Route exact path='/order/:id' element={<> <OrderDetailContainer /></>} />
        <Route exact path='/orders/all' element={<> <AllOrdersContainer /></>} />
        <Route exact path='/faqs' element={<> <Faqs /></>} />
        <Route exact path='/wishList' element={<> <WishListContainer /></>} />
        <Route path='/reset/:userId/:hash/:userEmail' element={<ChangePassword />} />
        <Route path='/rememberPass' element={<RememberPassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        theme='colored'
      />
    </>
  );
}

export default App;
