$(document).ready(deleteAllCookies)

function deleteAllCookies() {
 var c = document.cookie.split("; ");
 for (i in c) 
  document.cookie =/^[^=]+/.exec(c[i])+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
}
 
 function upsertAuthor(userData) {
    $.post("/api/users", userData)
      .then(getUsers);
  }

$("#submitLogin").on('click', function(){
    event.preventDefault();
    console.log("got onclick")
    var name = $('#usernameInput').val().trim()
    var password = $('#InputPassword').val().trim();
    console.log(name,password)
    if (name && password) {
        signIn(name, password)
    }
    else { 
        console.log("somethings missing");
        $(".alert").html("Something is not right. Try again!").css({background: red}); 
    }
});
function signIn(name, password){
    console.log(name,password)
    $.post("/api/login", {name,password})
    .then(function(data){
        console.log("post successful")
        console.log(data)
        window.location = data.redirectUrl
    }).catch(function(err){
        console.log(err)
    })
}
