$(document).ready(function () {

    // Gets the part of the url that comes after the "?" (which is specific to each user as they are logged in)
    var url = window.location.search;
    var userName;

    if (url.indexOf("?username=") !== -1) {
        userName = url.split("=")[1];
        getUserAccountInfo(userName);
        changeLinkSpecificToUser(userName);
    }


    //Change the Make Bet URL so it goes to the URL for that specific user
    function changeLinkSpecificToUser(userName) {
        $.get("/api/users", function (data) {

            //Loop through all the data 
            for (let i = 0; i < data.length; i++) {

                //If your username matches the username in the database, change the link so you can make a bet
                if (data[i].name === userName) {
                    var makeBetUrl = "/new/?user_id=" + data[i].id;
                    $("#makeBet").attr("href", makeBetUrl); // Set herf value.
                    
                    var myAccountUrl = "/account/?username=" + data[i].name;
                    $("#makeBet").attr("href", myAccountUrl); // Set herf value.
                }
            }
        });
    }

    function getUserAccountInfo(userName) {
        $.get("/api/users", function (data) {

            //Loop through all the data 
            for (let i = 0; i < data.length; i++) {

                //If your username matches the username in the database, display the account info
                if (data[i].name === userName) {
                    $(".accountInfo").append("\nYour account credentials are as following:\n");
                    $(".accountInfo").append(`\nUsername: ${data[i].name}\n`);
                    $(".accountInfo").append(`\nCurrent Balance: ${data[i].balance}\n`);
                }

            }
        });

    }

});