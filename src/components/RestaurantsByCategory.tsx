import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import RestaurantData from '../restaurants.json';
import Menubar from './Menubar';
import { isAuthenticated } from '../utils/authUtils';

const RestaurantsByCategory = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();

    const handleRestaurantClick = (restaurant: any) => {
        if (isAuthenticated()) {
            navigate(`/category-menu/${restaurant.restaurantId}`, { state: { data: restaurant, category: categoryName } });
        } else {
            navigate('/login');
        }
    };

    const filteredRestaurants = RestaurantData.filter(restaurant =>
        restaurant.restaurantItems.some(item => item.restaurantItemCategory === categoryName)
    );

    return (
        <>
            <Navbar />
            <Menubar />
            <div className='p-4 pl-20'>
                <h1 className='font-semibold text-3xl mb-4'>Restaurants Serving {categoryName}</h1>
                <div className='grid grid-cols-3'>
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.restaurantId}
                            className='max-w-xs rounded-xl overflow-hidden shadow-sm mt-12 cursor-pointer'
                            onClick={() => handleRestaurantClick(restaurant)}
                        >
                            <img
                                className='w-full rounded-2xl h-60 object-cover'
                                src={require(`../images/${restaurant.restaurantImage}`)}
                                alt={restaurant.restaurantName}
                            />
                            <div className='py-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='font-semibold text-xl mb-2'>{restaurant.restaurantName}</div>
                                    <div className={`text-white font-semibold text-base rounded-md p-1 ${restaurant.restaurantRating < 4.5 ? 'bg-green-600' : 'bg-green-900'}`}>
                                        {restaurant.restaurantRating}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RestaurantsByCategory;