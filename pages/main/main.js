//get movie posters on load
async function loadMoviePosters() {

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
  })};

export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/main/main.html")
    .then((response) => response.text())
    .then((mainHtml) => {
      content.innerHTML = mainHtml;  
      loadMoviePosters();  
    });
};
	