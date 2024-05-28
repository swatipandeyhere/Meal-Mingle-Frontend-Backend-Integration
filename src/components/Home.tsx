import React from 'react'
import HomeBanner from '../images/home-banner.png'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${HomeBanner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-screen text-white text-center'>
            <div className='pl-60'>
                <Link to='/login'><button className='ml-96 mt-6 text-lg'>Log In</button></Link>
                <Link to='signup'><button className='ml-7 mt-6 text-lg'>Sign Up</button></Link>
            </div>
            <h1 className='text-6xl font-extrabold mt-44 italic'>Meal Mingle</h1>
            <h2 className='text-4xl mt-8'>Mingle with Deliciousness <br />from Around the Globe</h2>
        </div>
    )
}

export default Home