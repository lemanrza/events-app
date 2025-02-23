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
    if(checkValidUser){
        Swal.fire({
            title: "Welcome Back",
            icon: "success"
          });
          localStorage.setItem("userId", JSON.stringify(checkValidUser.id))
          window.location.href="/index.html"
    }
    else {
        Swal.fire({
            title: "Email or password is incorrect",
            icon: "error"
          });
    }
})