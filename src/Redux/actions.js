export const fetchArticles = (articles) => ({
    type: 'FETCH_ARTICLES',
    payload: articles,
  });
  
  export const updateArticle = (article) => ({
    type: 'UPDATE_ARTICLE',
    payload: article,
  });
  
  export const fetchCategories = (categories) => ({
    type: 'FETCH_CATEGORIES',
    payload: categories,
  });
  
    
  export const fetchSources = (sources) => ({
    type: 'FETCH_SOURCES',
    payload: sources,
  });
    
  export const fetchAuthors = (authors) => ({
    type: 'FETCH_AUTHORS',
    payload: authors,
  });
  export const setSearchByText = (searchText) => ({
    type: 'SET_SEARCH_TEXT',
    payload: searchText,
  });
    
  export const fetchTotal = (total) => ({
    type: 'FETCH_TOTAL',
    payload: total,
  });

  export const fetchLatest = (latest) => ({
    type: 'FETCH_LATEST',
    payload: latest,
  });