import { database } from "./firebase.js";
import { ref, get, update } from "firebase/database";

// ✅ Get Poll ID from URL
const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get("id");
const pollRef = ref(database, `polls/${pollId}`);

get(pollRef).then(snapshot => {
    if (snapshot.exists()) {
        const poll = snapshot.val();
        document.getElementById("pollQuestion").textContent = poll.question;

        let optionsHTML = "";
        poll.options.forEach((option, index) => {
            optionsHTML += `<button onclick="vote(${index})">${option.text}</button><br>`;
        });

        document.getElementById("options").innerHTML = optionsHTML;
    }
});

// ✅ Voting Function
function vote(index) {
    get(pollRef).then(snapshot => {
        const poll = snapshot.val();
        poll.options[index].votes += 1;

        update(pollRef, { options: poll.options }).then(() => {
            alert("Vote Submitted!");
            location.reload();
        });
    });
}
