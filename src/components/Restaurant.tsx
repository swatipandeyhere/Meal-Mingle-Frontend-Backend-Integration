import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

interface restaurantProp {
    restaurant: any,
    city: any
}

const isRestaurantOpen = (operationDays: string, operationHours: string) => {
    const daysMap: { [key: string]: number } = {
        'Sun': 0,
        'Mon': 1,
        'Tue': 2,
        'Wed': 3,
        'Thu': 4,
        'Fri': 5,
        'Sat': 6
    };

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

    const [startDay, endDay] = operationDays.split('-');
    const startDayIndex = daysMap[startDay];
    const endDayIndex = daysMap[endDay];

    const withinOperatingDays = startDayIndex <= endDayIndex
        ? currentDay >= startDayIndex && currentDay <= endDayIndex
        : currentDay >= startDayIndex || currentDay <= endDayIndex;

    if (!withinOperatingDays) {
        return false;
    }

    const [startTime, endTime] = operationHours.split('-').map(time => {
        const [hours, minutes] = time.replace('AM', '').replace('PM', '').split(':').map(Number);
        const isPM = time.includes('PM');
        const totalMinutes = (isPM ? hours + 12 : hours) * 60 + minutes;
        return totalMinutes;
    });

    return currentTime >= startTime && currentTime <= endTime;
}

const Restaurant = (props: restaurantProp) => {
    return (
        <div className='p-4 pl-20'>
            <div className='font-semibold text-3xl'>
                {props.city ? `Best Food in ${props.city}` : 'Best Food in Location'}
            </div>
            {props.city ? (
                <div className='grid grid-cols-3'>
                    {props.restaurant.filter((data: any) => data.restaurantAddress.city.includes(props.city)).map((data: any) => {
                        const isOpen = isRestaurantOpen(data.restaurantOperationDays, data.restaurantOperationHours);
                        return (
                            <Link key={data.restaurantId} to={isAuthenticated() ? '/menu' : '/login'} state={{ data: data }}>
                                <div className="max-w-xs rounded-xl overflow-hidden shadow-sm mt-12">
                                    <img className={`w-full rounded-2xl h-60 ${!isOpen && 'filter grayscale'}`} src={require(`../images/${data.restaurantImageUrl}`)} alt="Restaurant Image" />
                                    <div className="py-4">
                                        <div className='flex justify-between items-center'>
                                            <div className="font-semibold text-xl mb-2">
                                                {data.restaurantName}
                                                <div className="text-sm text-gray-600">{data.restaurantAddress.streetNumber}, {data.restaurantAddress.streetName}, {data.restaurantAddress.city}</div>
                                            </div>
                                            <div className={`text-white font-semibold text-base rounded-md p-1 ${data.restaurantRating < 4.5 ? `bg-green-600` : `bg-green-900`}`}>
                                                {data.restaurantRating}
                                            </div>
                                        </div>
                                        <div className={`font-semibold text-sm ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                            {isOpen ? 'Open' : 'Closed'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className='grid grid-cols-3'>
                    {props.restaurant.map((data: any) => {
                        const isOpen = isRestaurantOpen(data.restaurantOperationDays, data.restaurantOperationHours);
                        return (
                            <Link key={data.restaurantId} to={isAuthenticated() ? '/menu' : '/login'} state={{ data: data }}>
                                <div className="max-w-xs rounded-xl overflow-hidden shadow-sm mt-12">
                                    <img className={`w-full rounded-2xl h-60 ${!isOpen && 'filter grayscale'}`} src={require(`../images/${data.restaurantImageUrl}`)} alt="Restaurant Image" />
                                    <div className="py-4">
                                        <div className='flex justify-between items-center'>
                                            <div className="font-semibold text-xl mb-2">
                                                {data.restaurantName}
                                                <div className="text-sm text-gray-600">{data.restaurantAddress.streetNumber}, {data.restaurantAddress.streetName}, {data.restaurantAddress.city}</div>
                                            </div>
                                            <div className={`text-white font-semibold text-base rounded-md p-1 ${data.restaurantRating < 4.5 ? `bg-green-600` : `bg-green-900`}`}>
                                                {data.restaurantRating}
                                            </div>
                                        </div>
                                        <div className={`font-semibold text-sm ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                            {isOpen ? 'Open' : 'Closed'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Restaurant;