const startModalBtn = document.querySelector("header>button");
const startMovieModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancleModalBtn = startMovieModal.querySelector(".btn--passive");
const addMovieModalBtn = startMovieModal.querySelector(".btn--success");
const userInput = startMovieModal.querySelectorAll("input");
console.log(userInput);
const section = document.getElementById("entry-text");
const movieLists = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");
const deleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");
const deleteCancleBtn = deleteMovieModal.querySelector(".btn--passive");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    section.style.display = "block";
  } else if (movies.length > 0) {
    section.style.display = "none";
  }
};

const cancleMovieModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieid) => {
  const movieIndex = movies.findIndex((movie) => movie.id === movieid);
  console.log(movieIndex);
  movies.splice(movieIndex, 1);
  movieLists.children[movieIndex].remove();
};

// const deleteCancleHandler = () => {
//   deleteMovieModal.classList.remove("visible");
//   toggleBackdrop();
// };

// const deldeModalHandler = (movieid) => {
//   deleteMovieModal.classList.add("visible");
//   deleteMovieBtn.addEventListener(
//     "click",
//     deleteMovieHandler.bind(null, movieid)
//   );
//   deleteCancleBtn.addEventListener("click", deleteCancleHandler);
//   toggleBackdrop();
//   updateUI();
// };

const deleteMovieHandler = (movieid) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  deleteMovie(movieid);
};

const renderNewMovieElement = (id, title, imageURL, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageURL}" alt="${title}"/>
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 starts</p>
    </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  movieLists.appendChild(newMovieElement);
};

const closeMovieModal = () => {
  startMovieModal.classList.remove("visible");
  toggleBackdrop();
  clearMovieInput();
  updateUI();
};

const toggleBackdrop = () => {
  backDrop.classList.toggle("visible");
};

const clearMovieInput = () => {
  userInput.forEach((input) => {
    input.value = "";
  });
};

const startModalHandler = () => {
  startMovieModal.classList.add("visible");
  toggleBackdrop();
  clearMovieInput();
  updateUI();
};

const addMovieHandler = () => {
  const titleValue = userInput[0].value;
  const imageURLValue = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    titleValue.trim() === "" ||
    imageURLValue.trim() === "" ||
    ratingValue.trim === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("Please check your enterd");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    imageURL: imageURLValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.imageURL,
    newMovie.rating
  );
  closeMovieModal();
};

const cancleModalHandler = () => {
  closeMovieModal();
};
const backdropHandler = () => {
  closeMovieModal();
};

startModalBtn.addEventListener("click", startModalHandler);
cancleModalBtn.addEventListener("click", cancleModalHandler);
backDrop.addEventListener("click", backdropHandler);
addMovieModalBtn.addEventListener("click", addMovieHandler);
