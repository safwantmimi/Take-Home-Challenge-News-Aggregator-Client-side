import { combineReducers } from 'redux';
import userReducer from './user/userReducer';

const articlesReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_ARTICLES':
        return action.payload;
      case 'UPDATE_ARTICLE':
        return state.map((article) =>
          article.id === action.payload.id ? action.payload : article
        );
      default:
        return state;
    }
  };
  
  const categoriesReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_CATEGORIES':
        return action.payload;
      default:
        return state;
    }
  };
  
  const textSearchReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_SEARCH_TEXT':
        return action.payload;
      default:
        return state;
    }
  };
   
  const SourcesReducer = (state = '', action) => {
    switch (action.type) {
      case 'FETCH_SOURCES':
        return action.payload;
      default:
        return state;
    }
  };

   
  const AuthorsReducer = (state = '', action) => {
    switch (action.type) {
      case 'FETCH_AUTHORS':
        return action.payload;
      default:
        return state;
    }
  };

     
  const LatestNewsReducer = (state = '', action) => {
    switch (action.type) {
      case 'FETCH_LATEST':
        return action.payload;
      default:
        return state;
    }
  };

     
  const totalReducer = (state = '', action) => {
    switch (action.type) {
      case 'FETCH_TOTAL':
        return action.payload;
      default:
        return state;
    }
  };

  const rootReducer = combineReducers({
    articles: articlesReducer,
    categories: categoriesReducer,
    textSearch: textSearchReducer,
    total: totalReducer,
    user:  userReducer,
    authors: AuthorsReducer,
    sources: SourcesReducer,
    latest: LatestNewsReducer
  });
  
  export default rootReducer;
  
