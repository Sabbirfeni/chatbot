

const sendMessageBtn = document.querySelector('.chat-input img')
const chatInput = document.querySelector('.chat-input textarea')
const chatBox = document.querySelector('.chatbox')
let userMessage;


const createChatLi = (message, className) => {
    const chatLi = document.createElement('li')
    chatLi.classList.add('chat', className)
    let chatContent = className === 'outgoing' ? `<p>${message}</p>` : `<img src="./assets/images/robot.png" alt="chat-robot"><p>${message}</p>`
    chatLi.innerHTML = chatContent
    return chatLi;
}

const generateResponse = () => {
    const API_URL = 'https://api.openai.com/v1/chat/completions'
    const API_KEY = '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';
    const requestOptions = {
        method: 'POST',
        headers: {  // Corrected the typo here from 'header' to 'headers'
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: 'hello' }],
        })
    }
    fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err.message)
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return
    chatBox.appendChild(createChatLi(userMessage, 'outgoing'))

    setTimeout(() => {
        chatBox.appendChild(createChatLi('Currently I am under construction. I will be available soon.', 'incoming'))
        generateResponse(userMessage)
    }, 600)
}

sendMessageBtn.addEventListener('click', handleChat)





// "You didn't provide an API key. 
// You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) 
// if you're accessing the API from your browser and are prompted for a username and password. 
// You can obtain an API key from https://platform.openai.com/account/api-keys."