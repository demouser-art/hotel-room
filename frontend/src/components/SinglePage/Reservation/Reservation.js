import React, { useState } from 'react';
import { Card, Button, Divider, DatePicker, InputNumber, message } from 'antd';
import { 
  CalendarOutlined, 
  TeamOutlined, 
  DollarOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

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

  .date-guest-selection {
    margin-bottom: 24px;

    .selection-item {
      margin-bottom: 16px;

      label {
        display: block;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .ant-picker,
      .ant-input-number {
        width: 100%;
      }
    }

    .nights-display {
      text-align: center;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 8px;
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

  .no-selection-message {
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
  }
`;

const Reservation = ({ selectedRooms = [], onBookNow, onContactHotel }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(2);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setCheckInDate(dates[0]);
      setCheckOutDate(dates[1]);
    } else {
      setCheckInDate(null);
      setCheckOutDate(null);
    }
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      return checkOutDate.diff(checkInDate, 'day');
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (nights <= 0) return 0;
    return selectedRooms.reduce((total, room) => total + (room.price * room.quantity * nights), 0);
  };

  const getTotalRooms = () => {
    return selectedRooms.reduce((total, room) => total + room.quantity, 0);
  };

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      message.error('Please select check-in and check-out dates');
      return;
    }

    if (selectedRooms.length === 0) {
      message.warning('Please select at least one room to proceed');
      return;
    }

    const bookingData = {
      rooms: selectedRooms,
      checkInDate: checkInDate.format('YYYY-MM-DD'),
      checkOutDate: checkOutDate.format('YYYY-MM-DD'),
      guests,
      nights: calculateNights(),
      totalAmount: calculateTotal()
    };

    if (onBookNow) {
      onBookNow(bookingData);
    } else {
      message.success('Booking feature coming soon!');
    }
  };

  const handleContactHotel = () => {
    if (onContactHotel) {
      onContactHotel();
    } else {
      message.info('Contact: 1-403-000-9038 x910');
    }
  };

  return (
    <ReservationWrapper>
      <div className="reservation-header">
        <h3>Make a Reservation</h3>
        <p>Select your dates and complete booking</p>
      </div>

      <div className="date-guest-selection">
        <div className="selection-item">
          <label>
            <CalendarOutlined />
            Select Dates
          </label>
          <RangePicker
            size="large"
            onChange={handleDateChange}
            disabledDate={(current) => current && current < dayjs().endOf('day')}
            placeholder={['Check-in', 'Check-out']}
          />
        </div>

        <div className="selection-item">
          <label>
            <TeamOutlined />
            Number of Guests
          </label>
          <InputNumber
            size="large"
            min={1}
            max={20}
            value={guests}
            onChange={setGuests}
          />
        </div>

        {checkInDate && checkOutDate && (
          <div className="nights-display">
            Duration: {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {selectedRooms.length > 0 && checkInDate && checkOutDate ? (
        <>
          <div className="reservation-summary">
            <div className="summary-item">
              <div className="summary-label">
                <CheckCircleOutlined />
                <span>Rooms</span>
              </div>
              <div className="summary-value">{getTotalRooms()} room{getTotalRooms() > 1 ? 's' : ''}</div>
            </div>

            <div className="summary-item">
              <div className="summary-label">
                <TeamOutlined />
                <span>Guests</span>
              </div>
              <div className="summary-value">{guests} guests</div>
            </div>

            <div className="summary-item">
              <div className="summary-label">
                <CalendarOutlined />
                <span>Duration</span>
              </div>
              <div className="summary-value">
                {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
              </div>
            </div>

            <Divider />

            {selectedRooms.map((room, index) => (
              <div key={`${room.id}-${index}`} className="summary-item">
                <div className="summary-label">
                  <span>{room.name} × {room.quantity}</span>
                </div>
                <div className="summary-value">${room.price * room.quantity * calculateNights()}</div>
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
        </>
      ) : (
        <div className="no-selection-message">
          <div className="empty-icon">📅</div>
          <p>Select dates and rooms to see pricing</p>
        </div>
      )}
    </ReservationWrapper>
  );
};

export default Reservation;