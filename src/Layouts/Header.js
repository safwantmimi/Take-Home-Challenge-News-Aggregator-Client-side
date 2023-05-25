import React, { useContext,useEffect,useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
  MDBBadge
} from 'mdb-react-ui-kit';

import AuthContext from "../Contexts/AuthContext";
import ProfileModal from '../Components/Modals/ProfileModal'
import { useAuth } from "../Hooks/useAuth";
export default function Header({ props, fetchNewsByCategory }) {
  const [showBasic, setShowBasic] = useState(true);  
  const {authData} = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const [image, setImage] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const {setLogout} = useAuth()

  useEffect(() => {
    setImage(authData.user?.image?.trim().replace('=,','='))
    setPreferences(authData.user?.preferences)
  },[authData])

  const handleCategoryClick = (category) => {
    fetchNewsByCategory(category);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleLogout = () => {
    setLogout();
  };  
  
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {props.categories.filter(cat => (!preferences || preferences.category_id.length == 0)|| (preferences && preferences.category_id.includes(cat.id))).map((category) => (
              <MDBNavbarItem key={category.id} className='cursor-pointer'>
                <MDBNavbarLink
                  active
                  aria-current='page'
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name.toUpperCase().slice(0,1) + category.name.toLowerCase().slice(1,category.name.length) }
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
             <MDBNavbarItem className='cursor-pointer' style={{marginLeft: 'auto', marginRight:'1rem'}}>
             { authData.signedIn && authData.user ? (
              
              <div className='d-block d-md-flex justify-between mr-4'>
                <div className='d-inline-flex  position-relative cursor-pointer'  onClick={handleShowProfile}>
                  <MDBBadge className='position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle'>
                    <span className='visually-hidden'>New alerts</span>
                  </MDBBadge>
                  {image && ( // Add condition to check if image is available
                      <img
                        className='rounded-full shadow-4'
                        src={image}
                        alt=''
                        key='avatar'
                        style={{ width: '35px', height: '35px', marginLeft: '0.5rem' }}
                      />
                    )}
                  </div>

                  <a style={{color: '#3b5998',marginLeft: '1rem'}} className='my-auto' role="button" onClick={handleLogout}>
                    <MDBIcon fas icon="sign-out-alt" onClick={handleLogout}/>
                  </a>
                </div>
              ) : (
                <MDBBtn style={{ marginLeft: '0.5rem'}} className='btn-sm justify-sm-left justify-md-right' color='tertiary' href='/signIn'>
                  Sign In
                </MDBBtn>
              )}
              </MDBNavbarItem>
        
          </MDBNavbarNav>
            {showProfile && <ProfileModal showProfileModal={showProfile} setShowProfile={setShowProfile} props={props}/>}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
