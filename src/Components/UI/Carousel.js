import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

const handleChange = (e) => {
}


export default function Carousel(props) {
  return (
    <MDBCarousel showControls showIndicators dark fade>
      {
        props.latestNews.map((news,idx) => (
         <MDBCarouselItem
            className='w-100 d-block'
            itemId={idx}
            key={idx}
            src={news.image}
            alt={news.title}
            onChange={() => handleChange(idx)}

          >
            {/* <h5>{news.title}</h5> */}
          </MDBCarouselItem>
        ))

      }
    </MDBCarousel>
  );
}