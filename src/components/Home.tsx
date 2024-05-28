import React from 'react'
import HomeBanner from '../images/home-banner.png'
import { Link } from 'react-router-dom'
import RightArrowIcon from '../images/right-arrow-icon.png'

const Home = () => {
    return (
        <>
            <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${HomeBanner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-screen text-white text-center'>
                <div className='pl-60'>
                    <Link to='/login'><button className='ml-96 mt-6 text-lg'>Log In</button></Link>
                    <Link to='signup'><button className='ml-7 mt-6 text-lg'>Sign Up</button></Link>
                </div>
                <h1 className='text-6xl font-extrabold mt-44 italic'>Meal Mingle</h1>
                <h2 className='text-4xl mt-8'>Mingle with Deliciousness <br />from Around the Globe</h2>
            </div>
            <div className='text-4xl text-center mt-10'>Popular Locations around the Globe</div>
            <div className='text-xl text-gray-600 text-center mt-10'>From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food, <br /> MealMingle covers it all. Explore menus, and millions of restaurant photos and reviews from users <br /> just like you, to find your next great meal.</div>
            <div className='flex border border-spacing-1 shadow-lg w-80 p-5 rounded-lg ml-20 mt-20'>
                <div className='text-xl'>Location</div>
                <img src={RightArrowIcon} alt="Right Arrow Icon" className='w-2 h-2 ml-48 mt-3'/>
            </div>
        </>
    )
}

export default Home