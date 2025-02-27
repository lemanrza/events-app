// const changePswdBtn = document.querySelector(".change-password-button");
// const passwordModal = document.querySelector("#passwordModal");
// const cancelButton = document.querySelector(".cancel-button");

// import { endpoints } from "../services/api.js";
// import controller from "../services/request.js";
// changePswdBtn.addEventListener("click", function () {
//     passwordModal.classList.add("show");
// });

// cancelButton.addEventListener("click", function () {
//     passwordModal.classList.remove("show");
// });

// window.addEventListener("DOMContentLoaded", async function () {
//     const userId = JSON.parse(this.localStorage.getItem("userId"))
//     const apiResponse = await controller.getAll(endpoints.users)
//     if (userId) {
//         const checkUser = apiResponse.data.find((x) => x.id == userId)
//         if (!checkUser) {
//             this.window.location.href = "/login.html"
//         }
//     }
// })

import Swal from "sweetalert2";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

const changePswdBtn = document.querySelector(".change-password-button");
const passwordModal = document.querySelector("#passwordModal");
const cancelButton = document.querySelector(".cancel-button");
const saveChangesBtn = document.querySelector(".save-button");
const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#username");
const fullNameInput = document.querySelector("#fullName");

window.addEventListener("DOMContentLoaded", function () {
    const userId = JSON.parse(localStorage.getItem("userId"));

    if (!userId) {
        window.location.href = "/login.html";
        return;
    }

    controller.getAll(endpoints.users)
        .then((apiResponse) => {
            const checkUser = apiResponse.data.find((x) => x.id == userId);
            if (!checkUser) {
                window.location.href = "/login.html";
                return;
            }

            emailInput.value = checkUser.email;
            usernameInput.value = checkUser.username;
            fullNameInput.value = checkUser.fullName;
        })
        .catch((error) => console.error("Error fetching user data:", error));
});

saveChangesBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem("userId"));
    const updatedUser = {
        email: emailInput.value,
        username: usernameInput.value,
        fullName: fullNameInput.value,
    };

    controller.updateOne(endpoints.users, updatedUser, userId)
        .then((result) => {
            console.log("User updated:", result);
            Swal.fire({
                title: "Your profile has been updated successfully!",
                icon: "success"
              });
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            Swal.fire({
                title: "Failed to update profile.",
                icon: "error"
              });
        });
});

changePswdBtn.addEventListener("click", function () {
    passwordModal.classList.add("show");
});

cancelButton.addEventListener("click", function () {
    passwordModal.classList.remove("show");
});

document.querySelector(".password-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const currentPassword = document.querySelector("#currentPassword").value;
    const newPassword = document.querySelector("#newPassword").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const userId = JSON.parse(localStorage.getItem("userId"));

    controller.getAll(endpoints.users)
        .then((apiResponse) => {
            const checkUser = apiResponse.data.find((x) => x.id == userId);
            if (!checkUser) {
                alert("User not found!");
                return;
            }

           else if (checkUser.password !== currentPassword) {
                Swal.fire({
                    title: "Current password is incorrect!",
                    icon: "error"
                  });
                return;
            }

           else if (newPassword !== confirmPassword) {
                Swal.fire({
                    title: "New password and confirm password do not match!",
                    icon: "error"
                  });
                  
                return;
            }

            const updatedUser = { password: newPassword };
            controller.updateOne(endpoints.users, updatedUser, userId)
                .then(() => {
                    Swal.fire({
                        title: "Password updated successfully!",
                        icon: "success"
                      });
                    passwordModal.classList.remove("show");
                })
                .catch((error) => {
                    console.error("Error updating password:", error);
                    alert("Failed to update password.");
                });
        })
        .catch((error) => console.error("Error fetching user data:", error));
});
