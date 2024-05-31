import React from 'react'
import Navbar from './Navbar'
import Restaurant from './Restaurant'
import { useLocation } from 'react-router-dom'
import RestaurantData from '../restaurants.json';
import Menubar from './Menubar';

const Main = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <Navbar city={location.state?.city} />
      <Menubar />
      <Restaurant restaurant={RestaurantData} city={location.state?.city} />
    </div>
  )
}

export default Main