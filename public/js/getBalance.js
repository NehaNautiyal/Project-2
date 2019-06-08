$(document).ready(function () {

    var userId = localStorage.userId;
    getBalance(userId);
    function getBalance(userId) {
        $.get("/api/users/" + userId, function (data) {
            $('#user-balance').text(data.balance);
        });
    }
});