import React from 'react'
import Pizza from '../images/menu-1.png'
import Burger from '../images/menu-2.png'
import Noodles from '../images/menu-3.png'
import Pasta from '../images/menu-4.png'
import Sandwich from '../images/menu-5.png'
import Thali from '../images/menu-6.png'
import Dessert from '../images/menu-7.png'
import Salad from '../images/menu-8.png'
import Biryani from '../images/menu-9.png'
import Fish from '../images/menu-10.png'

const Menubar = () => {
    return (
        <div className='bg-zinc-100 p-10'>
            <div className='text-3xl'>Uniting You with Delicious Moments</div>
            <div className='flex mt-5'>
                <img src={Pizza} alt='Pizza' className='rounded-full w-40 h-40' />
                <img src={Burger} alt='Burger' className='rounded-full w-40 h-40 ml-11' />
                <img src={Noodles} alt='Noodles' className='rounded-full w-40 h-40 ml-11' />
                <img src={Pasta} alt='Pasta' className='rounded-full w-40 h-40 ml-11' />
                <img src={Sandwich} alt='Sandwich' className='rounded-full w-40 h-40 ml-11' />
                <img src={Thali} alt='Thali' className='rounded-full w-40 h-40 ml-11' />
                <img src={Dessert} alt='Dessert' className='rounded-full w-40 h-40 ml-11' />
                <img src={Salad} alt='Salad' className='rounded-full w-40 h-40 ml-11' />
                <img src={Biryani} alt='Biryani' className='rounded-full w-40 h-40 ml-11' />
                <img src={Fish} alt='Fish' className='rounded-full w-40 h-40 ml-11' />
            </div>
        </div>
    )
}

export default Menubar