function openModalAddIssue() {
  showModal("issue-modal");
  resetAddIssueForm();
  initAddIssueFormValidator({
    submitHandler: function () {
      let milestone = $("#milestone-input").val();
      let title = $("#title-input").val();
      let description = $("#description-input").val();
      let type = $("#type-input").val();
      let process = $("#process-input").val();
      let assignee = $("#assignee-input").val();
      let status = $("#status-input").val();

      showLoadingButton("save-btn", "Save");
      insertNewIssueToServer(milestone, title, description, type, process, assignee, status);
    },
  });
}

function resetAddIssueForm() {
  // set title for modal
  $("#issue-modal-title").text("Add Issue");

  // reset input value
  $("#milestone-input").val("");
  $("#title-input").val("");
  $("#description-input").val("");
  $("#type-input").val("");
  $("#process-input").val("");
  $("#assignee-input").val("");
  $("#status-input").val("");

  hideLoadingButton("save-btn", "Save");

  // reset validation
  resetAddIssueValidator();

  initSelect2({
    name: "validation-milestone",
    placeholder: "Select milstone...",
  });

  initSelect2({
    name: "validation-type",
    placeholder: "Select type...",
  });

  initSelect2({
    name: "validation-process",
    placeholder: "Select process...",
  });

  initSelect2({
    name: "validation-assignee",
    placeholder: "Select assignee...",
  });

  initSelect2({
    name: "validation-status",
    placeholder: "Select status...",
  });

  getMilestoneListForIssueFromServer("insert");
}

function insertNewIssueToServer(milestoneId, title, description, typeId, processId, assigneeId, status) {
  issueAPI.insert({
    milestoneId, title, description, typeId, processId, assigneeId, status,
    success: function () {
      hideModal("issue-modal");
      showNotification("Create new issue", "Successfully! New issue created!");
      getIssueDataForTable(); // reload table
    },
  });
}