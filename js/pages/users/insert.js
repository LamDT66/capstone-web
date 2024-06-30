function openAddUserModal() {
    showModal("user-modal");
    resetAddUserForm();
    initAddUserFormValidator({
        submitHandler: function () {
            let fullName = $("#fullName-input").val();
            let gender = $('input[name="gender-input"]:checked').val();
            let email = $("#email-input").val();
            let mobile = $("#mobile-input").val();
            let role = $("#role-input").val();
            let status = $('input[name="status-input"]:checked').val();

            showLoadingButton("save-btn", "Save");

            insertNewUserToServer(
                fullName,
                gender,
                email,
                mobile,
                role,
                status
            );
        },
    });
}

function resetAddUserForm() {
    // set title for modal
    $("#user-modal-title").text("Add User Modal");
    hideLoadingButton("save-btn", "Save");

    // reset input value
    $("#fullName-input").val("");
    $("#male-gender-input").prop("checked", true);
    $("#email-input").val("");
    $("#mobile-input").val("");
    $("#role-input").val("");
    $("#active-status-input").prop("checked", true);

    // enable fields
    $("#fullName-input").prop('disabled', false);
    $('input[name=gender-input]').attr("disabled", false);
    $("#email-input").prop('disabled', false);
    $("#mobile-input").prop('disabled', false);

    // reset validation
    resetAddUserValidator();

    initSelect2({
        name: "validation-gender",
        placeholder: "Select gender...",
    });

    initSelect2({
        name: "validation-role",
        placeholder: "Select role...",
    });

    getUserRolesFromServer("insert");
}

function insertNewUserToServer(
    fullName,
    gender,
    email,
    mobile,
    role,
    status
) {
    userAPI.insert({
        fullName,
        gender,
        email,
        mobile,
        role,
        status,
        success: function () {
            hideLoadingButton("save-btn", "Save");
            hideModal("user-modal");
            showNotification(
                "Create new User",
                "Successfully! New user created!"
            );
            getUsersDataForTable(); // reload table
        },
    });
}
