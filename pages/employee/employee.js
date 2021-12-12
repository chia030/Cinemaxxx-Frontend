async function postMovie(e) {
  e.preventDefault();
  const form = document.querySelector('#new-movie');
  console.log(form.elements.namedItem("movieID").value);
  const response = await fetch('http://54.158.180.212:9090/api/movies/addById/'+form.elements.namedItem("movieID").value, {
    method: 'POST',
  });
  const responseText = await response.text();
  console.log(responseText); // logs 'OK'
}

const postScreening = async (e) => {

  e.preventDefault();
  const form = document.querySelector('#new-screening');
  
  const date = form.elements.namedItem("date").value;
  const time = form.elements.namedItem("time").value;

  const movie = document.querySelector("#movie-selector");
  const hall = document.querySelector("#hall-selector");

  const movieId = movie.options[movie.selectedIndex].value;
  const hallId = hall.options[hall.selectedIndex].value;

  const postScreeningUrl = `http://54.158.180.212:9090/api/screenings?date=${date}&hallId=${hallId}&movieId=${movieId}&time=${time}`;

  const response = await fetch(postScreeningUrl, { 
    method: 'POST',
  });

  const responseText = await response.text();
  console.log(responseText); // logs 'OK'

}

const addMoviesAndHallsOptions = async () => {

  const fetchMoviesUrl = `http://54.158.180.212:9090/api/movies`;
  const fetchHallsUrl = `http://54.158.180.212:9090/api/halls`;

  const moviesResponse = await fetch(fetchMoviesUrl, {
    method: 'GET',
  });

  const hallsResponse = await fetch(fetchHallsUrl, {
    method: 'GET',
  })

  const moviesArray = await moviesResponse.json();
  const hallsArray = await hallsResponse.json();

  const selectMovies = document.querySelector("#movie-selector");
  const selectHalls = document.querySelector("#hall-selector");

  await moviesArray.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie.movieId;
    option.innerHTML = movie.title;
    selectMovies.appendChild(option);
  })

  await hallsArray.forEach(hall => {
    const option = document.createElement("option");
    option.value = hall.hallId;
    option.innerHTML = `Hall: ${hall.hallId}, Cinema: ${hall.cinema.name}`;
    selectHalls.appendChild(option);
  })

}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/employee/employee.html")
      .then((response) => response.text())
      .then((employeeHtml) => {
        content.innerHTML = employeeHtml;

        addMoviesAndHallsOptions();

        document.querySelector("button").onclick = function () {
          window.open("https://www.imdb.com/", "_blank"); //opens imdb in a new tab ;)
        };

        const movieForm = document.getElementById('new-movie');
        movieForm.addEventListener("submit", postMovie);

        const screeningForm = document.getElementById('new-screening');
        screeningForm.addEventListener("submit", postScreening);
        
      });
  };