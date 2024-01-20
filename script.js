const foodDiv = document.getElementById("food");
let Data;
document.addEventListener("DOMContentLoaded", () => {});

function getMenu() {

  return fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) =>
    data.map((i) => {
      Data=data
      foodDiv.innerHTML += `
        <div id="${i.id}" class="card">
            <img src="${i.imgSrc}" alt="${i.name}">
            <div class="text">
                <div>
                    <h3>${i.name}</h3>
                    <p>$${i.price}/-</p>
                </div>
                <div>
                    <i class="fa-solid fa-square-plus"></i>
                </div>
            </div>
        </div>
        `;
    })
    
    )
    .catch((e) => console.log(e));
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const Burgers = [];
      for (let i = 0; i < 3; i++) {
        const Index = Math.floor(Math.random() * Data.length);
        Burgers.push(Data[Index]);
        Data.splice(Index, 1); 
      }
      const order = { burgers: Burgers };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: false };
      resolve(orderStatus);
    }, 1500);
  });
}

function payOrder(orderStatus) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      orderStatus = { ...orderStatus, paid: true };
      resolve(orderStatus);
    }, 1000);
  });
}

function thankYouFnc() {
  alert("Thank you for eating with us today!");
}

getMenu()
  .then(() => takeOrder())
  .then((order) => orderPrep(order))
  .then((orderStatus) => payOrder(orderStatus))
  .then((orderStatus) => {
    if (orderStatus.paid) {
      thankYouFnc();
    }
  })
  .catch((err) => console.log(err));
