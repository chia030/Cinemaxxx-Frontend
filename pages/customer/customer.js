/*

IMPORTANT: User#1 and User#6 are ADMINS therefore most of the tickets are assigned to them but they are not technically purchased.
           The get-by-user endpoint only returns purchased tickets.
           User#9 has some tickets.

*/

let screenings = [];

const fetchScreenings = async () => {
  const getScreeningsUrl = `http://54.158.180.212:9090/api/screenings/get`;
  const response = await fetch(getScreeningsUrl, {
    method: 'GET',
  });
  const screeningsArray = await response.json();
  screenings = await screeningsArray;
}

// const handleCancel = (e) => {

//   // e.preventDefault();

//   const ticketId = e.target.parentElement.value; console.log(ticketId);
//   // const userId = e.user.userId; console.log(userId);

//   // const cancelReservationUrl = `http://54.158.180.212:9090/api/tickets/delete-booking?ticketId=${ticketId}&userId=${userId}`;

//   // // return fetch(cancelReservationUrl)
//   // //       .then((response) => response.text())
//   // //       .then((responseText) => {
//   // //         console.log(responseText);
//   // //       });

//   // const response = await fetch(cancelReservationUrl, {
//   //   method: 'PUT',
//   // });

//   // const responseText = await response.text();
//   // console.log(responseText);
  
// }

const handleForm = async (e) => {

  e.preventDefault();

  const form = document.querySelector("#customer-tickets-form");
  const customerId = form.elements.namedItem("customer-id").value;

  const getTicketsByCustomerUrl = `http://54.158.180.212:9090/api/tickets/get-by-user/${customerId}`;

  const output = document.querySelector(".customer-tickets-output");
  const ticketsList = document.createElement("ul");

  const response = await fetch(getTicketsByCustomerUrl, {
    method: 'GET',
  });

  const ticketsArray = await response.json();
  
  await ticketsArray.forEach(ticket => {
    const ticketLi = document.createElement("li");
    const matchingScreening = screenings.find(s => s.screeningId === ticket.screening.screeningId);

    ticketLi.value = ticket.ticketId;

    ticketLi.innerHTML = `#${ticket.ticketId}, 
                          Seat: ${ticket.seat.seatRow} ${ticket.seat.seatColumn}, 
                          Hall: ${ticket.seat.hall.hallId}, 
                          Cinema: ${ticket.seat.hall.cinema.name},
                          Movie: ${matchingScreening.movie.title}`
                          // <button class='cancel-button' onclick='${handleCancel}'>Cancel Reservation</button>`;
    
    ticketsList.appendChild(ticketLi);
  });

  output.innerHTML = ticketsList.outerHTML;
  
};

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/customer/customer.html")
      .then((response) => response.text())
      .then((customerHtml) => {
        content.innerHTML = customerHtml;

        fetchScreenings();
        const form = document.querySelector("#customer-tickets-form");
        form.addEventListener("submit", handleForm);
      });
  };