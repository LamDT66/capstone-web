let storage = {
    saveUserInfo: function (id, fullname, email, role, token, refreshToken) {
        localStorage.setItem(Constant.ID, id);
        localStorage.setItem(Constant.FULLNAME, fullname);
        localStorage.setItem(Constant.EMAIL, email);
        localStorage.setItem(Constant.ROLE, role);
        localStorage.setItem(Constant.TOKEN, token);
        localStorage.setItem(Constant.REFRESH_TOKEN, refreshToken);
    },
    removeUserInfo: function () {
        localStorage.removeItem(Constant.ID);
        localStorage.removeItem(Constant.FULLNAME);
        localStorage.removeItem(Constant.EMAIL);
        localStorage.removeItem(Constant.ROLE);
        localStorage.removeItem(Constant.TOKEN);
        localStorage.removeItem(Constant.REFRESH_TOKEN);
    },
    saveNewToken: function (token, refreshToken) {
        localStorage.setItem(Constant.TOKEN, token);
        localStorage.setItem(Constant.REFRESH_TOKEN, refreshToken);
    },
    getToken: function () {
        return localStorage.getItem(Constant.TOKEN);
    },
    getRefreshToken: function () {
        return localStorage.getItem(Constant.REFRESH_TOKEN);
    },
    getFullName: function () {
        return localStorage.getItem(Constant.FULLNAME);
    },
    getRole: function () {
        return localStorage.getItem(Constant.ROLE);
    },
    isLogin: function () {
        return localStorage.getItem(Constant.TOKEN) != null;
    }
}