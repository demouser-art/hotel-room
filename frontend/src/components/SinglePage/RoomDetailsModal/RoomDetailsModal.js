import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { 
  LeftOutlined, 
  RightOutlined, 
  CloseOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const RoomDetailsModalWrapper = styled.div`
  .room-details-modal {
    .ant-modal-content {
      padding: 0;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .ant-modal-body {
      padding: 0;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  min-height: 80vh;
  background: #000;
  
  .media-section {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #000;
    
    .media-container {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 500px;
      
      img, video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
      }
      
      .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translate(-50%, -50%) scale(1.1);
        }
        
        .anticon {
          font-size: 40px;
          color: white;
        }
      }
    }
    
    .media-controls {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      align-items: center;
      background: rgba(0, 0, 0, 0.8);
      padding: 12px 20px;
      border-radius: 24px;
      
      .nav-button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      
      .media-counter {
        color: white;
        font-size: 14px;
        margin: 0 12px;
        font-weight: 500;
      }
    }
    
    .media-nav {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      max-width: 80%;
      overflow-x: auto;
      padding: 8px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      
      .thumbnail {
        width: 60px;
        height: 40px;
        object-fit: cover;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s ease;
        position: relative;
        
        &:hover {
          opacity: 0.8;
        }
        
        &.active {
          opacity: 1;
          border: 2px solid white;
        }
        
        .video-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
        }
      }
    }
  }
  
  .details-section {
    width: 400px;
    background: white;
    padding: 30px;
    overflow-y: auto;
    
    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.5);
      border: none;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      
      &:hover {
        background: rgba(0, 0, 0, 0.7);
      }
    }
    
    .room-title {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    
    .room-description {
      color: #666;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    
    .room-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
      
      .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        
        .label {
          font-size: 12px;
          color: #999;
          text-transform: uppercase;
          font-weight: 600;
        }
        
        .value {
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }
      }
    }
    
    .price-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 24px;
      
      .current-price {
        font-size: 28px;
        font-weight: 700;
        color: #1890ff;
      }
      
      .original-price {
        font-size: 18px;
        color: #999;
        text-decoration: line-through;
        margin-left: 8px;
      }
      
      .per-night {
        font-size: 14px;
        color: #666;
        display: block;
        margin-top: 4px;
      }
    }
    
    .amenities-section {
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 16px;
      }
      
      .amenities-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
          
          .icon {
            font-size: 16px;
          }
        }
      }
    }
    
    .media-info {
      background: #f0f2f5;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      
      .media-count {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
      }
      
      .media-types {
        display: flex;
        gap: 16px;
        
        .media-type {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #999;
          
          .anticon {
            font-size: 14px;
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    .media-section {
      height: 60vh;
    }
    
    .details-section {
      width: 100%;
      max-height: 40vh;
    }
  }
`;

const RoomDetailsModal = ({ visible, onClose, room }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!room || !room.media) return null;

  const media = room.media || [];
  const currentMedia = media[currentMediaIndex];
  
  const photoCount = media.filter(m => m.type === 'image').length;
  const videoCount = media.filter(m => m.type === 'video').length;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    setIsVideoPlaying(false);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsVideoPlaying(false);
  };

  const goToMedia = (index) => {
    setCurrentMediaIndex(index);
    setIsVideoPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const formatMediaCount = () => {
    if (photoCount > 0 && videoCount > 0) {
      return `${photoCount} Photo${photoCount > 1 ? 's' : ''} + ${videoCount} Video${videoCount > 1 ? 's' : ''}`;
    } else if (photoCount > 0) {
      return `${photoCount} Photo${photoCount > 1 ? 's' : ''}`;
    } else if (videoCount > 0) {
      return `${videoCount} Video${videoCount > 1 ? 's' : ''}`;
    }
    return 'No media';
  };

  return (
    <RoomDetailsModalWrapper>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        width="100%"
        style={{ top: 20, maxWidth: 1200 }}
        className="room-details-modal"
        closable={false}
        maskClosable={true}
      >
        <ModalContent>
          <div className="media-section">
            <button className="close-button" onClick={onClose}>
              <CloseOutlined />
            </button>
            
            <div className="media-container">
              {currentMedia?.type === 'image' ? (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.alt}
                />
              ) : (
                <div style={{ position: 'relative' }}>
                  <video
                    src={currentMedia?.url}
                    poster={currentMedia?.thumbnail}
                    controls={isVideoPlaying}
                    style={{ display: isVideoPlaying ? 'block' : 'none' }}
                  />
                  {!isVideoPlaying && (
                    <>
                      <img
                        src={currentMedia?.thumbnail}
                        alt={currentMedia?.alt}
                      />
                      <div className="play-overlay" onClick={handleVideoPlay}>
                        <PlayCircleOutlined />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="media-nav">
              {media.map((mediaItem, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === currentMediaIndex ? 'active' : ''}`}
                  onClick={() => goToMedia(index)}
                >
                  <img
                    src={mediaItem.type === 'image' ? mediaItem.url : mediaItem.thumbnail}
                    alt={mediaItem.alt}
                  />
                  {mediaItem.type === 'video' && (
                    <div className="video-indicator">
                      <PlayCircleOutlined />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="media-controls">
              <button
                className="nav-button"
                onClick={prevMedia}
                disabled={media.length <= 1}
              >
                <LeftOutlined />
              </button>
              
              <span className="media-counter">
                {currentMediaIndex + 1} / {media.length}
              </span>
              
              <button
                className="nav-button"
                onClick={nextMedia}
                disabled={media.length <= 1}
              >
                <RightOutlined />
              </button>
            </div>
          </div>

          <div className="details-section">
            <h1 className="room-title">{room.name}</h1>
            
            <p className="room-description">{room.description}</p>
            
            <div className="room-info-grid">
              <div className="info-item">
                <span className="label">Max Guests</span>
                <span className="value">{room.maxGuests} guests</span>
              </div>
              <div className="info-item">
                <span className="label">Room Size</span>
                <span className="value">{room.size}</span>
              </div>
              <div className="info-item">
                <span className="label">Bed Type</span>
                <span className="value">{room.bedType}</span>
              </div>
              <div className="info-item">
                <span className="label">Availability</span>
                <span className="value">{room.available} rooms</span>
              </div>
            </div>
            
            <div className="price-section">
              <div>
                <span className="current-price">${room.price}</span>
                {room.originalPrice && (
                  <span className="original-price">${room.originalPrice}</span>
                )}
              </div>
              <span className="per-night">per night</span>
            </div>
            
            <div className="media-info">
              <div className="media-count">
                {formatMediaCount()}
              </div>
              <div className="media-types">
                {photoCount > 0 && (
                  <div className="media-type">
                    <PictureOutlined />
                    <span>{photoCount} Photo{photoCount > 1 ? 's' : ''}</span>
                  </div>
                )}
                {videoCount > 0 && (
                  <div className="media-type">
                    <VideoCameraOutlined />
                    <span>{videoCount} Video{videoCount > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="amenities-section">
              <h3>Room Amenities</h3>
              <div className="amenities-grid">
                {room.amenities?.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="icon">{amenity.icon}</span>
                    <span>{amenity.amenityText}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </RoomDetailsModalWrapper>
  );
};

export default RoomDetailsModal;