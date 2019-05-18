
var backBtn = $('<button type="button" id="back" class="btn btn-primary btn-lg m-4">Go Back</button>')

$('#newUser').on('click', function(){
    $(".buttons").css('display','none')
    $("#signUp").css('display','block')
    $("#signUp").append(backBtn)

})

$('#logIn').on('click', function(){
    $(".buttons").css('display','none')
    $("#signIn").css('display','block')
    $("#signIn").append(backBtn)
})

backBtn.on('click', function(){
    $('.author-container').css('display','none')
    $(".buttons").css('display', 'block')
})

$("#submitNew").on('click', function(){
    event.preventDefault();
    var username = $('#usernameInput').val().trim();
    var password = $('#passInput').val().trim();
    var email = $('#emailInput').val().trim();
    $.post("/api/users",
        user = {
            name:username,
            password,
            email
        }
    )
    //insert into table of users
    //save password with password function for encryption  
})

$("#submitLogIn").on('click', function(){
    event.preventDefault();
    //check info against database
    //remember to use password() around the password when selecting from db so it matches the encrypted, stored version 
})