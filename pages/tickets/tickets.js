async function fetchScreenings(url) {

  const response = await fetch(url, { method: 'GET' });
  const responseArray = await response.json();

  const fig = document.createElement("figure");
  const paragraph = document.createElement("p");

  responseArray.forEach(screening => {
    paragraph.innerHTML += screening.movie.title + " " + screening.time + " " + screening.date + "<br>";
  })

  fig.appendChild(paragraph);

  const output = document.querySelector('.output');
  output.innerHTML = fig.outerHTML;

}


export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/tickets/tickets.html")
      .then((response) => response.text())
      .then((ticketsHtml) => {
        content.innerHTML = ticketsHtml;

        document.querySelector("#btn-search").onclick = (e) => {

          e.preventDefault();
        
          let dateFrom = document.getElementById("date-from").value;
          let dateTo = document.getElementById("date-to").value;
          
          // need to change for server when its up and running
          let url = `http://54.158.180.212:9090/api/screenings/get?date1=${dateFrom}&date2=${dateTo}`;
    
          fetchScreenings(url);
      }
    });
  };