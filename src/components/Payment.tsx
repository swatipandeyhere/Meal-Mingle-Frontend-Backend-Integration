import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CartItem, useCart } from '../context/CartContext';

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

interface ShippingAddress {
    pincode: string;
    streetName: string;
    city: string;
    country: string;
}

interface PaymentState {
    items: CartItem[];
    restaurantId: Restaurant;
    totalPrice: number;
    restaurantName: string;
    shippingAddress: ShippingAddress;
}

type OrderItem = {
    orderItemName: string;
    orderItemQuantity: number;
    orderItemPrice: number;
}

const Payment = () => {
    const navigate = useNavigate();
    const { cart, placeOrder } = useCart();
    const [orders, setOrders] = useState<any[]>([]);
    const [paymentState, setPaymentState] = useState<PaymentState | null>(null);

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        pincode: '',
        streetName: '',
        city: '',
        country: 'India'
    });

    useEffect(() => {
        const storedPaymentState = localStorage.getItem('paymentState');
        if (storedPaymentState) {
            setPaymentState(JSON.parse(storedPaymentState));
        }
    }, [navigate]);

    if (!paymentState) {
        return <div>Loading...</div>;
    }

    const { items, restaurantId, totalPrice, restaurantName, shippingAddress } = paymentState;

    const payNow = async () => {
        window.location.href = 'http://localhost:8089';

        const token = localStorage.getItem('token');

        const orderItems: OrderItem[] = [];

        items.forEach((orderItem, i) => {
            orderItems.push({
                orderItemName: orderItem.restaurantItemName,
                orderItemPrice: orderItem.restaurantItemPrice,
                orderItemQuantity: orderItem.quantity
            })
        });

        const orderData = {
            orderItems: orderItems,
            orderTotalPrice: totalPrice,
            shippingAddress: shippingAddress,
            restaurantName: restaurantName
        }
        console.log(orderData);
        const response = await fetch('http://localhost:8093/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        })
        const data = await response.json();
        setOrders(data);
    }

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
            alert('Please fill in all the details.');
            return;
        }

        // Card Number
        if (paymentDetails.cardNumber.length !== 16 || !/^\d+$/.test(paymentDetails.cardNumber)) {
            alert('Invalid card number. Please enter a 16-digit numeric card number.');
            return;
        }

        // Expiry Date
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

        // CVV
        if (paymentDetails.cvv.length !== 3 || !/^\d+$/.test(paymentDetails.cvv)) {
            alert('Invalid CVV. Please enter a 3-digit numeric CVV.');
            return;
        }

        // Street Number
        if (!paymentDetails.pincode.trim()) {
            alert('Street Number is Required.');
            return;
        }
        else if (isNaN(Number(paymentDetails.pincode))) {
            alert('Street Number must be a Number, not a String.');
            return;
        }

        // Street Name
        if (!paymentDetails.streetName.trim()) {
            alert('Street Name is Required.');
            return;
        }
        else if (/^\d+$/.test(paymentDetails.streetName.trim())) {
            alert('Street Name must be a String, not a Number.');
            return;
        }
        else if (paymentDetails.streetName.trim().length < 5 || paymentDetails.streetName.trim().length > 30) {
            alert('Street Name must be between 5 to 30 Characters long.');
            return;
        }

        // City
        if (!paymentDetails.city.trim()) {
            alert('City is Required.');
            return;
        }
        else if (/^\d+$/.test(paymentDetails.city.trim())) {
            alert('City must be a String, not a Number.');
            return;
        }
        else if (paymentDetails.city.trim().length < 3 || paymentDetails.city.trim().length > 30) {
            alert('City must be between 3 to 30 Characters long.');
            return;
        }

        const order = {
            id: Date.now().toString(),
            items,
            totalAmount: totalPrice,
            shippingAddress: {
                streetNumber: paymentDetails.pincode,
                streetName: paymentDetails.streetName,
                city: paymentDetails.city,
                country: paymentDetails.country
            },
            orderDate: new Date().toLocaleString(),
            orderTimestamp: Date.now(),
        };

        const savedOrders = localStorage.getItem('orders');
        const orders = savedOrders ? JSON.parse(savedOrders) : [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        placeOrder();

        setTimeout(() => {
            navigate('/payment-success');
        }, 2000);
    };

    return (
        <>
            <Navbar />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Payment Details</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {items.map((item, index) => (
                        <div key={index} className='max-w-xs rounded-xl overflow-hidden shadow-sm'>
                            <img className='w-full rounded-2xl h-60 object-cover' src={item.restaurantItemImageUrl} alt={item.restaurantItemName} />
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
                    Final Price: ₹{totalPrice}
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
                    <label className='block mb-2 mr-10'>
                        Street Number:
                        <input type='text' name='streetNumber' value={paymentDetails.pincode} onChange={handleInputChange} className='w-full mt-1 p-2 border border-gray-300 rounded' />
                    </label>
                    <label className='block mb-2 mr-10'>
                        Street Name:
                        <input type='text' name='streetName' value={paymentDetails.streetName} onChange={handleInputChange} className='w-full mt-1 p-2 border border-gray-300 rounded' />
                    </label>
                    <label className='block mb-2 mr-10'>
                        City:
                        <input type='text' name='city' value={paymentDetails.city} onChange={handleInputChange} className='w-full mt-1 p-2 border border-gray-300 rounded' />
                    </label>
                    <label className='block mb-4 mr-10'>
                        Country:
                        <input type='text' name='country' value={paymentDetails.country} className='w-full mt-1 p-2 border border-gray-300 rounded' disabled />
                    </label>
                    <button type='submit' onClick={payNow} className='px-4 py-2 bg-blue-500 text-white rounded'>Pay Now</button>
                </form>
            </div>
        </>
    );
};

export default Payment;