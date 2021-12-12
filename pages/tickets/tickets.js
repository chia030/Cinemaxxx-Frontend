

const fetchFreeSeats = (screening) => {

  const getScreeningUrl = `http://54.158.180.212:9090/api/screenings/get-by-id/${screening}`;
  const getTicketsUrl = `http://54.158.180.212:9090/api/tickets/getSeats/1/false/${screening}/`;
  // url explained .../api/tickets/getSeats/userId=1(this is an admin)/purchased=false(so 'free' seats)/screenindId/`

  return fetch(getScreeningUrl)
         .then((response) => response.json())
         .then((screeningInfo) => {
           fetch(getTicketsUrl)
           .then((response) => response.json())
           .then((seatsArray) => {
          
          const div = document.querySelector(".screening-available-seats");
          const p = document.createElement("p");

          p.innerHTML = `AVAILABLE TICKETS FOR SCREENING: #${screening} ${screeningInfo.movie.title} <br>`;

          seatsArray.forEach(ticket => {
            p.innerHTML += `ticket id:${ticket.ticketId}, row:${ticket.seat.seatRow}, column:${ticket.seat.seatColumn}, hall:${ticket.seat.hall.hallId}<br>`;
          });

          div.appendChild(p);

         })});
}

  export default (id) => {

    const content = document.querySelector(".content");

    fetch("./pages/tickets/tickets.html")
        .then((response) => response.text())
        .then((ticketsHtml) => {
          content.innerHTML = ticketsHtml;
          fetchFreeSeats(id);
        });
    
  }
