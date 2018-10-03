'use strict';
const url = `https://pixabay.com/api/?key=10290577-ef577986ea98dc56157e02842&page=1&per_page=50&image_type=photo&order=popular`;
let data;

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((respJson) => {
    data = respJson.hits;
    renderPage(data);
  }).catch(error => console.log(error));

function renderPage(data, pageNum = 1) {
  const pagination = document.createElement('div');
  pagination.setAttribute('class', 'pagination');
  const opening = document.createElement('a');
  opening.addEventListener('click', () => displayImages(getImgArray(data, 1, 10)));
  opening.innerHTML = '&laquo;';
  const closing = document.createElement('a');
  closing.addEventListener('click', () => displayImages(getImgArray(data, Math.ceil(data.length /10), 10)));
  closing.innerHTML = '&raquo;';
  pagination.appendChild(opening);
  for(let i = 1; i < (data.length / 10) + 1; i++) {
    const page = document.createElement('a');
    page.innerHTML = i;
    page.addEventListener('click', () => displayImages(getImgArray(data, i, 10)));
    pagination.appendChild(page);
  }
  pagination.appendChild(closing);
  document.getElementById('root').appendChild(pagination);
  displayImages(getImgArray(data, pageNum, 10));
}

function getImgArray(array, page, num) {
    let result = [];
    for(let i = (page -1) * num; i < page*num; i++) {
      if(array[i]) {
        result.push(array[i]);
    }
  }
  return result;
}

function displayImages(imgArray) {
    let pics = document.getElementsByClassName('thumbpost');
    pics = Array.prototype.slice.call( pics )
    if(pics.length > 0) {
      const img_container = document.getElementById('image-container');
      for(let p in pics) {
        img_container.removeChild(pics[p]);
      }
    } 
  for(let i = 0; i < imgArray.length; i++) {
    const image = document.createElement('img');
    image.setAttribute('src', imgArray[i].largeImageURL);
    image.setAttribute('id', imgArray[i].id);
    image.setAttribute('class', 'thumb');
    image.addEventListener('click', openModal);
    if(imgArray[i].imageHeight < imgArray[i].imageWidth) {
      image.setAttribute('class', 'landscape');
    }

    const thumbpost = document.createElement('div');
    thumbpost.setAttribute('class', 'thumbpost');
    thumbpost.appendChild(image);
    document.getElementById('image-container').appendChild(thumbpost);
  } 
}

function openModal(e) {
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
  
  function closeModal() {
    let img = document.getElementsByClassName('modal-image');
    modal.removeChild(img[0]);
    modal.parentNode.style.display = 'none';
  }