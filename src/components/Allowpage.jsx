import React from 'react';

const Allowpage = ({ enterKeyPressed }) => {
  return (
    <input
      onKeyDown={enterKeyPressed}
      type="text"
      name="city"
      placeholder="Enter City..."
    />
  );
};

export default Allowpage;
