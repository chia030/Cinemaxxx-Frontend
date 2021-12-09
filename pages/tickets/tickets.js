export default (screeningId) => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/tickets/tickets.html")
      .then((response) => response.text())
      .then((ticketsHtml) => {
        content.innerHTML = ticketsHtml;

        return fetch(`http://54.221.49.14:9090/api/screenings/get-by-id/${screeningId}`)
        .then((response) => response.json())
        .then((screening) => {
          document.querySelector("h2").innerText = screening.movie.title;
          document.querySelector("li.date").innerHTML = screening.date;
          document.querySelector("li.time").innerHTML = screening.time;
          document.querySelector("li.hall").innerHTML = screening.hall.hallId;
        });
      });
  };