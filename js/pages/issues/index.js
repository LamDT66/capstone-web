function loadIssuePage() {
  $("#content").load("../pages/issues/issues.html", function () {
    feather.replace();
    issueCommonForIssuePage();
    refreshIssueTable();
  });
}

function issueCommonForIssuePage() {
  // common settings
  $('[data-toggle="tooltip"]').tooltip();
}