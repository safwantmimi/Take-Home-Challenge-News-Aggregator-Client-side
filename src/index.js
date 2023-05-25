import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
import {Provider} from 'react-redux';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
