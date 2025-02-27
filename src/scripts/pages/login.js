import controller from "../services/request.js"
import { endpoints } from "../services/api.js"
const loginForm = document.querySelector(".loginForm")
const loginInputs = {
    email: document.querySelector(".loginEmail"),
    password: document.querySelector(".loginPassword")
}
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    const apiResponse = await controller.getAll(endpoints.users)
    const checkValidUser = apiResponse.data.find((x) => {
        return (
            x.email == loginInputs.email.value &&
            x.password == loginInputs.password.value
        )
    })

    if (checkValidUser) {
        Swal.fire({
            title: "Welcome Back",
            timer: 1500,
            icon: "success"
        });
        localStorage.setItem("userId", JSON.stringify(checkValidUser.id))
        setTimeout(() => {
            window.location.href = "/index.html"
        }, 1500);
        if (checkValidUser.role === "admin") {
            window.location.href = "./admin.html";
        }
    }

    else {
        Swal.fire({
            title: "Email or password is incorrect",
            icon: "error"
        });
    }
});

window.addEventListener("DOMContentLoaded", async function () {
    const userId = JSON.parse(this.localStorage.getItem("userId"))

    const apiResponse = await controller.getAll(endpoints.users)
    if (userId) {
        const checkUser = apiResponse.data.find((x) => x.id == userId)
        if (checkUser) {
            this.window.location.href = "/user.html"
        }
       else if ( userRole !== "admin") {
            window.location.href = "/login.html";
        }
        else if (checkUser.role === "admin") {
            this.window.location.href = "/admin.html";
        }
        else {
            this.window.location.href = "/login.html"
        }
    }
 
})