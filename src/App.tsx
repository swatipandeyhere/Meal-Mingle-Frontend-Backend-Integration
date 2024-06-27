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
import PaymentSuccess from './components/PaymentSuccess';
import Cart from './components/Cart';
import RestaurantsByCategory from './components/RestaurantsByCategory';
import CategoryMenu from './components/CategoryMenu';
import RestaurantsByFilter from './components/RestaurantsByFilter';

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
        <Route path='/order' element={<Order />} />
        <Route path='/payment' element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/category/:categoryName" element={<RestaurantsByCategory />} />
        <Route path="/category/:categoryName/menu" element={<CategoryMenu />} />
        <Route path="/restaurants/filter" element={<RestaurantsByFilter />} />
      </Routes>
    </CartProvider>
  );
};

export default App;