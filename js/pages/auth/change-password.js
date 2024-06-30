function openChangePasswordModel() {
    resetChangePasswordForm();
    initChangePasswordFormValidator({
        submitHandler: function () {
            let oldPassword = $("#old-password-input").val();
            let newPassword = $("#new-password-input").val();
            changePassword(oldPassword, newPassword);
        }
    });
};

function resetChangePasswordForm() {
    //reset input value
    $("#old-password-input").val("");
    $("#new-password-input").val("");
    $("#confirm-password-input").val("");

    //reseet validation
    resetChangePasswordFormValidator();
}

function changePassword(oldPassword, newPassword) {
    authAPI.changePassword({
        oldPassword, newPassword,
        success: function (_, _, response) {
            // fail
            if (response.status == 401) {
                showNotification("Change Password", "Fail! Please login again!", false);
                $("#old-password-input").val("");
                $("#new-password-input").val("");
                $("#confirm-password-input").val("");
            } else {
                // success
                showNotification("Change Password", "Success!", true);
            }
        }
    })
}