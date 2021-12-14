import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserState from './Context/User/UserState';
import { ToastProvider } from 'react-toast-notifications';

import 'tailwindcss/tailwind.css';
import './styles/datepicker.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider placement="top-right">
      <UserState >
        <App />
      </UserState>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
