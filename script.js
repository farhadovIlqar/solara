let eye = document.getElementById('eye');
eye.addEventListener('click', function() {
    let passwordInput = document.querySelector('.password input');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eye.textContent = "Hide password";
    } else {
        passwordInput.type = "password";
        eye.textContent = "Show password";
    }
});
