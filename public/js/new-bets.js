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

  // Adding an event listener for when the form is submitted
  $(betForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var betId;
  var userId;

  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()+1);
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

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();

    // Wont submit the post if we are missing a body, title, or author
    // if (!challengeeInput.val().trim() || !termsInput.val().trim() || !category.val().trim() || !offerExpire.val().trim()
    //   || !amountInput.val().trim() || !endDateInput.val().trim() || messageInput.val().trim()) {
    //   alert("You are missing a field.");
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

    // Run submitBet to create a whole new bet
    submitBet(newBet);

    // Submits a new post and brings user to blog page upon completion
    function submitBet(bet) {
      $.post("/api/bets", bet, function () {
        window.location.href = "/bets";
      });
    }
  }
});
