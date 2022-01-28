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
let page = 1;
async function onSearch(e) {
  e.preventDefault()

  const searchQery = e.currentTarget.elements.searchQuery.value;
<<<<<<< HEAD
  page = 2
  if (searchQery.trim() === '') {
    Notiflix.Notify.info('Field must be filled')
    return;
  }

  const response = await API.fetchApi(searchQery,page)
   
=======
  
  if (searchQery.trim() === '') { 
    Notiflix.Notify.info('Field must be filled');
    return;
  }

  const response = await API.fetchApi(searchQery,page).then(onRenderCards);
  per_page = response.hits.langth;
 
  
>>>>>>> cee89d3bf917add0c90cafd6e9c832ddc6b373b1
  if (response.totalHits <= per_page) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else { 
    onRemoveIshedden();
  }

  try { 
    if (response.totalHits > 0) { 
      Notiflix.Notify.success(`Found ${response.totalHits} images:)`);
       onRenderCards(response);
    }
    
  } catch (error) { 
    console.log(error.message)
  }
<<<<<<< HEAD
 
=======
>>>>>>> cee89d3bf917add0c90cafd6e9c832ddc6b373b1
}



<<<<<<< HEAD
 function onRenderCards(elements) { 
   const marcup = renderCard(elements);
  refs.gallery.insertAdjacentHTML('beforeend',marcup)
 }

function onRemoveIshedden() { 
  refs.btnLoad.classList.remove('is-hidden')
}
  
=======
   async function onRenderCards(elements) { 
   const marcup = await renderCard(elements);
   refs.gallery.insertAdjacentHTML('beforeend',marcup)
  }

  
  
>>>>>>> cee89d3bf917add0c90cafd6e9c832ddc6b373b1
