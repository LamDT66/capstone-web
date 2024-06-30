let deleteProjectSettingId;

function openDeleteProjectSettingModal(id, projectSettingName) {
    deleteProjectSettingId = id;
    showModal("delete-project-setting-modal");
    $("#delete-setting-projectSettingName").text(projectSettingName);
}

function deleteProjectSettingFromServer() {
    projectSettingAPI.delete({
        projectSettingId: deleteProjectSettingId,
        success: function () {
            hideModal("delete-project-setting-modal");
            showNotification("Delete Project Setting", "Successfully! Project Setting deleted!");
            getProjectSettingsDataForTable(projectId); // reload table
        },
    });
}