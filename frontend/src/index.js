import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import UserStore from "./store/userStore";
import GlobalStore from "./store/globalStore";
import ChatStore from "./store/chatStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Context = createContext(null);

root.render(
  <Context.Provider value={{
    userStore: new UserStore(),
    globalStore: new GlobalStore(),
    chatStore: new ChatStore()
  }
  }>
    <App />
  </Context.Provider>
);

export default Context;