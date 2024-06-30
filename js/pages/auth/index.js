function loadChangePasswordPage() {
    $("#content").load("../pages/auth/change-password.html", function () {
        feather.replace();
        openChangePasswordModel();
        settingCommonForChangePasswordPage();
    });
}

function settingCommonForChangePasswordPage() {
    // common settings
    $('[data-toggle="tooltip"]').tooltip();
}