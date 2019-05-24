$(document).ready(function () {

    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getBalance();
      }
    function getBalance() {
        console.log('in getBalance()');
        $.get("/api/users/" + userId, function (data) {
            // var stringBalance = parseInt(data.balance);
            // console.log(stringBalance);
            $('#user-balance').text(data.balance);
        });
    }
});