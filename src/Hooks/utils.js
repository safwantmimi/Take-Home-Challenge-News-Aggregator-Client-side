import { useContext } from 'react';
import apiClient from '../Services/api';
import AuthContext from '../Contexts/AuthContext';
const useUtils = () => {
  
  const { authData } = useContext(AuthContext);
  const formatDate = (date) => {
    return date.split(' ')[0].split('-').reverse().join('.'); // "2023-05-11 06:32:00" => "11.05.2023"
  };

  const navigateByUrl = (article) => {
    if(authData && authData.user){
      saveArticle(article)
      window.location.href = article.url;
    }else {
      window.location.href = article.url;
    }
  };

  const saveArticle = (article) => {
    apiClient.post('/api/article_viewed', {article_id : article.id}).then(response => {
      if(response.data) {
        window.location.href = article.url;
      }
    }).catch(error => {
        if(error.response) {
          // do nothing for now ..
      }
    });
  }

  return {
    formatDate,
    navigateByUrl
  };
};

export default useUtils;
