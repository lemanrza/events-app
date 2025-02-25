const id = new URLSearchParams(window.location.search).get("id");

import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async function () {
    const apiEventsResponse = await controller.getByID(endpoints.events, id)
    if (apiEventsResponse.data) {
        const coverImageHTML = document.querySelector("#cover-image");
        coverImageHTML.src = apiEventsResponse.data.posterURL;
        coverImageHTML.setAttribute("alt", apiEventsResponse.data.name);
        coverImageHTML.setAttribute("title", apiEventsResponse.data.name);

        const eventDate = this.documentElement.querySelector("#eventDateTime")
        eventDate.textContent = apiEventsResponse.data.dateTime

        const ageRestriction = this.documentElement.querySelector("#ageRestriction")
        ageRestriction.textContent = apiEventsResponse.data.ageRestriction

        const eventCategory = this.documentElement.querySelector("#eventCategory")
        eventCategory.textContent = apiEventsResponse.data.category

        const duration=this.documentElement.querySelector("#duration")
        duration.textContent=apiEventsResponse.data.duration

        const venueName = this.documentElement.querySelector("#venueName")
        venueName.textContent = apiEventsResponse.data.venueName

        const venueAddress = this.documentElement.querySelector("#venueAddress")
        venueAddress.textContent = apiEventsResponse.data.venueAddress

        const organizer = this.documentElement.querySelector("#organizerName")
        organizer.textContent = apiEventsResponse.data.organizer

        const eventDescription = this.documentElement.querySelector("#eventDescription")
        eventDescription.textContent = apiEventsResponse.data.description

        const ticketPrice = this.documentElement.querySelector("#ticketPrice")
        ticketPrice.textContent = apiEventsResponse.data.price

    }
    else {
        window.location.href="/event.html"
    }
})