/* empty css                      */import{i as c,S as u}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const p="47185863-23d7cbe33afa61790ac726fc1",f="https://pixabay.com/api/",g=document.querySelector("#search-form"),l=document.querySelector("#gallery"),m=document.querySelector("#search-input"),n=document.querySelector("#loading");g.addEventListener("submit",async i=>{i.preventDefault();const o=m.value.trim();if(!o)return;n.style.display="flex",n.innerHTML=`<div class="spinner-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
      <circle cx="25" cy="25" r="20" stroke="#007bff" stroke-width="5" stroke-dasharray="31.415, 31.415" stroke-linecap="round">
        <animate attributeName="stroke-dashoffset" values="31.415;0" dur="1s" keyTimes="0;1" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>`,l.innerHTML="";const a=`${f}?key=${p}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`;try{const e=await(await fetch(a)).json();if(n.style.display="none",e.hits.length===0){c.error({title:"Oops!",message:"No images found, please try again."});return}e.hits.forEach(r=>{const d=`
        <div class="image-card">
          <a href="${r.largeImageURL}" data-lightbox="gallery">
            <img src="${r.webformatURL}" alt="${r.tags}" />
          </a>
          <div class="image-info">
            <p class="tags">${r.tags}</p>
            <p><strong>Likes:</strong> ${r.likes}</p>
            <p><strong>Views:</strong> ${r.views}</p>
            <p><strong>Comments:</strong> ${r.comments}</p>
            <p><strong>Downloads:</strong> ${r.downloads}</p>
          </div>
        </div>
      `;l.insertAdjacentHTML("beforeend",d)}),new u(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,loop:!0}).refresh()}catch{n.style.display="none",c.error({title:"Error",message:"Failed to fetch images, please try again."})}});
//# sourceMappingURL=index.js.map
