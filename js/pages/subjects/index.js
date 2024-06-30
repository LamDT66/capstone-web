function loadSubjectPage() {
  $("#content").load("../pages/subjects/subjects.html", function () {
    feather.replace();
    subjectCommonForSubjectPage();
    refreshSubjectTable();
  });
}

function subjectCommonForSubjectPage() {
  // common subjects
  $('[data-toggle="tooltip"]').tooltip();
}
