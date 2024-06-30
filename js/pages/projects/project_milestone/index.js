function loadProjectMilestonePage(id) {
    projectId = id;
    $("#content").load(
        "../pages/projects/project_milestone/project-milestone.html",
        function () {
            feather.replace();
            projectMilestoneCommonForProjectMilestonePage();
            resetProjectMilestoneSort();
            resetProjectMilestonePaging();
            resetProjectMilestoneSearch();
            getProjectMilestonesDataForTable(projectId);

            let role = storage.getRole();
            if (role == Constant.ROLE_STUDENT) {
              $("#add-milestone-button").hide();
              $("#action-column").hide();
            } else {
              $("#add-milestone-button").show();
              $("#action-column").show();
            }
        }
    );
}

function projectMilestoneCommonForProjectMilestonePage() {
    // common settings
    $('[data-toggle="tooltip"]').tooltip();

    $('#end-date-input').datetimepicker({
        format: 'YYYY-MM-DD'
    });

    $('#start-date-input').datetimepicker({
        format: 'YYYY-MM-DD'
    });
}
