$(function () {
    initLoginFormValidator({
        submitHandler: function () {
            let email = $("#email-input").val();
            let password = $("#password-input").val();
            login(email, password);
        }
    });
});

function login(email, password) {
    authAPI.login({
        email, password,
        success: function (data) {
            storage.saveUserInfo(
                data.user.id,
                data.user.fullName,
                data.user.email,
                data.user.roleName,
                data.token,
                data.refreshToken);
            location.href = '../../common/index.html';
        },
        fail: function () {
            showNotification("Login", "Wrong username or password!", false);
            $("#password-input").val("");
        }
    });
}