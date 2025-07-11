import React from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const LocationWrapper = styled.div`
  margin-bottom: 40px;

  .location-header {
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

  .location-content {
    background: #f8f9fa;
    padding: 24px;
    border-radius: 12px;

    .location-address {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .location-icon {
        font-size: 20px;
        color: #1890ff;
      }

      .address-text {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
    }

    .location-map {
      width: 100%;
      height: 250px;
      background: #e0e0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 16px;
    }
  }
`;

const Location = ({ location }) => {
  return (
    <LocationWrapper>
      <div className="location-header">
        <h2>Location</h2>
        <p>Perfect location in the heart of the city</p>
      </div>

      <div className="location-content">
        <div className="location-address">
          <EnvironmentOutlined className="location-icon" />
          <span className="address-text">{location.location.address}</span>
        </div>

        <div className="location-map">
          <span>Interactive Map Coming Soon</span>
        </div>
      </div>
    </LocationWrapper>
  );
};

export default Location;