import React from 'react'
import Navbar from './Navbar'
import Restaurant from './Restaurant'
import { useLocation } from 'react-router-dom'
import RestaurantData from '../restaurants.json';

const Main = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className='p-4'>
      <Navbar city={location.state?.city} />
      <Restaurant restaurant={RestaurantData} city={location.state?.city} />
    </div>
  )
}

export default Main
