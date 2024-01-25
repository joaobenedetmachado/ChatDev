import React, { useState } from 'react';

const PopUp = () => {
    return (
      <div
        style={{
          width: '310px',
          height: 'auto',
          backgroundColor: '#ffffff',
          border: '1px',
          borderColor: '#000000',
          borderStyle: 'solid',
          borderRadius: '5px',
          position: 'stick',
          zIndex: '1',
          opacity: '0.8',
          margin: '25px 0 0 0px',
        }}
      >
        {}
        Suggestions: 
        <div>/register [username] [password] [password]</div>
        <div>/login [username] [password]</div>
        <div>/clear</div>
        <div>/quit</div>
      </div>
    );
  }

export default PopUp;