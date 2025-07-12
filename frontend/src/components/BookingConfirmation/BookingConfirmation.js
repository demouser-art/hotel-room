import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BookingConfirmationWrapper from './BookingConfirmation.style';

const BookingConfirmation = () => {
  const { slug } = useParams();
  const location = useLocation();
  const bookingData = location.state || {};

  // Form state
  const [paymentOption, setPaymentOption] = useState('full');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardType, setCardType] = useState('visa');
  const [selectedSavedCard, setSelectedSavedCard] = useState(null);
  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  // Simple condition to simulate logged-in user (for design purposes)
  const [isUserLoggedIn] = useState(false); // Change to false to see non-logged-in state

  // Static mock data for saved cards (design purposes only)
  const savedCards = [
    {
      id: 1,
      type: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '2026',
      cardholderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8888',
      expiryMonth: '08',
      expiryYear: '2025',
      cardholderName: 'John Doe',
      isDefault: false
    },
    {
      id: 3,
      type: 'visa',
      lastFour: '1234',
      expiryMonth: '03',
      expiryYear: '2027',
      cardholderName: 'John Doe',
      isDefault: false
    }
  ];

  // Mock functions for card operations (design purposes - just console logs)
  const handleSavedCardSelect = (card) => {
    console.log('Selected saved card:', card);
    setSelectedSavedCard(card);
    setShowAddNewCard(false);
    setPaymentMethod('saved-card');
    
    // Auto-fill billing info from saved card
    setBillingInfo(prev => ({
      ...prev,
      // In real implementation, this would come from user's saved billing address
    }));
  };

  const handleAddNewCard = () => {
    console.log('Add new card clicked');
    setShowAddNewCard(true);
    setSelectedSavedCard(null);
    setPaymentMethod('card');
  };

  const handleDeleteCard = (cardId) => {
    console.log('Delete card with ID:', cardId);
    // In real implementation, this would call API to delete card
  };

  const handleSetAsDefault = (cardId) => {
    console.log('Set card as default with ID:', cardId);
    // In real implementation, this would call API to set default card
  };

  // Sample data - in real app this would come from booking state
  const tripData = {
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    guests: 2,
    rooms: 1,
    addOns: [
      { name: 'Mattress', price: 50 },
      { name: 'Chairs', price: 25 }
    ],
    seasonalAddOns: [
      { name: 'Mattress', price: 50 }
    ]
  };

  const propertyData = {
    name: 'diana test',
    location: 'Portugal, PT',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop'
    ],
    nights: 5,
    roomType: 'Deluxe Room',
    pricePerNight: 400,
    cleaningFee: 50,
    serviceFee: 100
  };

  const calculateTotal = () => {
    const roomTotal = propertyData.nights * propertyData.pricePerNight;
    const addOnsTotal = tripData.addOns.reduce((sum, addon) => sum + addon.price, 0);
    const seasonalTotal = tripData.seasonalAddOns.reduce((sum, addon) => sum + addon.price, 0);
    return roomTotal + addOnsTotal + seasonalTotal + propertyData.cleaningFee + propertyData.serviceFee;
  };

  const total = calculateTotal();
  const depositAmount = total * 0.5;

  const handleBillingChange = (field, value) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = () => {
    // Handle booking submission
    const bookingData = {
      paymentOption,
      paymentMethod,
      cardType,
      billingInfo,
      total: paymentOption === 'full' ? total : depositAmount,
      isUserLoggedIn,
      selectedSavedCard: selectedSavedCard || null,
      userHasSavedCards: isUserLoggedIn && savedCards.length > 0
    };
    
    console.log('Booking submitted with:', bookingData);
    
    if (selectedSavedCard) {
      console.log('Payment will be processed using saved card:', selectedSavedCard);
    } else {
      console.log('Payment will be processed with new card details');
    }
  };

  return (
    <BookingConfirmationWrapper>
      {/* Header */}
      <div className="booking-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">🏨</span>
              <span className="logo-text">Voyaju</span>
            </div>
            <nav className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/hotel/luxury-downtown" className="nav-link">Hotels</a>
              <a href="#" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Confirm and Pay</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="booking-layout">
            {/* Left Column */}
            <div className="left-column">
              {/* Trip Details */}
              <div className="section trip-details">
                <h2 className="section-title">Your trip</h2>
                
                <div className="detail-row">
                  <div className="detail-group">
                    <span className="detail-label">Dates</span>
                    <span className="detail-value">Jan 15, 2024 - Jan 20, 2024</span>
                  </div>
                  <button className="edit-button">Edit</button>
                </div>

                <div className="detail-row">
                  <div className="detail-group">
                    <span className="detail-label">Guests</span>
                    <span className="detail-value">2 guests</span>
                  </div>
                  <button className="edit-button">Edit</button>
                </div>

                <div className="detail-row">
                  <div className="detail-group">
                    <span className="detail-label">Add-ons</span>
                    <div className="addon-list">
                      {tripData.addOns.map((addon, index) => (
                        <div key={index} className="addon-item">
                          <span className="addon-name">{addon.name}</span>
                          <span className="addon-price">${addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="edit-button">Edit</button>
                </div>

                <div className="detail-row">
                  <div className="detail-group">
                    <span className="detail-label">Seasonal add-ons</span>
                    <div className="addon-list">
                      {tripData.seasonalAddOns.map((addon, index) => (
                        <div key={index} className="addon-item">
                          <span className="addon-name">{addon.name}</span>
                          <span className="addon-price">${addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="edit-button">Edit</button>
                </div>
              </div>

              {/* Guest Assurance Fee */}
              <div className="section guest-assurance">
                <h3 className="assurance-title">Guest Assurance Fee</h3>
                <p className="assurance-text">
                  Why Guest Assurance Fee?
                </p>
                <p className="assurance-description">
                  Acting as a comprehensive service, our Guest Assurance Fee protects you from being charged for any cleaning, damages, or issues that may occur during your stay. This fee is mandatory and covers all aspects of your booking to ensure a worry-free experience.
                </p>
              </div>

              {/* Payment Options */}
              <div className="section payment-options">
                <div className="payment-option">
                  <label className="payment-label">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="full"
                      checked={paymentOption === 'full'}
                      onChange={(e) => setPaymentOption(e.target.value)}
                    />
                    <span className="payment-title">Pay in Full</span>
                    <span className="payment-amount">${total}</span>
                  </label>
                </div>

                <div className="payment-option">
                  <label className="payment-label">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="deposit"
                      checked={paymentOption === 'deposit'}
                      onChange={(e) => setPaymentOption(e.target.value)}
                    />
                    <span className="payment-title">Pay 50% Deposit</span>
                    <span className="payment-amount">${depositAmount.toFixed(2)}</span>
                  </label>
                  <p className="payment-note">
                    Split payments: $230.00 today and $1,780.00 is due 30 days after your first payment; we'll send an email reminder.
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="section payment-method">
                <h3 className="section-title">Pay with</h3>
                
                {/* Show saved cards for logged-in users */}
                {isUserLoggedIn && savedCards.length > 0 && (
                  <div className="saved-cards-section">
                    <h4 className="saved-cards-title">Your Saved Cards</h4>
                    <div className="saved-cards-list">
                      {savedCards.map((card) => (
                        <div 
                          key={card.id} 
                          className={`saved-card-item ${selectedSavedCard?.id === card.id ? 'selected' : ''}`}
                          onClick={() => handleSavedCardSelect(card)}
                        >
                          <div className="saved-card-content">
                            <div className="card-info">
                              <div className="card-brand">
                                <span className="card-icon">
                                  {card.type === 'visa' ? '💳' : '🔴'}
                                </span>
                                <span className="card-type">
                                  {card.type.toUpperCase()}
                                </span>
                              </div>
                              <div className="card-details">
                                <span className="card-number">•••• •••• •••• {card.lastFour}</span>
                                <span className="card-expiry">{card.expiryMonth}/{card.expiryYear}</span>
                              </div>
                              <div className="card-holder">{card.cardholderName}</div>
                            </div>
                            {card.isDefault && (
                              <span className="default-badge">Default</span>
                            )}
                          </div>
                          <div className="card-actions">
                            <button 
                              className="action-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetAsDefault(card.id);
                              }}
                            >
                              Set Default
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCard(card.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      className="add-new-card-btn"
                      onClick={handleAddNewCard}
                    >
                      <span className="add-icon">+</span>
                      Add New Card
                    </button>
                  </div>
                )}

                {/* Show regular payment options for non-logged-in users or when adding new card */}
                {(!isUserLoggedIn || showAddNewCard) && (
                  <>
                    <div className="payment-methods">
                      <label className="method-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Credit Card/Debit</span>
                      </label>
                      <label className="method-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="different"
                          checked={paymentMethod === 'different'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Different Card/Debit</span>
                      </label>
                    </div>

                    <div className="card-selection">
                      <div className="card-options">
                        <button 
                          className={`card-option ${cardType === 'visa' ? 'active' : ''}`}
                          onClick={() => setCardType('visa')}
                        >
                          <span className="card-icon">💳</span>
                          VISA
                        </button>
                        <button 
                          className={`card-option ${cardType === 'mastercard' ? 'active' : ''}`}
                          onClick={() => setCardType('mastercard')}
                        >
                          <span className="card-icon">🔴</span>
                          Mastercard
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Billing Information */}
              <div className="section billing-info">
                <h3 className="section-title">Billing Info</h3>
                <div className="billing-form">
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <input
                      type="text"
                      className="form-input"
                      value={billingInfo.addressLine1}
                      onChange={(e) => handleBillingChange('addressLine1', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <input
                      type="text"
                      className="form-input"
                      value={billingInfo.addressLine2}
                      onChange={(e) => handleBillingChange('addressLine2', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <select
                        className="form-input"
                        value={billingInfo.country}
                        onChange={(e) => handleBillingChange('country', e.target.value)}
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select
                        className="form-input"
                        value={billingInfo.state}
                        onChange={(e) => handleBillingChange('state', e.target.value)}
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-input"
                        value={billingInfo.city}
                        onChange={(e) => handleBillingChange('city', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Zip</label>
                      <input
                        type="text"
                        className="form-input"
                        value={billingInfo.zipCode}
                        onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="section terms-section">
                <h3 className="section-title">Cancellation policy</h3>
                <div className="terms-content">
                  <p>This Host allows cancellation before check-in.</p>
                  <p>Free cancellation before 5:00 PM on Jan 7, 2024.</p>
                  <p>After that, cancel before check-in and get a 50% refund minus the first night and service fees.</p>
                  <p>Cancel within 24 hours of arrival and get a 50% refund.</p>
                </div>
                <div className="terms-agreement">
                  <label className="terms-label">
                    <input type="checkbox" className="terms-checkbox" />
                    I agree to the <a href="#" className="terms-link">Terms & Conditions</a>
                  </label>
                </div>
              </div>

              {/* Complete Booking Button */}
              <div className="section booking-submit">
                <button 
                  className="complete-booking-btn"
                  onClick={handleBookingSubmit}
                >
                  Complete Booking
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              <div className="property-card">
                <div className="property-images">
                  <div className="main-image">
                    <img src={propertyData.images[0]} alt="Property" />
                  </div>
                  <div className="thumbnail-images">
                    {propertyData.images.slice(1).map((image, index) => (
                      <img key={index} src={image} alt={`Property ${index + 2}`} />
                    ))}
                  </div>
                </div>
                
                <div className="property-info">
                  <h3 className="property-name">{propertyData.name}</h3>
                  <p className="property-location">{propertyData.location}</p>
                  
                  <div className="property-details">
                    <div className="detail-item">
                      <span className="detail-label">Total Nights</span>
                      <span className="detail-value">{propertyData.nights}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Room Type</span>
                      <span className="detail-value">{propertyData.roomType}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">USD $ / night</span>
                      <span className="detail-value">${propertyData.pricePerNight}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Cleaning Fee</span>
                      <span className="detail-value">${propertyData.cleaningFee}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Service Fee</span>
                      <span className="detail-value">${propertyData.serviceFee}</span>
                    </div>
                  </div>

                  <div className="seasonal-addons">
                    <h4 className="addons-title">Seasonal Add-ons</h4>
                    {tripData.seasonalAddOns.map((addon, index) => (
                      <div key={index} className="addon-item">
                        <span className="addon-name">{addon.name}</span>
                        <span className="addon-price">${addon.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="total-section">
                    <div className="total-row">
                      <span className="total-label">Total</span>
                      <span className="total-amount">${total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BookingConfirmationWrapper>
  );
};

export default BookingConfirmation;