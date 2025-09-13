const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/school")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("DB error:", err));

const userSchema = new mongoose.Schema({
    mail: String,
    password: String
}, { collection: "solara" });

const User = mongoose.model("solara", userSchema, "solara");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/signup", async (req, res) => {
    try {

        const { mail, password } = req.body;

        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "This mail already exist"
            });
        }

        const user = new User({
            mail: mail,
            password: password
        });

        await user.save();
        res.json({ success: true })
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ mail, password });
        if (!user) {
            passwordInput.style.border = "2px solid red"
            setTimeout(() => {
                passwordInput.style.border = "2px solid gray"
            }, 1500)
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        req.session.userEmail = user.mail;

        res.json({ success: true, email: user.mail });
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post("/forget", async (req, res) => {
    const { mail } = req.body;

    try {
        const user = await User.findOne({ mail });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email not found!" });
        }

        res.json({ success: true, email: user.mail });
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ success: false, message: err.message });
    }
})

app.get("/api/user", (req, res) => {
    if (!req.session.userEmail) return res.json({ success: false });
    res.json({ success: true, email: req.session.userEmail });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));

