import registerServiceWorker from './sw/registerServiceWorker';
import { createStore, applyMiddleware  } from 'redux';
import reducer from './reducers'
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {  Route , HashRouter  } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux';
import BookApp from './BookApp';
import { getBooks } from './actions/getbooks';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
          <Provider store={store}>
            <HashRouter>
            <div>
            <Route exact path="/" component={BookApp} />
            </div>
          </HashRouter>
          </Provider>,
document.getElementById('root'))
registerServiceWorker();
store.dispatch(getBooks())
