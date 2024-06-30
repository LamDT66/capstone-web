let updateIssueId;

function openUpdateIssueModal(id) {
    updateIssueId = id;
    showModal("issue-modal");
    resetUpdateIssueForm();
    initUpdateIssueFormValidator({
        submitHandler: function () {
            let milestone = $("#milestone-input").val();
            let title = $("#title-input").val();
            let description = $("#description-input").val();
            let type = $("#type-input").val();
            let process = $("#process-input").val();
            let assignee = $("#assignee-input").val();
            let status = $("#status-input").val();

            showLoadingButton("save-btn", "Save");
            updateNewIssueInfoToServer(milestone, title, description, type, process, assignee, status);
        },
    });
}

function resetUpdateIssueForm() {
    // set title for modal
    $("#issue-modal-title").text("Update Issue Modal");

    // reset input value
    $("#milestone-input").val("");
    $("#title-input").val("");
    $("#description-input").val("");
    $("#type-input").val("");
    $("#process-input").val("");
    $("#assignee-input").val("");
    $("#status-input").val("");

    hideLoadingButton("save-btn", "Save");

    // reset validaion
    resetUpdateIssueValidator();

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

    getMilestoneListForIssueFromServer("update");
}

function getDetailIssueFromServer() {
    issueAPI.getDetail({
        issueId: updateIssueId,
        success: function (data) {
            fillDetailIssueToUpdateIssueModal(data);
        },
    });
}

function fillDetailIssueToUpdateIssueModal(issue) {
    $("#milestone-input").val(issue.milestoneId).change();
    $("#title-input").val(issue.title).change();
    $("#description-input").val(issue.description).change();
    $("#type-input").val(issue.typeId).change();
    $("#process-input").val(issue.processId).change();
    $("#assignee-input").val(issue.assigneeId).change();
    $("#status-input").val(issue.status).change();
}

function updateNewIssueInfoToServer(
    milestoneId, title, description, typeId, processId, assigneeId, status
) {
    issueAPI.update({
        issueId: updateIssueId,
        milestoneId, title, description, typeId, processId, assigneeId, status,
        success: function () {
            hideModal("issue-modal");
            showNotification("Update Issue", "Successfully! Issue updated!");
            getIssueDataForTable(); // reload table
        },
    });
}