async function postMovie() {
  const form = document.getElementById('new-movie'); 
  console.log(form.elements.namedItem("movieID").value);
  const response = await fetch('http://54.221.49.14:9090/api/movies/addById/'+form.elements.namedItem("movieID").value, {
    method: 'POST',
  });
  const responseText = await response.text();
  console.log(responseText); // logs 'OK'
}

//thx <3
async function postMovie() {
  const form = document.getElementById('edit-movie'); 
  console.log(form.elements.namedItem("movieID").value);
  const response = await fetch('http://54.221.49.14:9090/api/movies/editDescription/'+form.elements.namedItem("movieID").value+"/"+form.elements.namedItem("movieDescription").value, {
    method: 'POST',
  });
  const responseText = await response.text();
  console.log(responseText); // logs 'OK'
}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/tickets/tickets.html")
      .then((response) => response.text())
      .then((ticketsHtml) => {
        content.innerHTML = ticketsHtml;
        document.querySelector("button").onclick = function () {
          location.href = "www.imdb.com";
      };
      const form = document.getElementById('new-movie');
      form.addEventListener("submit",postMovie);
      });
  };