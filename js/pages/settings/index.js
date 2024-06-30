function loadSettingPage() {
  $("#content").load("../pages/settings/settings.html", function () {
    feather.replace();
    settingCommonForSettingPage();
    resetSettingSort();
    resetSettingPaging();
    resetSettingSearch();
    getSettingsDataForTable();
  });
}

function settingCommonForSettingPage() {
  // common settings
  $('[data-toggle="tooltip"]').tooltip();
}
