import { useState, useEffect } from 'react';

const useDataApi = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Since we're using mock data, we'll simulate an API call
        const mockData = [
          {
            id: 1,
            title: 'Luxury Hotel Downtown',
            location: {
              city: 'New York',
              address: '123 Main Street, NYC',
              coordinates: { lat: 40.7128, lng: -74.0060 }
            },
            content: 'Experience luxury and comfort at our downtown location. This magnificent hotel offers world-class amenities and exceptional service.',
            rating: 4.5,
            ratingCount: 245,
            price: 299,
            gallery: [
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
              'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
              'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
            ],
            amenities: [
              { name: 'Free WiFi', icon: 'wifi' },
              { name: 'Swimming Pool', icon: 'pool' },
              { name: 'Fitness Center', icon: 'fitness' },
              { name: 'Restaurant', icon: 'restaurant' },
              { name: 'Spa', icon: 'spa' },
              { name: 'Business Center', icon: 'business' }
            ],
            rooms: [
              {
                id: 1,
                type: 'Standard Room',
                price: 199,
                originalPrice: 249,
                description: 'Comfortable room with city view',
                amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar'],
                images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
                maxGuests: 2,
                bedType: 'Queen Bed',
                size: '25 sqm',
                available: 5
              },
              {
                id: 2,
                type: 'Deluxe Room',
                price: 299,
                originalPrice: 349,
                description: 'Spacious room with premium amenities',
                amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Balcony', 'City View'],
                images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'],
                maxGuests: 3,
                bedType: 'King Bed',
                size: '35 sqm',
                available: 3
              },
              {
                id: 3,
                type: 'Executive Suite',
                price: 499,
                originalPrice: 599,
                description: 'Luxury suite with separate living area',
                amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Balcony', 'City View', 'Separate Living Area', 'Premium Bathroom'],
                images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
                maxGuests: 4,
                bedType: 'King Bed + Sofa Bed',
                size: '55 sqm',
                available: 2
              },
              {
                id: 4,
                type: 'Presidential Suite',
                price: 899,
                originalPrice: 1099,
                description: 'Ultimate luxury with panoramic city views',
                amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Balcony', 'City View', 'Separate Living Area', 'Premium Bathroom', 'Kitchenette', 'Butler Service'],
                images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'],
                maxGuests: 6,
                bedType: 'King Bed + 2 Queen Beds',
                size: '85 sqm',
                available: 1
              }
            ],
            reviews: [
              {
                id: 1,
                name: 'John Doe',
                rating: 5,
                comment: 'Amazing experience! The staff was incredibly friendly and the room was spotless.',
                date: '2024-01-15',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
              },
              {
                id: 2,
                name: 'Sarah Johnson',
                rating: 4,
                comment: 'Great location and excellent amenities. Would definitely stay again.',
                date: '2024-01-10',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face'
              }
            ],
            author: {
              name: 'Hotel Manager',
              avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face'
            }
          }
        ];
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataApi;