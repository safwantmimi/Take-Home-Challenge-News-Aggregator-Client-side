import React, { useEffect, useState } from 'react';

const InfiniteScroll = ({ data, setData, onSelectItem, selectedItems }) => {

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
    //   setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemCheck = (item) => {
    onSelectItem(item);
  };

  return (
    <div className="infinite-scroll" >
      {data.map((item) => (
        <div key={item.id} className='form-check checkbox-teal mb-2'>
          <label>
            <input
              type="checkbox"
              className='form-check-input'
              checked={selectedItems.map(el => {return el.id}).includes(item.id)} // Set the checked status based on item selection logic
              onChange={() => handleItemCheck(item)}
            />
            <span className='form-check-label'>
                {item.name}
            </span>
          </label>
        </div>
        
      ))}
    </div>
  );
};

export default InfiniteScroll;
