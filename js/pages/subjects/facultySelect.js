function getFacultiesFromServer(mode) {
  settingAPI.getAllFacultiesForSelection({
    success: function (data) {
      // success
      fillFacultiesToSelectSubject(data, mode);
      getManagersFromServer(mode);
    },
  });
}

function fillFacultiesToSelectSubject(faculties, mode) {
  let rows = "<option value=''>Select faculty...</option>";

  for (const faculty of faculties) {
    let row = `<option value="${faculty.id}">${faculty.settingName}</option>`;
    rows += row;
  }
  $("#faculty-input").empty();
  $("#faculty-input").append(rows);
}