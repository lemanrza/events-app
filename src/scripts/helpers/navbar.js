import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from 'sweetalert2'

const loginNavbar = document.querySelector(".register")
window.addEventListener("DOMContentLoaded", async function (e) {
    e.preventDefault()
    const userId = JSON.parse(this.localStorage.getItem("userId"))
    const apiUsers = await controller.getAll(endpoints.users)
    const checkValidLogin = apiUsers.data.find((x) => x.id == userId)
    if (checkValidLogin) {
        loginNavbar.innerHTML = ""
        loginNavbar.innerHTML = `
        <a href="./basket.html"><i class="fa-solid fa-cart-shopping"></i></a>
        <a href="./favorites.html"><i class="fa-regular fa-heart"></i></a>
        <a href="./user.html" id="loginNavbar">
            <img src="${checkValidLogin.profileImg}" alt="" 
                style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover; border: 2px solid #ccc; transition: transform 0.3s ease;"
                onmouseover="this.style.transform='scale(1.1)'" 
                onmouseout="this.style.transform='scale(1)'">
        </a>
        <button id="log-out" 
            style="font-size: 18px; border: none; color: #f8f8f8; padding: 25px; background-color: #e74c3c; padding: 5px 10px; cursor: pointer; border-radius: 5px; 
            transition: background-color 0.3s ease, transform 0.2s ease;" 
            onmouseover="this.style.backgroundColor='#c0392b'; this.style.transform='scale(1.05)'" 
            onmouseout="this.style.backgroundColor='#e74c3c'; this.style.transform='scale(1)'">
            Log Out
        </button>
    `;

        const logOutBtn = this.document.querySelector("#log-out")
        logOutBtn.addEventListener("click", function () {
            Swal.fire({
                title: "Are you sure to logout?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, logged out!",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("userId");
                    loginNavbar.innerHTML = "";
                    loginNavbar.innerHTML += `
                      <a href="./basket.html"><i class="fa-solid fa-cart-shopping"></i></a>
            <a href="./favorites.html"><i class="fa-regular fa-heart"></i></a>
            <a href="./login.html" id="loginNavbar"><i class="fa-regular fa-user"></i>
            </a>
                    `;
                    Swal.fire({
                        title: "Logged Out!",
                        text: "user has been logged out.",
                        icon: "success",
                    });
                    setTimeout(() => {
                        window.location.href = "/index.html"
                    }, 1500);
                }
            });

        })
    }
})