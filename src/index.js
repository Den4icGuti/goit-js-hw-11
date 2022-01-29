import './sass/main.scss';
import API from './api/api-servise';
import renderCard from './template/card.hbs'
import refsApi from './refs/refs-parameters';
import Notiflix from 'notiflix';

const refs = refsApi();

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoadMore)

let perPage = 0;
let page = 1;
let searchQery = ''

async function onSearch(e) {
  e.preventDefault()

  searchQery = e.currentTarget.elements.searchQuery.value;

  page = 1;
  if (searchQery.trim() === '') {
    Notiflix.Notify.info('Field must be filled')
    return;
  }
  
   const response = await API.fetchApi(searchQery,page)
 
  if (response.totalHits <= perPage) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else { 
    onRemoveIshedden();
  }

  try { 
    if (response.totalHits > 0) { 
      Notiflix.Notify.success(`Found ${response.totalHits} images:)`);
      onClearContent();
      onRenderCards(response);
    }
    
  } catch (error) { 
    console.log(error.message)
  }
   onIncrementPage(response)
}


async function onLoadMore() { 
  const response = await API.fetchApi(searchQery, page);

  onIncrementPage()
  onRenderCards(response.hits);
  perPage += response.hits.length;

  if (perPage > response.totalHits) { 
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
}


function onIncrementPage() { 
 return page += 1;
}

function onRenderCards(elements) { 
   const marcup = renderCard(elements);
  refs.gallery.insertAdjacentHTML('beforeend',marcup)
 }

function onRemoveIshedden() { 
  refs.btnLoad.classList.remove('is-hidden')
}
  
function onClearContent() { 
  refs.gallery.innerHTML = '';
}
  
  
  
