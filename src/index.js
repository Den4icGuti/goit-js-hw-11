import './sass/main.scss';
import API from './api/api-servise';
import renderCard from './template/card.hbs'
import refsApi from './refs/refs-parameters';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css';


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
  perPage += response.hits.length;
  onIncrementPage()
  onRenderCards(response);
 
 if (perPage > response.totalHits) { 
   Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
   onAddIshedden();
  }
}


function onIncrementPage() { 
 return page += 1;
}

function lightbox() { 
  let gallery = new simpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition:'bottom'
  });
  gallery.refresh();
}
  
function onRenderCards(elements) { 
   const marcup = renderCard(elements);
  refs.gallery.insertAdjacentHTML('beforeend', marcup)
  lightbox()
 }


function onRemoveIshedden() { 
  refs.btnLoad.classList.remove('is-hidden')

}

function onAddIshedden() { 
  refs.btnLoad.classList.add('is-hidden')
  refs.titleEnd.classList.remove('is-hidden')
}
  
  
function onClearContent() { 
  refs.gallery.innerHTML = '';
}
  

  
