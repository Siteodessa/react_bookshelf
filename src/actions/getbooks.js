const callApi = async () => { const response = await fetch('/books');
const body = await response.json(); if (response.status !== 200) throw Error(body.message);
return body;
};
export const getBooks = () => dispatch => {
callApi().then(res =>{
    return res
  }).then(data =>{
      dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: data })
})
}
