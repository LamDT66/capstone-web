function getSettingTypesFromServer(isUpdateModal) {
  settingAPI.getAllTypes({
    success: function (data) {
      // success
      fillSettingTypesToSelectSettingOfAddSettingModal(data, isUpdateModal);
    },
  });
}

function fillSettingTypesToSelectSettingOfAddSettingModal(
  settingTypes,
  isUpdateModal
) {
  let rows = "<option value=''>Select type...</option>";

  for (const settingType of settingTypes) {
    let row = `<option value="${settingType}">${settingType}</option>`;
    rows += row;
  }
  $("#settingType-input").empty();
  $("#settingType-input").append(rows);
  if (isUpdateModal) getDetailSettingFromServer();
}
