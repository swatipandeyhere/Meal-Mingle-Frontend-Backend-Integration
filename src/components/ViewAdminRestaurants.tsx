import React from 'react';
import AdminNavbar from './AdminNavbar';

interface RestaurantProp {
    restaurant: any[]
}

const ViewAdminRestaurants: React.FC<RestaurantProp> = ({ restaurant }) => {
    return (
        <>
            <AdminNavbar />
            <div className='p-4 pl-20'>
                <div className='grid grid-cols-3 gap-4'>
                    {restaurant.map((data) => {
                        return (
                            <div key={data.restaurantId} className="relative max-w-xs rounded-xl overflow-hidden shadow-sm mt-12">
                                <img className={`w-full rounded-2xl h-60`} src={data.restaurantImageUrl} alt="Restaurant Image" />
                                {data.restaurantDiscountPercentage > 0 && (
                                    <div className="absolute top-2 left-2 bg-blue-500 text-white font-semibold py-1 px-2 rounded-md">
                                        {`${data.restaurantDiscountPercentage}% OFF ABOVE ${data.restaurantMinimumOrderAmount}`}
                                    </div>
                                )}
                                <div className="py-4">
                                    <div className='flex justify-between items-center'>
                                        <div className="font-semibold text-xl mb-2">
                                            {data.restaurantName}
                                            <div className="text-sm text-gray-600">{`${data.restaurantAddress.streetNumber}, ${data.restaurantAddress.streetName}, ${data.restaurantAddress.city}`}</div>
                                        </div>
                                        <div className={`text-white font-semibold text-base rounded-md p-1 ${data.restaurantRating < 4.5 ? `bg-green-600` : `bg-green-900`}`}>
                                            {data.restaurantRating}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ViewAdminRestaurants;