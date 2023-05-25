import { React, useState, useEffect } from "react";
import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBCol,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";

import FullCardComponent from './Cards/FullCard';
import TodaysNewsCard from './UI/TodaysNewsCard';
import Pagination from './Pagination';
import Carousel from "./UI/Carousel";


import apiClient from "../Services/api";
import { fetchLatest } from '../Redux/actions';
import LoadingSpinner from "./UI/Spinner";
import { useForm } from "../Hooks/useForm";

export default function Home({ articles, totalItems ,isLoading}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(3);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { message } = useForm();
  const dispatch = useDispatch();
  const latestNews = useSelector(state => state.latest);

  useEffect(() => {
    setPaginatedItems(articles?.slice(indexOfFirstItem, indexOfLastItem));
    setTotalPages(Math.floor(totalItems / itemsPerPage));

    apiClient
      .get('/api/latest')
      .then((latestNews_response) => {
        dispatch(fetchLatest(latestNews_response.data));
      })
      .catch((error) => {
        console.error('Error fetching latest news:', error);
      });
  }, [articles, dispatch, indexOfFirstItem, indexOfLastItem, totalItems]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderNews =  (
    <MDBContainer className="py-5">
    <MDBRow>
      <MDBCol>
        {
            message && <div className="alert alert-danger">{message}</div>
        }
      </MDBCol>
    </MDBRow>
    <MDBRow className="gx-5 border-bottom pb-4 mb-5">
      <MDBCol md="6" className="mb-4">
        <MDBRipple
          className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
          rippleTag="div"
          rippleColor="light"
        >
          {latestNews && <Carousel latestNews={latestNews}/>}
          
          <a>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, .15)" }}
            ></div>
          </a>
        </MDBRipple>
      </MDBCol>
     <TodaysNewsCard latestItems={latestNews}/>
    </MDBRow>
    <MDBRow className="gx-lg-5">
      {(articles && articles.length > 0) ? paginatedItems.map((article,idx) => (
        <FullCardComponent key={idx} article={article}/>
      )) : 
      <>
      <MDBCol className="text-center my-2 " >
        <span className="font-weight-bold font-bold fs-1">Ups</span> <span className="fs-2">! We couldn't find any match for your filters !
        <br/>try again with a different filter Or wait till we fetch the upcoming
          </span> <span className="fs-1">News !</span>
      </MDBCol>
      </>
      }
    </MDBRow>
    {(articles && articles.length > 0) &&
       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    }</MDBContainer>
  )
  return (
    <>
      {isLoading && (!message || message == '') ? (
        <div className="AppSpinner">
          <LoadingSpinner className="AppSpinner" /> 
        </div>
      ) : (
        renderNews
      )}
    </>
  );
}