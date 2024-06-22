import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../utils/authUtils';

interface restaurantProp {
    restaurant: any,
    city: any
}

const Restaurant = (props: restaurantProp) => {
    return (
        <div className='p-4 pl-20'>
            <div className='font-semibold text-3xl'>
                {props.city ? `Best Food in ${props.city}` : 'Best Food in Location'}
            </div>
            {props.city ? <div className='grid grid-cols-3'>
                {props.restaurant.filter((data: any) => data.restaurantAddress.city.includes(props.city)).map((data: any) => {
                    console.log(data);
                    return <>
                        <Link to={isAuthenticated() ? '/menu' : '/login'} state={{ data: data }}>
                            <div className="max-w-xs rounded-xl overflow-hidden shadow-sm mt-12">
                                <img className="w-full rounded-2xl h-60" src={require(`../images/${data.restaurantImageUrl}`)} alt="Restaurant Image" />
                                <div className="py-4">
                                    <div className='flex justify-between items-center'>
                                        <div className="font-semibold text-xl mb-2">{data.restaurantName}</div>
                                        <div className={`text-white font-semibold text-base rounded-md p-1 ${data.restaurantRating < 4.5 ? `bg-green-600` : `bg-green-900`}`}>
                                            {data.restaurantRating}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                })}
            </div>
                :
                <div className='grid grid-cols-3'>
                    {props.restaurant.map((data: any) => {
                        console.log(data);
                        return <>
                            <Link to={isAuthenticated() ? '/menu' : '/login'} state={{ data: data }}>
                                <div className="max-w-xs rounded-xl overflow-hidden shadow-sm mt-12">
                                    <img className="w-full rounded-2xl h-60" src={require(`../images/${data.restaurantImageUrl}`)} alt="Restaurant Image" />
                                    <div className="py-4">
                                        <div className='flex justify-between items-center'>
                                            <div className="font-semibold text-xl mb-2">{data.restaurantName}</div>
                                            <div className={`text-white font-semibold text-base rounded-md p-1 ${data.restaurantRating < 4.5 ? `bg-green-600` : `bg-green-900`}`}>
                                                {data.restaurantRating}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>
                    })}
                </div>}
        </div>
    )
}

export default Restaurant