const changePswdBtn = document.querySelector(".change-password-button");
const passwordModal = document.querySelector("#passwordModal");
const cancelButton = document.querySelector(".cancel-button");

changePswdBtn.addEventListener("click", function () {
    passwordModal.classList.add("show");
});

cancelButton.addEventListener("click", function () {
    passwordModal.classList.remove("show");
});
