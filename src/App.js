import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from './actions/getbooks';
import { imageUploader } from './actions/imageUploader';
import './cssfiles.js'
import Heading from './Heading.js'
import Shelf from './img/shelf.jpg';
import Book from './img/book.jpg';
import ViewIcon from './img/visibility.svg';


const App = ({  books, imageUploader, onFindBook , onhandleSubmit, onhandleTitle,  onhandleAuthor, onImageUploader, onGetBooks, ownProps }) => {
  let searchInput = '';
  let title = '';
  let author = '';


  const handleSubmit = (event) => {
      event.preventDefault();
      // console.log('ownProps', ownProps);
      // console.log('imageUploader', imageUploader);
      let data = {
        title : title.value,
        author : author.value,
        bookfile : imageUploader,
      }
        console.log('SENDING DATA HANDLESUBMIT', data);
      onhandleSubmit(JSON.stringify(data))
    }


    const readFile = (event) => {
      onImageUploader(event.target.files[0])
      event.preventDefault();
    }



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
        <form className="books_add" onSubmit={handleSubmit}>
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
    onImageUploader: (data) => {
        dispatch(imageUploader(data))
    }
    }),
)(App);
