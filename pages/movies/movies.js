
let modal;
let clickedImg;
let id;

document.addEventListener("click", (e) => {
  if (e.target.className === "modal-open") {
    clickedImg = e.target;
    console.log(clickedImg.src);
    modal = document.getElementById(e.target.dataset.id);
    openModal(modal);
  } else if (e.target.className === "modal-close") {
    closeModal(modal);
  } else {
    return;
  }
});


async function getMovieInfo() {
  let response = await fetch("http://54.158.180.212:9090/api/movies/");
  const moviesssss = await response.json();
  moviesssss.forEach(movie => {
    if (movie.poster==clickedImg.src){
      id = movie.movieId;
    }
  });

  response = await fetch("http://54.158.180.212:9090/api/movies/id/"+id);
  const movie = await response.json();

  const movieTitle = document.getElementsByClassName("movie-title")[0];
  const movieDesc = document.getElementsByClassName("movie-desc")[0];

  var p = document.createElement('p');
  p.className="movie-desc"; 
  var title = document.createElement('p');
  title.className="movie-title"; 

  title.innerHTML = movie.title;
  p.innerHTML = "Description : "+movie.description +"<br> Actors : "+movie.actors+"<br> Genre : "+movie.genre+"<br> Length : "+movie.length+"<br> Rating : "+movie.rating;

  movieDesc.appendChild(p);  
  movieTitle.appendChild(title);
}


const openModal = (modal) => {
  document.body.style.overflow = "hidden";
  modal.setAttribute("open", "true");
  document.addEventListener("keydown", escClose);
  let overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);
  getMovieInfo();
};

const closeModal = (modal) => {
  document.body.style.overflow = "auto";
  modal.removeAttribute("open");
  document.removeEventListener("keydown", escClose);
  document.body.removeChild(document.getElementById("modal-overlay"));
  let toRemove = document.getElementsByClassName("movie-desc")[1];
  toRemove.remove();
  toRemove = document.getElementsByClassName("movie-title")[1];
  toRemove.remove();
};

const escClose = (e) => {
  if (e.keyCode == 27) {
    closeModal();
  }
};

//coolio modal part done

//get movie posters on load
async function loadCurrentMoviePosters() {

  const moviesParagraph = document.querySelector(".movies-container");

  let response = await fetch('http://54.158.180.212:9090/api/screenings/get');
  const screeningArray = await response.json();
  let screeningPosterArr = [];  

  screeningArray.forEach(screening => {
    screeningPosterArr.push(screening.movie.poster);
  });

  let uniquePosters = [...new Set(screeningPosterArr)];

  uniquePosters.forEach(screening => {
    var div = document.createElement("div");
    div.className="movie";  
    var img = document.createElement("img");
    img.src = screening;
    img.classList.add("modal-open");
    img.setAttribute("data-id","demo-modal");
    div.appendChild(img);
    moviesParagraph.appendChild(div );
  });
}

//get movie posters on load 
async function loadAllMoviePosters() {

  let response = await fetch('http://54.158.180.212:9090/api/movies');
  const movieArray = await response.json();
  const moviesParagraph = document.querySelector(".movies-container2");

  movieArray.forEach(movie => {
    var div = document.createElement("div");
    div.className="movie";  
    var img = document.createElement("img");
    var str = movie.poster;
    img.src = img.src = str.replace(/\s/g, '');
    img.classList.add("modal-open");
    img.setAttribute("data-id","demo-modal");
    div.appendChild(img);
    moviesParagraph.appendChild(div );
  });
}


  export default () => {
    
    const content = document.querySelector(".content");
    
    
    return fetch("./pages/movies/movies.html")
      .then((response) => response.text())
      .then((moviesHtml) => {

        content.innerHTML = moviesHtml;

        //setting onclick to getMovies()
        //const displayMoviesButton = document.querySelector("#display-movies-button");
        //displayMoviesButton.onclick = loadMovies;  
           
        loadCurrentMoviePosters();  
        loadAllMoviePosters();  
      });
  }; 
