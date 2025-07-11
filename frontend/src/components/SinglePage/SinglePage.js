import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from '../../library/hooks/useLocation';
import Sticky from 'react-stickynode';
import { Row, Col, Modal, Button, message } from 'antd';
import Container from '../UI/Container/Container';
import Loader from '../Loader/Loader';
import useWindowSize from '../../library/hooks/useWindowSize';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import Location from './Location/Location';
import Review from './Review/Review';
import RoomSelection from './RoomSelection/RoomSelection';
import LocalHighlights from './LocalHighlights/LocalHighlights';
import Reservation from './Reservation/Reservation';
import BottomReservation from './Reservation/BottomReservation';
import TopBar from './TopBar/TopBar';
import SinglePageWrapper, { PostImage } from './SinglePageView.style';
import PostImageGallery from './ImageGallery/ImageGallery';
import useDataApi from '../../library/hooks/useDataApi';
import isEmpty from 'lodash/isEmpty';

const SinglePage = () => {
  let { slug } = useParams();
  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { width } = useWindowSize();

  let url = '/data/hotel-single.json';
  if (slug) {
    url += `?slug=${slug}`;
  }
  
  const { data, loading, error } = useDataApi(url);
  
  if (loading) return <Loader />;
  if (error || isEmpty(data)) return <div>Error loading hotel data</div>;

  const {
    reviews,
    rating,
    ratingCount,
    price,
    title,
    gallery,
    location,
    content,
    amenities,
    author,
    roomTypes,
    localHighlights
  } = data[0];

  const handleRoomSelect = (room) => {
    // Check if room is already selected
    const existingRoomIndex = selectedRooms.findIndex(
      selectedRoom => selectedRoom.id === room.id
    );

    if (existingRoomIndex !== -1) {
      // Update existing room quantity
      const updatedRooms = [...selectedRooms];
      updatedRooms[existingRoomIndex] = room;
      setSelectedRooms(updatedRooms);
    } else {
      // Add new room selection
      setSelectedRooms(prevRooms => [...prevRooms, room]);
    }
  };

  const handleUpdateSelection = (updatedRooms) => {
    setSelectedRooms(updatedRooms);
  };

  const handleBookNow = (bookingData) => {
    // Here you would integrate with your booking system
    console.log('Booking data:', bookingData);
    message.success('Redirecting to booking page...');
    // You can redirect to a booking page or open a booking modal
  };

  const handleContactHotel = () => {
    message.info('Contact information: 1-403-000-9038 x910');
  };

  return (
    <SinglePageWrapper>
      <PostImage>
        <img
          className="absolute"
          src={gallery && gallery.length > 0 ? gallery[0] : "/images/single-post-bg.jpg"}
          alt="Hotel view"
        />
        <Button
          type="primary"
          onClick={() => setIsModalShowing(true)}
          className="image_gallery_button"
        >
          View Photos
        </Button>
        <Modal
          open={isModalShowing}
          onCancel={() => setIsModalShowing(false)}
          footer={null}
          width="100%"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
          wrapClassName="image_gallery_modal"
          closable={false}
        >
          <Fragment>
            <PostImageGallery images={gallery} />
            <Button
              onClick={() => setIsModalShowing(false)}
              className="image_gallery_close"
            >
              <svg width="16.004" height="16" viewBox="0 0 16.004 16">
                <path
                  id="_ionicons_svg_ios-close_2_"
                  d="M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z"
                  transform="translate(-160.5 -160.55)"
                  fill="#909090"
                />
              </svg>
            </Button>
          </Fragment>
        </Modal>
      </PostImage>

      <TopBar title={title} shareURL={href} author={author} media={gallery} />

      <Container>
        <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
          <Col xl={16}>
            <Description
              content={content}
              title={title}
              location={location}
              rating={rating}
              ratingCount={ratingCount}
            />
            <Amenities amenities={amenities} />
          </Col>
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky
                innerZ={999}
                activeClass="isSticky"
                top={202}
                bottomBoundary="#reviewSection"
              >
                <Reservation 
                  selectedRooms={selectedRooms}
                  onBookNow={handleBookNow}
                  onContactHotel={handleContactHotel}
                />
              </Sticky>
            ) : (
              <BottomReservation
                title={title}
                price={price}
                rating={rating}
                ratingCount={ratingCount}
                selectedRooms={selectedRooms}
                onBookNow={handleBookNow}
              />
            )}
          </Col>
        </Row>

        {/* Room Selection Section */}
        <Row gutter={30} style={{ marginTop: 40 }}>
          <Col span={24}>
            <RoomSelection
              roomTypes={roomTypes}
              onRoomSelect={handleRoomSelect}
              selectedRooms={selectedRooms}
              onUpdateSelection={handleUpdateSelection}
            />
          </Col>
        </Row>

        {/* Local Highlights Section */}
        <Row gutter={30} style={{ marginTop: 40 }}>
          <Col span={24}>
            <LocalHighlights highlights={localHighlights} />
          </Col>
        </Row>

        {/* Location Section */}
        <Row gutter={30} style={{ marginTop: 40 }}>
          <Col span={24}>
            <Location location={data[0]} />
          </Col>
        </Row>

        {/* Reviews Section */}
        <Row gutter={30} style={{ marginTop: 40 }}>
          <Col xl={16}>
            <Review
              reviews={reviews}
              ratingCount={ratingCount}
              rating={rating}
            />
          </Col>
          <Col xl={8} />
        </Row>
      </Container>
    </SinglePageWrapper>
  );
};

export default SinglePage;