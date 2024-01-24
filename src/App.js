import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, getDoc } from 'firebase/firestore';

import Chat from './Components/Chat/ChatIndex.js';
import PopUp from './Components/PopUp/PopUpIndex.js';
import ConfigPopUp from './Components/ConfigPopUp/ConfigPopUp.js';
import ThreeDots from './Components/ThreeDots/ThreeDots.js';

function App() {
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ShowConfigPopUp, setShowConfigPopUp] = useState(false);
  
  const usersCollectionRef = collection(db, 'users');
  const messagesCollectionRef = collection(db, 'messages');

//checa se o user é admin, por enquanto nao faz nada
  const checkAdmin = (username) => {
    return username === 'admin';
  };

//serve para fechar o popup se o input tiver vazio
  if (text === null) {
    setShowPopUp(false);
  }

//esse comando checa, se os agumento de username e password tiverem correspondendo no banco de dados, ele loga
  const login = async (username, password) => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const user = querySnapshot.docs.find((doc) => doc.data().username === username && doc.data().password === password);
    if (user) {
      setCurrentUser(username);
      setIsAdmin(checkAdmin(username));
      return true;
    }
    return false;
  };


//essa funcao é pra quando usar o /register ele manda pro banco de dados e tal
  const register = async (username, password) => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    if (querySnapshot.docs.some((doc) => doc.data().username === username)) {
      return false;
    }
    await addDoc(collection(db, 'users'), { username, password });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const isCommand = (input) => input.startsWith('/');


//handle pra logar
  const handleLogin = (username, password) => {
    if (login(username, password)) {
      setMessages((prevMessages) => [...prevMessages, { username: 'system', message: `joined in the system as ${username}` }]);
    } else {
      setMessages((prevMessages) => [...prevMessages, { username: 'system', message: 'incorrect username or password' }]);
    }
    setShowPopUp(false);
    setText('');
  };

//handle pra registrar o usuario
  const handleRegister = async (username, password) => {
    if (register(username, password)) {
      setMessages((prevMessages) => [...prevMessages, { username: 'system say', message: `registered user ${username}` }]);
    } else {
      setMessages((prevMessages) => [...prevMessages, { username: 'system say', message: 'username already exists' }]);
    }
    setShowPopUp(false);
    setText('');
  };

//handle comando p /quit
  const handleLogout = () => {
    logout();
    setShowPopUp(false);
    setText('');
    setMessages((prevMessages) => [...prevMessages, { username: 'system say', message: 'left the system' }]);
  };


//handle comando p /clear
  const handleClear = () => {
    clearMessages();
    setText('');
    setShowPopUp(false);
  };
  
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const querySnapshot = await getDocs(messagesCollectionRef);
        const messagesData = querySnapshot.docs.map((doc) => doc.data());
        setMessages(messagesData.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error('error fetching messages:', error);
      }
    }, 1000);
  
    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

//handle pra pegar os comandos
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isCommand(text)) {
        const args = text.split(' ');
        switch (args[0]) {
          case '/clear':
            handleClear();
            break;
          case '/quit':
            handleLogout();
            break;
          case '/register':
            handleRegister(args[1], args[2]);
            break;
          case '/login':
            handleLogin(args[1], args[2]);
            break;
          default:
            handleMessage(text);
            break;
        }
      } else {
        handleMessage(text);
      }
    } else if (e.key === '/') {
      setShowPopUp(true);
    }
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setShowPopUp(newText.startsWith('/'));
  };

  const handleMessage = async (input) => {
    if (text.trim() !== '' && currentUser) {
      const messageRef = await addDoc(messagesCollectionRef, {
        id: messages.length + 1,
        username: currentUser,
        message: input,
      });
  
      // manda as novas mensagem para o banco de dados na colecao message
      const messageSnapshot = await getDoc(messageRef);
      const messageData = messageSnapshot.data();
  
      // seta como nova mensagem e tal
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, messageData];
        newMessages.sort((a, b) => a.id - b.id);
        return newMessages;
      });
    }
    setText('');
  };

  return (
    <div className="App">
      <div
        style={{
          margin: '20px 20px 20px 0',
        }}
      >
        <Chat
          placeholder="Enter your text"
          value={text}
          onChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
        {showPopUp && <PopUp users={users} handleCommand={handleChange} />}
        {messages.map((messageObject, index) => (
          <div key={index}>
            {messageObject && messageObject.username && messageObject.message ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#f2f2f2',
                    padding: '5px 10px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {messageObject.username
                    ? messageObject.username  + ': '
                    : ''} 
                  {messageObject.message}
                </div>
                { isAdmin &&  <ThreeDots setShowConfigPopUp={setShowConfigPopUp} />}
                { isAdmin && ShowConfigPopUp && <ConfigPopUp setShowConfigPopUp={setShowConfigPopUp} />}

              </div>
            ) : (''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;