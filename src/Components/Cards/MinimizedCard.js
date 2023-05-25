import React, { useState } from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import useUtils from '../../Hooks/utils';

function MinimizedCardComponent(article,defaultImg) {
  const {formatDate} = useUtils()
  const {navigateByUrl} = useUtils()
  const [Article,setArticle] = useState(article.article)

  console.log(Article)
  return (
    <MDBRow className="mb-4 border-bottom pb-2 cursor-pointer">
    <MDBCol size="3">
      <img
        src={Article.image != '' ? Article.image : defaultImg}
        className="img-fluid shadow-1-strong rounded"
        alt={Article.id}
        onClick={() => navigateByUrl(Article)}
      />
    </MDBCol>

    <MDBCol size="9">
      <a className="mb-2" onClick={() => navigateByUrl(Article)}>
        <strong>{Article.title}</strong>
      </a>
      <p>
        <u>{formatDate(Article.published_at ?? '')}</u>
      </p>
    </MDBCol>
  </MDBRow>
  );
}

export default MinimizedCardComponent;
