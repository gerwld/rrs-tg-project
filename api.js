// const getUsers = () => {
//  axios.get('https://rsshub.app/telegram/channel/haregakaniti')
//  .then(response => {
//   const users = response.data.data;
//   console.log(`GET users`, users);
// })
//  .catch(error => console.error(error));
// };
// getUsers();


const BASE_URL = 'https://ctg-cors.herokuapp.com/https://rsshub.app/telegram/channel/haregakaniti';

fetch(BASE_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => console.log(data))