function openAddSettingModal() {
  showModal("setting-modal");
  resetAddSettingForm();
  initAddSettingFormValidator({
    submitHandler: function () {
      let settingType = $("#settingType-input").val();
      let settingName = $("#settingName-input").val();
      let settingDisplayOrder = $("#settingOrder-input").val();
      insertNewSettingToServer(settingType, settingName, settingDisplayOrder);
    },
  });
}

function resetAddSettingForm() {
  // set title for modal
  $("#setting-modal-title").text("Add Setting Modal");

  // reset input value
  $("#settingType-input").val("");
  $("#settingName-input").val("");
  $("#settingOrder-input").val("");

  // reset validation
  resetAddSettingValidator();

  initSelect2({
    name: "validation-settingType",
    placeholder: "Select type...",
  });

  getSettingTypesFromServer(false);
}

function insertNewSettingToServer(settingType, settingName, settingDisplayOrder) {
  settingAPI.insert({
    settingType,
    settingName,
    settingDisplayOrder,
    success: function () {
      hideModal("setting-modal");
      showNotification(
        "Create new Setting",
        "Successfully! New setting created!"
      );
      getSettingsDataForTable(); // reload table
    },
  });
}
