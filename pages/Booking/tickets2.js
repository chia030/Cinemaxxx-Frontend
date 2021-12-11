const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const reserveBtn = document.getElementById('reserveBtn');



 var numberOfSeatsInHall = 0;
 var seatColumn;
 var seatRow = 0;
 var seatsCreated = 0;
 var ticketId = 0;
 var screeningId = 0;
 var seatPurchased = false;
 var count2 = 0;
 var seatRowCompare = 0;
 var seatColumnCompare;
 var screeningIdCompare = 0;
 const userId = 72;

 //gets ID information, needs to be adjusted for navigo
 function screeningInfo() {        
         return fetch(`http://54.221.49.14:9090/api/screenings/get-by-id/55`)
         .then((response) => response.json())
         .then((data) => {
           console.log(data);
           document.querySelector("h2").innerText = `${data.movie.title}`;
           document.querySelector("li.date").innerHTML = `Date : ${data.date}`;
           document.querySelector("li.time").innerHTML = `Time : ${data.time}`;
           document.querySelector("li.hall").innerHTML = `Hall : ${data.hall.hallId}`;
           numberOfSeatsInHall = data.hall.numberOfSeats;
           screeningId = data.screeningId;
         });
 }

screeningInfo();

//create seats, assing ticket Id and show if ticket is purchased or not
function seatCreation(){
  return fetch(`http://54.221.49.14:9090/api/tickets/get`)
  .then((response) => response.json())
  .then((tickets) => {
    console.log(tickets);

    //create seats depending on halls number of seats
  for(let i = 0; i < numberOfSeatsInHall; i++){
      const seat = document.createElement("div");
      seat.className = "seat occupied";
      console.log(seat.className);

    //incrementing column numbers and row
    if(seatColumn < 'j'){
      function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
      }
      seatColumn = nextChar(seatColumn);
      
      }else{
      seatRow += 1;
      seatColumn ='a';
      }

      //checking for tickets to assign id and decide if they are purchased already or not
       for(let i = 0; i <= Object.keys(tickets).length - 1; i++){

        seatRowCompare = tickets[i].seat.seatRow;
        seatColumnCompare = tickets[i].seat.seatColumn;
        screeningIdCompare = tickets[i].screening.screeningId;
        seatColumnCompare = seatColumnCompare.toLowerCase();

        if(screeningIdCompare === screeningId && seatRowCompare === seatRow && seatColumnCompare === seatColumn){
            console.log("Found");
            ticketId = tickets[i].ticketId;
            seatPurchased = tickets[i].purchased;
            console.log("seat purchased" + seatPurchased);

            if(seatPurchased){ seat.className = "seat occupied";}
            else{seat.className = "seat"}
            seat.setAttribute('id', ticketId)
            console.log(seat.id);

            break;
         }
       }
       console.log("out");
      const seatRowInsert = document.getElementById(seatRow);
      seatRowInsert.insertAdjacentElement("afterbegin", seat);
    }  
  });
}

seatCreation();
populateUI();

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * 10;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}


// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

//Reserve selected tickets
reserveBtn.addEventListener("click", function(){
 
  //get selected tickets and reserve them
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  for (let i = 0; i < selectedSeats.length; i++) {
    const ticketId = selectedSeats[i].id;
    const url = `http://54.221.49.14:9090/api/tickets/reserve-ticket?ticketId=${ticketId}&userId=${userId}`;
    const bookingRequest = new XMLHttpRequest();
    bookingRequest.open("PUT", url);
    bookingRequest.setRequestHeader("Content-Type", "application/json");
    bookingRequest.send();

  }
  //need to confirm 200 and link
  window.alert("Success!");
  });

// intial count and total
updateSelectedCount();