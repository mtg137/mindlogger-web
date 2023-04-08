import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import app from './app/app.reducer';
import applet from './applet/applet.reducer';
import responses from './responses/responses.reducer';
import user from './user/user.reducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app,
    form,
    user,
    applet,
    responses,
  });
export default createRootReducer;
