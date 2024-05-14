const WS_URL = "ws://localhost:8080/connect";
let socket = null;

document.addEventListener("DOMContentLoaded", () => {
    addCurrentDateToChat();
    getUserSessionId();
    connect();

    document.querySelector("#chat-actions form").addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage();

        return false;
    });
});

function addCurrentDateToChat() {
    const chatContainerEl = document.getElementById("chat-container");

    const newDivEl = document.createElement("div");
    newDivEl.classList.add("message-container", "today-date");

    const newSpanEl = document.createElement("span");
    newSpanEl.innerText = new Date().toLocaleDateString();

    newDivEl.appendChild(newSpanEl);
    chatContainerEl.appendChild(newDivEl);
}

function addNewMessageToChat(message) {
    const chatContainerEl = document.getElementById("chat-container");
    const messageContainerEl = document.createElement("div");
    const spanUserEl = document.createElement("span");
    const spanMessageEl = document.createElement("span");
    const spanDateEl = document.createElement("span");

    spanMessageEl.innerText = message.message;
    spanDateEl.innerText = formatLocaleTimeString(message.date);

    messageContainerEl.classList.add("message-container");
    spanUserEl.classList.add("user");
    spanMessageEl.classList.add("message");
    spanDateEl.classList.add("date");

    if (isSameUser(message.sessionId)) {
        spanUserEl.innerText = "Você";
        messageContainerEl.classList.add("self");
    } else {
        const audio = new Audio("../sound/new-message.mp3");

        spanUserEl.innerText = "Anônimo";
        audio.addEventListener("canplay", () => {
            audio.play();
        });
    }

    messageContainerEl.appendChild(spanUserEl);
    messageContainerEl.appendChild(spanMessageEl);
    messageContainerEl.appendChild(spanDateEl);
    chatContainerEl.appendChild(messageContainerEl);

    chatContainerEl.scrollTop = chatContainerEl.scrollHeight;
}

function getUserSessionId() {
    let sessionId = sessionStorage.getItem("id");

    if (sessionId == null) {
        const rnd = Math.floor(Math.random() * 1000);

        sessionId = Date.now() + "_" + rnd;
        sessionStorage.setItem("id", sessionId);
    }

    return sessionId;
}

function isSameUser(msgSessionId) {
    const currentSessionId = getUserSessionId();

    return msgSessionId == currentSessionId;
}

function formatLocaleTimeString(msgDate) {
    const date = new Date(msgDate);

    return date.getHours() + ":" + date.getMinutes();
}

function connect() {
    socket = new WebSocket(WS_URL);

    socket.onmessage = (e) => {
        const messageObj = JSON.parse(e?.data);

        addNewMessageToChat(messageObj);
    };
}

function sendMessage() {
    if (socket == null) return;

    const messageEl = document.querySelector("#chat-actions input");
    const message = {
        sessionId: getUserSessionId(),
        message: messageEl.value,
        date: new Date().toISOString(),
    };

    socket.send(JSON.stringify(message));
    messageEl.value = "";
}
