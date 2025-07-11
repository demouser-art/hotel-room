import React from 'react';
import { Card } from 'antd';
import { 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  CarOutlined
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

  .highlight-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .highlight-image {
      height: 160px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .highlight-content {
      padding: 16px;

      .highlight-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;

        .highlight-name {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .highlight-category {
          background: #e3f2fd;
          color: #1890ff;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
      }

      .highlight-description {
        color: #666;
        font-size: 14px;
        line-height: 1.4;
        margin-bottom: 12px;
      }

      .highlight-distance {
        display: flex;
        align-items: center;
        gap: 16px;
        color: #999;
        font-size: 13px;

        .distance-item {
          display: flex;
          align-items: center;
          gap: 4px;

          .distance-icon {
            font-size: 14px;
          }
        }
      }
    }
  }
`;

const LocalHighlights = ({ highlights }) => {
  return (
    <LocalHighlightsWrapper>
      <div className="highlights-header">
        <h2>Local Highlights</h2>
        <p>Discover nearby attractions and points of interest</p>
      </div>

      <div className="highlights-grid">
        {highlights.map((highlight) => (
          <Card key={highlight.id} className="highlight-card" bordered={false}>
            <div 
              className="highlight-image"
              style={{ backgroundImage: `url(${highlight.image})` }}
            />
            
            <div className="highlight-content">
              <div className="highlight-header">
                <div className="highlight-name">{highlight.name}</div>
                <div className="highlight-category">{highlight.category}</div>
              </div>
              
              <div className="highlight-description">
                {highlight.description}
              </div>
              
              <div className="highlight-distance">
                <div className="distance-item">
                  <EnvironmentOutlined className="distance-icon" />
                  <span>{highlight.distance}</span>
                </div>
                <div className="distance-item">
                  <span>🚶</span>
                  <span>{highlight.walkTime}</span>
                </div>
                <div className="distance-item">
                  <CarOutlined className="distance-icon" />
                  <span>{highlight.driveTime}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </LocalHighlightsWrapper>
  );
};

export default LocalHighlights;