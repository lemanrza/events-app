const changePswdBtn = document.querySelector(".change-password-button");
const passwordModal = document.querySelector("#passwordModal");
const cancelButton = document.querySelector(".cancel-button");

import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
changePswdBtn.addEventListener("click", function () {
    passwordModal.classList.add("show");
});

cancelButton.addEventListener("click", function () {
    passwordModal.classList.remove("show");
});

window.addEventListener("DOMContentLoaded", async function () {
    const userId = JSON.parse(this.localStorage.getItem("userId"))
    const apiResponse = await controller.getAll(endpoints.users)
    if (userId) {
        const checkUser = apiResponse.data.find((x) => x.id == userId)
        if (!checkUser) {
            this.window.location.href = "/login.html"
        }
    }
})