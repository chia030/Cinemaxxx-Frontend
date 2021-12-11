document.addEventListener("DOMContentLoaded", init);

function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    let dateFrom = document.getElementById("date-from").value;
    let dateTo = document.getElementById("date-to").value;

    // need to change for server when its up and running
    let url = `http://localhost:8080/api/screenings/get?date1=${dateFrom}&date2=${dateTo}`;
    
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        for(let i = 0; i <= 9; i++){
       
        let fig = document.createElement("figure");
        let paragraph = document.createElement("p");

        paragraph.textContent = content.data[i].movie.title + " " + content.data[i].time;

        fig.appendChild(paragraph);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", fig); //so the new images are on the top not the bottom
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
}



export default () => {
  const content = document.querySelector(".content");

  fetch("./pages/timetable/timetable.html")
    .then((response) => response.text())
    .then((aboutHtml) => {
      content.innerHTML = timetableHtml;
    });
};
