function getUserRolesFromServer(mode) {
  settingAPI.getAllUserRoles({
    success: function (data) {
      // success
      fillUserRolesToSelectRole(data, mode);
    },
  });
}

function fillUserRolesToSelectRole(roles, mode) {
  let rows = "<option value=''>Select role...</option>";

  for (const role of roles) {
    let row = `<option value='${role.id}'>${role.name}</option>`;
    rows += row;
  }
  if (mode == "filter") {
    $("#role-input-filter").empty();
    $("#role-input-filter").append(rows);
  } else {
    $("#role-input").empty();
    $("#role-input").append(rows);
    if (mode == 'update') getDetailUserFromServer();
  }
}