//CHANGED DUE TO PERSISTENT JSON TOKEN ERROR
/*
const getMovies = () => { 

  const url="http://54.221.49.14:9090/api/movies";
  const Http = new XMLHttpRequest();

  Http.open("GET", url);
  Http.send(); //async request

  const moviesParagraph = document.querySelector("#movies");
  moviesParagraph.innerHTML = "";

  //when something changes ->
  Http.onreadystatechange = (e) => {

    const movieArray = JSON.parse(Http.response);

    movieArray.forEach(movie => {
      moviesParagraph.innerHTML += movie.title+"<br>";
    });

  }
}*/

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
  console.log(uniquePosters);

  uniquePosters.forEach(screening => {
    console.log(screening);
    var div = document.createElement("div");
    div.className="movie";  
    var img = document.createElement("img");
    img.src = screening;
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
