const pswdBtn = document.getElementById("pswdBtn");
pswdBtn.addEventListener("click", function () {
    const pswdInput = document.getElementById("account_password");
    const type = pswdInput.getAttribute("type");
    if (type == "password") {
        pswdInput.setAttribute("type", "text");
        pswdBtn.innerText = "Hide Password";
    } else {
        pswdInput.setAttribute("type", "password");
        pswdBtn.innerText = "Show Password";
    }
});