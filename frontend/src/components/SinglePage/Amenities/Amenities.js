import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { 
  WifiOutlined, 
  CarOutlined, 
  HeartOutlined, 
  CoffeeOutlined,
  RestOutlined,
  ShopOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const AmenitiesWrapper = styled.div`
  margin-bottom: 40px;

  .amenities-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }

    .view-more-btn {
      color: #1890ff;
      background: none;
      border: 1px solid #1890ff;
      border-radius: 6px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 14px;
      
      &:hover {
        background: #1890ff;
        color: white;
      }
    }
  }

  .amenities-compact {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    max-height: 120px;
    overflow: hidden;
  }

  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .amenity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: #e3f2fd;
      transform: translateY(-2px);
    }

    .amenity-icon {
      font-size: 18px;
      color: #1890ff;
    }

    .amenity-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
  }
`;

const iconMap = {
  wifi: <WifiOutlined />,
  pool: <RestOutlined />,
  fitness: <HeartOutlined />,
  restaurant: <CoffeeOutlined />,
  spa: <HeartOutlined />,
  business: <ShopOutlined />,
  car: <CarOutlined />,
  default: <CarOutlined />
};

const Amenities = ({ amenities }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  // Show first 6 amenities in compact view
  const compactAmenities = amenities.slice(0, 6);

  return (
    <AmenitiesWrapper>
      <div className="amenities-header">
        <h2>Hotel Amenities</h2>
        <button className="view-more-btn" onClick={showModal}>
          View All ({amenities.length})
        </button>
      </div>

      <div className="amenities-compact">
        {compactAmenities.map((amenity, index) => (
          <div key={index} className="amenity-item">
            <div className="amenity-icon">
              {iconMap[amenity.icon] || iconMap.default}
            </div>
            <span className="amenity-name">{amenity.name}</span>
          </div>
        ))}
      </div>

      <Modal
        title="All Hotel Amenities"
        open={isModalVisible}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>
        ]}
        width={800}
      >
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <div className="amenity-icon">
                {iconMap[amenity.icon] || iconMap.default}
              </div>
              <span className="amenity-name">{amenity.name}</span>
            </div>
          ))}
        </div>
      </Modal>
    </AmenitiesWrapper>
  );
};

export default Amenities;