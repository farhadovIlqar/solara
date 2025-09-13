const frgt = document.getElementById('forgot')
const social = document.querySelector('.social')
const divider = document.querySelector('.divider')
const pass_section = document.querySelector('.password')
const login = document.querySelector('.login')
const h3 = document.createElement('h3')
const label = document.querySelector('.mail label')

frgt.addEventListener('click', () => {
    emailInput.value = ""
    passwordInput.removeAttribute('required')
    form.action = "/forget"
    social.style.display = "none"
    divider.style.display = "none"
    options.style.display = "none"
    sign_in_text.style.display = "none"
    pass_section.style.display = "none"
    sign_in.textContent = "Reset your password"
    sign_in.style.marginTop = "50px"
    sign_btn.textContent = "Send"
    label.textContent = "Please enter your email address to receive your password reset link."
    label.style.order = "1"
    form.style.justifyContent = "center"
    form.style.alignİtems = "center"
    form.style.gap = "20px"
})
