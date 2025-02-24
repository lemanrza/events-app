import controller from "../services/request.js"
import { endpoints } from "../services/api.js"

const eventCards = document.querySelector(".event_card_container")

document.addEventListener('DOMContentLoaded', async function () {
    const apiResponseEvents = await controller.getAll(endpoints.events)
    renderEventsCard(apiResponseEvents.data)
})

function renderEventsCard(events) {
    eventCards.innerHTML = ""
    events.forEach(event => {
        eventCards.innerHTML += `<div class="item">
                    <div class="image">
                        <img src="${event.posterURL}" alt="">
                    </div>
                    <div class="cart-content">
                       <a href="/eventDetail.html?id=${event.id}"> <h5>${event.name}, <br> ${event.venueAddress}</h5></a>
                            <span>From ${event.price} AZN</span>
                            <p>${event.dateTime}</p>
                    </div>
                </div>`
    });
}