import './sass/main.scss';
import API from './api/api-servise';
import renderCard from './template/card.hbs'
import refsApi from './refs/refs-parameters';
import Notiflix from 'notiflix';



const refs = refsApi();

refs.form.addEventListener('submit',onSearch)
let per_page = 0;
let page = 0;
async function onSearch(e) { 
  e.preventDefault()

  const searchQery = e.currentTarget.elements.searchQuery.value;
  
  if (searchQery.trim() === '') { 
    Notiflix.Notify.info('Field must be filled')
  }

  const response = await API.fetchApi(searchQery,page)
 
  if (response.totalHits <= per_page) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
  onRenderCards()
}



 function onRenderCards(elements) { 
   const marcup = renderCard(elements);
   refs.galerry.insertAdjacentHTML('beforeend',marcup)
  }