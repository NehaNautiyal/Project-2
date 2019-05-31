$(document).ready(function () {

    $.ajax({
        method: "PUT",
        url: "/api/bets/" + betId,
        data: { 'data': `${userId}` }
    });

    $.ajax({
        method: "PUT",
        url: "/api/users/" + userId,
        data: { 'data': `${newBalance}` }
    });
}







// function updateBalance(newBalance) {
//     console.log(userId);
//     $.ajax({
//         method: "PUT",
//         url: "/api/users/" + userId,
//         data: { 'data': `${newBalance}` }
//     })
//         .then(function () {
//         });
// }