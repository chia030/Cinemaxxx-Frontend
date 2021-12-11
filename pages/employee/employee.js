export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/employee/employee.html")
      .then((response) => response.text())
      .then((employeeHtml) => {
        content.innerHTML = employeeHtml;
      });
  };