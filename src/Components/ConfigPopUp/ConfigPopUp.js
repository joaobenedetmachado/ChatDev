import React, { useState } from 'react';

const ConfigPopUp = () => {
    return (
      <div
        style={{
          width: '100px',
          height: 'auto',
          backgroundColor: '#ffffff',
          zIndex: '-1',
          opacity: '0.8',
          display: 'flex',
          justifyContent:'center',
          alignItems: 'center',
        }}
      >
        {}
        <button
            style={{
                widht: '100px',
                height: '30px',
                backgroundColor: '#ffffff',
                textAlign: 'center',
                border: '1px',
                borderColor: '#808080',
                borderStyle: 'solid',
                borderRadius: '5px',
            }}
        >delete
        </button>
      </div>
    );
  }

export default ConfigPopUp;