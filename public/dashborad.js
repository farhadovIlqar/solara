const welcomeElement = document.getElementById("welcome");

fetch("/api/user")
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            welcomeElement.textContent = `Welcome ${data.email}`;
        } else {
            welcomeElement.textContent = "Welcome guest";
        }
    });