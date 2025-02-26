// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAbH67CgYGYJv4FXrtWYKiWA8ACTXK5shE",
  authDomain: "pol-me.firebaseapp.com",
  databaseURL: "https://pol-me-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pol-me",
  storageBucket: "pol-me.firebasestorage.app",
  messagingSenderId: "447211103879",
  appId: "1:447211103879:web:2a9362f2470a10663aba22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Poll Setup
document.getElementById("add-option").addEventListener("click", () => {
    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.className = "poll-option";
    newInput.placeholder = `Option ${document.querySelectorAll(".poll-option").length + 1}`;
    document.getElementById("options-container").appendChild(newInput);
});

// Start Poll
document.getElementById("start-poll").addEventListener("click", () => {
    let question = document.getElementById("poll-question").value;
    let options = [...document.querySelectorAll(".poll-option")].map(input => input.value).filter(opt => opt.trim() !== "");

    if (!question || options.length < 2) {
        alert("Enter a question and at least 2 options!");
        return;
    }

    set(ref(db, "poll/"), { question, options, votes: {} });
    loadPoll();
});

// Load Poll
function loadPoll() {
    get(ref(db, "poll/")).then(snapshot => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            document.getElementById("question").innerText = data.question;
            document.getElementById("poll-container").style.display = "block";
            document.getElementById("poll-setup").style.display = "none";
            
            document.getElementById("options").innerHTML = "";
            data.options.forEach(option => {
                let button = document.createElement("button");
                button.innerText = option;
                button.classList.add("poll-button");
                button.onclick = () => vote(option);
                document.getElementById("options").appendChild(button);
            });
        }
    });
}

// Vote
function vote(option) {
    let voteRef = ref(db, "poll/votes/" + option);

    get(voteRef).then(snapshot => {
        let votes = snapshot.exists() ? snapshot.val() : 0;
        update(ref(db, "poll/votes/"), { [option]: votes + 1 });
    });

    alert("Vote submitted! Refresh to see results.");
}

// Update Results
function updateResults() {
    get(ref(db, "poll/votes/")).then(snapshot => {
        if (snapshot.exists()) {
            let votes = snapshot.val();
            let totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
            let maxVote = Math.max(...Object.values(votes));
            let minVote = Math.min(...Object.values(votes));

            document.querySelectorAll(".poll-button").forEach(button => {
                let option = button.innerText;
                let voteCount = votes[option] || 0;
                let percentage = (voteCount / totalVotes) * 100;

                button.style.backgroundColor = voteCount === maxVote ? "green" :
                                               voteCount === minVote ? "red" :
                                               percentage > 50 ? "blue" : "yellow";
            });
        }
    });
}

setInterval(updateResults, 5000);
loadPoll();
