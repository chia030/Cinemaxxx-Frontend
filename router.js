import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
import renderMovies from "./pages/movies/movies.js";
import renderTickets from "./pages/tickets/tickets.js";
import renderTimetable from "./pages/timetable/timetable.js";

export default function () {
  const router = new Navigo("/", { hash: true });

  router
    .on({ 
      "/": () => {
        // call updatePageLinks to let navigo handle the links
        // when new links have been inserted into the dom
<<<<<<< HEAD
        renderMain().then(router.updatePageLinks);
      },
      about: () => {
        renderAbout();
      },
      movies: () => {
        renderMovies();
      },
      "/tickets/:id/": ({ data, params }) => {
        renderTickets(data.id);
      },
      timetable: () => {
        renderTimetable().then(router.updatePageLinks);
      }
    })
=======


      renderMain().then(router.updatePageLinks);
    },
    about: () => {
      renderAbout();
      router.updatePageLinks();
    },
    movies: () => {
      renderMovies();
      router.updatePageLinks();
    },
    "/tickets/:id/": ({ data, params }) => {
        renderTickets(data.id);
      router.updatePageLinks();
    },
     timetable: () => {
        renderTimetable().then(router.updatePageLinks);
     }
  })
>>>>>>> 6fcd5c5a6325ad10265b8eb3ad116af68483b338
    .resolve();
}
