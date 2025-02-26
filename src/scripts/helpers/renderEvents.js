import Swal from "sweetalert2";

const eventCards = document.querySelector(".event_card_container")
export function renderEventsCard(events) {
    eventCards.innerHTML = "";
    events.forEach((event) => {
        eventCards.innerHTML += `<div class="item">
            <div class="image">
                <img src="${event.posterURL}" alt="">
            </div>
            <div class="cart-content">
                <a href="/eventDetail.html?id=${event.id}"> <h5>${event.name}, <br> ${event.venueAddress}</h5></a>
                <span>From ${event.price} AZN</span>
                <p>${event.dateTime}</p>
                <button class="fav btn btn-outline-danger" data-id="${event.id}">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
        </div>`;
    });

    const favBtns = document.querySelectorAll(".fav");
    favBtns.forEach((favBtn) => {
        favBtn.addEventListener("click", function () {
            favBtn.style.backgroundColor="#D60000"
            const eventId = this.getAttribute("data-id");
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            
            if (this.classList.contains("favorited")) {
                favorites = favorites.filter(event => event.id !== eventId);
                this.classList.remove("favorited");
                Swal.fire({
                    title: "Event removed from favorites",
                    icon: "error"
                });
            } else {
                const event = events.find(event => event.id === eventId);
                favorites.push(event); 
                this.classList.add("favorited");
                Swal.fire({
                    title: "Event added to favorites",
                    icon: "success"
                });
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}
