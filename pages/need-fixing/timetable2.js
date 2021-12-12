

document.addEventListener("DOMContentLoaded", init);

function init() {
document.getElementById("btnSearch").addEventListener("click", event => { 
  
      event.preventDefault();
        const dateFrom = document.getElementById("date-from").value;
        const dateTo = document.getElementById("date-to").value;
      
        // need to change for server when its up and running
        let url = `http://54.221.49.14:9090/api/screenings/get?date1=${dateFrom}&date2=${dateTo}`;
        console.log(url);
      
        fetch(url)
        .then(response => response.json())
        .then(content => {
          console.log(content);

          for(let i = 0; i <= Object.keys(content).length; i++){
            const div = document.createElement("div");
            const titleDiv = document.createElement("div");
            const timeDiv = document.createElement("div");
            const movieTitleExists = document.getElementById(content[i].movie.title);
            const out = document.querySelector(".out");
            console.log(movieTitleExists);

            titleDiv.textContent = content[i].movie.title;
            timeDiv.innerHTML = `<a href="/tickets/${content[i].screeningId}" data-navigo> ${content[i].time} ${content[i].date}</a>`;
            
            if(movieTitleExists){ //check if div element witht this movie title alreadu exists to insert time and date
              movieTitleExists.appendChild(timeDiv);
              out.insertAdjacentElement("afterbegin", div);
            }else{ //otherwise we will create a new div with set title and insert time and date
              div.id = content[i].movie.title;
              div.appendChild(titleDiv);
              div.appendChild(timeDiv);
              out.insertAdjacentElement("afterbegin", div);
            };
           // timetableParagraph.innerHTML += content[i].movie.title + " " + content[i].time + content[i].date + "<br>";
          }
         // const timetableArray = JSON.parse(content);
         // console.log(timetableArray);

        })
        .catch(err => {
          console.error(err);
      });
    });
}


