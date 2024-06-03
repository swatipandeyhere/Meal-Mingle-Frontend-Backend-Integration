import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Menu = () => {
    const location = useLocation();
    console.log(location);
    const { data } = location.state;

    return (
        <>
            <Navbar city={data.restaurantAddress.city} />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Explore the Menu of {data.restaurantName}</h1>
                <div className='grid grid-cols-3'>
                    {data.restaurantItems.map((item: any) => (
                        <div key={item.restaurantItemId} className='max-w-xs rounded-xl overflow-hidden shadow-sm mt-12'>
                            <img className='w-full rounded-2xl h-60 object-cover' src={require(`../images/${item.restaurantItemImageUrl}`)} alt={item.restaurantItemName} />
                            <div className='py-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='font-semibold text-xl mb-2'>{item.restaurantItemName}</div>
                                    <p className='font-semibold text-base p-1'>₹{item.restaurantItemPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Menu;