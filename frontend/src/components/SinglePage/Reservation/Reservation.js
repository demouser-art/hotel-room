import React from 'react';
import { Card, Button, Divider, message } from 'antd';
import { 
  CalendarOutlined, 
  TeamOutlined, 
  DollarOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

const ReservationWrapper = styled(Card)`
  .ant-card-body {
    padding: 24px;
  }

  .reservation-header {
    text-align: center;
    margin-bottom: 24px;

    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    p {
      color: #666;
      font-size: 14px;
    }
  }

  .reservation-summary {
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .summary-label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        font-size: 14px;
      }

      .summary-value {
        font-weight: 600;
        color: #333;
      }
    }

    .total-item {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;

      .summary-label {
        color: #1890ff;
        font-weight: 600;
        font-size: 16px;
      }

      .summary-value {
        color: #1890ff;
        font-weight: 700;
        font-size: 20px;
      }
    }
  }

  .reservation-actions {
    margin-top: 24px;

    .book-now-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .contact-btn {
      width: 100%;
      height: 40px;
      font-size: 14px;
      border-radius: 6px;
    }
  }

  .no-rooms-message {
    text-align: center;
    padding: 40px 20px;
    color: #666;

    .empty-icon {
      font-size: 48px;
      color: #d9d9d9;
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
      margin-bottom: 16px;
    }

    .select-rooms-btn {
      background: #1890ff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      
      &:hover {
        background: #40a9ff;
      }
    }
  }
`;

const Reservation = ({ selectedRooms = [], onBookNow, onContactHotel }) => {
  const calculateTotal = () => {
    return selectedRooms.reduce((total, room) => total + room.totalPrice, 0);
  };

  const getTotalRooms = () => {
    return selectedRooms.reduce((total, room) => total + room.quantity, 0);
  };

  const getTotalGuests = () => {
    return selectedRooms.reduce((total, room) => total + (room.guests || 2), 0);
  };

  const getNights = () => {
    return selectedRooms.length > 0 ? selectedRooms[0].nights : 0;
  };

  const handleBookNow = () => {
    if (selectedRooms.length === 0) {
      message.warning('Please select at least one room to proceed');
      return;
    }

    if (onBookNow) {
      onBookNow(selectedRooms);
    } else {
      message.success('Booking feature coming soon!');
    }
  };

  const handleContactHotel = () => {
    if (onContactHotel) {
      onContactHotel();
    } else {
      message.info('Contact: +1-800-HOTEL');
    }
  };

  const scrollToRooms = () => {
    const roomSection = document.querySelector('.room-selection-header');
    if (roomSection) {
      roomSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (selectedRooms.length === 0) {
    return (
      <ReservationWrapper>
        <div className="no-rooms-message">
          <div className="empty-icon">🏨</div>
          <p>No rooms selected yet</p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Choose your perfect room from our selection below
          </p>
          <button className="select-rooms-btn" onClick={scrollToRooms}>
            Select Rooms
          </button>
        </div>
      </ReservationWrapper>
    );
  }

  return (
    <ReservationWrapper>
      <div className="reservation-header">
        <h3>Booking Summary</h3>
        <p>Review your selection before booking</p>
      </div>

      <div className="reservation-summary">
        <div className="summary-item">
          <div className="summary-label">
            <CalendarOutlined />
            <span>Duration</span>
          </div>
          <div className="summary-value">
            {getNights()} night{getNights() > 1 ? 's' : ''}
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-label">
            <TeamOutlined />
            <span>Guests</span>
          </div>
          <div className="summary-value">{getTotalGuests()} guests</div>
        </div>

        <div className="summary-item">
          <div className="summary-label">
            <CheckCircleOutlined />
            <span>Rooms</span>
          </div>
          <div className="summary-value">{getTotalRooms()} room{getTotalRooms() > 1 ? 's' : ''}</div>
        </div>

        <Divider />

        {selectedRooms.map((room, index) => (
          <div key={`${room.id}-${index}`} className="summary-item">
            <div className="summary-label">
              <span>{room.type} × {room.quantity}</span>
            </div>
            <div className="summary-value">${room.totalPrice}</div>
          </div>
        ))}

        <div className="summary-item total-item">
          <div className="summary-label">
            <DollarOutlined />
            <span>Total Amount</span>
          </div>
          <div className="summary-value">${calculateTotal()}</div>
        </div>
      </div>

      <div className="reservation-actions">
        <Button
          type="primary"
          className="book-now-btn"
          onClick={handleBookNow}
        >
          Book Now - ${calculateTotal()}
        </Button>
        
        <Button
          type="default"
          className="contact-btn"
          onClick={handleContactHotel}
        >
          Contact Hotel
        </Button>
      </div>
    </ReservationWrapper>
  );
};

export default Reservation;