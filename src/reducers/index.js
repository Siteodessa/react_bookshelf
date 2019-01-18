import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import books from './books';
import filterBooks from './filterBooks';
import updateTitle from './updateTitle';
import updateAuthor from './updateAuthor';
import imageUploader from './imageUploader';

export default combineReducers({
  routing,
  books,
  filterBooks,
  updateTitle,
  updateAuthor,
  imageUploader,
})
