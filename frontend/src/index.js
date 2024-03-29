import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import UserStore from "./store/userStore";
import GlobalStore from "./store/globalStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Context = createContext(null);

root.render(
  <Context.Provider value={{
    userStore: new UserStore(),
    globalStore: new GlobalStore()
  }
  }>
    <App />
  </Context.Provider>
);

export default Context;