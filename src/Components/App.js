import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import AuthContext from "../Contexts/AuthContext";

import Home from "./Home";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import Search from "./Search";

import {
  fetchArticles,
  updateArticle,
  fetchCategories,
  fetchAuthors,
  fetchSources,
  setSearchByText,
  fetchTotal
} from '../Redux/actions';
import apiClient from "../Services/api";
import { useForm } from "../Hooks/useForm";

function App() {
  const { userData, loginUserOnStartup } = useAuth();
  const { setMessage } = useForm();
  const [authData, setAuthData] = useState({ signedIn: userData.signedIn, user: userData.user });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const categories = useSelector((state) => state.categories);
  const authors = useSelector((state) => state.authors);
  const sources = useSelector((state) => state.sources);
  const total = useSelector((state) => state.total);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    Promise.all([
      apiClient.get('/api/news'),
      apiClient.get('/api/categories'),
      apiClient.get('/api/authors'),
      apiClient.get('/api/sources')
    ])
      .then(([articles_response, categories_response, authors_response, sources_response]) => {
        dispatch(fetchArticles(articles_response.data.results.original));
        dispatch(fetchTotal(articles_response.data.total));
        dispatch(fetchCategories(categories_response.data));
        dispatch(fetchAuthors(authors_response.data));
        dispatch(fetchSources(sources_response.data));
      })
      .catch((error) => {
        setMessage("There was an error while fetching data");
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, setMessage]);

  const fetchNewsByCategory = useCallback((category) => {
    setIsLoading(true);
    apiClient
      .get('/api/news', {
        params: {
          category,
        },
      })
      .then((article_response) => {
        dispatch(fetchArticles(article_response.data.results.original));
        dispatch(fetchTotal(article_response.data.total));
      })
      .catch((error) => {
        setMessage("There was an error while fetching news");
        console.error('Error fetching articles:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, setMessage]);

  const searchByText = useCallback((searchQuery) => {
    setIsLoading(true);
    apiClient
      .get('/api/news', {
        params: {
          search_query: searchQuery,
        },
      })
      .then((article_response) => {
        dispatch(fetchArticles(article_response.data.results.original));
        dispatch(fetchTotal(article_response.data.total));
      })
      .catch((error) => {
        setMessage("There was an error while performing the query search");
        console.error('Error fetching articles:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, setMessage]);

  useEffect(() => {
    setAuthData(userData);
  }, [userData, setAuthData]);

  useEffect(() => {
    loginUserOnStartup();
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>

      <Routes>
        <Route path="/" element={
          <>
            <Header props={{ categories, authors, sources }} fetchNewsByCategory={fetchNewsByCategory} />
            <Search searchByText={searchByText} />
            <Home articles={articles ?? []} totalItems={total ?? 0} isLoading={isLoading ?? false} />
          </>
        } />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>

      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
