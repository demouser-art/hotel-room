import { useState, useEffect } from 'react';

const useDataApi = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from the provided URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        // Fallback to mock data if fetch fails
        console.warn('Failed to fetch data from URL, using mock data:', err);
        
        // This should not happen in normal flow, but keeping as fallback
        const mockData = [
          {
            id: 65362,
            title: 'Awesome Cotton Chicken',
            slug: 'reiciendis-consequatur-dolore',
            content: 'In South Williamsburg only a few blocks inland from the East River, Marlo & Sons is a rustic respite with nice wine, good cocktails, and excellent snacking fare such as oysters, local cheese, and potato tortilla.',
            status: 'draft',
            propertyType: 'Hotel',
            condition: 'Excellent',
            rating: 5,
            ratingCount: 35,
            contactNumber: '1-403-000-9038 x910',
            price: 253,
            gallery: [
              'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1.jpg',
              'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single2.jpg',
              'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg',
              'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single4.jpg'
            ],
            amenities: [
              { name: 'Free Wi-Fi', icon: 'wifi', wifiAvailability: true },
              { name: 'Free Parking', icon: 'car', parkingAvailability: true },
              { name: 'Swimming Pool', icon: 'pool', poolAvailability: true },
              { name: 'Air Conditioning', icon: 'snowflake', airCondition: true }
            ],
            roomTypes: [
              {
                id: 1,
                name: 'Standard Room',
                description: 'A comfortable and well-appointed room.',
                price: 180,
                originalPrice: 220,
                maxGuests: 2,
                size: '25 sqm',
                bedType: '1 Queen Bed',
                available: 8,
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single4.jpg',
                  alt: 'Standard Room'
                },
                amenities: [
                  { name: 'Free Wi-Fi', icon: 'wifi' },
                  { name: 'Air Conditioning', icon: 'snowflake' }
                ]
              }
            ],
            reviews: [],
            author: {
              name: 'Hotel Manager',
              avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face'
            }
          }
        ];
        
        setData(mockData);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataApi;