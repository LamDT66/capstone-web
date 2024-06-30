function openAddClassModal() {
    updateClassId = null;
    showModal("class-modal");
    resetAddClassForm();
    initAddClassFormValidator({
        submitHandler: function () {
            let name = $("#class-name-input").val();
            let startDate = $(`input[name="validation-start-date"]`).val();
            let endDate = $(`input[name="validation-end-date"]`).val();
            let status = $('input[name="status-input"]:checked').val();
            let subjectId = $("#subject-input").val();
            let semesterId = $("#semester-input").val();

            insertNewClassToServer(
                name, startDate, endDate, status, subjectId, semesterId
            );
        },
    });
}

function resetAddClassForm() {
    // set title for modal
    $("#class-modal-title").text("Add Class Modal");

    // reset input value
    $("#class-name-input").val("");
    $(`input[name="validation-start-date"]`).val("");
    $(`input[name="validation-end-date"]`).val("");
    $("#active-status-input").prop("checked", true);

    $("#subject-input").val("");
    $("#semester-input").val("");

    // show fields
    $("#subject-input").prop('disabled', false);

    // reset validation
    resetAddClassValidator();

    initSelect2({
        name: "validation-subject",
        placeholder: "Select subject...",
    });

    initSelect2({
        name: "validation-semester",
        placeholder: "Select semester...",
    });

    getSubjectListForClassFromServer("insert");
}

function insertNewClassToServer(
    name, startDate, endDate, status, subjectId, semesterId
) {
    classAPI.insert({
        name, startDate, endDate, status,
        subjectId, semesterId,
        success: function () {
            hideModal("class-modal");
            showNotification(
                "Create new Class",
                "Successfully! New class created!"
            );
            getClassDataForTable(); // reload table
        },
    });
}