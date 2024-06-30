let updateProjectMilestoneId;
let oldProjectMilestoneTitleForUpdate;

function openUpdateProjectMilestoneModal(id) {
    updateProjectMilestoneId = id;
    showModal("project-milestone-modal");
    resetUpdateProjectMilestoneForm();
    initUpdateProjectMilestoneFormValidator({
        submitHandler: function () {
            let title = $("#title-input").val();
            let startDate = $(`input[name="validation-start-date"]`).val();
            let endDate = $(`input[name="validation-end-date"]`).val();
            let status = $('input[name="validation-status-project-milestone"]:checked').val();
            updateNewProjectMilestoneInfoToServer(title, startDate, endDate, status);
        },
    });
}

function resetUpdateProjectMilestoneForm() {
    // set title for modal
    $("#project-milestone-modal-title").text("Update Project Milestone Modal");

    // reset input value
    $("#title-input").val("");
    $(`input[name="validation-start-date"]`).val("");
    $(`input[name="validation-end-date"]`).val("");

    // reset validation
    resetUpdateProjectMilestoneValidator();

    getDetailProjectMilestoneFromServer();
}

function getDetailProjectMilestoneFromServer() {
    projectMilestoneAPI.getDetail({
        id: updateProjectMilestoneId,
        success: function (data) {
            oldProjectMilestoneTitleForUpdate = data.title;
            fillDetailProjectMilestoneToUpdateProjectMilestoneModal(data);
        },
    });
}

function fillDetailProjectMilestoneToUpdateProjectMilestoneModal(projectMilestone) {
    $("#title-input").val(projectMilestone.title);
    $(`input[name="validation-start-date"]`).val(projectMilestone.startDate);
    $(`input[name="validation-end-date"]`).val(projectMilestone.endDate);
    // $(`input[name="validation-status-project-milestone"]`).val(projectMilestone.status);
    if ($("#pending-status-input").val() === projectMilestone.status) {
        $("#pending-status-input").prop("checked", true);
    } else if ($("#onGoing-status-input").val() === projectMilestone.status) {
        $("#onGoing-status-input").prop("checked", true);
    } else {
        $("#closed-status-input").prop("checked", true);
    }
}

function updateNewProjectMilestoneInfoToServer(title, startDate, endDate, status) {
    projectMilestoneAPI.update({
        id: updateProjectMilestoneId,
        title,
        startDate,
        endDate,
        status,
        projectId: projectId,
        success: function () {
            hideModal("project-milestone-modal");
            showNotification(
                "Update Project Milestone",
                "Successfully! Project milestone updated!"
            );
            getProjectMilestonesDataForTable(projectId); // reload table
        },
    });
}