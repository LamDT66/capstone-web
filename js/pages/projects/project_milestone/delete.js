let deleteProjectMilestoneId;

function openDeleteProjectMilestoneModal(id, title, status) {
    if(status !== 'PENDING'){
        showNotification("Delete Project Milestone", "Failed! Can only delete PENDING status!", false);
    } else {
        deleteProjectMilestoneId = id;
    showModal("delete-project-milestone-modal");
    $("#delete-milestone-title").text(title);
    }
}

function deleteProjectMilestoneFromServer() {
    projectMilestoneAPI.delete({
        id: deleteProjectMilestoneId,
        success: function () {
            hideModal("delete-project-milestone-modal");
            showNotification("Delete Project Milestone", "Successfully! Project Milestone deleted!");
            getProjectMilestonesDataForTable(projectId); // reload table
        },
    });
}