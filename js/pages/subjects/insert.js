function openAddSubjectModal() {
  showModal("subject-modal");
  resetAddSubjectForm();
  initAddSubjectFormValidator({
    submitHandler: function () {
      let name = $("#subject-name-input").val();
      let facultyId = $("#faculty-input").val();
      let duration = $("#duration-input").val();
      let managerId = $("#manager-input").val();
      let status = $('input[name="status-input"]:checked').val();
      insertNewSubjectToServer(name, facultyId, duration, managerId, status);
    },
  });
}

function resetAddSubjectForm() {
  // set title for modalss
  $("#subject-modal-title").text("Add Subject Modal");

  // reset input value
  $("#subject-name-input").val("");
  $("#faculty-input").val("");
  $("#duration-input").val("");
  $("#manager-input").val("");
  $("#active-status-input").prop("checked", true);

  // reset validation
  resetAddSubjectValidator();

  initSelect2({
    name: "validation-manager",
    placeholder: "Select manager...",
  });

  initSelect2({
    name: "validation-faculty",
    placeholder: "Select faculty...",
  });

  getFacultiesFromServer("insert");
}

function insertNewSubjectToServer(name, facultyId, duration, managerId, status) {
  subjectAPI.insert({
    name,
    facultyId,
    duration,
    managerId,
    status,
    success: function () {
      hideModal("subject-modal");
      showNotification("Create new subject", "Successfully! New subject created!");
      getSubjectsDataForTable(); // reload table
    },
  });
}
