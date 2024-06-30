$(function () {
    initForgotPasswordFormValidator({
        submitHandler: function () {
            let email = $("#email-input").val();
            showLoadingButton("submit-btn", "Send OTP");
            sendOTPViaEmail(email);
        }
    });
});

function sendOTPViaEmail(email) {
    authAPI.resetPasswordOtp({
        email,
        success: function (_) {
            location.href = "../../pages/auth/sendResetPasswordEmailNotification.html";
        }
    })
}