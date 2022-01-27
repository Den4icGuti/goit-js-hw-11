import './sass/main.scss';
import API from './api/api-servise';
import refsApi from './refs/refs-parameters';
import Notiflix from 'notiflix';



const refs = refsApi();

refs.form.addEventListener('submit',onSearch)

function onSearch(e) { 
  e.preventDefault()

  const searchQery = e.currentTarget.elements.searchQuery.value;
  
  if (searchQery.trim() === '') { 
    Notiflix.Notify.info('Field must be filled')
  }

  API.fetchApi(searchQery).then(console.log)

}