import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import GreenTickIcon from '../images/green-tick-icon.png';

const PaymentSuccessful = () => {
    const navigate = useNavigate();

    const handleOrderHistory = () => {
        navigate('/order-history');
    };

    const handleOrderTracking = () => {
        navigate('/order-tracking');
    };

    const handleContinueOrdering = () => {
        navigate('/main');
    };

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className='flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8' style={{ boxShadow: '0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0px 4px 20px 0px rgba(0, 0, 0, 0.08)' }}>
                    <img src={GreenTickIcon} alt='Green Tick Icon' className='w-auto h-16 mb-6' />
                    <h1 className='font-bold text-3xl text-black mb-4'>Payment Successful!</h1>
                    <p className='text-md text-black mb-6 text-center'>
                        Your Payment was processed Successfully.
                        <br />
                        Thank You for your Order!
                    </p>
                    <div className='flex justify-center space-x-4 mb-4'>
                        <button
                            onClick={handleOrderHistory}
                            className='px-5 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300'>
                            View Order History
                        </button>
                        <button
                            onClick={handleOrderTracking}
                            className='px-5 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300'>
                            Track Your Order
                        </button>
                    </div>
                    <button
                        onClick={handleContinueOrdering}
                        className='px-5 py-3 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition duration-300'>
                        Continue Ordering Food
                    </button>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccessful;