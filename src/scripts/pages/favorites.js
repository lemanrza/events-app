document.addEventListener("DOMContentLoaded", function () {
    const favoriteList = document.getElementById("favorite-list");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach(event => {
        favoriteList.innerHTML += `
            <div class="event-card">
            <div class="favorites-img">
               <img src="${event.posterURL}" alt="${event.name}" class="event-img">
</div>
                <div class="event-content">
                    <h5 class="event-title">${event.name}</h5>
                    <p class="event-venue">${event.venueAddress}</p>
                    <span class="event-date">${event.dateTime}</span>
                </div>
                <div class="event-footer">
                    <button class="delete" data-id="${event.id}">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    });

    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", function () {
            const eventId = this.getAttribute("data-id");
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            favorites = favorites.filter(event => event.id !== eventId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            this.closest(".event-card").remove();
        });
    });
});
