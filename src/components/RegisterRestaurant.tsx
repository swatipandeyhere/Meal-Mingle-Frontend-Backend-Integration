import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

interface Address {
    streetNumber: string;
    streetName: string;
    city: string;
    country: string;
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
    restaurantOfferPhrase: string;
    restaurantAvailability: boolean;
    restaurantImageUrl: string;
    restaurantOperationDays: string;
    restaurantOperationHours: string;
    restaurantPhoneNumber: string;
    restaurantItems: RestaurantItem[];
}

interface RegisterRestaurantProps {
    onSubmit?: () => void;
}

const RegisterRestaurant: React.FC<RegisterRestaurantProps> = ({ onSubmit }) => {
    const initialRestaurantData: RestaurantData = {
        restaurantId: '',
        restaurantName: '',
        restaurantAddress: {
            streetNumber: '',
            streetName: '',
            city: '',
            country: 'India',
        },
        restaurantRating: 0,
        restaurantMinimumOrderAmount: 0,
        restaurantDiscountPercentage: 0,
        restaurantOfferPhrase: '',
        restaurantAvailability: true,
        restaurantImageUrl: '',
        restaurantOperationDays: '',
        restaurantOperationHours: '',
        restaurantPhoneNumber: '',
        restaurantItems: [],
    };

    const [restaurantData, setRestaurantData] = useState<RestaurantData>(initialRestaurantData);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setRestaurantData(prevData => ({
                ...prevData,
                [parent as keyof RestaurantData]: {
                    ...(prevData[parent as keyof RestaurantData] as Address),
                    [child]: value,
                },
            }));
        } else {
            setRestaurantData({ ...restaurantData, [name]: value });
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newRestaurantData: RestaurantData = {
            ...restaurantData,
            restaurantId: Math.random().toString(36).substr(2, 9),
        };

        const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
        const updatedRestaurantData = [...storedRestaurants, newRestaurantData];

        localStorage.setItem('restaurants', JSON.stringify(updatedRestaurantData));

        setRestaurantData(initialRestaurantData);
        if (onSubmit) onSubmit();
        navigate('/view-your-restaurants');
    };

    const handleClose = () => {
        navigate('/partner-with-us');
    };

    return (
        <>
            <AdminNavbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md relative">
                    <div className="absolute top-0 right-0 m-4">
                        <button
                            onClick={handleClose}
                            className="text-gray-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                        Register New Restaurant
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-base font-medium text-gray-700">
                                    Restaurant Name
                                </label>
                                <input
                                    type="text"
                                    name="restaurantName"
                                    value={restaurantData.restaurantName}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Street Number
                                </label>
                                <input
                                    type="text"
                                    name="restaurantAddress.streetNumber"
                                    value={restaurantData.restaurantAddress.streetNumber}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Street Name
                                </label>
                                <input
                                    type="text"
                                    name="restaurantAddress.streetName"
                                    value={restaurantData.restaurantAddress.streetName}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="restaurantAddress.city"
                                    value={restaurantData.restaurantAddress.city}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="restaurantAddress.country"
                                    value={restaurantData.restaurantAddress.country}
                                    readOnly
                                    className="form-input mt-1 block w-full rounded-md shadow-sm bg-gray-100 border h-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Operation Days
                                </label>
                                <input
                                    type="text"
                                    name="restaurantOperationDays"
                                    value={restaurantData.restaurantOperationDays}
                                    onChange={handleChange}
                                    placeholder="Mon-Fri"
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Operation Hours
                                </label>
                                <input
                                    type="text"
                                    name="restaurantOperationHours"
                                    value={restaurantData.restaurantOperationHours}
                                    onChange={handleChange}
                                    placeholder="10:00AM-06:00PM"
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="border-gray-300">
                            <label className="block text-base font-medium text-gray-700">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="restaurantImageUrl"
                                value={restaurantData.restaurantImageUrl}
                                onChange={handleChange}
                                className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                required
                            />
                        </div>
                        <div className="border-gray-300">
                            <label className="block text-base font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="restaurantPhoneNumber"
                                value={restaurantData.restaurantPhoneNumber}
                                onChange={handleChange}
                                className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Minimum Order Amount
                                </label>
                                <input
                                    type="number"
                                    name="restaurantMinimumOrderAmount"
                                    value={restaurantData.restaurantMinimumOrderAmount}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-base font-medium text-gray-700">
                                    Discount Percentage
                                </label>
                                <input
                                    type="number"
                                    name="restaurantDiscountPercentage"
                                    value={restaurantData.restaurantDiscountPercentage}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full rounded-md shadow-sm border h-10"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-rose-500 w-full h-12 text-white py-2 px-4 rounded-lg"
                        >
                            Register Restaurant
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterRestaurant;