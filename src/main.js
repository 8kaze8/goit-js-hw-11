import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '47185863-23d7cbe33afa61790ac726fc1'; // Senin API anahtarın
const BASE_URL = 'https://pixabay.com/api/';

// Arama formu ve galeri alanını seç
const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const input = document.querySelector('#search-input');
const loading = document.querySelector('#loading'); // Yükleme göstergesi

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) return;

  // Yükleme göstergesini ve mesajını göster
  loading.style.display = 'block';
  loading.innerHTML = 'Loading images, please wait...'; // Mesajı değiştir

  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Yükleme göstergesini gizle
    loading.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Oops!',
        message: 'No images found, please try again.',
      });
      return;
    }

    gallery.innerHTML = ''; // Önceki sonuçları temizle

    // Görselleri galeriye ekle
    data.hits.forEach(hit => {
      const imageCard = `
        <a href="${hit.largeImageURL}">
            <img src="${hit.webformatURL}" alt="${hit.tags}" />
        </a>
      `;
      gallery.insertAdjacentHTML('beforeend', imageCard);
    });

    // SimpleLightbox'ı eklemeyi unutmayın
    new SimpleLightbox('.gallery a').refresh(); // Bu satırın burada olması önemli
  } catch (error) {
    loading.style.display = 'none'; // Hata durumunda da göstergemizi gizle
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images, please try again.',
    });
  }
});
