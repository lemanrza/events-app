// document.addEventListener("DOMContentLoaded", function () {
//     const favoriteList = document.getElementById("favorite-list");
//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//     favorites.forEach(event => {
//         favoriteList.innerHTML += `
//             <div class="event-favorite-card">
//             <div class="favorites-img">
//                <img src="${event.posterURL}" alt="${event.name}" class="event-img">
// </div>
//                 <div class="event-favorite-content">
//                     <h5 class="event-favorite-title">${event.name}</h5>
//                     <p class="event-venue">${event.venueAddress}</p>
//                     <span class="event-date">${event.dateTime}</span>
//                 </div>
//                 <div class="event-footer">
//                     <button class="delete-favorite" data-id="${event.id}">
//                         <i class="fa-solid fa-trash"></i>
//                     </button>
//                 </div>
//             </div>
//         `;
//     });

//     const deleteBtns = document.querySelectorAll(".delete-favorite");
//     deleteBtns.forEach((deleteBtn) => {
//         deleteBtn.addEventListener("click", function () {
//             const eventId = this.getAttribute("data-id");
//             let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//             favorites = favorites.filter(event => event.id !== eventId);
//             localStorage.setItem("favorites", JSON.stringify(favorites));
//             this.closest(".event-favorite-card").remove();
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const favoriteList = document.getElementById("favorite-list");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function renderFavorites() {
        favoriteList.innerHTML = ""; // Əvvəlki favoritləri təmizləyirik

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

    // Event-i favoritlərə əlavə etmək üçün funksiya
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

    // Əgər favorite düymələri varsa, onları dinamik olaraq əlavə edirik
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

