const initialState = '';


export default function updateTitle(state = initialState, action) {
  if (action.type === 'UPDATE_TITLE') {
  return action.payload;
}
return state;
}
