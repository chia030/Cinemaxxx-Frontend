//get movie posters on load
function getMoviePosters(){ 
  console.log("please");

  const Http = new XMLHttpRequest();
  const url="http://54.221.49.14:9090/api/movies";

  Http.open("GET", url);
  Http.send(); //async request

  //const moviesParagraph = document.querySelector(".movies");
  //moviesParagraph.innerHTML = "";

  var img = document.createElement("img");
  var src = document.getElementsByClassName("movie");
  
  // when something changes ->
  Http.onreadystatechange = (e) => {
  const movieArray = JSON.parse(Http.response);
    //console.log(Http.response);  
    

    movieArray.forEach(movie => {
      var str = movie.poster;
      img.src = str.replace(/\s/g, '');
      console.log(img.src);
      //src.appendChild(img);
    });

  }

}

function randomly(){
  console.log("randomly");
}

export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/main/main.html")
    .then((response) => response.text())
    .then((mainHtml) => {
      content.innerHTML = mainHtml;  
      console.log("fuck me");  
      getMoviePosters();  
    });
};
