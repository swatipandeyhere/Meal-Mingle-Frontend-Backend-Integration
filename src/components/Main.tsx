import React, { useState } from 'react';
import Navbar from './Navbar';
import Restaurant from './Restaurant';
import { useLocation } from 'react-router-dom';
import RestaurantData from '../restaurants.json';
import Menubar from './Menubar';

const Main = () => {
  const location = useLocation();
  const [filteredRestaurants, setFilteredRestaurants] = useState(RestaurantData);

  const handleSearch = (query: string) => {
    const filtered = RestaurantData.filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div>
      <Navbar city={location.state?.city} onSearch={handleSearch} />
      <Menubar />
      <Restaurant restaurant={filteredRestaurants} city={location.state?.city} />
    </div>
  );
};

export default Main;