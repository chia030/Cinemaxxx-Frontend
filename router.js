import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
import renderMovies from "./pages/movies/movies.js";
import renderScreenings from "./pages/screenings/screenings.js";
import renderTickets from "./pages/tickets/tickets.js";
import renderEmployee from "./pages/employee/employee.js";


export default function () {

  window.router = new Navigo("/", {hash: true});

  router
    .on({ 
      "/": () => {
      renderMain().then(router.updatePageLinks);
    },
    about: () => {
      renderAbout();
    },
    movies: () => {
      renderMovies();
    },
    "/tickets":() => {
      renderScreenings().then(router.updatePageLinks);
    },
    "/tickets/:id":({data}) => { //data is object = {id: #idnumber}
      renderTickets(data.id);
    },
    employee: () => {
      renderEmployee();
    },
  })
    .resolve();
}
