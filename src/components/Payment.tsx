import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CartItem } from '../context/CartContext';

interface Restaurant {
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: {
        streetNumber: string;
        streetName: string;
        city: string;
        country: string;
    };
    restaurantRating: number;
    restaurantMinimumOrderAmount: number;
    restaurantDiscountPercentage: number;
    restaurantOfferPhrase: string;
    restaurantAvailability: boolean;
    restaurantImageUrl: string;
    restaurantOperationDays: string;
    restaurantOperationHours: string;
    restaurantPhoneNumber: number;
    restaurantItems: {
        restaurantItemId: string;
        restaurantItemName: string;
        restaurantItemPrice: number;
        restaurantItemCategory: string;
        restaurantItemImageUrl: string;
        restaurantItemCuisineType: string;
        restaurantItemVeg: boolean;
    }[];
}

interface PaymentState {
    items: CartItem[];
    restaurant: Restaurant;
    totalPrice: number;
    discountedPrice: number;
    discountAmount: number;
}

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { items, restaurant, totalPrice, discountedPrice, discountAmount } = state as PaymentState;

    const finalPrice = discountAmount > 0 ? discountedPrice : totalPrice;

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!paymentDetails.cardNumber.trim() || !paymentDetails.expiryDate.trim() || !paymentDetails.cvv.trim()) {
            alert('Please fill in all payment details.');
            return;
        }

        if (paymentDetails.cardNumber.length !== 16 || !/^\d+$/.test(paymentDetails.cardNumber)) {
            alert('Invalid card number. Please enter a 16-digit numeric card number.');
            return;
        }

        if (paymentDetails.expiryDate.length !== 5 || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
            alert('Invalid expiry date. Please enter a valid date in the format MM/YY.');
            return;
        }

        const [month, year] = paymentDetails.expiryDate.split('/');
        const monthNumber = parseInt(month);
        const yearNumber = parseInt(year);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (monthNumber < 1 || monthNumber > 12) {
            alert('Invalid expiry date. Month should be between 01 and 12.');
            return;
        }

        if (yearNumber < currentYear || (yearNumber === currentYear && monthNumber < currentMonth)) {
            alert('Expired card. Please enter a valid expiry date.');
            return;
        }

        if (paymentDetails.cvv.length !== 3 || !/^\d+$/.test(paymentDetails.cvv)) {
            alert('Invalid CVV. Please enter a 3-digit numeric CVV.');
            return;
        }

        const order = {
            id: Date.now().toString(),
            items,
            totalAmount: finalPrice,
            orderDate: new Date().toLocaleString()
        };

        const savedOrders = localStorage.getItem('orders');
        const orders = savedOrders ? JSON.parse(savedOrders) : [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        setTimeout(() => {
            navigate('/payment-success');
        }, 2000);
    };

    return (
        <>
            <Navbar city={restaurant?.restaurantAddress.city} />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Payment Details</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {items.map((item, index) => (
                        <div key={index} className='max-w-xs rounded-xl overflow-hidden shadow-sm'>
                            <img className='w-full rounded-2xl h-60 object-cover' src={require(`../images/${item.restaurantItemImageUrl}`)} alt={item.restaurantItemName} />
                            <div className='py-4'>
                                <div className='flex justify-between'>
                                    <div className='font-semibold text-xl mb-2'>{item.restaurantItemName}</div>
                                    <p className='font-semibold text-base p-1'>₹{item.restaurantItemPrice}</p>
                                </div>
                                <div className='mt-2 flex justify-between'>
                                    <p className='font-semibold text-base'>Quantity: {item.quantity}</p>
                                    <p className='font-semibold text-base'>Total Price: ₹{item.restaurantItemPrice * item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='font-semibold text-base p-1 mt-4'>
                    Final Price: ₹{finalPrice}
                </div>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <label className='block mb-2 mr-10'>
                        Card Number:
                        <input type='text' name='cardNumber' value={paymentDetails.cardNumber} onChange={handleInputChange} className='w-full mt-1 p-2 border border-gray-300 rounded' />
                    </label>
                    <label className='block mb-2 mr-10'>
                        Expiry Date:
                        <input type='text' name='expiryDate' value={paymentDetails.expiryDate} onChange={handleInputChange} placeholder="MM/YY" className='w-full mt-1 p-2 border border-gray-300 rounded' />
                    </label>
                    <label className='block mb-4 mr-10'>
                        CVV:
                        <input type='text' name='cvv' value={paymentDetails.cvv} onChange={handleInputChange} className='w-full mt-1 p-2 border border-gray-300 rounded' />
                    </label>
                    <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>Pay Now</button>
                </form>
            </div>
        </>
    );
};

export default Payment;