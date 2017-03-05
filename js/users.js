var user = JSON.parse(sessionStorage.getItem('user'));

document.querySelector('#users').addEventListener('click', function(e) {
    var userList = e.target;
    var userId = userList.dataset.id;
    location.href = 'timeline.html?userId=' + id;
});

document.querySelector('#button-logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'signup.html?logout=yes';
    //sessionStorage.removeItem('token');
});

document.querySelector('#sendMessage').addEventListener('click', sendMessage);

document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
})

renderUserProfile();
getUsers();

function getUsers() {
    var token = sessionStorage.getItem('token');

    fetch('https://rocky-taiga-63970.herokuapp.com/users?token=' + user.token)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
        renderUserProfile(response);
    })
}

function renderUsersList(users) {

    users.forEach(function(user) {
        console.log(user)
        var userList = `<li data-id="${user.id}" class="list-group-item">
        ${user.first_name} ${user.last_name} @${user.username} 
        <span class="pull-right">
            <button type="button" class="btn btn-success" id="button-follow">Follow</button>
            <button type="button" class="btn btn-danger" id="button-unfollow"><span class="glyphicon glyphicon-remove-circle"></span></button>
        </span>
        
        </li>`;

        document.querySelector('#users').innerHTML += userList;
    });
}

//target username within username box to input logged in user 
function renderUserProfile() {
    document.querySelector('#profile-picture').src = user.photo_url;
    document.querySelector('#username').innerHTML = user.username;
}

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch('https://rocky-taiga-63970.herokuapp.com/posts?token=' + user.token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            body: message,
            //token: token
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
             console.log(response);
         })
}