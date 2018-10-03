'use strict';

const url = `https://pixabay.com/api/?key=10290577-ef577986ea98dc56157e02842&page=1&per_page=50&image_type=photo&order=popular`;
let data;

fetch(url)  // fetching images
  .then((response) => {
    return response.json();
  })
  .then((respJson) => {
    data = respJson.hits; // creating an array of image objects
    renderPage(data);
  }).catch(error => console.log(error));

function renderPage(data, pageNum = 1) {  // rendering basic layout of the page
  const pagination = document.createElement('div');
  pagination.setAttribute('id', 'pagination');
  const firstPage = document.createElement('a');
  firstPage.addEventListener('click', () => {
    removeActive();
    displayImages(getImgArray(data, 1, 10));
    pagination.childNodes[1].className += 'active';
  });
  firstPage.innerHTML = '&laquo;';
  const lastPage = document.createElement('a');
  lastPage.addEventListener('click', (e) => {
    removeActive();
    displayImages(getImgArray(data, Math.ceil(data.length /10), 10));
    pagination.childNodes[data.length / 10].className += 'active';
  }); 
  lastPage.innerHTML = '&raquo;';
  pagination.appendChild(firstPage);
  for(let i = 1; i < (data.length / 10) + 1; i++) {
    const page = document.createElement('a');
    page.innerHTML = i;
    page.addEventListener('click', () => {
      removeActive();
      displayImages(getImgArray(data, i, 10));
      pagination.childNodes[i].className += 'active';
    });
    pagination.appendChild(page);
  }
  pagination.appendChild(lastPage);
  document.getElementById('root').appendChild(pagination);
  displayImages(getImgArray(data, pageNum, 10)); // rendering list of 10 thumbnails
}

function removeActive() {
  const pagination = document.getElementById('pagination');
  pagination.childNodes.forEach(index => {
    index.classList.remove('active');
  });
}

function getImgArray(array, page, num) {  // getting an array of images for a single page
  let result = [];
  for(let i = (page -1) * num; i < page * num; i++) {
    if(array[i]) {
      result.push(array[i]);
    }
  }
  return result;
}

function displayImages(imgArray) {  // rendering list of 10 thumbnails

  let pics = document.getElementsByClassName('thumbpost');
  pics = Array.prototype.slice.call(pics);
  if(pics.length > 0) {             // removing previous thumbnails if they exist
    const img_container = document.getElementById('image-container');
    for(let pic in pics) {
      img_container.removeChild(pics[pic]);
    }
  } 
  imgArray.map((img) => { // looping through the array of images and rendering them to the DOM
    const image = document.createElement('img');
    image.setAttribute('src', img.largeImageURL);
    image.setAttribute('id', img.id);
    image.setAttribute('class', 'thumb');
    image.addEventListener('click', openModal);
    if(img.imageHeight < img.imageWidth) {
      image.setAttribute('class', 'landscape');
    }
    const thumbpost = document.createElement('div');
    thumbpost.setAttribute('class', 'thumbpost');
    thumbpost.appendChild(image);
    document.getElementById('image-container').appendChild(thumbpost);
  });
}

function openModal(e) {  // display modal and render selected image
    const modal = document.getElementById('modal');
    modal.parentNode.style.display = 'flex';
    let link, orientation; 
    data.forEach(obj => {
      if(obj.id == e.target.id) {
        link = obj.largeImageURL;
        orientation = obj.imageHeight < obj.imageWidth ? 'landscape' : 'portrait';
      }
    });
  
    const imageToOpen = document.createElement('img');
    imageToOpen.setAttribute('src', link);
    imageToOpen.setAttribute('class', 'modal-image');
    if(orientation === 'portrait') {
      imageToOpen.className += ' portrait';
    }
    modal.appendChild(imageToOpen);
    modal.parentNode.addEventListener('click', closeModal);
  }
  
  function closeModal() {  // hide modal and remove child image element
    let img = document.getElementsByClassName('modal-image');
    modal.removeChild(img[0]);
    modal.parentNode.style.display = 'none';
  }