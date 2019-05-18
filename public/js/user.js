$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#user-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#user-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getAuthors();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAuthor({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an user. Calls getAuthors upon completion
  function upsertAuthor(userData) {
    $.post("/api/users", userData)
      .then(getAuthors);
  }

  // Function for creating a new list row for authors
  function createAuthorRow(userData) {
    var newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.name + "</td>");
    if (userData.Bets) {
      newTr.append("<td> " + userData.Bets.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/bets?user_id=" + userData.id + "'>Go to Bets</a></td>");
    newTr.append("<td><a href='/new?user_id=" + userData.id + "'>Create a Bet</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete User</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getAuthors() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an User before you can create a Bet.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    })
      .then(getAuthors);
  }
});
