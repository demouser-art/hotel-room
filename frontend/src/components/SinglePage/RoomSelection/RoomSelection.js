import React, { useState } from 'react';
import { InputNumber, Button, message } from 'antd';
import { 
  UserOutlined, 
  HomeOutlined,
  EyeOutlined,
  PictureOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { RoomSelectionWrapper, RoomCard, SelectedRoomsWrapper } from '../SinglePageView.style';
import RoomDetailsModal from '../RoomDetailsModal/RoomDetailsModal';

const RoomSelection = ({ roomTypes, onRoomSelect, selectedRooms, onUpdateSelection }) => {
  const [roomQuantities, setRoomQuantities] = useState({});
  const [selectedRoomForModal, setSelectedRoomForModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      return `${photoCount} Photo${photoCount > 1 ? 's' : ''} + ${videoCount} Video${videoCount > 1 ? 's' : ''}`;
    } else if (photoCount > 0) {
      return `${photoCount} Photo${photoCount > 1 ? 's' : ''}`;
    } else if (videoCount > 0) {
      return `${videoCount} Video${videoCount > 1 ? 's' : ''}`;
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

  return (
    <RoomSelectionWrapper>
      <div className="room-selection-header">
        <h2>Choose Your Perfect Room</h2>
        <p>Select your preferred room type for the best experience</p>
      </div>

      <div className="rooms-grid">
        {roomTypes.map(room => (
          <RoomCard key={room.id} available={room.available}>
            <div className="room-image">
              <img src={getMainImage(room)} alt={room.name} />
              <div className="availability-badge">
                {room.available > 0 ? `${room.available} available` : 'Sold out'}
              </div>
              {room.media && room.media.length > 0 && (
                <div className="media-info-overlay">
                  <div className="media-count" onClick={() => showRoomDetails(room)}>
                    {getMediaCount(room)}
                  </div>
                  <div className="media-icons">
                    {room.media.some(m => m.type === 'image') && <PictureOutlined />}
                    {room.media.some(m => m.type === 'video') && <VideoCameraOutlined />}
                  </div>
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
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity.amenityText}</span>
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
                  <div className="room-type">{room.name}</div>
                  <div className="room-details">
                    {room.quantity} room{room.quantity > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="room-total">
                  <div className="quantity">
                    ${room.price} × {room.quantity}
                  </div>
                  <div className="price">${room.price * room.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </SelectedRoomsWrapper>
      )}
    </RoomSelectionWrapper>
  );
};

export default RoomSelection;