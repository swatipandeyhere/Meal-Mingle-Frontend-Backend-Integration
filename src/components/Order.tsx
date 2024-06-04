import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const item = state?.item;
    const restaurant = state?.restaurant;

    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Order placed:', {
            item,
            restaurant,
            quantity,
        });
        navigate('/payment', { state: { item, restaurant, quantity } });
    };

    return (
        <>
            <Navbar city={restaurant?.restaurantAddress.city} />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Order {item?.restaurantItemName}</h1>
                <div className='max-w-xs rounded-xl overflow-hidden shadow-sm mt-12'>
                    <img className='w-full rounded-2xl h-60 object-cover' src={item && require(`../images/${item.restaurantItemImageUrl}`)} alt={item?.restaurantItemName} />
                    <div className='py-4'>
                        <div className='font-semibold text-xl mb-2'>{item?.restaurantItemName}</div>
                        <p className='font-semibold text-base p-1'>₹{item?.restaurantItemPrice}</p>
                    </div>
                </div>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <label className='block mb-2'>
                        Quantity:
                        <input type='number' name='quantity' className='ml-2 border rounded px-2 py-1' min='1' value={quantity} onChange={handleQuantityChange} />
                    </label>
                    <button type='submit' className='mt-2 px-4 py-2 bg-green-500 text-white rounded'>Place Order</button>
                </form>
            </div>
        </>
    );
};

export default Order;