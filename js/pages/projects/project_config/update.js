let updateProjectSettingId;
let oldProjectSettingNameForUpdate;
let oldProjectSettingTypeForUpdate;

function openUpdateProjectSettingModal(id) {
    updateProjectSettingId = id;
    showModal("project-setting-modal");
    resetUpdateProjectSettingForm();
    initUpdateProjectSettingFormValidator({
        submitHandler: function () {
            let settingType = $("#projectSettingType-input").val();
            let settingName = $("#projectSettingName-input").val();
            updateNewProjectSettingInfoToServer(settingType, settingName);
        },
    });
}

function resetUpdateProjectSettingForm() {
    // set title for modal
    $("#project-setting-modal-title").text("Update Project Setting Modal");

    // reset input value
    $("#projectSettingType-input").val("");
    $("#projectSettingName-input").val("");

    // reset validaion
    resetUpdateProjectSettingValidator();

    initSelect2({
        name: "validation-projectSettingType",
        placeholder: "Select type...",
    });

    getProjectSettingTypesFromServer(true);
}

function getDetailProjectSettingFromServer() {
    projectSettingAPI.getDetail({
        projectSettingId: updateProjectSettingId,
        success: function (data) {
            oldProjectSettingNameForUpdate = data.settingName;
            oldProjectSettingTypeForUpdate = data.settingType;
            fillDetailProjectSettingToUpdateProjectSettingModal(data);
        },
    });
}

function fillDetailProjectSettingToUpdateProjectSettingModal(projectSetting) {
    $("#projectSettingType-input").val(projectSetting.settingType).change();
    $("#projectSettingName-input").val(projectSetting.settingName);
}

function updateNewProjectSettingInfoToServer(projectSettingType, projectSettingName) {
    projectSettingAPI.update({
        projectSettingId: updateProjectSettingId,
        projectSettingType,
        projectSettingName,
        projectId: projectId,
        success: function () {
            hideModal("project-setting-modal");
            showNotification("Update Project Setting", "Successfully! Project Setting updated!");
            getProjectSettingsDataForTable(projectId); // reload table
        },
    });
}