var user = JSON.parse(sessionStorage.getItem('user'));

document.querySelector('#users').addEventListener('click', function(e) {
    var userList = e.target;
    var userId = userList.dataset.id;
    //location.href = 'messages.html?userId=' + userId;
});

renderUserProfile();
getUsers();

function getUsers() {
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
        var userList = `<li data-id="${user.id}" class="list-group-item">${user.first_name} ${user.last_name} @${user.username}</li>`;

        document.querySelector('#users').innerHTML += userList;
    });
}

//target username within username box to input logged in user 
function renderUserProfile() {
    document.querySelector('#profile-picture').src = user.photo_url;
    document.querySelector('#username').innerHTML = user.username;
}