// import controller from "../services/request.js";
// import { endpoints } from "../services/api.js";
// import Swal from "sweetalert2";

// const tbody = document.querySelector(".events-table tbody");

// async function getAll() {
//     const userId = JSON.parse(localStorage.getItem("userId"));

//     if (!userId) {
//         window.location.href = "/index.html";
//         return;
//     }
//     try {
//         const res = await controller.getAll(endpoints.events);
//         const events = res.data;

//         tbody.innerHTML = "";

//         events.forEach((event) => {
//             tbody.innerHTML += `
//             <tr data-id="${event.id}">
//                 <td>${event.id}</td>
//                 <td class="event-photo">
//                     <img src="${event.posterURL}" alt="Event Photo">
//                 </td>
//                 <td class="eventName">${event.name}</td>
//                 <td class="event-date">${event.dateTime}</td>
//                 <td>${event.venueName}</td>
//                  <td>${event.price}</td>

//                 <td class="ticket-status">
//                     <div class="status-info">
//                         <span class="sold">Sold: ${event.soldTickets}</span>
//                         <span class="available">Available: ${event.ticketsAvailable}</span>
//                     </div>
//                     <div class="progress-bar">
//                         <div class="progress" style="width: ${(event.soldTickets / (event.soldTickets + event.ticketsAvailable)) * 100}%"></div>
//                     </div>
//                 </td>
//                 <td class="actions">
//                     <button class="edit-btn" data-id="${event.id}">
//                         <i class="fas fa-edit"></i> Edit
//                     </button>
//                     <button class="delete-btn" data-id="${event.id}">
//                         <i class="fas fa-trash"></i> Delete
//                     </button>
//                 </td>
//             </tr>`;
//         });

//         attachDeleteEventListeners();
//         attachEditEventListeners();
//     } catch (error) {
//         console.error("Error fetching events:", error);
//     }
// }

// function attachEditEventListeners() {
//     document.querySelectorAll(".edit-btn").forEach((btn) => {
//         btn.addEventListener("click", async () => {
//             const id = btn.getAttribute("data-id");

//             try {
//                 const data = await controller.getByID(endpoints.events, id);
//                 const event = data.data;

//                 Swal.fire({
//                     title: "Edit Event",
//                     html: `
//                         <input id="swal-name" class="swal2-input" value="${event.name}" placeholder="Event Name">
//                         <input id="swal-organizer" class="swal2-input" value="${event.organizer}" placeholder="Organizer">
//                         <input id="swal-description" class="swal2-input" value="${event.description}" placeholder="Description">
//                         <input id="swal-price" class="swal2-input" type="number" value="${event.price}" placeholder="Price">
//                         <input id="swal-category" class="swal2-input" value="${event.category}" placeholder="Category">
//                         <input id="swal-posterURL" class="swal2-input" value="${event.posterURL}" placeholder="Poster URL">
//                     `,
//                     showCancelButton: true,
//                     confirmButtonText: "Save",
//                     cancelButtonText: "Cancel",
//                     preConfirm: async () => {
//                         const updatedEvent = {
//                             name: document.getElementById("swal-name").value,
//                             organizer: document.getElementById("swal-organizer").value,
//                             description: document.getElementById("swal-description").value,
//                             price: parseFloat(document.getElementById("swal-price").value),
//                             category: document.getElementById("swal-category").value,
//                             posterURL: document.getElementById("swal-posterURL").value,
//                         };

//                         try {
//                             const result = await controller.updateOne(endpoints.events, updatedEvent, id);
//                             console.log("Event updated:", result);
//                             await getAll();
//                             Swal.fire("Updated!", "The event has been updated.", "success");
//                         } catch (error) {
//                             console.error("Error updating event:", error);
//                             Swal.fire("Error!", "Failed to update the event.", "error");
//                         }
//                     }
//                 });

//             } catch (error) {
//                 console.error("Error fetching event data:", error);
//             }
//         });
//     });
// }

// function attachDeleteEventListeners() {
//     document.querySelectorAll(".delete-btn").forEach((btn) => {
//         btn.addEventListener("click", async () => {
//             const id = btn.getAttribute("data-id");

