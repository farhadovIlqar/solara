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


create.addEventListener('click', () => {
    if (create.textContent == "Create now") {
        create.textContent = "Sign in"
        main.style.flexDirection = "row-reverse"
        sign_in.textContent = "Sign up"
        signTextMain.textContent = "Already have an account ?"
        pass.style.display = "flex"
        sign_btn.textContent = "Sign up"
        options.style.visibility = "hidden"
    }
    else if (create.textContent == "Sign in") {
        create.textContent = "Create now"
        main.style.flexDirection = "row"
        sign_in.textContent = "Sign in"
        signTextMain.textContent = "Don't have an account ?"
        pass.style.display = "none"
        sign_btn.textContent = "Sign in"
        options.style.visibility = "visible"

    }
})

document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // səhifənin dəyişməsinin qarşısını alır

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            // inputları sıfırla
            this.reset();
            alert("User saved to MongoDB!");
        } else {
            alert("Xəta baş verdi");
        }
    } catch (err) {
        console.error(err);
        alert("Serverə qoşulmaq mümkün olmadı");
    }
});
