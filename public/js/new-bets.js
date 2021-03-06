$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  var challengeeInput = $("#challengee");
  var termsInput = $("#terms"); // description of bet
  var amountInput = $("#amount");
  var betForm = $("#new");
  var endDateInput = $("#endDate");
  var mediatorSelect = $("#mediator");
  var category = $("#category");
  var offerExpire;
  var messageInput = $("#message");


  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var userBalance;
  var userId = localStorage.userId;
  var userName = localStorage.userName;
  // changeLinkSpecificToUser(userName);

  // this code creates an offer expiration 24 hours after create date (updated for end of months and leap years)
  createOfferExpiration();
  function createOfferExpiration() {
    var today = new Date();

    var date;
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if (month === 12 && day === 31) {
      date = (year + 1) + '-01-01';
    } else if ((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10) && day === 31) {
      console.log("it's gonna be May!");
      date = year + '-' + (month + 1) + '-01';
    } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 30) {
      date = year + '-' + (month + 1) + '-01';
    } else if (month === 2 && (year % 4) && day === 29) {
      date = year + '-03-01';
    } else if (month === 2 && (!(year % 4)) && day === 28) {
      date = year + '-03-01';
    } else {
      date = year + '-' + month + '-' + (day + 1);
    }

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    offerExpire = date + ' ' + time;
    console.log(offerExpire);
  }

  // function changeLinkSpecificToUser(userName) {


  //   $.get("/api/users", function (data) {

  //     //Loop through all the data 
  //     for (let i = 0; i < data.length; i++) {

  //       //If your username matches the username in the database, change the link so you can make a bet
  //       if (data[i].id === userName) {
  //         var makeBetUrl = "/new/?user_id=" + data[i].id;
  //         $("#makeBet").attr("href", makeBetUrl); // Set herf value.

  //         var myAccountUrl = "/account/?username=" + data[i].name;
  //         $("#myAccount").attr("href", myAccountUrl); // Set herf value.

  //         var myBetsUrl = "/bets/?user_id=" + data[i].id;
  //         $("#myBets").attr("href", myBetsUrl); // Set herf value.

  //         var allBetsUrl = "/bets/?user_id=" + data[i].id;
  //         $("#allBets").attr("href", allBetsUrl); // Set herf value.
  //       }
  //     }
  //   });
  // }

  if (!userId) {
    renderEmpty();
  }

  $(betForm).on("submit", handleFormSubmit);

  // event listener to ensure sufficient balance for user inputed bet amount
  $(amountInput).on("blur", validateBalance);
  // $(challengeeInput).on("blur", validateChallengee);
  $(amountInput).on("click", eraseAlert);
  $(challengeeInput).on("click", eraseAlert);

  console.log(userId);
  console.log(termsInput.val().trim());

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger text-center");
    alertDiv.append("You must create an User ");
    alertDiv.append("<a href='/users'>here</a>");
    alertDiv.append(" before you can create a Bet.");
    $(".new-bet").append(alertDiv);
  }

  function invalidBalance(userBalance) {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger text-center");
    alertDiv.append(`You only have ${userBalance} credits!`);
    $("#invalid-balance").append(alertDiv);
  }
  function eraseAlert() {
    $("#invalid-balance").empty();
    $("#invalid-challengee").empty();
    $(".new-bet").empty();
  }

  var validBalance = false;
  //logic for authenticating Bet Amount vs user points total
  function validateBalance() {
    $.get("/api/users/" + userId, function (data) {
      userBalance = data.balance;
      if (data.balance < amountInput.val().trim()) {
        invalidBalance(userBalance);
        return;
      } else {
        validBalance = true;
        return;
      }
    });
  }

  // var realUser = true;
  // function validateChallengee() {
  //   $.get("/api/users", function (data) {
  //     var userNameAuto = [];
  //     var inputUser = $("#challengee").val().trim();
  //     for (var i = 0; i < data.length; i++) {
  //       userNameAuto.push(data[i].email)
  //     }
  //     for (let i = 0; i < userNameAuto.length; i++) {
  //       if (inputUser === userNameAuto[i]) {
  //         realUser = true;
  //       }
  //     }
  //     if (!realUser) {
  //       fakeUser();
  //     }
  //   });
  // }


  // function fakeUser() {
  //   var alertDiv = $("<div>");
  //   alertDiv.addClass("alert alert-danger text-center");
  //   alertDiv.append(`Please enter a valid user`);
  //   $("#invalid-challengee").append(alertDiv);
  // }



  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();

    console.log("handleform submit reached");
    // Wont submit the post if we are missing a body, title, or author
    if (!challengeeInput.val().trim() || !termsInput.val().trim() || !category.val().trim()
      || !amountInput.val().trim() || !endDateInput.val().trim()) {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger text-center");
      alertDiv.append("You are missing a field.");
      $(".new-bet").append(alertDiv);
      return;
    }
    if (!validBalance) {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger text-center");
      alertDiv.append("Your bet amount is invalid.");
      $(".new-bet").append(alertDiv);
      return;
    }
    // if (!realUser) {
    //   var alertDiv = $("<div>");
    //   alertDiv.addClass("alert alert-danger text-center");
    //   alertDiv.append("Please challenge a valid user.");
    //   $(".new-bet").append(alertDiv);
    //   return;
    // }

    // Constructing a newPost object to hand to the database
    var newBet = {
      UserId: userId,
      initiator: userId,
      challengee: challengeeInput
        .val()
        .trim(),
      // parties: [userId, challengeeInput
      //   .val()
      //   .trim()],
      terms: termsInput
        .val()
        .trim(),
      message: messageInput
        .val()
        .trim(),
      amount: amountInput
        .val()
        .trim(),
      category: category
        .val()
        .trim(),
      endDate: endDateInput
        .val()
        .trim(),
      offerExpireDate: offerExpire
      // .val()
      // .trim()
    };
    console.log(newBet);

    // Run submitBet to create a whole new bet
    submitBet(newBet);

    // Update the coin amount in initiator's account
    var newBalance = userBalance - amountInput.val().trim();
    console.log(userBalance);
    console.log(amountInput.val().trim());
    console.log(newBalance);
    updateBalance(newBalance);

    // Submits a new post and brings user to blog page upon completion
    function submitBet(bet) {
      $.post("/api/bets", bet, function () {
        window.location.href = "/bets";
      });
    }

    function updateBalance(newBalance) {
      console.log(userId);
      $.ajax({
        method: "PUT",
        url: "/api/users/" + userId,
        data: { 'data': `${newBalance}` }
      })
        .then(function () {
        });
    }
  }
});
