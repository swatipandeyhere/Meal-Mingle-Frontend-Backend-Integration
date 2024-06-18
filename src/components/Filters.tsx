import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FiltersProps {
    applyFilters: (params: URLSearchParams) => void;
}

const Filters: React.FC<FiltersProps> = ({ applyFilters }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pureVeg, setPureVeg] = useState(false);
    const [rating4Plus, setRating4Plus] = useState(false);
    const [offers, setOffers] = useState(false);
    const [cuisine, setCuisine] = useState('');
    const [selectBgColor, setSelectBgColor] = useState('bg-white');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPureVeg(params.get('pureVeg') === 'true');
        setRating4Plus(params.get('rating') === '4.0+');
        setOffers(params.get('offers') === 'true');
        setCuisine(params.get('cuisine') || '');
    }, [location.search]);

    const applyFiltersAndNavigate = () => {
        let queryParams = '';

        if (pureVeg) {
            queryParams += 'pureVeg=true&';
        }
        if (rating4Plus) {
            queryParams += 'rating=4.0+&';
        }
        if (offers) {
            queryParams += 'offers=true&';
        }
        if (cuisine) {
            queryParams += `cuisine=${cuisine}&`;
        }

        queryParams = queryParams.slice(0, -1);
        console.log('Navigating to:', `/restaurants/filter?${queryParams}`);
        navigate(`/restaurants/filter?${queryParams}`);

        applyFilters(new URLSearchParams(queryParams));
    };

    const handlePureVegClick = () => {
        const newValue = !pureVeg;
        setPureVeg(newValue);
    };

    const handleRatingClick = () => {
        const newValue = !rating4Plus;
        setRating4Plus(newValue);
    };

    const handleOffersClick = () => {
        const newValue = !offers;
        setOffers(newValue);
    };

    const handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCuisine = event.target.value;
        setCuisine(selectedCuisine);
        setSelectBgColor(selectedCuisine ? 'bg-gray-300' : 'bg-white');
    };

    return (
        <div className="bg-white p-4 text-black ml-5">
            <div className="flex items-center space-x-4">
                <button
                    className={`px-4 py-2 rounded-md border border-gray-300 shadow-md ${pureVeg ? 'bg-gray-300 text-black' : 'bg-white text-black'}`}
                    onClick={handlePureVegClick}
                >
                    Pure Veg
                </button>
                <button
                    className={`px-4 py-2 rounded-md border border-gray-300 shadow-md ${rating4Plus ? 'bg-gray-300 text-black' : 'bg-white text-black'}`}
                    onClick={handleRatingClick}
                >
                    Rating: 4.0+
                </button>
                <button
                    className={`px-4 py-2 rounded-md border border-gray-300 shadow-md ${offers ? 'bg-gray-300 text-black' : 'bg-white text-black'}`}
                    onClick={handleOffersClick}
                >
                    Offers
                </button>
                <select
                    className={`px-4 py-2 rounded-md border border-gray-300 text-black shadow-md appearance-none focus:outline-none ${selectBgColor}`}
                    value={cuisine}
                    onChange={handleCuisineChange}
                >
                    <option value="">Select Cuisine</option>
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                </select>
                <button
                    className="px-4 py-2 rounded-md bg-blue-500 text-white"
                    onClick={applyFiltersAndNavigate}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default Filters;