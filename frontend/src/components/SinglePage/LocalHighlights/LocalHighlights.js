import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import { 
  EnvironmentOutlined, 
  CarOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

const LocalHighlightsWrapper = styled.div`
  margin-bottom: 40px;

  .highlights-header {
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    p {
      color: #666;
      font-size: 16px;
    }
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .category-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .category-header {
      padding: 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      align-items: center;
      gap: 8px;

      .category-title {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        flex: 1;
      }

      .category-badge {
        background: #ff4d4f;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
      }
    }

    .locations-list {
      padding: 16px;

      .location-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        transition: background-color 0.2s;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: #f8f9fa;
          margin: 0 -16px;
          padding-left: 16px;
          padding-right: 16px;
        }

        .location-info {
          flex: 1;

          .location-name {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            margin-bottom: 4px;
          }

          .location-address {
            font-size: 12px;
            color: #666;
          }
        }

        .location-distance {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: #999;

          .distance-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }
      }
    }
  }
`;

const LocationModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    overflow: hidden;
    border-radius: 12px;
  }

  .location-modal-header {
    padding: 20px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .location-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 18px;
      color: #999;
      cursor: pointer;
      padding: 4px;
      
      &:hover {
        color: #333;
      }
    }
  }

  .location-modal-content {
    .location-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .location-map {
      height: 300px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 16px;
      border-top: 1px solid #f0f0f0;
    }

    .location-details {
      padding: 20px;

      .location-address {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
        font-size: 16px;
        color: #333;

        .location-icon {
          color: #1890ff;
        }
      }

      .location-distance {
        display: flex;
        gap: 20px;
        
        .distance-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
`;

const LocalHighlights = ({ highlights }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showLocationModal = (location) => {
    setSelectedLocation(location);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedLocation(null);
  };

  // If highlights is undefined or empty, don't render anything
  if (!highlights || highlights.length === 0) {
    return null;
  }

  // Transform the simple highlights array into the expected format
  const transformedHighlights = [{
    category: "Local Attractions",
    icon: "environment",
    locations: highlights.map((highlight, index) => ({
      id: index + 1,
      name: highlight.title,
      description: highlight.description,
      image: highlight.image,
      distance: "Nearby",
      travelTime: "5 min",
      highlights: [highlight.description]
    }))
  }];

  return (
    <LocalHighlightsWrapper>
      <div className="highlights-header">
        <h2>Local Highlights</h2>
        <p>Discover nearby attractions and points of interest</p>
      </div>

      <div className="highlights-grid">
        {transformedHighlights.map((categoryGroup, index) => (
          <Card key={index} className="category-card" bordered={false}>
            <div className="category-header">
              <div className="category-title">{categoryGroup.category}</div>
              {categoryGroup.icon === 'NEW' && (
                <div className="category-badge">NEW</div>
              )}
            </div>
            
            <div className="locations-list">
              {categoryGroup.locations.map((location) => (
                <div 
                  key={location.id} 
                  className="location-item"
                  onClick={() => showLocationModal(location)}
                >
                  <div className="location-info">
                    <div className="location-name">{location.name}</div>
                    <div className="location-address">{location.address}</div>
                  </div>
                  
                  <div className="location-distance">
                    <div className="distance-item">
                      <span>🚶</span>
                      <span>{location.walkTime}</span>
                    </div>
                    <div className="distance-item">
                      <CarOutlined />
                      <span>{location.driveTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <LocationModal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={600}
        closable={false}
      >
        {selectedLocation && (
          <>
            <div className="location-modal-header">
              <h3 className="location-title">{selectedLocation.name}</h3>
              <button className="close-btn" onClick={closeModal}>
                <CloseOutlined />
              </button>
            </div>
            
            <div className="location-modal-content">
              {selectedLocation.image && (
                <div 
                  className="location-image"
                  style={{ backgroundImage: `url(${selectedLocation.image})` }}
                />
              )}
              
              <div className="location-details">
                <div className="location-address">
                  <EnvironmentOutlined className="location-icon" />
                  <span>{selectedLocation.address}</span>
                </div>
                
                <div className="location-distance">
                  <div className="distance-item">
                    <span>🚶</span>
                    <span>{selectedLocation.walkTime} walk</span>
                  </div>
                  <div className="distance-item">
                    <CarOutlined />
                    <span>{selectedLocation.driveTime} drive</span>
                  </div>
                </div>
              </div>
              
              <div className="location-map">
                <span>Interactive Map - {selectedLocation.name}</span>
                {/* Here you would integrate with Google Maps or another map service */}
              </div>
            </div>
          </>
        )}
      </LocationModal>
    </LocalHighlightsWrapper>
  );
};

export default LocalHighlights;