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
        const mockData = [
          {
            id: 65362,
            title: 'Awesome Cotton Chicken',
            slug: 'reiciendis-consequatur-dolore',
            content: 'In South Williamsburg only a few blocks inland from the East River, Marlo & Sons is a rustic respite with nice wine, good cocktails, and excellent snacking fare such as oysters, local cheese, and potato tortilla. But there\'s more: seasonal salads and soups, the famous brick chicken, a dimly lit space outfitted in various types of wood (this is an Andrew Tarlow restaurant, after all). In many ways, this place represents everything that makes Brooklyn dining special - the attention to detail, the commitment to quality ingredients, and the warm, inviting atmosphere that makes you want to stay for hours.',
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
              { name: 'Air Conditioning', icon: 'snowflake', airCondition: true },
              { name: 'Restaurant', icon: 'restaurant' },
              { name: 'Spa & Wellness', icon: 'spa' },
              { name: 'Fitness Center', icon: 'fitness' },
              { name: 'Business Center', icon: 'business' },
              { name: 'Room Service', icon: 'service' },
              { name: 'Laundry Service', icon: 'laundry' },
              { name: 'Pet Friendly', icon: 'pet' },
              { name: '24/7 Front Desk', icon: 'desk' }
            ],
            roomTypes: [
              {
                id: 1,
                name: 'Standard Room',
                description: 'A comfortable and well-appointed room, perfect for solo travelers or couples. Includes essential amenities for a pleasant stay.',
                price: '253.00',
                originalPrice: '300.00',
                isNegotiable: true,
                maxGuests: 2,
                bedType: 'Queen Bed',
                size: '25 sqm',
                available: 5,
                amenities: [
                  { amenityText: 'Free Wi-Fi', wifiAvailability: true },
                  { amenityText: 'Air Conditioning', airCondition: true },
                  { amenityText: 'Flat Screen TV' },
                  { amenityText: 'Mini Bar' },
                  { amenityText: 'Private Bathroom' },
                  { amenityText: 'Daily Housekeeping' }
                ],
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1.jpg',
                  thumb_url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1_thumb.jpg'
                },
                gallery: [
                  { url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single2.jpg' }
                ]
              },
              {
                id: 2,
                name: 'Deluxe Room',
                description: 'More spacious than the Standard Room, offering upgraded furnishings, a better view, and enhanced comfort. Ideal for those seeking a little extra luxury.',
                price: '350.00',
                originalPrice: '420.00',
                isNegotiable: true,
                maxGuests: 3,
                bedType: 'King Bed',
                size: '35 sqm',
                available: 3,
                amenities: [
                  { amenityText: 'Free Wi-Fi', wifiAvailability: true },
                  { amenityText: 'Free Parking', parkingAvailability: true },
                  { amenityText: 'Air Conditioning', airCondition: true },
                  { amenityText: 'Flat Screen TV' },
                  { amenityText: 'Mini Bar' },
                  { amenityText: 'Balcony' },
                  { amenityText: 'City View' },
                  { amenityText: 'Premium Bathroom' }
                ],
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg',
                  thumb_url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1_thumb.jpg'
                },
                gallery: [
                  { url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg' },
                  { url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single4.jpg' }
                ]
              },
              {
                id: 3,
                name: 'Suite',
                description: 'A luxurious and expansive suite with separate living and sleeping areas, high-end amenities, and ultimate comfort. Perfect for extended stays or special occasions.',
                price: '600.00',
                originalPrice: '750.00',
                isNegotiable: true,
                maxGuests: 4,
                bedType: 'King Bed + Sofa Bed',
                size: '55 sqm',
                available: 2,
                amenities: [
                  { amenityText: 'Free Wi-Fi', wifiAvailability: true },
                  { amenityText: 'Free Parking', parkingAvailability: true },
                  { amenityText: 'Free Pool', poolAvailability: true },
                  { amenityText: 'Air Conditioning', airCondition: true },
                  { amenityText: 'Separate Living Area' },
                  { amenityText: 'Premium Bathroom' },
                  { amenityText: 'Kitchenette' },
                  { amenityText: 'Butler Service' },
                  { amenityText: 'City View' },
                  { amenityText: 'Balcony' }
                ],
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single4.jpg',
                  thumb_url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1_thumb.jpg'
                },
                gallery: [
                  { url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single2.jpg' },
                  { url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg' },
                  { url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single4.jpg' }
                ]
              }
            ],
            location: {
              id: 48797,
              lat: 40.706877,
              lng: -74.011265,
              formattedAddress: 'Broklyn New York, United States Of America',
              zipcode: '10001',
              city: 'Broklyn',
              state_long: 'New York',
              state_short: 'NY',
              country_long: 'United States Of America',
              country_short: 'USA',
              address: 'Broklyn New York, United States Of America'
            },
            localHighlights: [
              {
                category: 'Hall',
                locations: [
                  {
                    id: 1,
                    name: 'Chargoggagoggman',
                    address: '68-32 Main St, Flushing, Queens',
                    walkTime: '1 min',
                    driveTime: '1 min',
                    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                    coordinates: { lat: 40.7589, lng: -73.8294 }
                  },
                  {
                    id: 2,
                    name: 'Test',
                    address: '6850 Main St, Queens',
                    walkTime: '1 min',
                    driveTime: '1 min',
                    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400',
                    coordinates: { lat: 40.7614, lng: -73.8370 }
                  }
                ]
              },
              {
                category: 'New Test Category 1',
                locations: [
                  {
                    id: 3,
                    name: '1219-02',
                    address: '68-32 Main St, Flushing',
                    walkTime: '1 min',
                    driveTime: '1 min',
                    coordinates: { lat: 40.7589, lng: -73.8294 }
                  },
                  {
                    id: 4,
                    name: '1219-10',
                    address: '68-32 Main St, Flushing',
                    walkTime: '3 min',
                    driveTime: '1 min',
                    coordinates: { lat: 40.7614, lng: -73.8370 }
                  }
                ]
              },
              {
                category: 'New',
                icon: 'NEW',
                locations: [
                  {
                    id: 5,
                    name: 'Attraction 01',
                    address: '68-32 Main St, Flushing',
                    walkTime: '1 min',
                    driveTime: '1 min',
                    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
                    coordinates: { lat: 40.7589, lng: -73.8294 }
                  },
                  {
                    id: 6,
                    name: '1219-03',
                    address: '68-32 Main St, Flushing',
                    walkTime: '4 min',
                    driveTime: '1 min',
                    coordinates: { lat: 40.7614, lng: -73.8370 }
                  }
                ]
              },
              {
                category: 'New Attractions...',
                locations: [
                  {
                    id: 7,
                    name: 'Some Attraction 1',
                    address: '68-32 Main St, Flushing',
                    walkTime: '1 min',
                    driveTime: '1 min',
                    coordinates: { lat: 40.7589, lng: -73.8294 }
                  }
                ]
              }
            ],
            reviews: [
              {
                reviewID: 77370,
                reviewTitle: 'Quia asperiores et ducimus.',
                reviewText: 'Accusamus cumque architecto itaque porro sint nihil ipsam totam ducimus. Doloremque fuga fuga ab vel neque id eum et voluptatibus. Qui eius quos quas mollitia enim vel provident facere. Hic nobis sunt aut sed qui dolore nihil accusantium.',
                reviewAuthorFirstName: 'Terrance',
                reviewAuthorLastName: 'Wolff',
                reviewAuthorEmail: 'Reed_Okuneva@yahoo.com',
                reviewAuthorPic: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single7.jpg'
                },
                reviewDate: '2018-11-25T01:20:05.316Z',
                reviewFields: [
                  { rating: 4, ratingFieldName: 'Service' },
                  { rating: 1, ratingFieldName: 'Room' },
                  { rating: 3, ratingFieldName: 'Cleanness' },
                  { rating: 3, ratingFieldName: 'Food' }
                ]
              },
              {
                reviewID: 23288,
                reviewTitle: 'Qui unde exercitationem quis nulla ut earum qui ea sit.',
                reviewText: 'Distinctio at aut perspiciatis dolores. Sed sit ut labore nostrum. Est amet repellat dolore maiores id eligendi eveniet autem praesentium. Porro illo perspiciatis repellat atque laborum voluptatem tempore nobis odio.',
                reviewAuthorFirstName: 'Harmon',
                reviewAuthorLastName: 'Bechtelar',
                reviewAuthorEmail: 'Jacklyn.Corwin49@yahoo.com',
                reviewAuthorPic: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg'
                },
                reviewDate: '2018-02-28T00:50:14.479Z',
                reviewFields: [
                  { rating: 1, ratingFieldName: 'Service' },
                  { rating: 3, ratingFieldName: 'Room' },
                  { rating: 3, ratingFieldName: 'Cleanness' },
                  { rating: 3, ratingFieldName: 'Food' }
                ]
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
        // Fallback to mock data if fetch fails
        console.warn('Failed to fetch data from URL, using mock data:', err);
        const mockData = [
          {
            id: 65362,
            title: 'Awesome Cotton Chicken',
            slug: 'reiciendis-consequatur-dolore',
            content: 'In South Williamsburg only a few blocks inland from the East River, Marlo & Sons is a rustic respite with nice wine, good cocktails, and excellent snacking fare such as oysters, local cheese, and potato tortilla. But there\'s more: seasonal salads and soups, the famous brick chicken, a dimly lit space outfitted in various types of wood (this is an Andrew Tarlow restaurant, after all). In many ways, this place represents everything that makes Brooklyn dining special - the attention to detail, the commitment to quality ingredients, and the warm, inviting atmosphere that makes you want to stay for hours.',
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
              { name: 'Air Conditioning', icon: 'snowflake', airCondition: true },
              { name: 'Restaurant', icon: 'restaurant' },
              { name: 'Spa & Wellness', icon: 'spa' },
              { name: 'Fitness Center', icon: 'fitness' },
              { name: 'Business Center', icon: 'business' },
              { name: 'Room Service', icon: 'service' },
              { name: 'Laundry Service', icon: 'laundry' },
              { name: 'Pet Friendly', icon: 'pet' },
              { name: '24/7 Front Desk', icon: 'desk' }
            ],
            roomTypes: [
              {
                id: 1,
                name: 'Standard Room',
                description: 'A comfortable and well-appointed room, perfect for solo travelers or couples. Includes essential amenities for a pleasant stay.',
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
                  { name: 'Air Conditioning', icon: 'snowflake' },
                  { name: 'Flat Screen TV', icon: 'tv' },
                  { name: 'Private Bathroom', icon: 'bath' },
                  { name: 'Room Service', icon: 'service' }
                ]
              },
              {
                id: 2,
                name: 'Deluxe Room',
                description: 'Spacious room with premium amenities and city views. Perfect for business travelers or couples seeking extra comfort.',
                price: 250,
                originalPrice: 300,
                maxGuests: 3,
                size: '35 sqm',
                bedType: '1 King Bed',
                available: 5,
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single2.jpg',
                  alt: 'Deluxe Room'
                },
                amenities: [
                  { name: 'Free Wi-Fi', icon: 'wifi' },
                  { name: 'Air Conditioning', icon: 'snowflake' },
                  { name: 'Flat Screen TV', icon: 'tv' },
                  { name: 'Private Bathroom', icon: 'bath' },
                  { name: 'Room Service', icon: 'service' },
                  { name: 'Mini Bar', icon: 'minibar' },
                  { name: 'City View', icon: 'view' }
                ]
              },
              {
                id: 3,
                name: 'Executive Suite',
                description: 'Luxurious suite with separate living area and premium amenities. Ideal for extended stays or special occasions.',
                price: 400,
                originalPrice: 480,
                maxGuests: 4,
                size: '55 sqm',
                bedType: '1 King Bed + Sofa',
                available: 3,
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg',
                  alt: 'Executive Suite'
                },
                amenities: [
                  { name: 'Free Wi-Fi', icon: 'wifi' },
                  { name: 'Air Conditioning', icon: 'snowflake' },
                  { name: 'Flat Screen TV', icon: 'tv' },
                  { name: 'Private Bathroom', icon: 'bath' },
                  { name: 'Room Service', icon: 'service' },
                  { name: 'Mini Bar', icon: 'minibar' },
                  { name: 'City View', icon: 'view' },
                  { name: 'Separate Living Area', icon: 'sofa' },
                  { name: 'Executive Lounge Access', icon: 'lounge' }
                ]
              },
              {
                id: 4,
                name: 'Presidential Suite',
                description: 'The ultimate luxury experience with panoramic views, butler service, and exclusive amenities.',
                price: 800,
                originalPrice: 1000,
                maxGuests: 6,
                size: '85 sqm',
                bedType: '2 King Beds',
                available: 1,
                image: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1.jpg',
                  alt: 'Presidential Suite'
                },
                amenities: [
                  { name: 'Free Wi-Fi', icon: 'wifi' },
                  { name: 'Air Conditioning', icon: 'snowflake' },
                  { name: 'Flat Screen TV', icon: 'tv' },
                  { name: 'Private Bathroom', icon: 'bath' },
                  { name: 'Room Service', icon: 'service' },
                  { name: 'Mini Bar', icon: 'minibar' },
                  { name: 'Panoramic View', icon: 'view' },
                  { name: 'Separate Living Area', icon: 'sofa' },
                  { name: 'Executive Lounge Access', icon: 'lounge' },
                  { name: 'Butler Service', icon: 'butler' },
                  { name: 'Private Balcony', icon: 'balcony' }
                ]
              }
            ],
            reviews: [
              {
                reviewId: 1,
                reviewTitle: 'Exceptional Service and Comfort',
                reviewAuthorName: 'Sarah Johnson',
                reviewAuthorPic: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single2.jpg'
                },
                reviewDate: '2018-02-28T00:50:14.479Z',
                reviewFields: [
                  { rating: 5, ratingFieldName: 'Service' },
                  { rating: 5, ratingFieldName: 'Room' },
                  { rating: 4, ratingFieldName: 'Cleanness' },
                  { rating: 5, ratingFieldName: 'Food' }
                ]
              },
              {
                reviewId: 2,
                reviewTitle: 'Great Location and Amenities',
                reviewAuthorName: 'Michael Chen',
                reviewAuthorPic: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg'
                },
                reviewDate: '2018-02-28T00:50:14.479Z',
                reviewFields: [
                  { rating: 4, ratingFieldName: 'Service' },
                  { rating: 5, ratingFieldName: 'Room' },
                  { rating: 5, ratingFieldName: 'Cleanness' },
                  { rating: 4, ratingFieldName: 'Food' }
                ]
              },
              {
                reviewId: 3,
                reviewTitle: 'Average Experience',
                reviewAuthorName: 'Emily Davis',
                reviewAuthorPic: {
                  url: 'http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-single3.jpg'
                },
                reviewDate: '2018-02-28T00:50:14.479Z',
                reviewFields: [
                  { rating: 1, ratingFieldName: 'Service' },
                  { rating: 3, ratingFieldName: 'Room' },
                  { rating: 3, ratingFieldName: 'Cleanness' },
                  { rating: 3, ratingFieldName: 'Food' }
                ]
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
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataApi;