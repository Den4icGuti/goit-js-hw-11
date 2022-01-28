import './sass/main.scss';
import API from './api/api-servise';
import renderCard from './template/card.hbs'
import refsApi from './refs/refs-parameters';
import Notiflix from 'notiflix';



const refs = refsApi();
console.log(refs.gallery)
console.log(refs.form)


refs.form.addEventListener('submit',onSearch)
let per_page = 0;
let page = 0;
async function onSearch(e) { 
  e.preventDefault()

  const searchQery = e.currentTarget.elements.searchQuery.value;
  
  if (searchQery.trim() === '') { 
    Notiflix.Notify.info('Field must be filled');
    return;
  }

  const response = await API.fetchApi(searchQery,page)
  per_page = response.hits.langth;
 
  
  if (response.totalHits <= per_page) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
}



   async function onRenderCards(elements) { 
   const marcup = await renderCard(elements);
   refs.gallery.insertAdjacentHTML('beforeend',marcup)
  }

  
  