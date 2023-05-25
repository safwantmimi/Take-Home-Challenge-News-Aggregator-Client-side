import {React, useState} from 'react';
import './auth.css';
import {useForm} from "../Hooks/useForm";
import apiClient from '../Services/api';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';


import { useAuth } from '../Hooks/useAuth';
function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  {/* 
  const handleSignIn = () => {
    // Prepare the login data object
    const loginData = {
      email,
      password,
      rememberMe
    };
  
    // Send the login request to the API
    fetch(API_URL+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => {
        // Check the response from the API
        if (data.token) {
          // Authentication successful, save the token to local storage
          localStorage.setItem('token', data.token);
          // Redirect to home page or desired route
          window.location.href = '/home';
        } else {
          // Authentication failed, handle the error (e.g., display an error message)
          console.error('Login failed:', data.error);
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  };
  
*/}
  const { setAsLogged } = useAuth(); 
  const { setErrors, renderFieldError, message, setMessage, navigate } = useForm();
  const handleSignIn = (e) => {
      e.preventDefault();
      setErrors(null);
      setMessage('');
      // make request first to sanctum/csrf-cookie
      apiClient.get('/sanctum/csrf-cookie').then(() => {
         const payload = {
            email,
            password
         };
          if(rememberMe) {
              payload.remember = true;
          }
          apiClient.post('/api/login', payload).then(response => {
            apiClient.get('/api/user').then(user => {
              if(response.data) {
                setAsLogged(response.data.data); // Set user data in the auth context
              }
            })
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
      });
  };


  return (

    
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Stay Informed, <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>Stay Ahead</span>
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
                label='Email'
                id='form3'
                type='email'
                required
                autoComplete="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='form4'
                type='password'
                required
                autoComplete="current-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value={rememberMe}  onChange={(e) => setRememberMe(e.target.value)} id='flexCheckDefault' label='Remember me' />
                {/* <a href="!#">Forgot password?</a> */}
              </div>
              
              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSignIn}>sign in</MDBBtn>

              <div className="d-flex text-center justify-content-center">

                <p>Need to create account ? </p>
                <MDBBtn tag='a' href='/SignUp' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  Sign Up
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default SignIn;