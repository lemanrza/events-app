import controller from "../services/request.js";
import { endpoints } from "../services/api.js";

document.addEventListener("DOMContentLoaded", async function () {
    const usersContainer = document.querySelector(".users-container");

    async function fetchUsers() {
            const response = await controller.getAll(endpoints.users);
            const users = response.data;
            renderUsers(users);
    }

    function renderUsers(users) {
        usersContainer.innerHTML = "";
        users.forEach(user => {
            usersContainer.innerHTML += `
                <div class="user-card" data-id="${user.id}">
                    <div class="user-image">
                        <img src="${user.profilePictureURL || 'path/to/default-avatar.png'}" alt="User Profile">
                    </div>
                    <div class="user-details">
                        <h3>${user.username}</h3>
                        <p class="email">${user.email}</p>
                        <p class="created-at">Created: ${new Date(user.accountCreationDate || user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="user-actions">
                        <button class="delete-btn" data-id="${user.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
        });

        attachDeleteEventListeners();
    }

    function attachDeleteEventListeners() {
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async function () {
                const userId = this.getAttribute("data-id");

                    const confirmDelete = confirm("Are you sure you want to delete this user?");
                    if (!confirmDelete) return;

                    await controller.deleteOne(endpoints.users, userId);
                    document.querySelector(`.user-card[data-id="${userId}"]`).remove();
                
            });
        });
    }

    fetchUsers();
});
