import { database } from "./firebase.js";
import { ref, push, set } from "firebase/database";

// ✅ Create Poll & Generate QR Code
function createPoll() {
    const question = document.getElementById("question").value;
    const options = document.querySelectorAll(".option");
    let pollData = {
        question: question,
        options: []
    };

    options.forEach((opt, index) => {
        if (opt.value.trim() !== "") {
            pollData.options.push({ text: opt.value, votes: 0 });
        }
    });

    const pollRef = push(ref(database, "polls"));
    set(pollRef, pollData).then(() => {
        const pollId = pollRef.key;
        const qrURL = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://your-username.github.io/poll-meter/poll.html?id=${pollId}`;
        document.getElementById("qrCode").innerHTML = `<img src="${qrURL}" />`;
    });
}
