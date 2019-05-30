$(document). ready(function(){

    $.get("/api/users", function(data) {
    console.log(data);
    });

    var oldUrl = $("#makeBet").attr("href"); // Get current url.

    

    $("#makeBet"). attr("href", newUrl); // Set herf value.
    });