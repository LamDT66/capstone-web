$(function () {
    initRegisterFormValidator({
        submitHandler: function () {
            let fullName = $("#fullName-input").val();
            let email = $("#email-input").val();
            let password = $("#password-input").val();
            showLoadingButton("submit-register-btn", "Sign up");
            register(fullName, email, password);
        }
    });
});

function register(fullName, email, password) {
    authAPI.register({
        fullName, email, password,
        success: function (_, _, _) {
            // success
            location.href = "../../pages/auth/sendRegistrationEmailNotification.html";
        }
    })
}