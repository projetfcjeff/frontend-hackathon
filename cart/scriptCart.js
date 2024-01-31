const container = document.querySelector(".container-cart-booking");
const textTitle = document.querySelector("#text-title");
const questionResult = document.querySelector("#question-result");

fetch("http://localhost:3000/selections/cart")
  .then((response) => response.json())
  .then((result) => {
    let price = 0;

    if (result.selections) {
      questionResult.innerHTML = "";
    }

    for (let element of result.selections) {
      price += element.price;

      // Obtenez l'heure actuelle de la date
      const hour = new Date(element.date).getUTCHours();
      const minute = new Date(element.date).getUTCMinutes();

      // Formatage de l'heure au format "HH:mm"
      const formattedDate = `${hour < 10 ? "0" : ""}${hour}:${
        minute < 10 ? "0" : ""
      }${minute}`;

      questionResult.innerHTML += `
        <div class="ticket-info">
          <span>${element.departure} > ${element.arrival}</span>
          <span class="date">${formattedDate}</span>
          <span class="price">${element.price}€</span>
        </div>
      `;
    }

    if (result.selections) {
      textTitle.innerHTML = "My Cart";

      container.innerHTML += `
      <div id="container-footer">
        <div class="total-info">Total: ${price}€</div>
        <button id="purchaseBtn">Purchase</button>
      </div>
      `;

      // Sélectionnez le bouton d'achat après qu'il a été ajouté au DOM
      const btnPurchase = document.querySelector("#purchaseBtn");

      btnPurchase.addEventListener("click", () => {
        console.log("click");
        fetch("http://localhost:3000/selections/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        location.reload();
      });
    }
  });
