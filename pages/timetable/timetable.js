

const getTimetable = () => { 
    ev.preventDefault(); //to stop the page reload
    let dateFrom = document.getElementById("date-from").value;
    let dateTo = document.getElementById("date-to").value;

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
} 
  
//     fetch(url)
//       .then(response => response.json())
//       .then(content => {
//         //  data, pagination, meta
//         console.log(content.data);
//         console.log("META", content.meta);
//         for(let i = 0; i <= 9; i++){
       
//         let fig = document.createElement("figure");
//         let paragraph = document.createElement("p");

//         paragraph.textContent = content.data[i].movie.title + " " + content.data[i].time;

//         fig.appendChild(paragraph);
//         let out = document.querySelector(".out");
//         out.insertAdjacentElement("afterbegin", fig); //so the new images are on the top not the bottom
//         }
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   });
// }


export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/timetable/timetable.html")
      .then((response) => response.text())
      .then((timetableHtml) => {
        content.innerHTML = timetableHtml;

        //setting onclick to getMovies()
        const displayScheduleButton = document.querySelector("#btnSearch");
        displayScheduleButton.onclick = getTimetable();   
      });
  };