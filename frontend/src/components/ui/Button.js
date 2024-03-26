import React from 'react';

const Button = ({ children, onclick, ...attrs }) => {
  return (
    <button className='btn' onClick={onclick} { ...attrs }>{ children }</button>
  );
};

export default Button;