
const fetchFreeSeats = (screening) => {

  const getScreeningUrl = `http://54.158.180.212:9090/api/screenings/get-by-id/${screening}`;
  const getTicketsUrl = `http://54.158.180.212:9090/api/tickets/get-by-screening/${screening}/`;
  // url explained .../api/tickets/getSeats/userId=1(this is an admin)/purchased=false(so 'free' seats)/screenindId/`

  return fetch(getScreeningUrl)
         .then((response) => response.json())
         .then((screeningInfo) => {
           fetch(getTicketsUrl)
           .then((response) => response.json())
           .then((seatsArray) => {
             console.log(screeningInfo);
          
          const div = document.querySelector(".screening-available-seats");
          const p = document.createElement("h2");
          const h2 = document.createElement("h3");

           const row1 = document.querySelector("#row1");
           const row2 = document.querySelector("#row2");
           const row3 = document.querySelector("#row3");
           const row4 = document.querySelector("#row4");
           const row5 = document.querySelector("#row5");
           const row6 = document.querySelector("#row6");
           const row7 = document.querySelector("#row7");
           const row8 = document.querySelector("#row8");
           const row9 = document.querySelector("#row9");
           const row10 = document.querySelector("#row10");
           const row11 = document.querySelector("#row11");

          p.innerHTML = `${screeningInfo.movie.title} `;
          h2.innerHTML = `${screeningInfo.date} <br> ${screeningInfo.time}`;

          seatsArray.forEach(ticket => {
          const seat = document.createElement("div");

          if(ticket.purchased === true){
          seat.className = "seat occupied";
          }else{seat.className = "seat";}
          
          seat.setAttribute('id', ticket.ticketId)

          switch (ticket.seat.seatRow){
            case 1:
              row1.insertAdjacentElement("afterbegin", seat);
              break;
            case 2:
              row2.insertAdjacentElement("afterbegin", seat);
              break;
            case 3:
              row3.insertAdjacentElement("afterbegin", seat);
              break;
            case 4:
              row4.insertAdjacentElement("afterbegin", seat);
              break;
            case 5:
              row5.insertAdjacentElement("afterbegin", seat);
              break;
            case 6:
              row6.insertAdjacentElement("afterbegin", seat);
              break;
            case 7:
              row7.insertAdjacentElement("afterbegin", seat);
              break;
            case 8:
              row8.insertAdjacentElement("afterbegin", seat);
              break;
            case 9:
              row9.insertAdjacentElement("afterbegin", seat);
              break;
            case 10:
              row10.insertAdjacentElement("afterbegin", seat);
              break;   
          }
          //  p.innerHTML += `ticket id:${ticket.ticketId}, row:${ticket.seat.seatRow}, column:${ticket.seat.seatColumn}, hall:${ticket.seat.hall.hallId}<br>`;
          });

          div.appendChild(p);
          div.appendChild(h2);

         })});
}




export default (id) => {

    const content = document.querySelector(".content");

    fetch("./pages/tickets/tickets.html")
        .then((response) => response.text())
        .then((ticketsHtml) => {
          content.innerHTML = ticketsHtml;

          // update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...document.querySelectorAll('.row .seat:not(.occupied')].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  document.getElementById('count').innerText = selectedSeatsCount;
  document.getElementById('total').innerText = selectedSeatsCount * 10;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    document.querySelectorAll('.row .seat:not(.occupied').forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}


// Seat click event
document.querySelector('.container').addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

//Reserve selected tickets
document.getElementById('reserveBtn').addEventListener("click", function(){
 
  //get selected tickets and reserve them
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  for (let i = 0; i < selectedSeats.length; i++) {
    const ticketId = selectedSeats[i].id;
    console.log(ticketId);
    const url = `http://54.158.180.212:9090/api/tickets/reserve-ticket?ticketId=${ticketId}&userId=1`;
    const bookingRequest = new XMLHttpRequest();
    bookingRequest.open("PUT", url);
    bookingRequest.setRequestHeader("Content-Type", "application/json");
    bookingRequest.send();

  }
  //need to confirm 200 and link
  window.alert("Success!");
  });
          
          fetchFreeSeats(id);
          populateUI();
          updateSelectedCount();
        });
    
  }
