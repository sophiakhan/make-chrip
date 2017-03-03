getMessages();

function getMessages() {
    var token = sessionStorage.getItem('token');
    var userId = location.href.split('?')[1].split('=').pop();

    fetch('https://rocky-taiga-63970.herokuapp.com/' + userId + '/posts')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderMessagesList(response);
    })
}

function renderMessagesList(messages) {
    console.log(messages);

    messages = messages.reverse();

    messages.forEach(createMessage);
}

function createMessage(message) {
    var messageListItem = `<li data-id="${message.id}" class="list-group-item">${message.body}</li>`;
    var currentMessagesHTML = document.querySelector('#messages').innerHTML;

    document.querySelector('#messages').innerHTML = messageListItem + currentMessagesHTML;
}