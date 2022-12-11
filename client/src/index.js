import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import 'animate.css';

/**
 * redux configuration
 */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";
import { SnackbarProvider } from "notistack";

import swDev from "./swDev";



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store} >
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <SnackbarProvider maxSnack={1} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
            <App />
          </SnackbarProvider>
        </React.StrictMode>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

swDev();