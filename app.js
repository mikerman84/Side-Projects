//declare elements from the DOM 
const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.getElementById('start-add-movie-button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = document.getElementById('cancel-button');
const confirmAddMovieBtn = document.getElementById('confirm-add-movie-button');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

//functions

const toggleBackdropFocus = ()=>{
    backdrop.classList.toggle('visible');
};

const updateUI = ()=>{
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none';
    }
};

const cancelMovieDeletion = () =>{
    toggleBackdropFocus();
    deleteMovieModal.classList.remove('visible');

};

const deleteMovieHandler = (movieId) =>{
    let movieIndex = 0;
    for(const movie of movies){
       if(movie.id === movieId){
           break;
       }
       movieIndex++;
    }
    movies.splice(movieIndex,1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    cancelMovieDeletion();
    updateUI();
};



const startDeleteMoiveHandler = movieId =>{
    deleteMovieModal.classList.add('visible');
    toggleBackdropFocus();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', cancelMovieDeletion);

    cancelDeletionButton.addEventListener('click', cancelMovieDeletion);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null,movieId));
    //deleteMovie(movieId);
};

const renderMovieElement = (id, title, imageUrl, rating)=>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML =`
    <div class = "movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div> 
    <div class = "movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div> 
    `;
    newMovieElement.addEventListener('click', startDeleteMoiveHandler.bind(null,id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};



const backdropClickHandler = () =>{
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInputs();
};

const clearMovieInputs = () =>{
    for(const userInput of userInputs){
        userInput.value = '';
    }
};

const cancelMovieHandler = () =>{
    closeMovieModal();
    toggleBackdropFocus();
    clearMovieInputs();
};

const addMovieHandler = () =>{
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(titleValue.trim() === '' || 
    imgUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
    ){
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imgUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    closeMovieModal();
    toggleBackdropFocus();
    clearMovieInputs();
    renderMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const showMovieModal = ()=>{
    addMovieModal.classList.add('visible');
    toggleBackdropFocus();
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');    
    
};

startAddMovieBtn.addEventListener('click', showMovieModal);
cancelAddMovieBtn.addEventListener('click',cancelMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);