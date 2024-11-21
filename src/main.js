import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '47185863-23d7cbe33afa61790ac726fc1';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const input = document.querySelector('#search-input');
const loading = document.querySelector('#loading');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) return;

  loading.style.display = 'flex';
  loading.innerHTML = `<div class="spinner-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
      <circle cx="25" cy="25" r="20" stroke="#007bff" stroke-width="5" stroke-dasharray="31.415, 31.415" stroke-linecap="round">
        <animate attributeName="stroke-dashoffset" values="31.415;0" dur="1s" keyTimes="0;1" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>`;

  gallery.innerHTML = '';

  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    loading.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Oops!',
        message: 'No images found, please try again.',
      });
      return;
    }

    data.hits.forEach(hit => {
      const imageCard = `
        <div class="image-card">
          <a href="${hit.largeImageURL}" data-lightbox="gallery">
            <img src="${hit.webformatURL}" alt="${hit.tags}" />
          </a>
          <div class="image-info">
            <p class="tags">${hit.tags}</p>
            <p><strong>Likes:</strong> ${hit.likes}</p>
            <p><strong>Views:</strong> ${hit.views}</p>
            <p><strong>Comments:</strong> ${hit.comments}</p>
            <p><strong>Downloads:</strong> ${hit.downloads}</p>
          </div>
        </div>
      `;
      gallery.insertAdjacentHTML('beforeend', imageCard);
    });

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      nav: true,
      loop: true,
    });

    lightbox.refresh();
  } catch (error) {
    loading.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images, please try again.',
    });
  }
});
