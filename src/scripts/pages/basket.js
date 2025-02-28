import Swal from 'sweetalert2'
import controller from '../services/request.js';
import { endpoints } from '../services/api.js';

document.addEventListener("DOMContentLoaded", function () {
    const addToBasketBtn = document.querySelector(".book-now-btn");

    addToBasketBtn.addEventListener("click", function () {
        const eventId = new URLSearchParams(window.location.search).get("id");
        const userId = JSON.parse(localStorage.getItem("userId")); if (!eventId) {
            return;
        }
        if (!userId) {
            Swal.fire({
                title: "You have to log in",
                icon: "error"
            });
            window.location.href = "/login.html"
            return;
        }

        const eventDetails = {
            id: eventId,
            name: document.querySelector("#cover-image").title,
            price: document.querySelector("#ticketPrice").textContent,
            date: document.querySelector("#eventDateTime").textContent,
            venue: document.querySelector("#venueName").textContent,
            image: document.querySelector("#cover-image").src,
            quantity: 1
        };

        let basket = JSON.parse(localStorage.getItem("basket")) || [];
        let existingItem = basket.find(item => item.id === eventId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            basket.push(eventDetails);
        }

        localStorage.setItem("basket", JSON.stringify(basket));
        Swal.fire({
            title: "Added to basket successfully!",
            icon: "success"
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const basketList = document.querySelector(".basket-items");
    const totalPriceElement = document.querySelector(".order-part span");

    let basket = JSON.parse(localStorage.getItem("basket")) || [];

    function renderBasket() {
        basketList.innerHTML = "";
        let total = 0;

        if (basket.length === 0) {
            basketList.innerHTML = "<p>Basket is empty.</p>";
            totalPriceElement.textContent = "Total: 0 AZN";
            return;
        }

        basket.forEach((item, i) => {
            total += item.price * item.quantity;

            basketList.innerHTML += `
                <div class="basket-item">
                    <div class="left-side">
                        <div class="basket-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="basket-item_info">
                            <span>${item.venue}</span>
                            <h2>${item.name}</h2>
                            <span>${item.date}</span>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="quantity">
                        <button class="increase" data-index="${i}">+</button>
                        <span>${item.quantity}</span>
                        <button class="decrease" data-index="${i}">-</button>
                        </div>
                        <div class="basket-item_price"><span>${item.price} AZN</span></div>
                        <button class="removeBtn" data-index="${i}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
        });

        totalPriceElement.textContent = `Total: ${total.toFixed(2)} AZN`;

        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                basket[index].quantity += 1;
                updateBasket();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                if (basket[index].quantity > 1) {
                    basket[index].quantity -= 1;
                } else {
                    basket.splice(index, 1);
                }
                updateBasket();
            });
        });

        document.querySelectorAll(".removeBtn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                basket.splice(index, 1);
                updateBasket();
            });
        });
    }

    function updateBasket() {
        localStorage.setItem("basket", JSON.stringify(basket));
        renderBasket();
    }

    const orderButton = document.querySelector(".buyNowBtn");
    orderButton.addEventListener("click", async () => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (!userId) {
            Swal.fire({
                title: "You have to log in to place an order!",
                icon: "error"
            });
            return;
        }

        let basket = JSON.parse(localStorage.getItem("basket")) || [];
        if (basket.length === 0) {
            Swal.fire({
                title: "Your basket is empty!",
                icon: "error"
            });
            return;
        }
        let tickets = [];

        basket.forEach((event) => {
            let newTicket = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                userId: userId,
                eventId: event.id,
                price: event.price,
                purchaseDate: new Date().toISOString(),
                ticketCode: `TICKET-${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`
            };
            tickets.push(newTicket);
        });



        let storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        storedTickets.push(...tickets);
        localStorage.setItem("tickets", JSON.stringify(storedTickets));

        await controller.post(endpoints.tickets, tickets);


        localStorage.removeItem("basket");

        window.location.href = "/event.html";
    });

    renderBasket();
});






