import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const item = state?.item;
    const restaurant = state?.restaurant;
    const quantity = state?.quantity;

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
        // Get last two digits of Current Year
        const currentYear = new Date().getFullYear() % 100;
        // getMonth returns 0-Indexed Month
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

        setTimeout(() => {
            navigate('/payment-successful');
        }, 2000);
    };

    return (
        <>
            <Navbar city={restaurant?.restaurantAddress.city} />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Payment Details</h1>
                <div className='max-w-xs rounded-xl overflow-hidden shadow-sm mt-12'>
                    <img className='w-full rounded-2xl h-60 object-cover' src={item && require(`../images/${item.restaurantItemImageUrl}`)} alt={item?.restaurantItemName} />
                    <div className='py-4'>
                        <div className='font-semibold text-xl mb-2'>{item?.restaurantItemName}</div>
                        <p className='font-semibold text-base p-1'>Quantity: {quantity}</p>
                        <p className='font-semibold text-base p-1'>Total Price: ₹{item?.restaurantItemPrice * quantity}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <label>
                        Card Number:
                        <input type='text' name='cardNumber' value={paymentDetails.cardNumber} onChange={handleInputChange} />
                    </label>
                    <label>
                        Expiry Date:
                        <input type='text' name='expiryDate' value={paymentDetails.expiryDate} onChange={handleInputChange} placeholder="MM/YY" />
                    </label>
                    <label>
                        CVV:
                        <input type='text' name='cvv' value={paymentDetails.cvv} onChange={handleInputChange} />
                    </label>
                    <button type='submit' className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>Pay Now</button>
                </form>
            </div>
        </>
    );
};

export default Payment;