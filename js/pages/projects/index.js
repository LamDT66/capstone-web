function loadProjectPage() {
    $("#content").load("../pages/projects/projects.html", function () {
        feather.replace();
        projectCommonForProjectPage();
        refreshProjectTable();
    });
}

function projectCommonForProjectPage() {
    // common setting s
    $('[data-toggle="tooltip"]').tooltip();
}
