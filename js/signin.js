document.querySelector('#button-login').addEventListener('click', signIn);

function signIn() {
    var usernameHeader = document.querySelector('#username-header').value;
    var passwordHeader = document.querySelector('#password-header').value;

    fetch('https://rocky-taiga-63970.herokuapp.com/login', { 
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: usernameHeader,
            password: passwordHeader
        })
        
    })
        .then(function(response) {
            return response.json();
        }) 
        .then(function(response) {
            console.log(response);
            if (response.token) {
                sessionStorage.setItem('token', response.token);
                location.href = 'users.html';

            }
            else {
                alert('Error Occurred.');
                console.log(response);
            }
        })

}