import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/auth-context';
import { ChannelContextProvider } from './store/channel-context';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChannelContextProvider>
        <App />
      </ChannelContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
