const initialState = '';


export default function filterBooks(state = initialState, action) {
    if (action.type === 'FIND_BOOK') {
  return action.payload;
}
return state;
}
