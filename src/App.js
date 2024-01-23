import React, { useState } from 'react';
import './App.css';

const Chat = ({ placeholder, value, onChange, handleKeyPress }) => {
  return (
    <div>
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
}

const PopUp = () => {
  return (
    <div
      style={{
        width: '100px',
        height: 'auto',
        backgroundColor: '#ffffff',
        border: '1px',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: '5px',
        position: 'absolute',
        zIndex: '1',
        opacity: '0.8'
      }}
    >
      {}
      Suggestions: 
      <div>/clear</div>
      <div>/quit</div>
    </div>
  );
}

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (text.trim() === '/clear') {
        setMessages([]);
        setShowPopUp(false)
      } else if (text.trim() === '/quit') {
        setMessages([])
        setShowPopUp(false)
        // funcao para sair dessa tela e ir para a tela de bate papos disponiveis 
      } 
      
      else {
        setMessages([...messages, text]);
      }
      setText('');
    } else if (e.key === '/') {
      setShowPopUp(true);
    }
  }

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    setShowPopUp(newText.startsWith('/'));
  }

  return (
    <div className="App">
      <Chat placeholder="Enter your text" value={text} onChange={handleChange} handleKeyPress={handleKeyPress} />
      {showPopUp && <PopUp />}
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

export default App;
