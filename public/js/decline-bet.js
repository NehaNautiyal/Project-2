$(document).ready(function () {
    $.ajax({
        method: "DELETE",
        url: "/api/bets/" + betId
    });
}