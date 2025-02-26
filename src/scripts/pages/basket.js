import Swal from 'sweetalert2'

document.addEventListener("DOMContentLoaded", function () {
    const addToBasketBtn = document.querySelector(".book-now-btn");
    
    if (addToBasketBtn) {
        addToBasketBtn.addEventListener("click", function () {
            const eventId = new URLSearchParams(window.location.search).get("id");
            
            if (!eventId) {
                console.error("Don't found Event ID");
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
    }
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

    renderBasket();
});



