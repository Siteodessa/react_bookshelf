const formSend = async (data) => {
  var fetchConf = { method: 'POST',
  headers: { 'Content-type': 'application/json' },
   body: data,
   cache: 'default' };
   const response = await fetch('http://localhost:2000/books', fetchConf);
const body = await response.json();
if (response.status !== 200) console.log('Error' , body);
 return body.images; };


 const formSubmit = () => dispatch => {
formSend().then(res =>{
    return res
  }).then(data =>{
    console.log('', data);
      dispatch({ type: 'ADD_BOOK', payload: data })
})
}

export default formSubmit
