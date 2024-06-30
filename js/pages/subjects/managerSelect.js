function getManagersFromServer(mode) {
  userAPI.getAllManagers({
    success: function (data) {
      // success
      fillManagersToSelectSubject(data, mode);
    },
  });
}

function fillManagersToSelectSubject(managers, mode) {
  let rows = "<option value=''>Select manager...</option>";

  for (const manager of managers) {
    let row = `<option value="${manager.id}">${manager.fullName}</option>`;
    rows += row;
  }
  $("#manager-input").empty();
  $("#manager-input").append(rows);
  if (mode == "update") getDetailSubjectFromServer();
}