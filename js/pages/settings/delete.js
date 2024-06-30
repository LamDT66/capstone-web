let deleteSettingId;

function openDeleteSettingModal(id, settingName) {
  deleteSettingId = id;
  showModal("delete-setting-modal");
  $("#delete-setting-settingName").text(settingName);
}

function deleteSettingFromServer() {
  settingAPI.delete({
    settingId: deleteSettingId,
    success: function () {
      hideModal("delete-setting-modal");
      showNotification("Delete Setting", "Successfully! Setting deleted!");
      getSettingsDataForTable(); // reload table
    },
  });
}