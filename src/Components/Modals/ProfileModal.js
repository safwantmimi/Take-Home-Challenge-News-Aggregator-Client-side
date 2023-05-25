import React, { useContext, useState, useEffect } from 'react';
import InlineEdit from '../UI/InlineEditText';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import AuthContext from '../../Contexts/AuthContext';
import apiClient from '../../Services/api';
import { useForm } from '../../Hooks/useForm';
import InfiniteScroll from '../UI/InfiniteScroll';
import MinimizedCardComponent from '../Cards/MinimizedCard';


export default function ProfileModal({ showProfileModal,setShowProfile, props }) {
  const { authData, setAuthData } = useContext(AuthContext);

  const [userName, setUserName] = useState(authData && authData.user ? authData.user.name : '');
  const [image, setImage] = useState(authData && authData.user ? authData.user.image.trim().replace('=,','=') : '');
  const [imageKey, setImageKey] = useState(Date.now());
  const [selectedCategories, setSelectedCategories] = useState(props.categories.filter(c => authData && authData.user?.preferences?.category_id.includes(c.id)).map(el => el.id));
  const [selectedAuthors, setSelectedAuthors] = useState(props.authors.filter(c => authData && authData.user?.preferences?.author_id.includes(c.id)));
  const [selectedSources, setSelectedSources] = useState(props.sources.filter(c => authData && authData.user?.preferences?.source_id.includes(c.id)));

  const { setErrors, renderFieldError, message, setMessage, navigate } = useForm();

  const toggleShow = () => setShowProfile(!showProfileModal);
  const openFileInput = (e) => {
    document.getElementById('file-input').click();
  }
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsDataURL(file);
    }
  };
  
  const handleFileRead = (event) => {
    const base64Image = event.target.result;
    setImage(base64Image);
    console.log(image)
    setImageKey(Date.now()); // Generate new key
  };

  const handlePreferenceClick = (objectItem, setObject) => {
    setObject((prevSelectedItems) => {
      const updatedItems = [...prevSelectedItems];
      const itemIndex = updatedItems.indexOf(objectItem);
  
      if (itemIndex !== -1) {
        updatedItems.splice(itemIndex, 1); // Remove item if already selected
      } else {
        updatedItems.push(objectItem); // Add item if not selected
      }
  
      return updatedItems;
    });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
  
    // Gather all the data from the modal
    const updatedData = {
      name: userName,
      preferences: {
        user_id: +authData.user.id,
        category_id: selectedCategories,
        source_id: selectedSources.map((el) => el.id), // Corrected data type
        author_id: selectedAuthors.map((el) => el.id), // Corrected data type
      },
      image: image,
    };
  
    apiClient
      .post('/api/updateProfile', updatedData)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          // Update the userData after saving preferences
          setAuthData((prevAuthData) => ({
            ...prevAuthData,
            user: {
              ...prevAuthData.user,
              name: userName,
              preferences: {
                ...prevAuthData.user.preferences,
                category_id: selectedCategories,
                source_id: selectedSources,
                author_id: selectedAuthors,
              },
              image: image,
            },
          }));
  
          setShowProfile(false);
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          setMessage(error.response.data.message);
        }
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };
  

  return (
    <>
      <MDBModal show={showProfileModal} setShow={setShowProfile} tabIndex='-1'>
        <MDBModalDialog size='fullscreen-xl-down'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit preferences</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCol>
                {
                    message && <div className="alert alert-danger">{message}</div>
                }
              </MDBCol>
              <div style={{ backgroundColor: '#9de2ff' }}>
                <MDBCard>
                  <div
                    className='text-white d-flex flex-row'
                    style={{ backgroundColor: '#000', height: '200px' }}
                  >
                    <div className='ms-4 mt-5 d-flex flex-column' style={{ width: '150px' }}>
                      {image && (
                        <MDBCardImage
                          src={image}
                          key={imageKey}
                          alt='Generic placeholder image'
                          className='mt-4 mb-2 img-thumbnail'
                          fluid
                          style={{ width: '150px', zIndex: '1' }}
                        />
                      )}
                      <MDBBtn outline color='dark' style={{ height: '36px', overflow: 'visible' }}  onClick={openFileInput}>
                        Change picture
                      </MDBBtn>
                      <input type='file' onClick={handleFileSelect} hidden id='file-input' />
                    </div>
                    <div className='ms-3' style={{ marginTop: '130px' }}>
                      <InlineEdit value={userName} setValue={setUserName} />
                    </div>
                  </div>
                  <MDBCardBody className='mt-5 text-black p-4'>
                    <div className='d-bloc justify-content-between align-items-center mb-4'>
                    <MDBCardText className='lead pr-2 mt-1 fw-normal mb-0 bg-primary text-sm fs-6 text-white p-2'>Choose your favorite categories:</MDBCardText>
                        <div className='p-1 mt-2' style={{ backgroundColor: '#f8f9fa', marginLeft:'1rem' }}>
                        {props.categories.map((cat) => (
                          <MDBBtn
                            outline
                            rounded
                            key={cat.id}
                            className={`m-1 ${selectedCategories.includes(cat.id) ? 'bg-primary text-white' : ''}`}
                            color='primary'
                            onClick={(e) => {
                              e.preventDefault();
                              handlePreferenceClick(cat.id,setSelectedCategories);
                            }}
                          >
                            {cat.name}
                          </MDBBtn>
                        ))}
                      </div>
                    </div>

                    <div className='mb-2'>
                      <div className='p-1 ml-2' style={{ backgroundColor: '#f8f9fa' }}>
                      <div>
                        <div className='d-bloc justify-content-between align-items-center'>
                          <MDBCardText className='lead pr-2 fw-normal mb-0 bg-primary fs-6 text-white p-2'>Choose your favorite author:</MDBCardText>
                          <div className='p-1 mt-2' style={{ backgroundColor: '#f8f9fa', marginLeft:'1rem' }}>
                            {selectedAuthors && selectedAuthors.map((author) => (
                                <MDBBtn
                                  outline
                                  rounded
                                  key={author.id}
                                  className={`m-1 text-sm text-wrap text-capitalize  btn-sm`}
                                  color='primary'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePreferenceClick(author, setSelectedAuthors);
                                  }}
                                >
                                  {author.name}
                                </MDBBtn>
                              ))}
                          </div>
                        </div>
                        <div style={{ backgroundColor: '#f8f9fa', marginLeft:'1rem' }}>
                          <InfiniteScroll 
                            data={props.authors} 
                            setData={() => {setSelectedAuthors}} 
                            onSelectItem={(item) => handlePreferenceClick(item, setSelectedAuthors)}
                            selectedItems={selectedAuthors}
                          />
                        </div>
                        </div>
                      </div>
                    </div>

                    <div className='mb-2'>
                      <div className='p-1 ml-2' style={{ backgroundColor: '#f8f9fa' }}>
                      <div>
                        <div className='d-bloc justify-content-between align-items-center'>
                          <MDBCardText className='lead pr-2 fw-normal mb-0 bg-primary fs-6 text-white p-2'>Choose your favorite source:</MDBCardText>
                          <div className='p-1 mt-2' style={{ backgroundColor: '#f8f9fa', marginLeft:'1rem' }}>
                            {selectedSources && selectedSources.map((source) => (
                                <MDBBtn
                                  outline
                                  size='sm'
                                  key={source.id}
                                  className={`m-1 text-sm text-wrap text-capitalize`}
                                  color='primary'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePreferenceClick(source, setSelectedSources);
                                  }}
                                >
                                  {source.name}
                                </MDBBtn>
                              ))}
                          </div>
                        </div>
                        <div style={{ backgroundColor: '#f8f9fa', marginLeft:'1rem' }}>
                          <InfiniteScroll 
                            data={props.sources} 
                            setData={() => {setSelectedSources}} 
                            onSelectItem={(item) => handlePreferenceClick(item, setSelectedSources)}
                            selectedItems={selectedSources}
                          />
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <MDBCardText className='lead fw-normal mb-0'>Recent Activities</MDBCardText>
                    </div>
                    <MDBRow>
                      <div className='d-block'>
                        { authData.user?.viewedArticles.length > 0 && authData.user.viewedArticles.map((article) =>  (
                          <MDBCol className='mb-2 d-block'> <MinimizedCardComponent article={article.article}/> </MDBCol>
                        ))}
                      </div>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={handleSaveChanges}>Save preferences</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
