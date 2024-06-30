function getFacultyForProfileFromServer(mode) {
  settingAPI.getAllFacultiesForSelection({
    success: function (data) {
      fillFacultiesToProfile(data);
      getUserRolesForProfileFromServer(mode);
    },
  });
}

function fillFacultiesToProfile(faculties) {
  let rows = "<option value=''>Select faculty...</option>";

  for (const faculty of faculties) {
    let row = `<option value="${faculty.id}">${faculty.settingName}</option>`;
    rows += row;
  }
  $("#faculty-input").empty();
  $("#faculty-input").append(rows);
}

function getUserRolesForProfileFromServer(mode) {
  settingAPI.getAllUserRoles({
    success: function (data) {
      fillUserRolesToProfile(data);
    },
  });
}

function fillUserRolesToProfile(roles) {
  let rows = "<option value=''>Select role...</option>";

  for (const role of roles) {
    let row = `<option value='${role.id}'>${role.name}</option>`;
    rows += row;
  }

  $("#role-input").empty();
  $("#role-input").append(rows);

  getProfileFromServer();
}
