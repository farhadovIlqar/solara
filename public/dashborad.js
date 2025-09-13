const welcomeElement = document.getElementById("welcome");

fetch("/api/user")
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            welcomeElement.textContent = `Hə girdin nə gözlüyürsən`;
        } else {
            welcomeElement.textContent = "Welcome guest";
        }
    });