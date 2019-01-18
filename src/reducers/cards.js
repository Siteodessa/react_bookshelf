import getCards from  '../actions/getcards'

const initialState = [
{
  title: "",
  __v: 0,
  _id: "",
}
];

const callApiPost = async (data) => {
const response = await fetch('/books', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
const body = await response.json();
if (response.status !== 200) throw Error(body.message);
   return body;
}





export default function cards(state = initialState, action) {
  if (action.type === 'ADD_BOOK') {
    callApiPost(JSON.parse(action.payload))
    return [...state, JSON.parse(action.payload)]


  }
  else if (action.type === 'FETCH_BOOKS_SUCCESS') {
    return action.payload;

  }
  return state;
}
