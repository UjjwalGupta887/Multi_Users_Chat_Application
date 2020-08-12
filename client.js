const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio('twitwi.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ""

})

//for new user join chat 
const name = prompt('Enter your Name to join Private Room');
socket.emit('new-user-joined', name);

// if user join receive his/her name to the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

//server send message receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

// if user leaves a chat
socket.on('left', name => {
    append(`${name} left the chat`, 'right');
})
