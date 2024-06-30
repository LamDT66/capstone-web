let updateProjectId;

function loadProjectInfoPage(id) {
  updateProjectId = id;
  $("#content").load(
    "../pages/projects/project_info/project_info.html",
    function () {
      feather.replace();
      getProjectDetail(updateProjectId);
    }
  );
}

function loadUpdateProjectInfoPage() {
  $("#content").load(
    "../pages/projects/project_info/update_project_info.html",
    function () {
      feather.replace();
      openUpdateProject(updateProjectId);
    }
  );
}

function loadAddProjectInfoPage() {
  $("#content").load(
    "../pages/projects/project_info/add_project_info.html",
    function () {
      feather.replace();
      openAddProject(updateProjectId);
    }
  );
}