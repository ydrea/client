import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
// import './index.scss';
//
import { Provider } from 'react-redux';
import { store } from './redux/store';

//
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <ApiProvider api={apiSlice}> */}
    <HashRouter hashType="noslash">
      <App />
    </HashRouter>
    {/* </ApiProvider> */}
  </Provider>
);
