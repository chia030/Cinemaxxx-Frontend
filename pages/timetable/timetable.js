
export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/timetable/timetable.html")
    .then((response) => response.text())
    .then((timetableHtml) => {
      content.innerHTML = timetableHtml;

      form.addEventListener("click", (event) => { 
  
        event.preventDefault();
        const dateFrom = form.querySelector("input.date-from").value;
        const dateTo = form.querySelector("input.date-to").value;
      
        // need to change for server when its up and running
        const Http = new XMLHttpRequest();
        let url = `http://54.221.49.14:9090/api/screenings/get?date1=${dateFrom}&date2=${dateTo}`;
      
        Http.open("GET", url);
       Http.send(); //async request
      
       const timetableParagraph = document.querySelector("#timetable");
       timetableParagraph.innerHTML ="";
      
       // when something changes ->
       Http.onreadystatechange = (e) => {
      
        const timetableArray = JSON.parse(Http.response);
        console.log(timetableArray);
      
      timetableArray.forEach(screening => {
        timetableParagraph.innerHTML += screening.movie.title + " " + screening.time + "<br>";
        });
      }
      
  
    });
})};
