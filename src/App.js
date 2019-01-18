import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from './actions/getbooks';
import { imageUploader } from './actions/imageUploader';
import './cssfiles.js'
import Heading from './Heading.js'
import Shelf from './img/shelf.jpg';
import Book from './img/book.jpg';
import ViewIcon from './img/visibility.svg';
import AddIcon from './img/more.svg';


const App = ({  books, imageUploader, toggleForm, onFindBook,  onhandleSubmit, onToggleForm, onhandleTitle,  onhandleAuthor, onImageUploader, onGetBooks, ownProps }) => {
  let searchInput = '';
  let title = '';
  let author = '';


  const handleSubmit = (event) => {
      event.preventDefault();
      onhandleSubmit(JSON.stringify({
        title : title.value,
        author : author.value,
        bookfile : imageUploader,
      }))
    }


    const readFile = (ev) => {
      onImageUploader(ev.target.files[0])
      ev.preventDefault();
    }


    const toggleFormBox = (ev, value) =>{ onToggleForm(value) }
  const updateTitle = () => { onhandleTitle( title.value) }
  const updateAuthor = () => { onhandleAuthor( author.value) }
  const findBook = () => { onFindBook(searchInput.value) }
  let shelf_Style = (a) => {return { backgroundSize: "cover",display: "block",minHeight: "100vh",overflowX: "hidden",height: "100%", backgroundImage: "url(" +Shelf+ ")" }}
  let book_Style = (a) => {return { backgroundSize: "cover",display: "flex",minHeight: "209px",width: "148px",overflowX: "hidden",height: "100%", backgroundImage: "url(" +Book+ ")" }}



  let text_Style = () => {return { color: "#fff" }}
      return (
      <div className="Books" style={shelf_Style(Shelf)}>
          <Heading />
        <div className="fields" >
          <div className="row blueb">
              <div className="container">
                <div className="col-lg-12 col-xs-12 flex booksearch">
                  <input type="text" onChange={findBook} ref={(input) => { searchInput = input}} />
                </div>
              </div>
          </div>
        </div>
        <div className="container">
        <div className="row books">
          {books.map((book, index) =>
            <div key={index} className="col-md-2 col-sm-6">
              <div>
              <div className="el_book" style={book_Style(book.bookfile)}>
                  <h4 className="title" style={text_Style()}>{book.title}</h4>
                  <div className="author" style={text_Style()}>{book.author}</div>
                  <div className="author" style={text_Style()}>{}</div>
                  <a className="read" href={`${book.bookfile}`} target="_blank"> <img  className="viewicon" src={ViewIcon} /> </a>
              </div>
            </div>
            </div>
        )}
        </div>
        <div  className={toggleForm ? 'toggled form_box' : 'untoggled form_box'}>
        <form className='books_add' onSubmit={handleSubmit}>
        <div className="add_icon"><img onClick={(ev) => toggleFormBox(ev, toggleForm)} className="addicon" src={AddIcon} /></div>
            <div className="form_group">
              <label> Title</label>
              <input name="title" type="text"  ref={(input) => { title = input}} onChange={updateTitle}/>
            </div>
            <div className="form_group">
              <label> author</label>
              <input name="author" type="text"   ref={(input) => { author = input}} onChange={updateAuthor}/>
            </div>
            <div className="form_group">
              <label> bookfile</label>
              <input id="fileupload" name="bookfile" placeholder="Choose a file" type="file" accept="image/*"  ref={(input) => { }}
               onChange={(event)=> { readFile(event) }} onClick={(event)=> { event.target.value = null }} />
            </div>
            <div className="form_group">
              <label> submit</label>
              <input type="submit" value="submit"/>
            </div>
        </form>
        </div>
        </div>
        <div className="flex center">
         <button id="refresh" onClick={onGetBooks}>Refresh</button>
         </div>
      </div>
    )
}
export default connect(
  (state, ownProps) => ({
    books: state.books .filter( book => book.title.toLowerCase().includes(state.filterBooks.toLowerCase()) || book.author.toLowerCase().includes(state.filterBooks.toLowerCase())),
    imageUploader: state.imageUploader,
    toggleForm: state.toggleForm,
  ownProps
  }),
  dispatch => ({
    onFindBook : (payload) => {
      dispatch({ type: 'FIND_BOOK', payload: payload})
    },
    onhandleSubmit : (data) => {
      dispatch({ type: 'ADD_BOOK', payload: data})
    },
    onhandleTitle: (data) => {
        dispatch({ type: 'UPDATE_TITLE', payload: data})
    },
    onhandleAuthor: (data) => {
        dispatch({ type: 'UPDATE_AUTHOR', payload: data})
    },
    onGetBooks: () => {
        dispatch(getBooks())
    },
    onToggleForm: (value) => {
      dispatch({ type: 'TOGGLE_FORM', payload: value})
    },
    onImageUploader: (data) => {
        dispatch(imageUploader(data))
    }
    }),
)(App);
