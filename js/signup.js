document.querySelector('#signUpButton').addEventListener('click', signup);

function signup() {
    var firstName = document.querySelector('#first_name').value;
    var lastName = document.querySelector('#last_name').value;
    var username = document.querySelector('#username').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var photoUrl = document.querySelector('#photo_url').value;

    fetch('https://rocky-taiga-63970.herokuapp.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password,
            photo_url: photoUrl
            
        })
    })

        .then(function(response) {
            return response.json();
        })
        .then(function(response) {

            if (response.token) {
                sessionStorage.setItem('user', JSON.stringify(response));
                location.href = 'users.html';
            }
            else {
                alert('Error Occurred.');
                console.log(response);
            }
        })

} 