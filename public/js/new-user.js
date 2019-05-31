

$(document).ready(function(){

function validateForm(){
    var name = $('#usernameInput').val().trim();
    var password = $('#passInput').val().trim();
    var passwordConfirm = $('#passInput2').val().trim()
    var email = $('#emailInput').val().trim();
    console.log($('#agreeToTerms').val())
    if (name === '' || 
        password === '' || 
        passwordConfirm === '' || 
        email === ''){
            swal({
               title: "Oh No...",
               text: "You must complete all fields before your account can be created",
               icon: "error"
            })

    } else if (password != passwordConfirm){
        swal({
            title: "Oh No...",
            text: "passwords must match",
            icon: "error"
        })
    } else if(!validateEmail(email)){
        swal({
            title: "Oh No...",
            text: "please enter a valid email",
            icon: "error"
        })
    }
    else{
        swal({
            title: "You did it!",
            text: "creating your account...",
            icon: "success"
        })
        setTimeout(post(name,password,email), 20000)
    }
}

function post(name,password,email){
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
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$("#submitNew").on('click', function(){
    console.log("clicky")
    event.preventDefault()
    validateForm()
    })


});