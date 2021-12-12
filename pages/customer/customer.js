export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/customer/customer.html")
      .then((response) => response.text())
      .then((customerHtml) => {
        content.innerHTML = customerHtml;
      });
  };