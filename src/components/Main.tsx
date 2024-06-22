import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantData from '../restaurants.json';
import Menubar from './Menubar';
import Navbar from './Navbar';
import RestaurantFilters from './RestaurantFilters';
import Restaurant from './Restaurant';

const Main = () => {
  const location = useLocation();
  const [filteredRestaurants, setFilteredRestaurants] = useState(RestaurantData);
  const [restaurantFilters, setRestaurantFilters] = useState({
    rating: false,
    offers: false,
  });

  useEffect(() => {
    applyRestaurantFilters(new URLSearchParams(location.search));
  }, [location.search]);

  const applyRestaurantFilters = (params: URLSearchParams) => {
    let filtered = RestaurantData;
    let appliedRestaurantFilters = { rating: false, offers: false };

    if (params.get('rating')) {
      filtered = filtered.filter(restaurant =>
        restaurant.restaurantRating >= 4.0
      );
      appliedRestaurantFilters = { ...appliedRestaurantFilters, rating: true };
    }

    if (params.get('offers')) {
      filtered = filtered.filter(restaurant =>
        restaurant.restaurantDiscount > 0
      );
      appliedRestaurantFilters = { ...appliedRestaurantFilters, offers: true };
    }

    setRestaurantFilters(appliedRestaurantFilters);
    setFilteredRestaurants(filtered);
  };

  const handleSearch = (query: string) => {
    const filtered = RestaurantData.filter(restaurant =>
      restaurant.restaurantName.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div>
      <Navbar city={location.state?.city} onSearch={handleSearch} />
      <RestaurantFilters applyRestaurantFilters={applyRestaurantFilters} restaurantFilters={restaurantFilters} />
      <Menubar />
      <Restaurant restaurant={filteredRestaurants} city={location.state?.city} />
    </div>
  );
};

export default Main;