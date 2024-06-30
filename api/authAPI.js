let loginUrl = `${baseUrl}/auth/login`;
let refreshTokenUrl = `${baseUrl}/auth/refreshToken`;
let registerUrl = `${baseUrl}/auth/register`;
let resetPasswordOtpUrl = `${baseUrl}/auth/reset-password-otp`;
let resetPasswordUrl = `${baseUrl}/auth/reset-password`;
let changePasswordUrl = `${baseUrl}/auth/change-password`;

let authAPI = {
    login: function ({ email, password, success, fail }) {
        let credential = {
            "email": email,
            "password": password
        }
        $.ajax({
            url: loginUrl,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(credential),
            dataType: 'json',
            success: success,
            error(jqXHR, _, errorThrown) {
                if (jqXHR.status == 401) {
                    fail();
                    return;
                }
                if (jqXHR.status == 406) {
                    showNotification("Login", "Fail! The User is inactive", false);
                    return;
                }
                handleCommonAPIError("Login", jqXHR, errorThrown, null);
            }
        });
    },
    refreshToken: function (continueingAPI) {
        $.ajax({
            url: `${refreshTokenUrl}?refreshToken=${storage.getRefreshToken()}`,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
                storage.saveNewToken(data.token, data.refreshToken);
                // continuingly calling API with new token
                continueingAPI();
            },
            error(jqXHR, _, errorThrown) {
                // refresh token is expired
                if (jqXHR.status == 400) {
                    // login again
                    location.href = '../pages/auth/login.html';
                    return;
                }
                // error
                handleCommonAPIError("refreshToken", jqXHR, errorThrown, null);
            }
        });
    },
    register: function ({ fullName, email, password, success }) {
        let newUser = {
            "fullName": fullName,
            "email": email,
            "password": password,
        }
        $.ajax({
            url: registerUrl,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(newUser),
            dataType: 'text',
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError("Register", jqXHR, errorThrown, null);
            }
        });
    },
    changePassword: function ({ oldPassword, newPassword, success }) {
        let credential = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        $.ajax({
            url: changePasswordUrl,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(credential),
            dataType: 'text',
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Change Password",
                    jqXHR, errorThrown,
                    () => authAPI.changePassword({ oldPassword, newPassword, success }));
            }
        });
    },
    resetPasswordOtp: function ({ email, success }) {
        let credential = {
            "email": email
        }
        $.ajax({
            url: resetPasswordOtpUrl,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(credential),
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Reset Password OTP",
                    jqXHR, errorThrown,
                    null);
            }
        });
    },
    resetPassword: function ({ password, otp, success }) {
        let credential = {
            "newPassword": password,
            "otp": otp
        }
        $.ajax({
            url: resetPasswordUrl,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(credential),
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Reset Password",
                    jqXHR, errorThrown,
                    null);
            }
        });
    },
}

function handleCommonAPIError(functionName, jqXHR, errorThrown, continueingAPI) {
    // token is expired
    if (jqXHR.status == 401 && continueingAPI) {
        authAPI.refreshToken(continueingAPI);
        return;
    }

    // forbidden
    if (jqXHR.status == 403) {
        location.href = '../common/page-403.html';
        return;
    }

    // internal server
    if (jqXHR.status == 500) {
        // location.href = '../common/page-500.html';
        return;
    }

    // error
    showNotification(functionName, "Fail! There is a error!", false);
    console.log(jqXHR);
    console.log(errorThrown);
}