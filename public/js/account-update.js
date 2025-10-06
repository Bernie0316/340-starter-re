const accountForm = document.querySelector("#updateAccountForm")
    accountForm.addEventListener("change", function () {
        const updateBtn = document.querySelector("button")
        updateBtn.removeAttribute("disabled")
    })

const passwordForm = document.querySelector("#updatePasswordForm")
    passwordForm.addEventListener("change", function () {
        const updateBtn = document.querySelector("button")
        updateBtn.removeAttribute("disabled")
    })