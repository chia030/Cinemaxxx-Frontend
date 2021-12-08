
// getMovies() is called onclick of "Display Movies" button
const getMovies = () => { 

  const Http = new XMLHttpRequest();
  const url="http://54.221.49.14:9090/api/movies";

  Http.open("GET", url);
  Http.send(); //async request

  const moviesParagraph = document.querySelector("#movies");
  moviesParagraph.innerHTML = "";

  // when something changes ->
  Http.onreadystatechange = (e) => {

    const movieArray = JSON.parse(Http.response);

    movieArray.forEach(movie => {
      moviesParagraph.innerHTML += movie.title+"<br>";
    });

  }

}

  export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/movies/movies.html")
      .then((response) => response.text())
      .then((moviesHtml) => {
        content.innerHTML = moviesHtml;
      });
  }; 
