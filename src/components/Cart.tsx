import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useCart, CartItem } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    const handleRemove = (itemId: string) => {
        removeFromCart(itemId);
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity > 0) {
            updateQuantity(itemId, newQuantity);
        }
    };

    const totalPrice = cart.reduce((total, item) => total + (item.restaurantItemPrice * item.quantity), 0);

    return (
        <>
            <Navbar city="Your Cart" />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        <div className='grid grid-cols-3 gap-4'>
                            {cart.map((item: CartItem) => (
                                <div key={item.restaurantItemId} className='max-w-xs rounded-xl overflow-hidden shadow-sm'>
                                    <img className='w-full rounded-2xl h-60 object-cover' src={require(`../images/${item.restaurantItemImageUrl}`)} alt={item.restaurantItemName} />
                                    <div className='py-4'>
                                        <div className='font-semibold text-xl mb-2'>{item.restaurantItemName}</div>
                                        <p className='font-semibold text-base p-1'>₹{item.restaurantItemPrice}</p>
                                        <div className='flex items-center'>
                                            <span className='mr-2'>Qty:</span>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                className='mr-2 px-4 py-2 border border-gray-300 rounded'
                                            >
                                                {[...Array(10)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => handleRemove(item.id)} className='ml-2 px-4 py-2 bg-red-500 text-white rounded'>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-4'>
                            <p className='font-semibold'>Total Price: ₹{totalPrice}</p>
                            <button onClick={clearCart} className='mr-4 px-4 py-2 bg-red-500 text-white rounded'>Clear Cart</button>
                            <Link to='/payment'>
                                <button className='px-4 py-2 bg-green-500 text-white rounded'>Proceed to Payment</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;