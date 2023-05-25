import React, {useState} from 'react';
import './auth.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import {useForm} from "../Hooks/useForm";
import apiClient from '../Services/api';
function SignUp() {

 const { setErrors, renderFieldError, message, setMessage, navigate } = useForm();
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
 const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

 const handleKeyUp = (e) => {
    if (e && e.key === 'Enter') {
      handleSignUp(e);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    setErrors(null);
    setMessage('');
    apiClient.post('/api/register', formData).then(response => {
      if(response.data) {
          // setAsLogged(response.data.user); // Set user data in the auth context
          setMessage('Thanks for joining us'+ response.data.user.name + 'please log in with your new account !')
          navigate('/signIn')
        }
    }).catch(error => {
        if(error.response) {
          if (error.response.data.message) {
              setMessage(error.response.data.message);
          }
          if (error.response.data.errors) {
              setErrors(error.response.data.errors);
          }
      }
    });
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
          Join the News Community, <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Expand Your Perspective </span>
          </h1>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <MDBCard className='my-5 bg-glass'>
          <MDBRow>
              <MDBCol>
                {
                    message && <div className="alert alert-danger">{message}</div>
                }
              </MDBCol>
            </MDBRow>
            <MDBCardBody className='p-5'>
            <MDBInput
              wrapperClass='mb-4'
              label='UserName'
              id='name'
              type='text'
              value={formData.name}
              onChange={handleInputChange}
              onKeyUp={(e) => handleKeyUp(e)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Email'
              id='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              onKeyUp={(e) => handleKeyUp(e)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='password'
              type='password'
              value={formData.password}
              onChange={handleInputChange}
              onKeyUp={(e) => handleKeyUp(e)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='confirmPassword'
              id='password_confirmation'
              type='password'
              value={formData.password_confirmation}
              onChange={handleInputChange}
              onKeyUp={(e) => handleKeyUp(e)}
            />
              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSignUp}>sign up</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignUp;
