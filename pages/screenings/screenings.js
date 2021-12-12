//fetches ALL screenings on load, can be filtered with the 'Search' button
const fetchScreenings = (url) => {

    return fetch(url)
           .then((response) => response.json())
           .then((responseArray) => {
            const output = document.querySelector('.screenings')
  
              responseArray.forEach(screening => {
                
                const screeningInfo = document.createElement("div");
                const movieTitleExists = document.getElementById(screening.movie.title);
                const imgSrc = screening.movie.poster.replace(/\s/g, '');
                
<<<<<<< HEAD
                const link = `
                              <img src="${imgSrc}" style="margin: 10px 50px;">`
=======

                const link = `<h1>${screening.movie.title}</h1><br>
                              <img src="${imgSrc}">`

>>>>>>> fc8b72e024afb6d8de1820c6f6c09d4f41a022bd
  
               // screeningInfo.innerHTML += link;
  
                const info = document.createElement("ul");
                info.id = "screening-info";
                info.innerHTML = `<a href='/#/tickets/${screening.screeningId}' data-navigo>
                <li class="date">Date: ${screening.date}</li>
                                  <li class="time">Time: ${screening.time}</li>
                                  <li class="hall">Hall-ID: ${screening.hall.hallId}</li></a>`;
                

                if(movieTitleExists){
                  
                  movieTitleExists.appendChild(info);
                  output.insertAdjacentElement("afterbegin", screeningInfo);
              }else{
                screeningInfo.innerHTML += link;
                screeningInfo.id = screening.movie.title;
                screeningInfo.appendChild(info);
                output.insertAdjacentElement("afterbegin", screeningInfo);
              //  output.insertAdjacentElement("afterbegin", screeningInfo);
                }
  
              });
  
            //  output.innerHTML = screeningInfo.outerHTML;
  
  })};
   
  export default () => {

      const content = document.querySelector(".content");
    
      return fetch("./pages/screenings/screenings.html")
        .then((response) => response.text())
        .then((screeningsHtml) => {
          content.innerHTML = screeningsHtml;
  
          const allScreeningsUrl = `http://54.158.180.212:9090/api/screenings/get`;
  
          fetchScreenings(allScreeningsUrl);
          
          // when 'Search' is pressed ->
          document.querySelector("#btn-search").onclick = (e) => {

            e.preventDefault();

            let dateFrom = document.getElementById("date-from").value;
            let dateTo = document.getElementById("date-to").value;
            
            const screeningByDateUrl = `http://54.158.180.212:9090/api/screenings/get?date1=${dateFrom}&date2=${dateTo}`;
  
            return fetchScreenings(screeningByDateUrl);
        }
      });
  
    };