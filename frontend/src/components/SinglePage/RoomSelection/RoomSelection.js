import React, { useState } from 'react';
import { DatePicker, InputNumber, Button, Select, message } from 'antd';
import { 
  UserOutlined, 
  HomeOutlined, 
  CalendarOutlined,
  TeamOutlined 
} from '@ant-design/icons';
import { RoomSelectionWrapper, RoomCard, SelectedRoomsWrapper } from '../SinglePageView.style';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const RoomSelection = ({ rooms, onRoomSelect, selectedRooms, onUpdateSelection }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(2);
  const [roomQuantities, setRoomQuantities] = useState({});

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setCheckInDate(dates[0]);
      setCheckOutDate(dates[1]);
    } else {
      setCheckInDate(null);
      setCheckOutDate(null);
    }
  };

  const handleRoomQuantityChange = (roomId, quantity) => {
    setRoomQuantities(prev => ({
      ...prev,
      [roomId]: quantity
    }));
  };

  const handleSelectRoom = (room) => {
    if (!checkInDate || !checkOutDate) {
      message.error('Please select check-in and check-out dates');
      return;
    }

    const quantity = roomQuantities[room.id] || 1;
    
    if (quantity > room.available) {
      message.error(`Only ${room.available} rooms available`);
      return;
    }

    const nights = checkOutDate.diff(checkInDate, 'day');
    const totalPrice = room.price * quantity * nights;

    const selectedRoom = {
      ...room,
      quantity,
      nights,
      totalPrice,
      checkInDate: checkInDate.format('YYYY-MM-DD'),
      checkOutDate: checkOutDate.format('YYYY-MM-DD'),
      guests
    };

    onRoomSelect(selectedRoom);
    message.success(`${quantity} ${room.type}(s) added to selection`);
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      return checkOutDate.diff(checkInDate, 'day');
    }
    return 0;
  };

  const calculateGrandTotal = () => {
    return selectedRooms.reduce((total, room) => total + room.totalPrice, 0);
  };

  const clearSelection = () => {
    onUpdateSelection([]);
    message.success('Selection cleared');
  };

  const removeRoom = (roomId) => {
    const updatedRooms = selectedRooms.filter(room => room.id !== roomId);
    onUpdateSelection(updatedRooms);
    message.success('Room removed from selection');
  };

  return (
    <RoomSelectionWrapper>
      <div className="room-selection-header">
        <h2>Choose Your Perfect Room</h2>
        <p>Select your dates and preferred room type for the best experience</p>
      </div>

      <div className="date-selection">
        <div className="date-picker-group">
          <label><CalendarOutlined /> Select Dates</label>
          <RangePicker
            size="large"
            onChange={handleDateChange}
            disabledDate={(current) => current && current < dayjs().endOf('day')}
            placeholder={['Check-in', 'Check-out']}
            style={{ width: 300 }}
          />
        </div>

        <div className="guests-selector">
          <label><TeamOutlined /> Number of Guests</label>
          <InputNumber
            size="large"
            min={1}
            max={10}
            value={guests}
            onChange={setGuests}
            style={{ width: 120 }}
          />
        </div>
      </div>

      {checkInDate && checkOutDate && (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Duration: {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="rooms-grid">
        {rooms.map(room => (
          <RoomCard key={room.id} available={room.available}>
            <div className="room-image">
              <img src={room.images[0]} alt={room.type} />
              <div className="availability-badge">
                {room.available > 0 ? `${room.available} available` : 'Sold out'}
              </div>
            </div>

            <div className="room-content">
              <div className="room-header">
                <h3>{room.type}</h3>
                <div className="room-price">
                  <span className="current-price">${room.price}</span>
                  {room.originalPrice && (
                    <span className="original-price">${room.originalPrice}</span>
                  )}
                  <span className="per-night">per night</span>
                </div>
              </div>

              <div className="room-details">
                <div className="room-info">
                  <span><UserOutlined /> Up to {room.maxGuests} guests</span>
                  <span><HomeOutlined /> {room.size}</span>
                  <span>🛏️ {room.bedType}</span>
                </div>
                <p className="room-description">{room.description}</p>
              </div>

              <div className="room-amenities">
                <div className="amenities-title">Room Amenities:</div>
                <div className="amenities-list">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="amenity-tag">+{room.amenities.length - 4} more</span>
                  )}
                </div>
              </div>

              <div className="room-actions">
                <div className="quantity-selector">
                  <label>Rooms:</label>
                  <InputNumber
                    min={1}
                    max={room.available}
                    value={roomQuantities[room.id] || 1}
                    onChange={(value) => handleRoomQuantityChange(room.id, value)}
                    disabled={room.available === 0}
                  />
                </div>
                <Button
                  type="primary"
                  className="select-room-btn"
                  onClick={() => handleSelectRoom(room)}
                  disabled={room.available === 0}
                >
                  {room.available === 0 ? 'Not Available' : 'Select Room'}
                </Button>
              </div>
            </div>
          </RoomCard>
        ))}
      </div>

      {selectedRooms.length > 0 && (
        <SelectedRoomsWrapper>
          <div className="selected-rooms-header">
            <h3>Selected Rooms ({selectedRooms.length})</h3>
            <button className="clear-selection" onClick={clearSelection}>
              Clear All
            </button>
          </div>

          <div className="selected-rooms-list">
            {selectedRooms.map((room, index) => (
              <div key={`${room.id}-${index}`} className="selected-room-item">
                <div className="room-info">
                  <div className="room-type">{room.type}</div>
                  <div className="room-details">
                    {room.quantity} room{room.quantity > 1 ? 's' : ''} × {room.nights} night{room.nights > 1 ? 's' : ''}
                    <br />
                    {room.checkInDate} to {room.checkOutDate}
                  </div>
                </div>
                <div className="room-total">
                  <div className="quantity">
                    ${room.price} × {room.quantity} × {room.nights}
                  </div>
                  <div className="price">${room.totalPrice}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="total-section">
            <div className="total-breakdown">
              <span>Total Rooms:</span>
              <span>{selectedRooms.reduce((total, room) => total + room.quantity, 0)}</span>
            </div>
            <div className="total-breakdown">
              <span>Total Nights:</span>
              <span>{calculateNights()}</span>
            </div>
            <div className="grand-total">
              <span>Grand Total:</span>
              <span>${calculateGrandTotal()}</span>
            </div>
          </div>
        </SelectedRoomsWrapper>
      )}
    </RoomSelectionWrapper>
  );
};

export default RoomSelection;