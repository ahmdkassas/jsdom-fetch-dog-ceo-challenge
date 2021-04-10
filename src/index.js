console.log('%c HI', 'color: firebrick')
let breedsList = [];

document.addEventListener('DOMContentLoaded', function() {
    const breedDl = document.getElementById("breed-dropdown");
    breedDl.addEventListener("change", e => {
        let firstLetter = e.target.value;
        SelectBreedByFirstLetter(firstLetter);
    })
  fetchImgs();
  fetchBreeds();
 });


function fetchImgs() {

    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(function(response) {
          return response.json();
    })
    .then(json => renderImgs(json));
  }
  
  function renderImgs(imgs) {
    const main = document.getElementById('dog-image-container');
    imgs.message.forEach(img => {
      const imgTag = document.createElement('img');
      imgTag.src = img;
      main.appendChild(imgTag);
    });
  }

function fetchBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(function(response) {
          return response.json();
    })
    .then(json => {
    breedsList = Object.keys(json.message);
    renderBreeds(breedsList);})
}

function renderBreeds(breeds) {
    const ul = document.getElementById("dog-breeds");
    emptyBreedsList(ul);
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.innerHTML = breed;
        li.addEventListener("click", changeColor);
        ul.appendChild(li);
    });
  }

function changeColor(event) {
    event.target.style.color = "firebrick";
}


function SelectBreedByFirstLetter(firstLetter) {
    renderBreeds(breedsList.filter( breed => breed.startsWith(firstLetter) ))
}

function emptyBreedsList(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}
