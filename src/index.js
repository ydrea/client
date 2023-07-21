import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import './index.scss';
//
import { Provider } from 'react-redux';
import { store } from './redux/store';

//
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <ApiProvider api={apiSlice}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ApiProvider> */}
  </Provider>
);
