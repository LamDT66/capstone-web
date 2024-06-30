function loadUserPage() {
  $("#content").load("../pages/users/users.html", function () {
    feather.replace();
    userCommonForUserPage();
    refreshUserTable();
  });
}

function userCommonForUserPage() {
  // common settings
  $('[data-toggle="tooltip"]').tooltip();
}
