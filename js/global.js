document.querySelector('#signUpButton').addEventListener('click', signup);

function signup() {
    var firstName = document.querySelector('#first_name').value;
    var lastName = document.querySelector('#last_name').value;
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var photoUrl = document.querySelector('#photo_url').value;

    fetch('http://.../', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            //body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            photo_url: photoUrl,
        })
   
//below is collin's stuff
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                location.href = 'users.html';
            }
            else {
                alert('There was an error. Check out your console.');
                console.log(response);
            }
        })

}