import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantData from '../restaurants.json';
import Navbar from './Navbar';
import RestaurantFilters from './RestaurantFilters';
import Menubar from './Menubar';
import Restaurant from './Restaurant';

const RestaurantsByFilter = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
        const city = params.get('city') || location.state?.city;

        if (city) {
            filtered = filtered.filter(restaurant => restaurant.restaurantAddress.city.toLowerCase() === city.toLowerCase());
        }

        if (params.get('rating')) {
            filtered = filtered.filter(restaurant => restaurant.restaurantRating >= 4.0);
            setRestaurantFilters(prev => ({ ...prev, rating: true }));
        } else {
            setRestaurantFilters(prev => ({ ...prev, rating: false }));
        }

        if (params.get('offers')) {
            filtered = filtered.filter(restaurant => restaurant.restaurantDiscountPercentage > 0);
            setRestaurantFilters(prev => ({ ...prev, offers: true }));
        } else {
            setRestaurantFilters(prev => ({ ...prev, offers: false }));
        }

        setFilteredRestaurants(filtered);
    };

    const handleSearch = (query: string) => {
        const city = location.state?.city || localStorage.getItem('location');
        const filtered = RestaurantData.filter(restaurant =>
            restaurant.restaurantName.toLowerCase().startsWith(query.toLowerCase()) &&
            (!city || restaurant.restaurantAddress.city.toLowerCase() === city.toLowerCase())
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

export default RestaurantsByFilter;