import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import { User } from "../classes/user.js";

const registerForm = document.querySelector(".registerForm")
const registerInputs = {
    fullName: document.querySelector(".registerFullName"),
    username: document.querySelector(".registerUsername"),
    email: document.querySelector(".registerEmail"),
    password: document.querySelector(".registerPassword"),
    confirmPassword: document.querySelector(".registerConfirmPassword")
}
registerForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    if (registerInputs.password.value !== registerInputs.confirmPassword.value) {
        Swal.fire({
            title: "Passwords do not match!",
            position: "top-end",
            icon: "error",
            timer: 1500
        });
        return;
    } 
    const apiResponse = await controller.getAll(endpoints.users)
    const duplicateUser = apiResponse.data.find((x) =>
        x.email == registerInputs.email.value || x.username == registerInputs.username.value
    )

    if (duplicateUser) {
        Swal.fire({
            title: "Email or username already in use!",
            position: "top-end",
            icon: "error",
            timer: 1500
        });
        return;
    }
    else {
        const newUser = new User(
            registerInputs.fullName.value.trim(),
            registerInputs.username.value.trim(),
            registerInputs.email.value.trim(),
            registerInputs.password.value.trim())
        const postResponse = await controller.post(endpoints.users, newUser)
        if (postResponse.data) {
            Swal.fire({
                title: "User registered successfully!",
                position: "top-end",
                icon: "success",
                timer: 1500
            });
            setTimeout(() => {
                window.location.href = "/login.html"
            }, 1500);
        }
        else {
            Swal.fire({
                title: "Registration failed. Please try again!",
                position: "top-end",
                icon: "error",
                timer: 1500
            });
        }
    }

})