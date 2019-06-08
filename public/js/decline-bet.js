
$(document).ready(function () {
    var betId;
    if (url.indexOf("?bet_id=") !== -1) {
        betId = url.split("=")[1];

        $.ajax({
            method: "DELETE",
            url: "/api/bets/" + betId
        });
    }
});