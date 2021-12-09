//get movie posters on load
async function loadMoviePosters() {

  const response = await fetch('http://54.221.49.14:9090/api/movies');
  const movieArray = await response.json();
  const moviesParagraph = document.querySelector(".movies-container");

  movieArray.forEach(movie => {
    var div = document.createElement("div");
    div.className="movie";  
    var img = document.createElement("img");
    var str = movie.poster;
    img.src = img.src = str.replace(/\s/g, '');
    console.log(img.src);
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
	