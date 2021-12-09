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



async function loadMovies() {

  const response = await fetch('http://54.221.49.14:9090/api/movies');
  const movieArray = await response.json();
  const moviesParagraph = document.querySelector("#movies");
  moviesParagraph.innerHTML = "";

  movieArray.forEach(movie => {
    console.log(movie.title);
    moviesParagraph.innerHTML += movie.title+"<br>";
  });

}


  export default () => {
    
    const content = document.querySelector(".content");
    
    
    return fetch("./pages/movies/movies.html")
      .then((response) => response.text())
      .then((moviesHtml) => {

        content.innerHTML = moviesHtml;

        //setting onclick to getMovies()
        const displayMoviesButton = document.querySelector("#display-movies-button");
        displayMoviesButton.onclick = loadMovies;     
        
      });
  }; 
