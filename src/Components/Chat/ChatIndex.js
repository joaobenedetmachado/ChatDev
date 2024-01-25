import React, { useState } from 'react';

const Chat = ({ placeholder, value, onChange, handleKeyPress }) => {
  return (
    <div style={{backgorund: 'transparent', position: 'fixed', top: 0, width: '100%',}}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        style={{
          width: '100%',
          height: '20px',
          boxSizing: 'border-box',
          padding: '5px',
          fontSize: '16px',
          marginBottom: '10px',
        }}
      />
    </div>
  );
};

export default Chat;
