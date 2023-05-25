import React from 'react';
import { MDBCol, MDBRipple, MDBRow , MDBIcon} from 'mdb-react-ui-kit';
import MinimizedCardComponent from './MinimizedCard';
import useUtils from '../../Hooks/utils';
function Content({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

const FullCardComponent = ({ article }) => {
   
  const {formatDate} = useUtils()
  const {navigateByUrl} = useUtils()
  
  let defaultImg = 'data:image/jpeg;base64,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';


    return (
    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0"   onClick={() => navigateByUrl(article)}>
      <div>
        <MDBRipple
          className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
          rippleTag="div"
          rippleColor="light"
        >
        <img
          src={article.image != '' ? article.image : defaultImg}
          className="img-fluid"
        />
          <a>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple>
        <MDBRow className="mb-3">
          <MDBCol col="6" className='d-block'>
            <a href={article.source.url} className="text-info">
              <MDBIcon fab icon="sourcetree"  className="me-1"/>
              { article?.source.name}
            </a>
            <a href={article.source.url} className="text-info d-flex">
              <MDBIcon fas icon="id-card-alt" className="me-1 my-auto"/>
              { article?.author_name}
            </a>
          </MDBCol>
          <MDBCol col="6" className="text-end">
            <u>{formatDate(article.published_at)}</u>
          </MDBCol>
        </MDBRow>
        <a href="#!" className="text-dark">
          <h5>{article.title}</h5>
          <Content content={article.content}/>
        </a>
        <hr />
        <div  className="text-dark">
          {article.related_articles.map( related => (
              <MinimizedCardComponent key={related.id + '*' + related.author_id} article={related} defaultImg={defaultImg}/>
          ))}
        </div>
      </div>
    </MDBCol>
  );
};

export default FullCardComponent;
