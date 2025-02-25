import controller from "../services/request.js";
import { endpoints } from "../services/api.js";
import { renderEventsCard } from "../helpers/renderEvents.js";

let apiResponseEvents = undefined;
document.addEventListener('DOMContentLoaded', async function () {
    apiResponseEvents = await controller.getAll(endpoints.events)
    renderEventsCard(apiResponseEvents.data)
})
const searchInput = document.querySelector("#searchInput")
searchInput.addEventListener("keyup", function (e) {
    const searchQuery = e.target.value.trim().toLowerCase();
    const searchEvents = apiResponseEvents.data.filter((x) => {
        return x.name.trim().toLowerCase().includes(searchQuery);
    });
    renderEventsCard(searchEvents);
});

const sortSelect = document.querySelector("#sortDate")
sortSelect.addEventListener("change", function () {
    if (this.value === "New") {
        let sortedEvents = [...apiResponseEvents.data].sort((a, b) =>
            new Date(a.dateTime) - new Date(b.dateTime)
        );
        renderEventsCard(sortedEvents);
    } else if (this.value === "Old") {
        let sortedEvents = [...apiResponseEvents.data].sort((a, b) =>
            new Date(b.dateTime) - new Date(a.dateTime)
        );
        renderEventsCard(sortedEvents);
    } else {
        renderEventsCard(apiResponseEvents.data);
    }
});

const priceSelect = document.querySelector("#priceSort")
priceSelect.addEventListener("change", function (e) {
    if (this.value === "high") {
        let sortedPrice = [...apiResponseEvents.data].sort((a, b) => a.price - b.price)
        renderEventsCard(sortedPrice)
    }
    else if (this.value === "low") {
        let sortedPrice = [...apiResponseEvents.data].sort((a, b) =>
            b.price - a.price)
        renderEventsCard(sortedPrice)
    }
    else {
        renderEventsCard(apiResponseEvents.data)
    }
})
