document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", sender);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;
        appendMessage("user", message);
        userInput.value = "";

        fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => appendMessage("bot", data.response))
        .catch(() => appendMessage("bot", "Error: Unable to get a response."));
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
});
