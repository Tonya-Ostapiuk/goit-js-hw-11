import { fetchImages } from './fetchImages';
import { markupImageList, gallery} from './markupImageList';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputSerch = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const btnLoadMore = document.querySelector('.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery');
let pageNumber = 1;
btnLoadMore.style.display = 'none';


btnSearch.addEventListener('click', async (e) => {
  e.preventDefault();
  initialValue();
  const inputValue = inputSerch.value.trim();

  if (inputValue !== '') {
    
    const foundData = await fetchImages(inputValue, pageNumber);
   
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        markupImageList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      };
  };
});



btnLoadMore.addEventListener('click', async() => {
  pageNumber++;
  const inputValue = inputSerch.value.trim();
  btnLoadMore.style.display = 'none';
  const foundData = await fetchImages(inputValue, pageNumber);
 
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      markupImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      btnLoadMore.style.display = 'block';
    };
});



function initialValue() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
};