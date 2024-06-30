let oldProfileMobile;

function openUpdateProfile() {
    resetUpdateProfileForm();
    initUpdateProfileFormValidator({
        submitHandler: function () {
            let fullName = $("#name-input").val();
            let gender;
            if ($("#male-gender-input").is(":checked") === true) {
                gender = $("#male-gender-input").val();
            } else if ($("#female-gender-input").is(":checked") === true) {
                gender = $("#female-gender-input").val();
            } else if ($("#other-gender-input").is(":checked") === true) {
                gender = $("#other-gender-input").val();
            }
            let facultyId = $("#faculty-input").val();
            let mobile = $("#mobile-input").val();

            updateNewProfileInfoToServer(fullName, gender, facultyId, mobile);
        },
    });
}

function resetUpdateProfileForm() {
    // reset input value
    $("#name-input").val("");
    $("#male-gender-input").prop("checked", false);
    $("#female-gender-input").prop("checked", false);
    $("#other-gender-input").prop("checked", false);
    $("#faculty-input").val("");
    $("#role-input").val("");
    $("#mobile-input").val("");
    $("#email-input").val("");

    // disable fields
    $("#email-input").attr("disabled", true);
    $("#role-input").attr("disabled", true);

    initSelect2({
        name: "faculty-input",
        placeholder: "Select faculty...",
    });

    initSelect2({
        name: "role-input",
        placeholder: "Select role...",
    });

    resetUpdateProfileValidator();

    getFacultyForProfileFromServer("profile");
}

function getProfileFromServer() {
    userAPI.getProfile({
        success: function (data) {
            oldProfileMobile = data.mobile;
            fillProfile(data);
        },
    });
}

function fillProfile(profile) {
    $("#name-input").val(profile.fullName).change();

    // gender
    if ($("#male-gender-input").val() === profile.gender) {
        $("#male-gender-input").prop("checked", true);
    } else if ($("#female-gender-input").val() === profile.gender) {
        $("#female-gender-input").prop("checked", true);
    } else if ($("#other-gender-input").val() === profile.gender) {
        $("#other-gender-input").prop("checked", true);
    }

    $("#faculty-input").val(profile.facultyId).change();
    $("#role-input").val(profile.roleId).change();
    $("#mobile-input").val(profile.mobile).change();
    $("#email-input").val(profile.email).change();
}

function updateNewProfileInfoToServer(fullName, gender, facultyId, mobile) {
    userAPI.updateProfile({
        fullName: fullName,
        gender: gender,
        facultyId: facultyId,
        mobile: mobile,
        success: function (data) {
            showNotification("Update Profile", "Success!", true);
        },
    });
}
