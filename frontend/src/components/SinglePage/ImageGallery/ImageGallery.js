import React, { useState } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const GalleryWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);

  .gallery-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
  }

  .gallery-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    padding: 12px 20px;
    border-radius: 24px;
  }

  .nav-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .image-counter {
    color: white;
    font-size: 14px;
    margin: 0 12px;
  }

  .thumbnail-nav {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    max-width: 80%;
    overflow-x: auto;
    padding: 8px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;

    .thumbnail {
      width: 60px;
      height: 40px;
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }

      &.active {
        opacity: 1;
        border: 2px solid white;
      }
    }
  }
`;

const PostImageGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Default images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <GalleryWrapper>
      <img
        src={galleryImages[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
        className="gallery-image"
      />

      <div className="thumbnail-nav">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>

      <div className="gallery-controls">
        <button
          className="nav-button"
          onClick={prevImage}
          disabled={galleryImages.length <= 1}
        >
          <LeftOutlined />
        </button>
        
        <span className="image-counter">
          {currentIndex + 1} / {galleryImages.length}
        </span>
        
        <button
          className="nav-button"
          onClick={nextImage}
          disabled={galleryImages.length <= 1}
        >
          <RightOutlined />
        </button>
      </div>
    </GalleryWrapper>
  );
};

export default PostImageGallery;