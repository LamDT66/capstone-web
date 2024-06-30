let updateUserId;

function openUpdateUserModal(id) {
    updateUserId = id;
    showModal("user-modal");
    resetUpdateUserForm();
    initUpdateUserFormValidator({
        submitHandler: function () {
            let role = $("#role-input").val();
            let status;
            if ($("#active-status-input").is(":checked") === true) {
                status = $("#active-status-input").val();
            } else if ($("#inactive-status-input").is(":checked") === true) {
                status = $("#inactive-status-input").val();
            }
            updateNewUserInfoToServer(
                role,
                status
            );
        },
    });
}

function resetUpdateUserForm() {
    // set title for modal
    $("#user-modal-title").text("Update User Modal");
    hideLoadingButton("save-btn", "Save");

    // reset input value
    $("#fullName-input").val("");
    $("#male-gender-input").prop("checked", true);
    $("#email-input").val("");
    $("#mobile-input").val("");
    $("#role-input").val("");
    $("#active-status-input").prop("checked", true);

    // disable fields
    $("#fullName-input").prop('disabled', true);
    $('input[name=gender-input]').attr("disabled", true);
    $("#email-input").prop('disabled', true);
    $("#mobile-input").prop('disabled', true);

    // reset validation
    resetUpdateUserValidator();

    initSelect2({
        name: "validation-gender",
        placeholder: "Select gender...",
    });

    initSelect2({
        name: "validation-role",
        placeholder: "Select role...",
    });

    initSelect2({
        name: "validation-status",
        placeholder: "Select status...",
    });

    getUserRolesFromServer("update");
}

function getDetailUserFromServer() {
    userAPI.getDetail({
        userId: updateUserId,
        success: function (data) {
            fillDetailUserToUpdateUserModal(data);
        },
    });
}

function fillDetailUserToUpdateUserModal(user) {
    // fullname
    $("#fullName-input").val(user.fullName).change();
    // gender
    if ($("#male-gender-input").val() === user.gender) {
        $("#male-gender-input").prop("checked", true);
    } else if ($("#female-gender-input").val() === user.gender) {
        $("#female-gender-input").prop("checked", true);
    } else {
        $("#other-gender-input").prop("checked", true);
    }
    // email
    $("#email-input").val(user.email).change();
    // mobile
    $("#mobile-input").val(user.mobile).change();
    // role
    $("#role-input").val(user.roleId).change();
    // status
    if ($("#active-status-input").val() === user.status) {
        $("#active-status-input").prop("checked", true);
    } else {
        $("#inactive-status-input").prop("checked", true);
    }
}

function updateNewUserInfoToServer(
    role,
    status
) {
    userAPI.update({
        userId: updateUserId,
        role,
        status,
        success: function () {
            hideModal("user-modal");
            showNotification("Update User", "Successfully! User updated!");
            getUsersDataForTable(); // reload table User Page;
        },
    });
}
