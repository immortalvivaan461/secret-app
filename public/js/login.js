
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");

    if (toggleBtn && passwordField) {
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();

            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.textContent = "Hide";
            } else {
                passwordField.type = "password";
                this.textContent = "Show";
            }
        });
    }
});
