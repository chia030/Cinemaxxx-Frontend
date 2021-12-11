//get movie posters on load
async function loadMoviePosters() {

  let response = await fetch('http://54.158.180.212:9090/api/movies');
  const movieArray = await response.json();
  const moviesParagraph = document.querySelector(".movies-container");
/*
  movieArray.forEach(movie => {
    var div = document.createElement("div");
    div.className="movie";  
    var img = document.createElement("img");
    var str = movie.poster;
    img.src = img.src = str.replace(/\s/g, '');
    div.appendChild(img);
    moviesParagraph.appendChild(div );
  });
*/
  response = await fetch('http://54.158.180.212:9090/api/screenings/get');
  const screeningArray = await response.json();
  
  screeningArray.forEach(screening => {
    var div = document.createElement("div");
    div.className="movie";  
    var img = document.createElement("img");
    var str = screening.movie.poster;
    img.src = img.src = str.replace(/\s/g, '');
    div.appendChild(img);
    moviesParagraph.appendChild(div );
  });
}

export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/main/main.html")
    .then((response) => response.text())
    .then((mainHtml) => {
      content.innerHTML = mainHtml;  
      loadMoviePosters();  
    });
};
	