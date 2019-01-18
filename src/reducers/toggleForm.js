const initialState = false;


export default function toggleForm(state = initialState, action) {
  if (action.type === 'TOGGLE_FORM') {
  return !state;
}
return state;
}
