$(document).ready(function () {
  /* global moment */

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  var bets;

  var userId = localStorage.userId;


  // this will call only user specific bets
  getPosts(userId);

  // this will call all bets, ie the marketplace
  // getPosts();

  // We probably just want a toggle or something on the marketplace page to switch between them
  // Or maybe ultimately we'll want to have Pending bets, proposed bets, active bets, completed bets, unresolved bets (finished but not voted on), bets in mediation
  // maybe even some analytics like total currency in bets, performace graphs, etc. That stuff I think would make sense in the Account page.
  // I think this is all part of the conversation about what pages we actually want and what they do.
  // To me, the account page has an overview of your activity, all that analytic stuff and an a birds-eye view of all your bets
  // And the marketplace page is where all the bet specifics live for individiual bets. But you can see that bet information from your account page too if you want.
  // Then really you have your account page and the marketplace page as the only two necessary pages, with that plus sign that will bring up a new bet from either page.
  // Does the user really need anything other than those two pages?



  // This function grabs posts from the database and updates the view
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/bets" + userId, function (data) {
      console.log("bets", data);
      bets = data;
      if (!bets || !bets.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
        createEmail();
      }
    });
  }

  function createEmail() {
    console.log("in create Email");
    console.log(bets);
    for (let i = 0; i < bets.length; i++) {
      if (bets[i].emailSent === false) {
        $.ajax({
          method: "PUT",
          url: "/api/bets/" + (bets[i].id),
        });
        var user = bets[i].User.name;
        var amount = bets[i].amount;
        var expiration = bets[i].offerExpireDate;
        var terms = bets[i].terms;
        var message = bets[i].message;
        var challengee = bets[i].challengee;
        console.log('recognize that email not sent');

        $.post("/send-email",
          email = {
            betId: i + 1,
            to: challengee,
            challenger: user,
            subject: `New Bet from ${user}`,
            amount: amount,
            terms: terms,
            message: message,
            expiration: expiration
          });
      }
    }
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/bets/" + id
    })
      .then(function () {
        getPosts(postCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < bets.length; i++) {
      postsToAdd.push(createNewRow(bets[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  // WHEN WE WANT TO CREATE THE CARDS THAT SHOW EACH BET THIS IS WHERE IT WILL HAPPEN
  function createNewRow(bet) {
    console.log(bet);
    console.log("bet");
    var formattedDate = new Date(bet.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");

    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");

    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(`${bet.User.name} bets ${bet.challengee} on `);
    newPostBody.text(`${bet.terms}. This bet expires on ${bet.endDate}`);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("bet", bet);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("bet");
    window.location.href = "/new?bet_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No bets yet" + partial + ", navigate <a href='/users" + query +
      "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }

});
