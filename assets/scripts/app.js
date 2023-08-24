const startModalBtn = document.querySelector("header>button");
const startMovieModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancleModalBtn = startMovieModal.querySelector(".btn--passive");
const addMovieModalBtn = startMovieModal.querySelector(".btn--success");
const userInput = startMovieModal.querySelectorAll("input");
const section = document.getElementById("entry-text");
const movieLists = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    section.style.display = "block";
  } else if (movies.length > 0) {
    section.style.display = "none";
  }
};

const cancleMovieModal = () => {
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieid) => {
  console.log(movieid, movies);
  const movieIndex = movies.findIndex((movie) => movie.id === movieid);
  // const movielist = movieLists.children[movieIndex];
  movieLists.children[movieIndex].remove();
  movies.splice(movieIndex, 1);
  cancleMovieModal();
  toggleBackdrop();
  updateUI();
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
  let deleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");
  const deleteCancleBtn = deleteMovieModal.querySelector(".btn--passive");
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  deleteMovieBtn.replaceWith(deleteMovieBtn.cloneNode(true))
  deleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");
  const deleteMoviebind =  deleteMovie.bind(null, movieid)
  deleteMovieBtn.addEventListener("click",deleteMoviebind);
  deleteCancleBtn.removeEventListener("click", closeMovieModal);
  deleteCancleBtn.addEventListener("click", closeMovieModal);
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
  // const deleteMovieHandlerbind = deleteMovieHandler.bind(null, id);
  newMovieElement.addEventListener("click",deleteMovieHandler(id) );
  //내가 목록을 누르고 취소하더라도 그 목록에 해당하는 이벤트리스너는 계속 생산 중 내가 다섯번 눌렀다 닫으면 이벤트 리스너가 5개가 저장되고 나중에 그 다섯개가 한꺼번에 작동한다.
  //deleteMovieBtn.addEventListener('click', deleteMovie.bind(null, movieid)); 이 이벤트 리스너가 5개 저장되는 것!
  movieLists.appendChild(newMovieElement);
};

const closeMovieModal = () => {
  startMovieModal.classList.remove("visible");
  cancleMovieModal();
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
  cancleMovieModal();
};

startModalBtn.addEventListener("click", startModalHandler);
cancleModalBtn.addEventListener("click", cancleModalHandler);
backDrop.addEventListener("click", backdropHandler);
addMovieModalBtn.addEventListener("click", addMovieHandler);
