import React from 'react';
import { Rate, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ReviewWrapper = styled.div`
  margin-bottom: 40px;

  .review-header {
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .review-summary {
      display: flex;
      align-items: center;
      gap: 16px;
      color: #666;
      font-size: 16px;

      .rating-display {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .review-item {
    background: #f8f9fa;
    padding: 24px;
    border-radius: 12px;

    .review-author {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .author-info {
        .author-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .review-date {
          font-size: 14px;
          color: #666;
        }
      }
    }

    .review-rating {
      margin-bottom: 12px;
    }

    .review-comment {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
    }
  }
`;

const Review = ({ reviews, ratingCount, rating }) => {
  return (
    <ReviewWrapper>
      <div className="review-header">
        <h2>Guest Reviews</h2>
        <div className="review-summary">
          <div className="rating-display">
            <Rate disabled value={rating} allowHalf />
            <span style={{ fontWeight: 600, color: '#1890ff' }}>{rating}</span>
          </div>
          <span>Based on {ratingCount} reviews</span>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-author">
              <Avatar 
                src={review.avatar} 
                icon={<UserOutlined />} 
                size={48}
              />
              <div className="author-info">
                <div className="author-name">{review.name}</div>
                <div className="review-date">{review.date}</div>
              </div>
            </div>

            <div className="review-rating">
              <Rate disabled value={review.rating} size="small" />
            </div>

            <div className="review-comment">
              {review.comment}
            </div>
          </div>
        ))}
      </div>
    </ReviewWrapper>
  );
};

export default Review;