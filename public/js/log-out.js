$(document).ready(function(){
$.get("/isLogged", function(data){
    if (data.logOutBtn){
    console.log("log")
    $("#logOut").attr("style", "display:block")    
    }else{
        console.log("not log")
    }
})

$("#logOut").on("click", function(){
    console.log("clicky")
    $.get("/api/logout", (data)=> window.location.replace(data.redirectUrl))
})
})
