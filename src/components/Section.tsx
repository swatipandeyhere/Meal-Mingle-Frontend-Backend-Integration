import React from 'react'
import Dish1 from '../images/dish-1.png'

const Section = () => {
    return (
        <div className='p-4 pl-20'>
            <div className='font-semibold text-3xl'>Best Food in Location</div>
            <div className="max-w-xs rounded-xl overflow-hidden shadow-sm mt-12">
                <img className="w-full rounded-2xl" src={Dish1} alt="Dish 1" />
                <div className="py-4">
                    <div className="font-semibold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Section