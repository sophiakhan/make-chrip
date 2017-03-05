var user = JSON.parse(sessionStorage.getItem('user'));

getMessages();

document.querySelector('#button-logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'signup.html?logout=yes';
    //sessionStorage.removeItem('token');
});

function getMessages() {
    var token = sessionStorage.getItem('token');

    fetch('https://rocky-taiga-63970.herokuapp.com/timeline?token=' + user.token) 

    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderTimeline(response);
    })
}

function renderTimeline(messages) {
    console.log(messages);

    messages = messages.reverse();

    messages.forEach(createMessage);
}

function createMessage(post) {
    var messageListItem = `<li data-id="${post.id}" class="list-group-item">
    ${post.body} by ${post.username}
    </li>`;
    var currentMessagesHTML = document.querySelector('#messages').innerHTML;

    document.querySelector('#messages').innerHTML = messageListItem + currentMessagesHTML;
}