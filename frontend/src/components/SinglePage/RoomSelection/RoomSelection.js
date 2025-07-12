import React, { useState } from 'react';
import { InputNumber, Button, message, DatePicker, Select } from 'antd';
import { 
  UserOutlined, 
  HomeOutlined,
  EyeOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { RoomSelectionWrapper, RoomCard, SelectedRoomsWrapper } from '../SinglePageView.style';
import RoomDetailsModal from '../RoomDetailsModal/RoomDetailsModal';
import dayjs from 'dayjs';

const RoomSelection = ({ roomTypes, onRoomSelect, selectedRooms, onUpdateSelection }) => {
  const [roomQuantities, setRoomQuantities] = useState({});
  const [selectedRoomForModal, setSelectedRoomForModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(2);

  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const handleRoomQuantityChange = (roomId, quantity) => {
    setRoomQuantities(prev => ({
      ...prev,
      [roomId]: quantity
    }));
  };

  const handleSelectRoom = (room) => {
    const quantity = roomQuantities[room.id] || 1;
    
    if (quantity > room.available) {
      message.error(`Only ${room.available} rooms available`);
      return;
    }

    const selectedRoom = {
      ...room,
      quantity,
      price: parseFloat(room.price)
    };

    onRoomSelect(selectedRoom);
    message.success(`${quantity} ${room.name}(s) added to selection`);
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

  const showRoomDetails = (room) => {
    setSelectedRoomForModal(room);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRoomForModal(null);
  };

  const getMediaCount = (room) => {
    if (!room.media || room.media.length === 0) return '';
    
    const photoCount = room.media.filter(m => m.type === 'image').length;
    const videoCount = room.media.filter(m => m.type === 'video').length;
    
    if (photoCount > 0 && videoCount > 0) {
      return `${photoCount + videoCount} PHOTOS`;
    } else if (photoCount > 0) {
      return `${photoCount} PHOTO${photoCount > 1 ? 'S' : ''}`;
    } else if (videoCount > 0) {
      return `${videoCount} VIDEO${videoCount > 1 ? 'S' : ''}`;
    }
    return '';
  };

  const getMainImage = (room) => {
    // Get the first image from media array, or fallback to image.url
    if (room.media && room.media.length > 0) {
      const firstImage = room.media.find(m => m.type === 'image');
      if (firstImage) {
        return firstImage.url;
      }
    }
    return room.image?.url || '/images/default-room.jpg';
  };

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
    return 1; // Default to 1 night if no dates selected
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return selectedRooms.reduce((total, room) => {
      return total + (room.price * room.quantity * nights);
    }, 0);
  };

  return (
    <RoomSelectionWrapper>
      <div className="room-selection-header">
        <h2>Choose Your Perfect Room</h2>
        <p>Select your preferred room type for the best experience</p>
      </div>

      <div className="date-guest-selection">
        <div className="date-picker-group">
          <label>Select Dates</label>
          <RangePicker
            value={checkInDate && checkOutDate ? [checkInDate, checkOutDate] : []}
            onChange={handleDateChange}
            placeholder={['Check-in', 'Check-out']}
            disabledDate={(current) => {
              return current && current < dayjs().startOf('day');
            }}
            className="date-range-picker"
          />
        </div>
        
        <div className="guests-selector">
          <label>Guests</label>
          <Select
            value={guests}
            onChange={setGuests}
            className="guests-select"
            suffixIcon={<UserOutlined />}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <Option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="rooms-grid">
        {roomTypes && roomTypes.length > 0 ? roomTypes.map(room => (
          <RoomCard key={room.id} available={room.available}>
            <div className="room-image">
              <img src={getMainImage(room)} alt={room.name} />
              <div className="availability-badge">
                {room.available > 0 ? `${room.available} available` : 'Sold out'}
              </div>
              {room.media && room.media.length > 0 && (
                <div className="photo-count-overlay" onClick={() => showRoomDetails(room)}>
                  {getMediaCount(room)}
                </div>
              )}
            </div>

            <div className="room-content">
              <div className="room-header">
                <div className="room-title-section">
                  <h3>{room.name}</h3>
                  <div className="room-info">
                    <span><UserOutlined /> Up to {room.maxGuests} guests</span>
                    <span><HomeOutlined /> {room.size}</span>
                    <span>🛏️ {room.bedType}</span>
                  </div>
                  <div className="room-description">{room.description}</div>
                </div>

                <div className="room-price">
                  <span className="current-price">${room.price}</span>
                  {room.originalPrice && (
                    <span className="original-price">${room.originalPrice}</span>
                  )}
                  <span className="per-night">per night</span>
                </div>
              </div>

              <div className="room-amenities">
                <div className="amenities-title">Room Amenities:</div>
                <div className="amenities-list">
                  {room.amenities && room.amenities.length > 0 ? (
                    <>
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity.amenityText}</span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="amenity-tag">+{room.amenities.length - 4} more</span>
                      )}
                    </>
                  ) : (
                    <span className="amenity-tag">Standard amenities included</span>
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

              {room.media && room.media.length > 0 && (
                <div className="more-details-link">
                  <Button 
                    type="link" 
                    onClick={() => showRoomDetails(room)}
                    className="details-link-btn"
                  >
                    More Details
                  </Button>
                </div>
              )}
            </div>
          </RoomCard>
        )) : (
          <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
            No rooms available
          </div>
        )}
      </div>

      {selectedRooms && selectedRooms.length > 0 && (
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
                  <div className="room-type">{room.name}</div>
                  <div className="room-details">
                    {room.quantity} room{room.quantity > 1 ? 's' : ''} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="room-total">
                  <div className="quantity">
                    ${room.price} × {room.quantity} × {calculateNights()}
                  </div>
                  <div className="price">${room.price * room.quantity * calculateNights()}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-section">
            <div className="total-breakdown">
              <span>Total for {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="grand-total">
              <span>Grand Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </SelectedRoomsWrapper>
      )}
      
      <RoomDetailsModal
        visible={isModalVisible}
        onClose={closeModal}
        room={selectedRoomForModal}
      />
    </RoomSelectionWrapper>
  );
};

export default RoomSelection;