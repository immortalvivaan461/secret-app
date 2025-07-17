
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rePasswordInput = document.getElementById("re-password");
    const msg = document.getElementById("msg");

    form.addEventListener("submit", (e) => {
        msg.textContent = "";
        const email = emailInput.value;
        const pass = passwordInput.value;
        const repass = rePasswordInput.value;

        if (!isEmail(email)) {
            e.preventDefault();
            msg.textContent = "❌ Invalid email format.";
            msg.style.color = "red";
            return;
        }

        if (pass !== repass) {
            e.preventDefault();
            msg.textContent = "❌ Passwords do not match.";
            msg.style.color = "red";
            return;
        }

        msg.textContent = "✅ All good!";
        msg.style.color = "green";
    });

    function isEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("togglePassword");
    const password = document.getElementById("password");

    toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.textContent = type === "password" ? "Show" : "Hide";
    });
});

