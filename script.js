import { db, ref, set, get, onValue } from "./firebase-config.js";

const optionsContainer = document.getElementById("options");

// Default poll options
const pollOptions = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"];

// Display options dynamically
function renderOptions() {
    optionsContainer.innerHTML = "";
    pollOptions.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => vote(index);
        optionsContainer.appendChild(btn);
    });
}

// Function to vote
function vote(optionIndex) {
    const voteRef = ref(db, "votes/" + optionIndex);
    get(voteRef).then((snapshot) => {
        let currentVotes = snapshot.exists() ? snapshot.val() : 0;
        set(voteRef, currentVotes + 1);
    });
}

// Listen for vote updates
onValue(ref(db, "votes"), (snapshot) => {
    if (snapshot.exists()) {
        let votes = snapshot.val();
        console.log("Votes updated:", votes);
    }
});

// Set timer
function setTimer(seconds) {
    if (seconds === 0) return alert("Unlimited voting enabled!");
    setTimeout(() => alert("Voting time is over!"), seconds * 1000);
}

// Reset poll
function resetPoll() {
    set(ref(db, "votes"), null);
    alert("Poll reset!");
}

renderOptions();qr