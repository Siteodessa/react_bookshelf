import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import cards from './cards';
import filterCards from './filterCards';
import updateTitle from './updateTitle';
import updateAuthor from './updateAuthor';
import imageUploader from './imageUploader';

export default combineReducers({
  routing,
  cards,
  filterCards,
  updateTitle,
  updateAuthor,
  imageUploader,
})
