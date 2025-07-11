import React from 'react';
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

  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .amenity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: #e3f2fd;
      transform: translateY(-2px);
    }

    .amenity-icon {
      font-size: 20px;
      color: #1890ff;
    }

    .amenity-name {
      font-size: 16px;
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
  default: <CarOutlined />
};

const Amenities = ({ amenities }) => {
  return (
    <AmenitiesWrapper>
      <div className="amenities-header">
        <h2>Hotel Amenities</h2>
        <p>Enjoy our world-class facilities and services</p>
      </div>

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
    </AmenitiesWrapper>
  );
};

export default Amenities;