$(function () {
    initResetPasswordFormValidator({
        submitHandler: function () {
            let password = $("#password-input").val();
            let otp = $("#otp-input").val();
            resetPasswordFromServer(password, otp);
        }
    });
});

function resetPasswordFromServer(password, otp) {
    authAPI.resetPassword({
        password,
        otp,
        success: function (_) {
            location.href = "../../pages/auth/login.html";
        }
    });
}