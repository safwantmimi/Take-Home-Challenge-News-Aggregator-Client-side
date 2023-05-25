import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    onPageChange(newPage);
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    onPageChange(newPage);
  };

  const handlePage = (idx) => {
    onPageChange(idx);
  }


  const renderPaginationItems = () => {
    const items = [];

    // Previous Page
    items.push(
      <MDBPaginationItem key="previous" disabled={currentPage === 1} className='cursor-pointer'>
        <MDBPaginationLink tabIndex={-1} aria-disabled="true" onClick={handlePreviousPage}>
          Previous
        </MDBPaginationLink>
      </MDBPaginationItem>
    );


    // Page Numbers
    const maxVisiblePages = 3; // Number of visible page numbers
    const totalPagesToShow = Math.min(maxVisiblePages, totalPages);

    if (currentPage <= maxVisiblePages) {
      // Show page numbers from 1 to totalPagesToShow
      for (let page = 1; page <= totalPagesToShow; page++) {
        items.push(
          <MDBPaginationItem key={page} active={currentPage === page}  className='cursor-pointer'>
            <MDBPaginationLink onClick={() => handlePage(page)}>{page}</MDBPaginationLink>
          </MDBPaginationItem>
        );
      }
    } else if (currentPage > totalPages - maxVisiblePages + 1) {
      // Show page numbers from totalPages - maxVisiblePages + 1 to totalPages
      for (let page = totalPages - maxVisiblePages + 1; page <= totalPages; page++) {
        items.push(
          <MDBPaginationItem key={page} active={currentPage === page} className='cursor-pointer'>
            <MDBPaginationLink  onClick={() => handlePage(page)}>{page}</MDBPaginationLink>
          </MDBPaginationItem>
        );
      }
    } else {
      // Show page numbers with ellipsis
      const firstVisiblePage = currentPage - Math.floor(maxVisiblePages / 2);
      const lastVisiblePage = currentPage + Math.floor(maxVisiblePages / 2);

      items.push(
        <MDBPaginationItem key={1} active={currentPage === 1} className='cursor-pointer'>
          <MDBPaginationLink  onClick={() => handlePage(1)}>1</MDBPaginationLink>
        </MDBPaginationItem>
      );

      if (firstVisiblePage > 2) {
        items.push(
          <MDBPaginationItem key="ellipsis-start" disabled className='cursor-pointer'>
            <MDBPaginationLink tabIndex={-1} aria-disabled="true">
              ...
            </MDBPaginationLink>
          </MDBPaginationItem>
        );
      }

      for (let page = firstVisiblePage; page <= lastVisiblePage; page++) {
        items.push(
          <MDBPaginationItem key={page} active={currentPage === page} className='cursor-pointer'>
            <MDBPaginationLink  onClick={() => handlePage(page)}>{page}</MDBPaginationLink>
          </MDBPaginationItem>
        );
      }

      if (lastVisiblePage < totalPages - 1) {
        items.push(
          <MDBPaginationItem key="ellipsis-end" disabled>
            <MDBPaginationLink href="#" tabIndex={-1} aria-disabled="true">
              ...
            </MDBPaginationLink>
          </MDBPaginationItem>
        );
      }

      items.push(
        <MDBPaginationItem key={totalPages} active={currentPage === totalPages} className='cursor-pointer'>
          <MDBPaginationLink  onClick={() => handlePage(totalPages)}>{totalPages}</MDBPaginationLink>
        </MDBPaginationItem>
      );
    }

      // Next Page
      items.push(
        <MDBPaginationItem key="next" disabled={currentPage === totalPages} className='cursor-pointer'>
          <MDBPaginationLink onClick={handleNextPage}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
  
      return items;
    };
  
    return (
      <nav aria-label="...">
        <MDBPagination circle className="mb-0 justify-content-center">
          {renderPaginationItems()}
        </MDBPagination>
      </nav>
    );
  };
  
  export default Pagination;
  