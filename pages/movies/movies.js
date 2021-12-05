
// getMovies() is called onclick of "Display Movies" button
const getMovies = () => { 

  const Http = new XMLHttpRequest();
  const url="http://54.221.49.14:9090/api/movies";

  Http.open("GET", url);
  Http.send(); //async request

  const moviesParagraph = document.querySelector("#movies");

  // when something changes ->
  Http.onreadystatechange = (e) => {

    console.log(Http.responseText)
    moviesParagraph.innerHTML = Http.responseText;

  }


  // I DIDN'T KNOW HOW TO WORK WITH THIS SORRYYYYYYYYY
  // fetch("http://54.221.49.14:9090/api/movies")
  // .then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     console.log("kill me");
  //     throw new Error("NETWORK RESPONSE ERROR");
  //   }
  // })
  // // .then(data => {
  // //   console.log(data);
  // //   var div = document.getElementsByClassName("content");
  // //   div.innerHTML += "suck my dick"; 
  // // })
  // .catch((error) => console.error("FETCH ERROR:", error));

}


  export default () => {
    
    const content = document.querySelector(".content");
    
    
    return fetch("./pages/movies/movies.html")
      .then((response) => response.text())
      .then((moviesHtml) => {

        content.innerHTML = moviesHtml;

        //setting onclick to getMovies()
        const displayMoviesButton = document.querySelector("#display-movies-button");
        displayMoviesButton.onclick = getMovies;     
        
      });
  }; 
