const initialState = '';


export default function updateTitle(state = initialState, action) {
  if (action.type === 'UPDATE_AUTHOR') {
  return action.payload;
}
return state;
}
