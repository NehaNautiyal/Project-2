$("#submitNew").on('click', function(){
    console.log("clicky")
    event.preventDefault();
    var name = $('#usernameInput').val().trim();
    var password = $('#passInput').val().trim();
    var email = $('#emailInput').val().trim();
    $.post("/api/users",
        user = {
            name,
            password,
            email
        }
    ).then(()=> {
        console.log("post successful")
        window.location.replace("/")
        
    })
})
