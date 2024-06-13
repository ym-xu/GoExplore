import React, { useState } from 'react';

function MapComponent() {
    const [location, setLocation] = useState(null);
    const [query, setQuery] = useState('');
    const [recommendation, setRecommendation] = useState('');

    const handleSearch = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        setLocation(coords);
        fetchPlaces(coords.latitude, coords.longitude);
    };
    
    const fetchPlaces = (latitude, longitude) => {
        fetch(`/api/places?lat=${34.663087}&lon=${135.5351935}&query=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Places fetched and recommendations generated:', data);
                setRecommendation(data.recommendation); // Assuming the backend directly sends the recommendation
            })
            .catch(error => console.error('Error:', error));
    };

    const showError = (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter your search query..."
            />
            <button onClick={handleSearch}>Search Nearby Places</button>
            {location && (
                <p>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
            )}
            {recommendation && (
                <p>
                    Recommendation: {recommendation}
                </p>
            )}
        </div>
    );
}

export default MapComponent;
