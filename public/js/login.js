$("#submitLogin").on('click', function(){
    event.preventDefault();
    console.log("got onclick")
    var name = $('#usernameInput').val().trim()
    var password = $('#InputPassword').val().trim();
    console.log(name,password)
    if (name && password){
        signIn(name, password)
    }
    else{ console.log("somethings missing") }
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
