$(document).ready(function () {

    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getBalance();
      }
    function getBalance() {
        $.get("/api/users/" + userId, function (data) {
            $('#user-balance').text(data.balance);
        });
    }
});