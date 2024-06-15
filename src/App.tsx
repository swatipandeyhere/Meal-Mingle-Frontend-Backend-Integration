import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import EmailLogin from './components/EmailLogin';
import Main from './components/Main';
import Menu from './components/Menu';
import Order from './components/Order';
import Payment from './components/Payment';
import PaymentSuccessful from './components/PaymentSuccessful';
import Cart from './components/Cart';
import { AuthProvider } from './context/authContext';
import RestaurantsByCategory from './components/RestaurantsByCategory';
import CategoryMenu from './components/CategoryMenu';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/emailLogin' element={<EmailLogin />} />
          <Route path='/main' element={<Main />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/payment' element={<Payment />} />
          <Route path="/payment-successful" element={<PaymentSuccessful />} />
          <Route path="/category/:categoryName" element={<RestaurantsByCategory />} />
          <Route path="/category-menu/:restaurantId" element={<CategoryMenu />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;