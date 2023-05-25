import React, { useEffect, useState } from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBRipple
} from 'mdb-react-ui-kit';
import apiClient from '../Services/api';
import useUtils from '../Hooks/utils';

export default function Footer() {
  const [slideshowData, setSlideshowData] = useState([]);

  const {navigateByUrl} = useUtils()
  useEffect(() => {
    // Fetch slideshow data from the API
    fetchSlideshowData();
  }, []);

  const fetchSlideshowData = async () => {
    try {
      const response = await apiClient.get('/api/weekly');
      setSlideshowData(response.data);
    } catch (error) {
      console.error('Error fetching slideshow data:', error);
    }
  };

  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#caced1' }}>
      <MDBContainer className='p-4'>
        <section className=''>
          <MDBRow>
            {slideshowData.map((item, index) => (
              <MDBCol lg='2' md='12' className='mb-4 mb-md-0' key={index}>
                <MDBRipple
                  rippleColor='light'
                  className='bg-image hover-overlay shadow-1-strong rounded cursor-pointer'
                >
                  <img src={item.image} className='w-100' alt={item.title}/>
                  <a onClick={() => navigateByUrl(item)}>
                    <div
                      className='mask'
                      style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                    ></div>
                  </a>
                </MDBRipple>
              </MDBCol>
            ))}
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3 d-block' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <span className='text-white text-justify text-sm-center text-md-right'>
              Created with 💙 for <strong className="font-italic" style={{color: "#98fb98"}}>Innoscripta</strong> by <a target="_blank" href="https://www.linkedin.com/in/safwantmimi" className='font-italic front-weight-bold'>Safouan</a><br/>
        </span>
        <span className='text-sm-center text-left'>© {new Date().getFullYear()} Copyright: All rights reserved</span>
      </div>
    </MDBFooter>
  );
}
