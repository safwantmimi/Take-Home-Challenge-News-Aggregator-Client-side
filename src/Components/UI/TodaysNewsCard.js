import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBCol
  } from "mdb-react-ui-kit";

import useUtils from "../../Hooks/utils";

export default function TodaysNewsCard({ latestItems }) {
  const [displayedNews, setDisplayedNews] = useState(null);
  const {navigateByUrl} = useUtils()

  useEffect(() => {
    // Function to get the next news item from the latestItems array
    const getNextNewsItem = () => {
      const currentIndex = latestItems.findIndex(item => item === displayedNews);
      const nextIndex = (currentIndex + 1) % latestItems.length;
      return latestItems[nextIndex];
    };

    // Set the initial displayed news
    if (!displayedNews && latestItems.length > 0) {
      setDisplayedNews(latestItems[0]);
    }

    // Update the displayed news every 15 seconds
    const intervalId = setInterval(() => {
      setDisplayedNews(getNextNewsItem());
    }, 15000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [displayedNews, latestItems]);

  return (
    <>
        <MDBCol md="6" className="mb-4">
        {displayedNews && (
            <div>
                <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">
                    News of the day
                    </span>
                    <h4>
                    <strong>{displayedNews.title}</strong>
                    </h4>
                    <p className="text-muted">
                    {displayedNews.description}
                    </p>
                <MDBBtn onClick={() => navigateByUrl(displayedNews)}>Read More</MDBBtn>
            </div>
        )}
    </MDBCol>
    </>


  );
}
