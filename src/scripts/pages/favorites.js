document.addEventListener("DOMContentLoaded", function () {
    const favoriteList = document.getElementById("favorite-list");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const userId = JSON.parse(localStorage.getItem("userId")); 
            if (!userId) {
                Swal.fire({
                    title: "You have to log in",
                    icon: "error"
                });
                window.location.href = "/login.html"
                return;
            }

    function renderFavorites() {
        favoriteList.innerHTML = ""; 

        favorites.forEach(event => {
            favoriteList.innerHTML += `
                <div class="event-favorite-card">
                    <div class="favorites-img">
                        <img src="${event.posterURL}" alt="${event.name}" class="event-img">
                    </div>
                    <div class="event-favorite-content">
                        <h5 class="event-favorite-title">${event.name}</h5>
                        <p class="event-venue">${event.venueAddress}</p>
                        <span class="event-date">${event.dateTime}</span>
                    </div>
                    <div class="event-footer">
                        <button class="delete-favorite" data-id="${event.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        attachDeleteListeners();
    }

    function attachDeleteListeners() {
        document.querySelectorAll(".delete-favorite").forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", function () {
                const eventId = this.getAttribute("data-id");
                favorites = favorites.filter(event => event.id !== eventId);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                renderFavorites();
            });
        });
    }

    renderFavorites();

    function addToFavorites(eventDetails) {
        let existingEvent = favorites.find(event => event.id === eventDetails.id);

        if (existingEvent) {
            Swal.fire({
                title: "Already in favorites!",
                icon: "info"
            });
            return;
        }

        favorites.push(eventDetails);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();

        Swal.fire({
            title: "Added to favorites!",
            icon: "success"
        });
    }

    document.querySelectorAll(".favorite-btn").forEach(button => {
        button.addEventListener("click", function () {
            const eventDetails = {
                id: this.getAttribute("data-id"),
                name: this.closest(".event-item").querySelector(".event-name").textContent,
                venueAddress: this.closest(".event-item").querySelector(".event-venue").textContent,
                dateTime: this.closest(".event-item").querySelector(".event-date").textContent,
                posterURL: this.closest(".event-item").querySelector(".event-img").src
            };
            addToFavorites(eventDetails);
        });
    });
});

