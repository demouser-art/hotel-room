import React from 'react';
import { Button, Rate } from 'antd';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const BottomReservationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #f0f0f0;
  padding: 16px 20px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .bottom-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hotel-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .hotel-details {
      .hotel-title {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 4px;
      }

      .hotel-rating {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .booking-info {
    display: flex;
    align-items: center;
    gap: 20px;

    .price-info {
      text-align: right;

      .price-label {
        font-size: 12px;
        color: #666;
      }

      .price-value {
        font-size: 20px;
        font-weight: 700;
        color: #1890ff;
      }
    }

    .book-button {
      height: 48px;
      padding: 0 24px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    .bottom-content {
      flex-direction: column;
      gap: 16px;
    }

    .hotel-info {
      width: 100%;
      justify-content: center;
    }

    .booking-info {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

const BottomReservation = ({ 
  title, 
  price, 
  rating, 
  ratingCount, 
  selectedRooms = [], 
  onBookNow 
}) => {
  const calculateTotal = () => {
    if (selectedRooms.length === 0) return price;
    return selectedRooms.reduce((total, room) => total + room.totalPrice, 0);
  };

  const getTotalRooms = () => {
    return selectedRooms.reduce((total, room) => total + room.quantity, 0);
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(selectedRooms);
    } else {
      // Scroll to room selection
      const roomSection = document.querySelector('.room-selection-header');
      if (roomSection) {
        roomSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <BottomReservationWrapper>
      <div className="bottom-content">
        <div className="hotel-info">
          <div className="hotel-details">
            <div className="hotel-title">{title}</div>
            <div className="hotel-rating">
              <Rate disabled value={rating} size="small" />
              <span style={{ fontSize: '12px', color: '#666' }}>
                ({ratingCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="booking-info">
          <div className="price-info">
            <div className="price-label">
              {selectedRooms.length > 0 ? 'Total' : 'Starting from'}
            </div>
            <div className="price-value">${calculateTotal()}</div>
          </div>

          <Button
            type="primary"
            className="book-button"
            onClick={handleBookNow}
          >
            {selectedRooms.length > 0 ? 
              `Book ${getTotalRooms()} Room${getTotalRooms() > 1 ? 's' : ''}` : 
              'Select Rooms'
            }
          </Button>
        </div>
      </div>
    </BottomReservationWrapper>
  );
};

export default BottomReservation;