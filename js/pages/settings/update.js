let updateSettingId;
let oldSettingTypeForUpdate;
let oldSettingNameForUpdate;
let oldSettingDisplayOrderForUpdate;

function openUpdateSettingModal(id) {
  updateSettingId = id;
  showModal("setting-modal");
  resetUpdateSettingForm();
  initUpdateSettingFormValidator({
    submitHandler: function () {
      let settingType = $("#settingType-input").val();
      let settingName = $("#settingName-input").val();
      let settingDisplayOrder = $("#settingOrder-input").val();
      updateNewSettingInfoToServer(settingType, settingName, settingDisplayOrder);
    },
  });
}

function resetUpdateSettingForm() {
  // set title for modal
  $("#setting-modal-title").text("Update Setting Modal");

  // reset input value
  $("#settingType-input").val("");
  $("#settingName-input").val("");
  $("#settingOrder-input").val("");

  // reset validaion
  resetUpdateSettingValidator();

  initSelect2({
    name: "validation-settingType",
    placeholder: "Select type...",
  });

  getSettingTypesFromServer(true);
}

function getDetailSettingFromServer() {
  settingAPI.getDetail({
    settingId: updateSettingId,
    success: function (data) {
      oldSettingTypeForUpdate = data.settingType;
      oldSettingNameForUpdate = data.settingName;
      oldSettingDisplayOrderForUpdate = data.settingDisplayOrder;
      fillDetailSettingToUpdateSettingModal(data);
    },
  });
}

function fillDetailSettingToUpdateSettingModal(setting) {
  $("#settingType-input").val(setting.settingType).change();
  $("#settingName-input").val(setting.settingName).change();
  $("#settingOrder-input").val(setting.settingDisplayOrder).change();
}

function updateNewSettingInfoToServer(settingType, settingName, settingDisplayOrder) {
  settingAPI.update({
    settingId: updateSettingId,
    settingType,
    settingName,
    settingDisplayOrder,
    success: function () {
      hideModal("setting-modal");
      showNotification("Update Setting", "Successfully! Setting updated!");
      getSettingsDataForTable(); // reload table
    },
  });
}
