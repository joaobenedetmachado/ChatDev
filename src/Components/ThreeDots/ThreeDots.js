import React from 'react';

function ThreeDots({ showConfigPopUp, setShowConfigPopUp }) {
  return (
    <div
      style={{
        width: '10px',
        height: 'auto',
        zIndex: '1',
        opacity: '0.8',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
      }}
      onClick={() => setShowConfigPopUp(!showConfigPopUp)}
    >
      <button
        style={{ 
          all: 'unset',
        }}
      >
        <div
          style={{
            height: '3px',
            width: '3px',
            backgroundColor: '#000000',
            borderRadius: '50px',
            margin: '2px',
          }}
        >
        </div>
        <div
          style={{
            height: '3px',
            width: '3px',
            backgroundColor: '#000000',
            borderRadius: '50px',
            margin: '2px',
          }}
        >
        </div>
        <div
          style={{
            height: '3px',
            width: '3px',
            backgroundColor: '#000000',
            borderRadius: '50px',
            margin: '2px',
          }}
        >
        </div>
      </button>
    </div>
  );
}

export default ThreeDots;