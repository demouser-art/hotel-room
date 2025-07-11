import styled from 'styled-components';

const BookingConfirmationWrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header */
  .booking-header {
    background: white;
    border-bottom: 1px solid #e6e6e6;
    padding: 16px 0;
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 600;
      color: #333;
      
      .logo-icon {
        color: #1890ff;
      }
    }
    
    .nav-links {
      display: flex;
      gap: 24px;
      
      .nav-link {
        text-decoration: none;
        color: #333;
        font-size: 14px;
        
        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&h=400&fit=crop');
    background-size: cover;
    background-position: center;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 40px;
    
    .hero-title {
      font-size: 48px;
      font-weight: 300;
      margin: 0;
      text-align: center;
    }
  }

  /* Main Content */
  .main-content {
    padding-bottom: 60px;
  }

  .booking-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
    align-items: start;
  }

  /* Left Column */
  .left-column {
    .section {
      background: white;
      padding: 32px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .section-title {
      font-size: 22px;
      font-weight: 600;
      color: #333;
      margin-bottom: 24px;
    }
  }

  /* Trip Details */
  .trip-details {
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px 0;
      border-bottom: 1px solid #e6e6e6;
      
      &:last-child {
        border-bottom: none;
      }
    }

    .detail-group {
      flex: 1;
    }

    .detail-label {
      display: block;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .detail-value {
      color: #666;
      font-size: 14px;
    }

    .addon-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .addon-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: #f8f9fa;
      border-radius: 6px;
      font-size: 14px;
      
      .addon-name {
        color: #333;
      }
      
      .addon-price {
        color: #666;
        font-weight: 500;
      }
    }

    .edit-button {
      background: none;
      border: none;
      color: #ff5a5f;
      font-size: 14px;
      cursor: pointer;
      text-decoration: underline;
      
      &:hover {
        color: #e0484c;
      }
    }
  }

  /* Guest Assurance */
  .guest-assurance {
    .assurance-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .assurance-text {
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }

    .assurance-description {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
    }
  }

  /* Payment Options */
  .payment-options {
    .payment-option {
      border: 2px solid #e6e6e6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
      cursor: pointer;
      
      &:hover {
        border-color: #ff5a5f;
      }
      
      &:has(input:checked) {
        border-color: #ff5a5f;
        background: #fff8f8;
      }
    }

    .payment-label {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      
      input[type="radio"] {
        width: 20px;
        height: 20px;
      }
    }

    .payment-title {
      flex: 1;
      font-weight: 600;
      color: #333;
    }

    .payment-amount {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .payment-note {
      margin-top: 12px;
      color: #666;
      font-size: 14px;
      line-height: 1.4;
    }
  }

  /* Payment Method */
  .payment-method {
    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .method-option {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      
      input[type="radio"] {
        width: 20px;
        height: 20px;
      }
    }

    .card-selection {
      margin-top: 20px;
    }

    .card-options {
      display: flex;
      gap: 12px;
    }

    .card-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: 2px solid #e6e6e6;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-weight: 500;
      
      &:hover {
        border-color: #ff5a5f;
      }
      
      &.active {
        border-color: #ff5a5f;
        background: #fff8f8;
      }
      
      .card-icon {
        font-size: 18px;
      }
    }
  }

  /* Billing Info */
  .billing-info {
    .billing-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .form-input {
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #ff5a5f;
      }
    }
  }

  /* Terms */
  .terms-section {
    .terms-content {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 20px;
      
      p {
        margin-bottom: 8px;
      }
    }

    .terms-agreement {
      .terms-label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        font-size: 14px;
        
        .terms-checkbox {
          width: 18px;
          height: 18px;
        }
        
        .terms-link {
          color: #ff5a5f;
          text-decoration: none;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  /* Complete Booking */
  .booking-submit {
    text-align: center;
    
    .complete-booking-btn {
      background: #ff5a5f;
      color: white;
      border: none;
      padding: 16px 48px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      
      &:hover {
        background: #e0484c;
      }
    }
  }

  /* Right Column */
  .right-column {
    position: sticky;
    top: 20px;
  }

  .property-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .property-images {
    position: relative;
    
    .main-image {
      width: 100%;
      height: 200px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .thumbnail-images {
      display: flex;
      gap: 2px;
      
      img {
        width: 50%;
        height: 120px;
        object-fit: cover;
      }
    }
  }

  .property-info {
    padding: 24px;
    
    .property-name {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
    
    .property-location {
      color: #666;
      margin-bottom: 20px;
    }
  }

  .property-details {
    border-top: 1px solid #e6e6e6;
    padding-top: 20px;
    margin-bottom: 20px;
    
    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      
      .detail-label {
        color: #666;
        font-size: 14px;
      }
      
      .detail-value {
        color: #333;
        font-weight: 500;
      }
    }
  }

  .seasonal-addons {
    border-top: 1px solid #e6e6e6;
    padding-top: 20px;
    margin-bottom: 20px;
    
    .addons-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
    
    .addon-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      
      .addon-name {
        color: #333;
        font-size: 14px;
      }
      
      .addon-price {
        color: #666;
        font-weight: 500;
      }
    }
  }

  .total-section {
    border-top: 2px solid #e6e6e6;
    padding-top: 20px;
    
    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .total-label {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
      
      .total-amount {
        font-size: 20px;
        font-weight: 600;
        color: #333;
      }
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .booking-layout {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    
    .right-column {
      position: static;
    }
    
    .hero-title {
      font-size: 32px;
    }
    
    .nav-links {
      display: none;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
  }
`;

export default BookingConfirmationWrapper;