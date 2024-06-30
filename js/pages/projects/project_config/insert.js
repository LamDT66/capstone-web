function openAddProjectSettingModal(projectId){ 
    showModal("project-setting-modal");
    resetAddProjectSettingForm();
    initAddProjectSettingFormValidator({
        projectId,
        submitHandler: function () {
            let projectSettingType = $("#projectSettingType-input").val();
            let projectSettingName = $("#projectSettingName-input").val();
            insertNewProjectSettingToServer(projectSettingType, projectSettingName);
        },
    });
}

function resetAddProjectSettingForm() {
    // set title for modal
    $("#project-setting-modal-title").text("Add Project Setting Modal");

    // reset input value
    $("#projectSettingType-input").val("");
    $("#projectSettingName-input").val("");

    // reset validation
    resetAddProjectSettingValidator();

    initSelect2({
        name: "validation-settingType",
        placeholder: "Select type...",
    });

    getProjectSettingTypesFromServer(false);
}

function insertNewProjectSettingToServer(projectSettingType, projectSettingName) {
    projectSettingAPI.insert({
        projectSettingType,
        projectSettingName,
        projectId,
        success: function () {
            hideModal("project-setting-modal");
            showNotification(
                "Create new Project Setting",
                "Successfully! New project setting created!"
            );
            getProjectSettingsDataForTable(projectId); // reload table
        },
    });
}