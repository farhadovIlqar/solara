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
let confirmPasswordInput = document.getElementById('confirmPassword')
let passwordInput = document.getElementById('password')
let form = document.getElementById('signupForm')
let emailInput = document.getElementById('email')
let msg = document.getElementById('invalid-msg')
let msg_mail = document.getElementById('invalid-msg-mail')
let msg_pass = document.getElementById('invalid-msg-pass')

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
        eye.textContent = "Show password"
        passwordInput.type = "password"
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
        eye.textContent = "Show password"
        passwordInput.type = "password"
        console.log(form.action)
    }
})

form.addEventListener("submit", async function (e) {
    e.preventDefault()

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries())

    delete data.confirmPassword;

    if (form.action.includes("signup") && passwordInput.value !== confirmPasswordInput.value) {
        passwordInput.value = ""
        confirmPasswordInput.value = ""
        msg.style.display = "block"
        confirmPasswordInput.style.border = "2px solid red"
        setTimeout(() => {
            msg.style.display = "none"
            confirmPasswordInput.style.border = "2px solid gray"
        }, 1500)
        return;
    }



    try {
        const res = await fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (form.action.includes("signup")) {
            if (result.success) {
                console.log("User registered successfully!");
                this.reset();
                window.location.reload()
            }
            else {
                console.log(result.message || "Error");
                msg_mail.textContent = "Email already exists"
                emailInput.style.border = "2px solid red"
                msg_mail.style.display = "block"
                setTimeout(() => {
                    emailInput.style.border = "2px solid gray"
                    msg_mail.style.display = "none"
                }, 1500)
                this.reset()
            }
        }

        if (form.action.includes("forget")) {
            if (result.success) {
                emailInput.style.border = "2px solid green"
                label.textContent = "Password reset link sent successfully! Please check your email."
                setTimeout(() => {
                    emailInput.style.border = "2px solid gray"
                    label.textContent = "Please enter your email address to receive your password reset link."
                }, 1500)
                this.reset();
            }
            else {
                console.log("Email not found!");
                emailInput.style.border = "2px solid red"
                label.textContent = "Email not found!"
                setTimeout(() => {
                    emailInput.style.border = "2px solid gray"
                    label.textContent = "Please enter your email address to receive your password reset link."
                }, 1500)
                this.reset();
            }
        }

        if (form.action.includes("login")) {
            if (result.success) {
                console.log("User logged in successfully!");
                this.reset();
                window.location.href = "/dashboard.html"
            }
            else {
                console.log(result.message || "Error");
                passwordInput.style.border = "2px solid red"
                emailInput.style.border = "2px solid red"
                msg_mail.style.display = "block"
                msg_pass.style.display = "block"
                msg_mail.textContent = "Invalid email or password"
                msg_pass.textContent = "Invalid email or password"  
                
                setTimeout(() => {
                    msg_mail.style.display = "none"
                    msg_pass.style.display = "none"
                    passwordInput.style.border = "2px solid gray"
                    emailInput.style.border = "2px solid gray"
                }, 1500)
                this.reset()
            }
        }
    } catch (err) {
        console.error(err);
        console.log("Can't connect server")
    }
});
