const initialState = [
{
  bookFile: "",
}
];
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
// console.log('Imageuploader body', body);
 return body.images; };
 export const imageUploader = (data) => dispatch => {
 sendImage(data).then(res =>{
     return res
   }).then(data =>{
       dispatch({ type: 'IMAGE_SUCCESS', payload: data[0].url })
 })
 }
