export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/movies/movies.html")
      .then((response) => response.text())
      .then((moviesHtml) => {
        content.innerHTML = moviesHtml;
      });
  };