import React from 'react';
import { Button, Avatar } from 'antd';
import { ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const TopBarWrapper = styled.div`
  background: white;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 0;
  margin-bottom: 20px;

  .topbar-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .topbar-left {
    .hotel-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .hotel-author {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 14px;
    }
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .share-btn {
      height: 40px;
      border-radius: 6px;
    }
  }

  @media (max-width: 768px) {
    .topbar-content {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }

    .topbar-right {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;

const TopBar = ({ title, shareURL, author, media }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this amazing hotel: ${title}`,
        url: shareURL,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(shareURL);
      // You can add a message here
    }
  };

  return (
    <TopBarWrapper>
      <div className="topbar-content">
        <div className="topbar-left">
          <div className="hotel-title">{title}</div>
          <div className="hotel-author">
            <Avatar 
              src={author?.avatar} 
              icon={<UserOutlined />} 
              size={24}
            />
            <span>Managed by {author?.name}</span>
          </div>
        </div>

        <div className="topbar-right">
          <Button
            type="default"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className="share-btn"
          >
            Share
          </Button>
        </div>
      </div>
    </TopBarWrapper>
  );
};

export default TopBar;