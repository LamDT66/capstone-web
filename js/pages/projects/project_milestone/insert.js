function openAddProjectMilestoneModal() {
  showModal("project-milestone-modal");
  resetAddProjectMilestoneForm();
  initAddProjectMilestoneFormValidator({
    submitHandler: function () {
      let title = $("#title-input").val();
      let startDate = $(`input[name="validation-start-date"]`).val();
      let endDate = $(`input[name="validation-end-date"]`).val();
      let status = $('input[name="validation-status-project-milestone"]:checked').val();
      console.log(status);
      insertNewProjectMilestoneToServer(title, startDate, endDate, status);
    },
  });
}

function resetAddProjectMilestoneForm() {
  // set title for modal
  $("#project-milestone-modal-title").text("Add Project Milestone Modal");

  // reset input value
  $("#title-input").val("");
  $(`input[name="validation-start-date"]`).val("");
  $(`input[name="validation-end-date"]`).val("");

  // reset validation
  resetAddProjectMilestoneValidator();
}

function insertNewProjectMilestoneToServer(title, startDate, endDate, status) {
  projectMilestoneAPI.insert({
    title,
    startDate,
    endDate,
    status,
    projectId,
    success: function () {
      hideModal("project-milestone-modal");
      showNotification(
        "Create new Project Milestone",
        "Successfully! New project milestone created!"
      );
      getProjectMilestonesDataForTable(projectId); // reload table
    },
  });
}
