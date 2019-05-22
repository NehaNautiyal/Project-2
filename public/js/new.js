$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  var challengeeInput = $("#challengee");
  var termsInput = $("#terms"); // description of bet
  var amountInput = $("#amount");
  var betForm = $("#new");
  var endDateInput = $("#endDate");
  var mediatorSelect = $("#mediator");
  var category = $("#category");
  var offerExpire = $("#offerExpireDate");
  var messageInput = $("#message");

  // Adding an event listener for when the form is submitted
  $(betForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var betId;
  var userId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?bet_id=") !== -1) {
    betId = url.split("=")[1];
    getPostData(betId, "bet");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }
  console.log(userId);
  console.log(termsInput.val().trim());

  // Getting the authors, and their posts
  // getAuthors();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    // if (!challengeeInput.val().trim() || !termsInput.val().trim() || !category.val().trim() || !offerExpire.val().trim()
    //   || !amountInput.val().trim() || !endDateInput.val().trim() || messageInput.val().trim()) {
    //   alert("missing something");
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
        .val()
        .trim()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newBet.id = betId;
      updatePost(newBet);
    }
    else {
      submitPost(newBet);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(bet) {
    $.post("/api/bets", bet, function () {
      window.location.href = "/bets";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  // function getPostData(id, type) {
  //   var queryUrl;
  //   switch (type) {
  //     case "bet":
  //       queryUrl = "/api/bets/" + id;
  //       break;
  //     case "user":
  //       queryUrl = "/api/users/" + id;
  //       break;
  //     default:
  //       return;
  //   }
  //   $.get(queryUrl, function (data) {
  //     if (data) {
  //       console.log(data.UserId || data.id);
  //       // If this post exists, prefill our new forms with its data
  //       challengeeInput.val(data.title);
  //       termsInput.val(data.terms);
  //       userId = data.UserId || data.id;
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }

  // A function to get Authors and then render our list of Authors
  // function getUsers() {
  //   $.get("/api/users", renderAuthorList);
  // }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  // function renderAuthorList(data) {
  //   if (!data.length) {
  //     window.location.href = "/users";
  //   }
  //   $(".hidden").removeClass("hidden");
  //   var rowsToAdd = [];
  //   for (var i = 0; i < data.length; i++) {
  //     rowsToAdd.push(createAuthorRow(data[i]));
  //   }
  //   authorSelect.empty();
  //   console.log(rowsToAdd);
  //   console.log(authorSelect);
  //   authorSelect.append(rowsToAdd);
  //   authorSelect.val(userId);
  // }

  // Creates the author options in the dropdown
  // function createAuthorRow(user) {
  //   var listOption = $("<option>");
  //   listOption.attr("value", user.id);
  //   listOption.text(user.name);
  //   return listOption;
  // }

  // Update a given post, bring user to the blog page when done
  // function updatePost(post) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/bets",
  //     data: post
  //   })
  //     .then(function () {
  //       window.location.href = "/bet";
  //     });
  // }
});
