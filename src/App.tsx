import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import EmailLogin from './components/EmailLogin';
import Main from './components/Main';
import Menu from './components/Menu';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import Cart from './components/Cart';
import RestaurantsByCategory from './components/RestaurantsByCategory';
import RestaurantsByCategoryMenu from './components/RestaurantsByCategoryMenu';
import RestaurantsByFilter from './components/RestaurantsByFilter';
import MyOrders from './components/MyOrders';
import PartnerWithUs from './components/PartnerWithUs';
import AdminSignup from './components/AdminSignup';
import AdminLogin from './components/AdminLogin';

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/emailLogin' element={<EmailLogin />} />
        <Route path='/main' element={<Main />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/category/:categoryName" element={<RestaurantsByCategory />} />
        <Route path="/category/:categoryName/menu" element={<RestaurantsByCategoryMenu />} />
        <Route path="/restaurants/filter" element={<RestaurantsByFilter />} />
        <Route path="/order-history" element={<MyOrders />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path='/admin/signup' element={<AdminSignup />} />
        <Route path='/admin/login' element={<AdminLogin />} />
      </Routes>
    </CartProvider>
  );
};

export default App;