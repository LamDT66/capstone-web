function loadUpdateUserProfile() {
    $("#content").load("../pages/user-profile/update-profile.html", function () {
        feather.replace();
        openUpdateProfile();
    });
}