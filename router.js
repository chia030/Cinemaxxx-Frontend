import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
import renderMovies from "./pages/movies/movies.js";
import renderTickets from "./pages/tickets/tickets.js";
import renderTimetable from "./pages/timetable/timetable.js"

export default function () {
  const router = new Navigo("/", { hash: true });

  router
    .on({
      "/": () => {
        // call updatePageLinks to let navigo handle the links
        // when new links have been inserted into the dom
        renderMain().then(router.updatePageLinks);
      },
      about: () => {
        renderAbout();
      },
      movies: () => {
        renderMovies();
      },
      tickets: () => {
        renderTickets();
      },
      timetable: () => {
        renderTimetable();
      }
    })
    .resolve();
}
