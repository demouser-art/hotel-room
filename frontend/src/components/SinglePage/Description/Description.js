import React, { useState } from 'react';
import { Rate, Modal, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const DescriptionWrapper = styled.div`
  margin-bottom: 40px;

  .description-header {
    margin-bottom: 24px;

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 16px;
    }

    .location-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 16px;
      margin-bottom: 16px;

      .location-icon {
        color: #1890ff;
      }
    }

    .rating-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .rating-stars {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .rating-text {
        color: #666;
        font-size: 14px;
      }
    }
  }

  .description-content {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    
    p {
      margin-bottom: 16px;
    }

    .read-more-btn {
      color: #1890ff;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      text-decoration: underline;
      
      &:hover {
        color: #40a9ff;
      }
    }
  }
`;

const Description = ({ content, title, location, rating, ratingCount }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const MAX_LENGTH = 150;
  const shouldTruncate = content && content.length > MAX_LENGTH;
  const truncatedContent = shouldTruncate ? content.substring(0, MAX_LENGTH) + '...' : content;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <DescriptionWrapper>
      <div className="description-header">
        <h1>{title}</h1>
        
        <div className="location-info">
          <EnvironmentOutlined className="location-icon" />
          <span>{location.address}</span>
        </div>

        <div className="rating-info">
          <div className="rating-stars">
            <Rate disabled value={rating} allowHalf />
            <span style={{ fontWeight: 600, color: '#1890ff' }}>{rating}</span>
          </div>
          <span className="rating-text">({ratingCount} reviews)</span>
        </div>
      </div>

      <div className="description-content">
        <p>
          {truncatedContent}
          {shouldTruncate && (
            <button className="read-more-btn" onClick={showModal}>
              Read More
            </button>
          )}
        </p>
      </div>

      <Modal
        title="About this property"
        open={isModalVisible}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>
        ]}
        width={600}
      >
        <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
          <p>{content}</p>
        </div>
      </Modal>
    </DescriptionWrapper>
  );
};

export default Description;