//             Swal.fire({
//                 title: "Are you sure?",
//                 text: "You won't be able to revert this!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes, delete it!",
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {
//                         const res = await controller.deleteOne(endpoints.events, id);

//                         if (!res.error) {
//                             document.querySelector(`tr[data-id="${id}"]`).remove();
//                             Swal.fire("Deleted!", "Your event has been deleted.", "success");
//                         } else {
//                             throw new Error("Delete request failed");
//                         }
//                     } catch (error) {
//                         console.error("Error deleting event:", error);
//                         Swal.fire("Error!", "Something went wrong while deleting the event.", "error");
//                     }
//                 }
//             });
//         });
//     });
// }

// window.addEventListener("DOMContentLoaded", getAll);
import controller from "../services/request.js";
import { endpoints } from "../services/api.js";
import Swal from "sweetalert2";

const tbody = document.querySelector(".events-table tbody");

// **Admin yoxlaması və event-ləri gətirmək**
function getAll() {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const userRole = localStorage.getItem("userRole"); // Role yoxlamaq üçün

    if (!userId || userRole !== "admin") {
        window.location.href = "/index.html";
        return;
    }

    controller.getAll(endpoints.events)
        .then((res) => {
            const events = res.data;
            tbody.innerHTML = "";

            events.forEach((event) => {
                tbody.innerHTML += `
                <tr data-id="${event.id}">
                    <td>${event.id}</td>
                    <td class="event-photo">
                        <img src="${event.posterURL}" alt="Event Photo">
                    </td>
                    <td class="eventName">${event.name}</td>
                    <td class="event-date">${event.dateTime}</td>
                    <td>${event.venueName}</td>
                    <td>${event.price}</td>
                    <td class="ticket-status">
                        <div class="status-info">
                            <span class="sold">Sold: ${event.soldTickets}</span>
                            <span class="available">Available: ${event.ticketsAvailable}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${(event.soldTickets / (event.soldTickets + event.ticketsAvailable)) * 100}%"></div>
                        </div>
                    </td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${event.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="delete-btn" data-id="${event.id}"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                </tr>`;
            });

            attachDeleteEventListeners();
            attachEditEventListeners();
        })
        .catch((error) => console.error("Error fetching events:", error));
}

// **Edit düymələrinə event listener əlavə et**
function attachEditEventListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");

            controller.getByID(endpoints.events, id)
                .then((data) => {
                    const event = data.data;

                    Swal.fire({
                        title: "Edit Event",
                        html: `
                            <input id="swal-name" class="swal2-input" value="${event.name}" placeholder="Event Name">
                            <input id="swal-organizer" class="swal2-input" value="${event.organizer}" placeholder="Organizer">
                            <input id="swal-description" class="swal2-input" value="${event.description}" placeholder="Description">
                            <input id="swal-price" class="swal2-input" type="number" value="${event.price}" placeholder="Price">
                            <input id="swal-category" class="swal2-input" value="${event.category}" placeholder="Category">
                            <input id="swal-posterURL" class="swal2-input" value="${event.posterURL}" placeholder="Poster URL">
                        `,
                        showCancelButton: true,
                        confirmButtonText: "Save",
                        cancelButtonText: "Cancel",
                        preConfirm: () => {
                            const updatedEvent = {
                                name: document.getElementById("swal-name").value,
                                organizer: document.getElementById("swal-organizer").value,
                                description: document.getElementById("swal-description").value,
                                price: parseFloat(document.getElementById("swal-price").value),
                                category: document.getElementById("swal-category").value,
                                posterURL: document.getElementById("swal-posterURL").value,
                            };

                            return controller.updateOne(endpoints.events, updatedEvent, id);
                        }
                    })
                        .then(() => {
                            getAll();
                            Swal.fire("Updated!", "The event has been updated.", "success");
                        })
                        .catch((error) => {
                            console.error("Error updating event:", error);
                            Swal.fire("Error!", "Failed to update the event.", "error");
                        });
                })
                .catch((error) => console.error("Error fetching event data:", error));
        });
    });
}

// **Delete düymələrinə event listener əlavə et**
function attachDeleteEventListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        return controller.deleteOne(endpoints.events, id);
                    }
                })
                .then((res) => {
                    if (res && !res.error) {
                        document.querySelector(`tr[data-id="${id}"]`).remove();
                        Swal.fire("Deleted!", "Your event has been deleted.", "success");
                    } else {
                        throw new Error("Delete request failed");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting event:", error);
                    Swal.fire("Error!", "Something went wrong while deleting the event.", "error");
                });
        });
    });
}

// **Səhifə yüklənəndə event-ləri göstər**
window.addEventListener("DOMContentLoaded", getAll);
