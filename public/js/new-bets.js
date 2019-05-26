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
  var betId;
  var userId;
  var userBalance;

  // this code creates an offer expiration 24 hours after create date
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1);
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  offerExpire = date + ' ' + time;
  console.log(offerExpire);

  // If we have this section in our url, we pull out the post id from the url
  // In '?bet_id=1', betId is 1
  if (url.indexOf("?bet_id=") !== -1) {
    betId = url.split("=")[1];
    getPostData(betId, "bet");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  if (!userId) {
    renderEmpty();
  }

  // Adding an event listener for when the form is submitted
  $(betForm).on("submit", handleFormSubmit);

  // event listener to ensure sufficient balance for user inputed bet amount
  $(amountInput).on("blur", validateBalance);
  $(challengeeInput).on("blur", validateChallengee);
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

  var realUser = false;
  function validateChallengee() {
    $.get("/api/users", function (data) {
      var userNameAuto = [];
      var inputUser = $("#challengee").val().trim();
      for (var i = 0; i < data.length; i++) {
        userNameAuto.push(data[i].name)
      }
      for (let i = 0; i < userNameAuto.length; i++) {
        if (inputUser === userNameAuto[i]) {
          realUser = true;
        }
      }
      if (!realUser) {
        fakeUser();
      }
    });
  }


  function fakeUser() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger text-center");
    alertDiv.append(`Please enter a valid user`);
    $("#invalid-challengee").append(alertDiv);
  }



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
    if (!realUser) {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger text-center");
      alertDiv.append("Please challenge a valid user.");
      $(".new-bet").append(alertDiv);
      return;
    }

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
          // window.location.href = "/blog";
        });
    }
  }
});
