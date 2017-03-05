var user = JSON.parse(sessionStorage.getItem('user'));
var thing = ''

document.querySelector('#users').addEventListener('click', function(e) {
    var userList = e.target;
    var userId = userList.dataset.id;
    console.log(userList, userId)
    // location.href = 'timeline.html';
});

$('.list-group').css('cursor', 'pointer');

document.querySelector('#button-logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'signup.html?logout=yes';
    //sessionStorage.removeItem('token');
});

document.querySelector('#users-button-back').addEventListener('click', function() {
    location.href = '/signup.html'
});

document.querySelector('#sendMessage').addEventListener('click', sendMessage);

document.querySelector('#sendMessage').addEventListener('keypress', function(e) {
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
        thing = response;
        renderUsersList(response);
        renderUserProfile(response);
    })
}

// shows list of users who have signed up
function renderUsersList(users) {

    users.forEach(function(user) {
        //console.log(user)
        var userList = `<li data-id="${user.id}" class="list-group-item" id="users">
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

//follow 

document.querySelector('#button-follow').addEventListener('click', follow)

function follow() {
    var userIds = document.querySelector('#users').data-id

    fetch('https://rocky-taiga-63970.herokuapp.com/follow/' + userIds), 
    
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }

        .then(console.log(response))
}
}

//unfollow 

document.querySelector('#button-unfollow').addEventListener('click', unfollow)

function unfollow() {
    var userIds = document.querySelector('#users').data-id

    fetch('https://rocky-taiga-63970.herokuapp.com/unfollow/' + userIds), 
    
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }

        .then(console.log(response))
}
}

// send chirp
function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch('https://rocky-taiga-63970.herokuapp.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            body: message,
            token: token
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
             console.log(response);
         })
}