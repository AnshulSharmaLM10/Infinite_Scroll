
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded= 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'I94kwG4stF62y81LDBrqpFrKMn1y6sUq9kpW0FImG94'
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
   imagesLoaded++;
   if(imagesLoaded === totalImages) {
       ready = true;
       loader.hidden = true;
   } 
}

function setAttributes(elements, attributes) {
    for (const key in attributes) {
        elements.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
         const response = await fetch(apiurl);
         photosArray = await response.json();
         displayPhotos();
    } catch (error) {
         console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
})

getPhotos();