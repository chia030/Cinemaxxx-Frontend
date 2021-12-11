async function postMovie() {
  const form = document.getElementById('new-movie'); 
  console.log(form.elements.namedItem("movieID").value);
  const response = await fetch('http://54.158.180.212:9090/api/movies/addById/'+form.elements.namedItem("movieID").value, {
    method: 'POST',
  });
  const responseText = await response.text();
  console.log(responseText); // logs 'OK'
}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/employee/employee.html")
      .then((response) => response.text())
      .then((employeeHtml) => {
        content.innerHTML = employeeHtml;

        document.querySelector("button").onclick = function () {
          window.open("https://www.imdb.com/", "_blank"); //opens imdb in a new tab ;)
        };

        const form = document.getElementById('new-movie');
        form.addEventListener("submit",postMovie);
        
      });
  };