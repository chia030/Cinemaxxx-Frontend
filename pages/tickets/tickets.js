export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/tickets/tickets.html")
      .then((response) => response.text())
      .then((ticketsHtml) => {
        content.innerHTML = ticketsHtml;
      });
  };