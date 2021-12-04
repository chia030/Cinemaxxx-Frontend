  fetch("http://54.221.49.14:9090/api/movies")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("kill me");
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    var div = document.getElementsByClassName("content");
    div.innerHTML += "suck my dick"; 
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/movies/movies.html")
      .then((response) => response.text())
      .then((moviesHtml) => {
        content.innerHTML = moviesHtml;
      });
  }; 
