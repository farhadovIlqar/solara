const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/school")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ DB error:", err));

const userSchema = new mongoose.Schema({
    mail: String,
    password: String
}, { collection: "solara" });

const User = mongoose.model("solara", userSchema, "solara");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = new User({
            mail: email,       
            password: password  
        });

        await user.save();
        res.json({success: true})
    } catch (err) {
        res.status(500).send("❌ Error: " + err.message);
    }
});

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001"));
