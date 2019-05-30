function insertUser(userData) {
    $.post("/api/users", userData)
      .then(getUser);
  }

function getUser() {
    $.get('/api/users',function(data){
        console.log(data)
        console.log(username)
        console.log(password)
    }).then(function(){
        window.location.replace("/")
    }).catch(function(err) {
        console.log(err);
    });
}

$("#submitLogIn").on('click', function(){
    event.preventDefault()
    let name = $('#usernameLog').val().trim();
    let email = $('#passInput').val().trim();
    let password = JSON.parse($('#passLog').val().trim());

    insertUser({name, email, password});
});