import registerServiceWorker from './sw/registerServiceWorker';
import { createStore, applyMiddleware  } from 'redux';
import reducer from './reducers'
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import About from './About';
import {  Route , HashRouter  } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux';
import Card from './Card'


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(createHistory(), store)


ReactDOM.render(
          <Provider store={store}>
            <HashRouter>
            <div>
            <Route exact path="/" component={App} />
            <Route path="/about" component={About} />
            <Route path="/cards/:id" component={Card} />
            </div>
          </HashRouter>
          </Provider>,
document.getElementById('root'))
document.getElementById('refresh').click()
registerServiceWorker();
