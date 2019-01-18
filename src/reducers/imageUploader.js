const initialState = '';
export default function updateImage(state = initialState, action) {
  if (action.type === 'IMAGE_SUCCESS') {
  return action.payload;
}
return state;
}
