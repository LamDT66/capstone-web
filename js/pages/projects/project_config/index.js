let projectId;

function loadProjectConfigPage(id){
    projectId = id;
    $("#content").load("../pages/projects/project_config/project-settings.html", function () {
        feather.replace();
        projectSettingCommonForProjectSettingPage();
        resetProjectSettingSort();
        resetProjectSettingPaging();
        resetProjectSettingSearch();
        getProjectSettingsDataForTable(projectId);
    });
}

function projectSettingCommonForProjectSettingPage() {
    // common settings
    $('[data-toggle="tooltip"]').tooltip();
}