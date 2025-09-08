let eye = document.getElementById('eye')
eye.addEventListener('click', function () {
    let passwordInput = document.querySelector('.password input')
    if (passwordInput.type === "password") {
        passwordInput.type = "text"
        eye.textContent = "Hide password"
    } else {
        passwordInput.type = "password"
        eye.textContent = "Show password"
    }
});

let create = document.getElementById('sign-up-link')
let sign_in = document.getElementById('sign-in')
let signTextMain = document.getElementById('signTextMain')
let sign_in_text = document.getElementById('sign-up')
let main = document.getElementsByTagName('main')[0]
let pass = document.getElementById('confirm-password-section')
let sign_btn = document.getElementById('sign-btn')
let options = document.querySelector('.options')
let confirmPasswordInput = document.getElementById('confirmPassword');
let passwordInput = document.getElementById('password');
let form = document.getElementById('signupForm')
let emailInput = document.getElementById('email');

create.addEventListener('click', () => {
    if (create.textContent == "Create now") {
        create.textContent = "Sign in"
        main.style.flexDirection = "row-reverse"
        sign_in.textContent = "Sign up"
        signTextMain.textContent = "Already have an account ?"
        pass.style.display = "flex"
        sign_btn.textContent = "Sign up"
        options.style.visibility = "hidden"
        emailInput.value = ""
        passwordInput.value = ""
        form.action = "/signup"
        console.log(form.action)
    }
    else if (create.textContent == "Sign in") {
        form.action = "/login"
        create.textContent = "Create now"
        main.style.flexDirection = "row"
        sign_in.textContent = "Sign in"
        signTextMain.textContent = "Don't have an account ?"
        pass.style.display = "none"
        emailInput.value = ""
        passwordInput.value = ""
        sign_btn.textContent = "Sign in"
        options.style.visibility = "visible"
        console.log(form.action)
    }
})

form.addEventListener("submit", async function (e) {
    e.preventDefault()

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries())

    delete data.confirmPassword;

    if (form.action.includes("signup") && passwordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match!");
        passwordInput.value = ""
        confirmPasswordInput.value = ""
        return;
    }

    try {
        console.log(form.action)
        const res = await fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
            if (form.action.includes("signup")) {
                alert("User registered successfully!");
                this.reset();
            } else {
                alert("Login successful!");
                window.location.href = "/dashboard.html";
            }
        } else {
            alert(result.message || "Error");
            this.reset()
        }
    } catch (err) {
        console.error(err);
        alert("Can't connect server")
    }
});
