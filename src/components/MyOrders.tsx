import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

interface OrderItem {
    restaurantItemId: string;
    restaurantItemName: string;
    restaurantItemPrice: number;
    quantity: number;
    restaurantItemImageUrl: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
    orderDate: string;
    status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
}

const MyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            const parsedOrders: Order[] = JSON.parse(savedOrders).map((order: any) => ({
                ...order,
                status: order.status || 'Pending',
            }));
            setOrders(parsedOrders);
        }
    }, []);

    const cancelOrder = (orderId: string) => {
        const updatedOrders = orders.filter(order => order.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setOrders(updatedOrders);
    };

    return (
        <>
            <Navbar />
            <div className='p-4 pl-20'>
                <h1 className='text-3xl font-bold mb-4'>My Orders</h1>
                {orders.length === 0 ? (
                    <p>You have No Orders yet!</p>
                ) : (
                    <div className='space-y-4'>
                        {orders.map((order) => (
                            <div key={order.id} className='border p-4 rounded shadow mr-10'>
                                <h2 className='text-xl font-semibold mb-2'>Order ID: {order.id}</h2>
                                <p className='text-gray-600 mb-2'>Order Date: {order.orderDate}</p>
                                <p className='text-gray-600 mb-2'>Status: {order.status}</p>
                                <div className='space-y-2'>
                                    {order.items.map((item, index) => (
                                        <div key={index} className='flex justify-between items-center p-2 border-b'>
                                            <div className='flex flex-col'>
                                                <span className='font-semibold'>{item.restaurantItemName}</span>
                                                <span className='text-gray-500'>Qty: {item.quantity}</span>
                                            </div>
                                            <div className='flex flex-col items-end'>
                                                <span className='text-gray-500'>Price: ₹{item.restaurantItemPrice}</span>
                                                <span className='font-semibold'>Total: ₹{item.restaurantItemPrice * item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='font-semibold mt-2'>Total Amount: ₹{order.totalAmount}</div>
                                {order.status === 'Pending' && (
                                    <button
                                        onClick={() => cancelOrder(order.id)}
                                        className='mt-2 px-4 py-2 bg-red-500 text-white rounded'
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyOrders;