let updateClassId;
let oldClassNameForUpdatingClass;

function openUpdateClassModal(id) {
    updateClassId = id;
    showModal("class-modal");
    resetUpdateClassForm();
    initUpdateClassFormValidator({
        submitHandler: function () {
            let name = $("#class-name-input").val();
            let startDate = $(`input[name="validation-start-date"]`).val();
            let endDate = $(`input[name="validation-end-date"]`).val();
            let status = $('input[name="status-input"]:checked').val();
            let subjectId = $("#subject-input").val();
            let semesterId = $("#semester-input").val();

            updateNewClassInfoToServer(
                name, startDate, endDate, status, subjectId, semesterId
            );
        },
    });
}

function resetUpdateClassForm() {
    // set title for modal
    $("#class-modal-title").text("Update Class Modal");

    // reset input value
    $("#class-name-input").val("");
    $(`input[name="validation-start-date"]`).val("");
    $(`input[name="validation-end-date"]`).val("");
    $("#active-status-input").prop("checked", true);

    $("#subject-input").val("");
    $("#semester-input").val("");

    // disable fields
    $("#subject-input").prop('disabled', true);

    // reset validation
    resetUpdateClassValidator();

    initSelect2({
        name: "validation-subject",
        placeholder: "Select subject...",
    });

    initSelect2({
        name: "validation-semester",
        placeholder: "Select semester...",
    });

    getSubjectListForClassFromServer("update");
}

function getDetailClassFromServer() {
    classAPI.getDetail({
        classId: updateClassId,
        success: function (data) {
            fillDetailClassToUpdateClassModal(data);
        },
    });
}

function fillDetailClassToUpdateClassModal(clazz) {
    // name
    $("#class-name-input").val(clazz.name).change();
    // date
    $(`input[name="validation-start-date"]`).val(clazz.startDate);
    $(`input[name="validation-end-date"]`).val(clazz.endDate);
    // status
    if ($("#active-status-input").val() === clazz.status) {
        $("#active-status-input").prop("checked", true);
    } else {
        $("#inactive-status-input").prop("checked", true);
    }
    // subject
    $("#subject-input").val(clazz.subjectId).change();
    // semester
    $("#semester-input").val(clazz.semesterId).change();

    oldClassNameForUpdatingClass = clazz.name;
}

function updateNewClassInfoToServer(
    name, startDate, endDate, status, subjectId, semesterId
) {
    classAPI.update({
        classId: updateClassId,
        name, startDate, endDate, status, subjectId, semesterId,
        success: function () {
            hideModal("class-modal");
            showNotification("Update Class", "Successfully! Class updated!");
            getClassDataForTable(); // reload table Class Page;
        },
    });
}
