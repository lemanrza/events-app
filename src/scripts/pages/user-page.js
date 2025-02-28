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

window.addEventListener("DOMContentLoaded", async function () {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(user => user.id == String(userId));

    // if (!userId) {
    //     window.location.href = "/login.html";
    //     return;
    // }
    // else if(currentUser.role==="admin"){
    //     this.window.location.href= "/admin.html"
    // }

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
    const ticketContainer = document.querySelector(".ticketTableBody");

    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    let events = [];
    const response = await controller.getAll(endpoints.events);
    events = response.data || [];
    let userTickets = tickets.filter(ticket => ticket.userId == userId);


    ticketContainer.innerHTML = ""; 

    if (userTickets.length === 0) {
        ticketContainer.innerHTML = "<p>No tickets found.</p>";
        return;
    }

    ticketContainer.innerHTML = `
                
                        ${userTickets.map(ticket => {
        let event = events.find(e => e.id == ticket.eventId) || { name: "Unknown Event" };
        return `
                            <tr>
                                <td>${ticket.ticketCode}</td>
                                <td>${event.name}</td>
                                <td>${ticket.price}</td>
                                <td>${new Date(ticket.purchaseDate).toLocaleString()}</td>
                            </tr>
                            `;
    }).join('')}
        
            `;
});
imageUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const newProfileImage = e.target.result;
            profileImage.src = newProfileImage;

            const userId = JSON.parse(localStorage.getItem("userId"));
            localStorage.setItem(`profileImg-${userId}`, newProfileImage);

                await controller.updateOne(endpoints.users, { profilePictureURL: newProfileImage }, userId);
                console.log("Profile picture updated in API successfully!");
        };
        reader.readAsDataURL(file);
    }
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




// import Swal from "sweetalert2";
// import { endpoints } from "../services/api.js";
// import controller from "../services/request.js";

// const changePswdBtn = document.querySelector(".change-password-button");
// const passwordModal = document.querySelector("#passwordModal");
// const cancelButton = document.querySelector(".cancel-button");
// const saveChangesBtn = document.querySelector(".save-button");
// const emailInput = document.querySelector("#email");
// const usernameInput = document.querySelector("#username");
// const fullNameInput = document.querySelector("#fullName");
// const profileImage = document.querySelector("#profileImage");
// const imageUpload = document.querySelector("#imageUpload");

// window.addEventListener("DOMContentLoaded", async function () {
//     const userId = JSON.parse(localStorage.getItem("userId"));
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const currentUser = users.find(user => user.id == String(userId));

//     // if (!currentUser) {
//     //     window.location.href = "/login.html";
//     //     return;
//     // }

//     // Load user data into inputs
//     emailInput.value = currentUser.email;
//     usernameInput.value = currentUser.username;
//     fullNameInput.value = currentUser.fullName;

//     // Load profile image from API or localStorage
//     profileImage.src = currentUser.profilePictureURL || localStorage.getItem(`profileImg-${userId}`) || "./src/assets/images/user-transparent.jpg";

//     // Load tickets into history
//     loadUserTickets(userId);
// });

// // 📌 **Profile Image Upload**
// imageUpload.addEventListener("change", function () {
//     const file = this.files[0];

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = async function (e) {
//             const newProfileImage = e.target.result;
//             profileImage.src = newProfileImage; // Update UI immediately

//             // Save image in localStorage
//             const userId = JSON.parse(localStorage.getItem("userId"));
//             localStorage.setItem(`profileImg-${userId}`, newProfileImage);

//             // Send PATCH request to update the image in the API
//             try {
//                 await controller.updateOne(endpoints.users, { profilePictureURL: newProfileImage }, userId);
//                 console.log("Profile picture updated in API successfully!");
//             } catch (error) {
//                 console.error("Failed to update profile picture in API:", error);
//             }
//         };
//         reader.readAsDataURL(file);
//     }
// });


// // 📌 **Load User Tickets**
// async function loadUserTickets(userId) {
//     const ticketContainer = document.querySelector(".ticketTableBody");
//     let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

//     let events = [];
//     const response = await controller.getAll(endpoints.events);
//     events = response.data || [];
//     let userTickets = tickets.filter(ticket => ticket.userId == userId);

//     ticketContainer.innerHTML = userTickets.length
//         ? userTickets.map(ticket => {
//             let event = events.find(e => e.id == ticket.eventId) || { name: "Unknown Event" };
//             return `
//                 <tr>
//                     <td>${ticket.ticketCode}</td>
//                     <td>${event.name}</td>
//                     <td>${ticket.price} ₼</td>
//                     <td>${new Date(ticket.purchaseDate).toLocaleString()}</td>
//                 </tr>`;
//         }).join('')
//         : "<p>No tickets found.</p>";
// }

// // 📌 **Save Profile Changes**
// saveChangesBtn.addEventListener("click", function (e) {
//     e.preventDefault();

//     const userId = JSON.parse(localStorage.getItem("userId"));
//     const updatedUser = {
//         email: emailInput.value,
//         username: usernameInput.value,
//         fullName: fullNameInput.value,
//         profilePictureURL: profileImage.src
//     };

//     controller.updateOne(endpoints.users, updatedUser, userId)
//         .then(() => Swal.fire({ title: "Profile updated!", icon: "success" }))
//         .catch(() => Swal.fire({ title: "Failed to update profile.", icon: "error" }));
// });

// // 📌 **Password Change**
// document.querySelector(".password-form").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const currentPassword = document.querySelector("#currentPassword").value;
//     const newPassword = document.querySelector("#newPassword").value;
//     const confirmPassword = document.querySelector("#confirmPassword").value;
//     const userId = JSON.parse(localStorage.getItem("userId"));

//     controller.getAll(endpoints.users)
//         .then((apiResponse) => {
//             const checkUser = apiResponse.data.find((x) => x.id == userId);
//             if (!checkUser) {
//                 Swal.fire({ title: "User not found!", icon: "error" });
//                 return;
//             }
//             if (checkUser.password !== currentPassword) {
//                 Swal.fire({ title: "Incorrect current password!", icon: "error" });
//                 return;
//             }
//             if (newPassword !== confirmPassword) {
//                 Swal.fire({ title: "Passwords do not match!", icon: "error" });
//                 return;
//             }

//             controller.updateOne(endpoints.users, { password: newPassword }, userId)
//                 .then(() => {
//                     Swal.fire({ title: "Password updated successfully!", icon: "success" });
//                     passwordModal.classList.remove("show");
//                 })
//                 .catch(() => Swal.fire({ title: "Failed to update password.", icon: "error" }));
//         });
// });

// // 📌 **Show/Hide Password Modal**
// changePswdBtn.addEventListener("click", () => passwordModal.classList.add("show"));
// cancelButton.addEventListener("click", () => passwordModal.classList.remove("show"));
