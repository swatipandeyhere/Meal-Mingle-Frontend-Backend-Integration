import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Address {
    streetNumber: string;
    streetName: string;
    city: string;
}

interface RestaurantItem {
    restaurantItemId: string;
    restaurantItemName: string;
    restaurantItemPrice: number;
    restaurantItemCategory: string;
    restaurantItemImageUrl: string;
    restaurantItemCuisineType: string;
    restaurantItemVeg: boolean;
}

interface RestaurantData {
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: Address;
    restaurantRating: number;
    restaurantMinimumOrderAmount: number;
    restaurantDiscountPercentage: number;
    restaurantImageUrl: string;
    restaurantOperationDays: string;
    restaurantOperationHours: string;
    restaurantPhoneNumber: string;
    restaurantItems: RestaurantItem[];
}

interface RestaurantProp {
    restaurants: RestaurantData[];
    onDelete: (id: string) => void;
}

const ViewAdminRestaurants: React.FC<RestaurantProp> = ({ restaurants, onDelete }) => {
    const navigate = useNavigate();

    const handleUpdate = (id: string) => {
        navigate(`/update-restaurant/${id}`);
    };

    const handleDelete = (id: string) => {
        onDelete(id);
        toast.success('Restaurant Deleted Successfully!');
    };

    const handleClick = () => {
        const bankDetails = localStorage.getItem(`bankDetails`);
        if (!bankDetails) {
            navigate(`/admin/enter-bank-details`);
        } else {
            navigate(`/register-restaurant-item`);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className='p-4 pl-20'>
                <div className='grid grid-cols-3 gap-4'>
                    {restaurants.map((data) => (
                        <div className="relative max-w-xs rounded-xl overflow-hidden shadow-sm mt-12 cursor-pointer">
                            <img className={`w-full rounded-2xl h-60`} src={data.restaurantImageUrl} alt="Restaurant Image" onClick={() => handleClick()} />
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
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleUpdate(data.restaurantId)}
                                        className="inline-block px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(data.restaurantId)}
                                        className="inline-block px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ViewAdminRestaurants;