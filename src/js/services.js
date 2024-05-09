class service {
  constructor(name, id, price, status, date, deadline) {
    this.name = name;
    this.id = id;
    this.price = price;
    this.status = status; // Done, Ongoing, Stopped
    this.date = date;
    this.deadline = deadline;
  }
}

let pre_services = {
  "Serviço 1": {
    id: "10020030",
    price: "R$100.00",
    status: "Ongoing",
    date: "12/05/2024",
    deadline: [],
  },
  "Serviço 2": {
    id: "20030040",
    price: "R$557.90",
    status: "Stopped",
    date: "14/05/2024",
    deadline: [],
  },
  "Serviço 3": {
    id: "30040050",
    price: "R$75.99",
    status: "Ongoing",
    date: "20/05/2024",
    deadline: [],
  },
};

let services = [];

function load_services() {
  document.getElementById("service-list").innerHTML = "";
  services.forEach((service) => {
    const service_node = document.createElement("a");
    service_node.href = "#";
    service_node.classList.add("list-group-item", "list-group-item-action");

    const div = document.createElement("div");
    div.classList.add("d-flex", "w-100", "justify-content-between");

    const h5 = document.createElement("h5");
    h5.classList.add("mb-1");
    h5.textContent = service.name;

    const small = document.createElement("small");
    small.classList.add("text-body-secondary");
    small.textContent = service.id;

    const price = document.createElement("p");
    price.classList.add("mb-1");
    price.textContent = service.price;

    const status = document.createElement("p");
    switch (service.status) {
      case "Done":
        status.classList.add("mb-1", "text-success");
        break;
      case "Ongoing":
        status.classList.add("mb-1", "text-warning");
        break;
      case "Stopped":
        status.classList.add("mb-1", "text-danger");
        break;
    }
    status.textContent = service.status;

    const deadline = document.createElement("p");
    deadline.classList.add("mb-1");
    deadline.textContent = "Deadline: " + service.deadline;

    const date = document.createElement("p");
    date.classList.add("text-body-secondary");
    date.textContent = service.date;

    const button = document.createElement("button");
    button.type = 'button';
    button.classList.add('btn', 'btn-danger');
    button.textContent = 'Delete';
    button.addEventListener('click', function () {
      delete_service(service.name);
    });

    div.appendChild(h5);
    div.appendChild(small);
    service_node.appendChild(div);
    service_node.appendChild(price);
    service_node.appendChild(status);
    service_node.appendChild(deadline);
    service_node.appendChild(date);
    service_node.appendChild(button);

    const parentElement = document.getElementById("service-list");
    parentElement.appendChild(service_node);
  });
}

function select_service() {
  const service = document.getElementById("select-service").value;

  if (service === 'Escolha') {
    return;
  }

  document.getElementById("service-price").innerText =
    "Valor em " + pre_services[service].price;

  var service_date = +pre_services[service].date.split("/")[0];
  var deadline = new Date();
  deadline.setDate(deadline.getDate() + service_date);

  pre_services[service].deadline = deadline.toLocaleDateString();

  document.getElementById("service-date").innerText =
    "Prazo de Atendimento: " + pre_services[service].date;
  document.getElementById("service-deadline").innerText =
    "Data Prevista: " + deadline.toLocaleDateString();
}

function create_service() {
  const service_name = document.getElementById("select-service").value;

  if (service_name === 'Escolha') {
    alert('Escolha!!!');
    return;
  }

  const new_service = new service(
    service_name,
    pre_services[service_name].id,
    pre_services[service_name].price,
    pre_services[service_name].status,
    pre_services[service_name].date,
    pre_services[service_name].deadline
  );

  if (services.some((service) => service.name === service_name)) {
    alert('Serviço já Adicionado!');
    return;
  }

  services.push(new_service);
  load_services();
}

function delete_service(param) {

  services = services.filter(function (service) {
    return service.name !== param;
  });

  load_services();
}
