import React from 'react';
import { connect } from 'react-redux';
import { Menu } from './Menu';

const Card = ({book}) => {
return (
  <div>
  <Menu />
  {book.title}
  </div>
)
}

// Catch error when a book is not found
const mapStateToProps =(state, ownProps) => {
  return {
    book: state.books.find(book => Number(book.id) === Number(ownProps.match.params.id))
  }
};
export default connect(mapStateToProps)(Card)
