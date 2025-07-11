import styled from 'styled-components';

const SinglePageWrapper = styled.div`
  .image_gallery_button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 10;
  }

  .image_gallery_modal {
    .ant-modal-content {
      background-color: transparent;
      box-shadow: none;
    }
  }

  .image_gallery_close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }

  .isSticky {
    position: fixed !important;
    top: 202px !important;
    z-index: 999;
  }
`;

export const PostImage = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const RoomSelectionWrapper = styled.div`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  margin: 30px 0;

  .room-selection-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    p {
      color: #666;
      font-size: 16px;
    }
  }

  .date-selection {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 30px;
    flex-wrap: wrap;

    .date-picker-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-weight: 600;
        color: #333;
      }
    }

    .guests-selector {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-weight: 600;
        color: #333;
      }
    }
  }

  .rooms-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }
`;

export const RoomCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: row;
  min-height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .room-image {
    width: 300px;
    min-width: 300px;
    height: 100%;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .availability-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: ${props => props.available > 0 ? '#52c41a' : '#ff4d4f'};
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .photo-count-overlay {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;

      &:hover {
        background: rgba(0, 0, 0, 0.9);
        transform: translateY(-1px);
      }
    }
  }

  .room-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .room-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;

      .room-title-section {
        flex: 1;
        
        h3 {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .room-info {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
          font-size: 14px;
          color: #666;

          span {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }

        .room-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
        }
      }

      .room-price {
        text-align: right;
        min-width: 120px;

        .current-price {
          font-size: 24px;
          font-weight: 700;
          color: #1890ff;
        }

        .original-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
          margin-left: 8px;
        }

        .per-night {
          font-size: 12px;
          color: #666;
          display: block;
        }
      }
    }

    .room-amenities {
      margin-bottom: 16px;

      .amenities-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .amenities-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .amenity-tag {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #666;
        }
      }
    }

    .room-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: flex-end;

      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 8px;

        label {
          font-size: 14px;
          color: #666;
        }
      }

      .select-room-btn {
        height: 40px;
        border-radius: 6px;
        font-weight: 600;
        padding: 0 24px;
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .more-details-btn {
        height: 40px;
        border-radius: 6px;
        font-weight: 600;
        padding: 0 16px;
        border: 1px solid #d9d9d9;
        background: white;
        color: #666;
        
        &:hover {
          border-color: #1890ff;
          color: #1890ff;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    .room-image {
      width: 100%;
      height: 200px;
    }

    .room-content {
      .room-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;

        .room-price {
          text-align: left;
          min-width: auto;
        }
      }

      .room-actions {
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        
        .more-details-btn {
          flex: 1;
          min-width: 120px;
        }
        
        .select-room-btn {
          flex: 1;
          min-width: 120px;
        }
      }
    }
  }
`;

export const SelectedRoomsWrapper = styled.div`
  background: white;
  border: 2px solid #1890ff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;

  .selected-rooms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #1890ff;
      margin: 0;
    }

    .clear-selection {
      background: none;
      border: none;
      color: #ff4d4f;
      cursor: pointer;
      font-size: 14px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .selected-rooms-list {
    .selected-room-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .room-info {
        .room-type {
          font-weight: 600;
          color: #333;
        }

        .room-details {
          font-size: 14px;
          color: #666;
        }
      }

      .room-total {
        text-align: right;

        .quantity {
          font-size: 14px;
          color: #666;
        }

        .price {
          font-size: 16px;
          font-weight: 600;
          color: #1890ff;
        }
      }
    }
  }

  .total-section {
    border-top: 2px solid #f0f0f0;
    padding-top: 16px;
    margin-top: 16px;

    .total-breakdown {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
      color: #666;
    }

    .grand-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
    }
  }
`;

export default SinglePageWrapper;