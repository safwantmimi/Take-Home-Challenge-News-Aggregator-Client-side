import React from 'react';

const Search = ({ searchByText }) => {
    const handleSearch = (searchText) => {
        searchByText(searchText);
    }
  return (
    <form className='d-flex input-group mx-auto mt-2' style={{width : '75%'}}>
        <input
        type='search'
        className='form-control glowing-border'
        placeholder={'Search by a keyword ? (Exp : Apple Or '+new Date().getFullYear()+')'}
        aria-label='Search'
        onChange={(e) => handleSearch(e.target.value)}
        />
    </form>
  );
};

export default Search;
