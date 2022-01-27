import axios from "axios";

async function fetchApi(data,page) { 
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '25225743-62355b18deaf2a31912b18441';
  const PARAMETERS = `q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&$page=${page}`;

  return await axios.get(`${BASE_URL}?${KEY_API}&${PARAMETERS}`)
    .then(r => r.data).catch(error => { 
      console.log(error.messge)
  });
} 

export default {fetchApi}