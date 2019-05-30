$("#submitLogIn").on('click', function(){
    event.preventDefault()
    let username = $('#usernameLog').val().trim();
    let password = JSON.parse($('#passLog').val().trim());
    $.get('/api/users',function(data){
        console.log(data)
        console.log(username)
        console.log(password)
    })
})