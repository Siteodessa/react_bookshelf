import React, { Component } from 'react';

const sendImage = async (file) => {
  let image = new FormData();
    image.append('image', file)
  var fetchConf = { method: 'POST',
   files: image,
   body: image,
   cache: 'default' };
   const response = await fetch('http://localhost:2000/upload', fetchConf);
const body = await response.json();
if (response.status !== 200) console.log('Error' , body);
 return body.images; };



const formSubmit = async (data) => {
  var fetchConf = { method: 'POST',
  headers: { 'Content-type': 'application/json' },
   body: data,
   cache: 'default' };
   const response = await fetch('http://localhost:2000/books', fetchConf);
const body = await response.json();
if (response.status !== 200) console.log('Error' , body);
 return body.images; };


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '',author: '',bookfile: '',};
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitle(event) {
    this.setState({title: event.target.value});
  }
  handleAuthor(event) {
    this.setState({author: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
let data = {
  title : this.state.title,
  author : this.state.author,
  bookfile : this.state.bookfile,
}

formSubmit(JSON.stringify(data))
  }
  readFile(event) {
    sendImage(event.target.files[0]).then(file => {
          this.setState({bookfile: file[0].url});
    })
    event.preventDefault();
  }



  render() {
    return (
      <form className="books_add" onSubmit={this.handleSubmit}>
          <div className="form_group">
            <label> Title</label>
            <input name="title" type="text" value={this.state.title} onChange={(event)=> { this.handleTitle(event) }}/>
          </div>
          <div className="form_group">
            <label> author</label>
            <input name="author" type="text" value={this.state.author} onChange={(event)=> { this.handleAuthor(event) }}/>
          </div>
          <div className="form_group">
            <label> bookfile</label>
            <input id="fileupload" name="bookfile" ref="upload" type="file" accept="image/*" onChange={(event)=> { this.readFile(event) }} onClick={(event)=> { event.target.value = null }} />
          </div>
          <div className="form_group">
            <label> submit</label>
            <input type="submit" />
          </div>
      </form>
    );
  }
}



export default NameForm;
