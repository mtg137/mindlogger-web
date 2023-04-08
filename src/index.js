import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from 'moment';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './custom.scss';
import './i18Next';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { clearUser } from './state/user/user.reducer';
import configureStore from './store';

const checkAuthToken = (store) => {
  const state = store.getState();
  const auth = state.user.auth;
  const expirationDate = moment(auth.expires);

  if (auth === null || moment().isAfter(expirationDate)) {
    store.dispatch(clearUser()); // Just in case
    return false;
  }

  return true;
};

const { store, persist } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
