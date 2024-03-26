import React from 'react';

const Input = ({ label, ...props }) => {
  return (
    <div className='inputWrapper'>
      <label>
        {label}
        <input className="input" {...props} />
      </label>
    </div>
  );
};

export default Input;