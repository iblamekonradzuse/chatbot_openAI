const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");


let userMessage;
const API_KEY = "xxxx";

const createChatLii = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span> <p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;

}

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user",content: userMessage}] 
        })
    }
    fetch(API_URL,requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLii(userMessage, "outgoing"));

    setTimeout(() =>{
        chatbox.appendChild(createChatLii("Thinking...", "incoming"));
        generateResponse();
     }, 700);
}


sendChatBtn.addEventListener("click", handleChat);
