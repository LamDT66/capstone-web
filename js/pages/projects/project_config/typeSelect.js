function getProjectSettingTypesFromServer(isUpdateModal){
    projectSettingAPI.getAllTypes({
        success: function(data){
            fillProjectSettingTypesToSelectProjectSettingOfAddProjectSettingModal(data, isUpdateModal);
        }
    });
}

function fillProjectSettingTypesToSelectProjectSettingOfAddProjectSettingModal(projectSettingTypes, isUpdateModal){
    let rows = "<option value=''>Select type...</option>";

    for(const projectSettingType of projectSettingTypes){
        let row = `<option value="${projectSettingType}">${projectSettingType}</option>`;
        rows += row;
    }
    $("#projectSettingType-input").empty();
    $("#projectSettingType-input").append(rows);
    if(isUpdateModal) getDetailProjectSettingFromServer();
}