let updateSubjectId;
let oldSubjectNameForUpdate;

function openUpdateSubjectModal(id) {
    updateSubjectId = id;
    showModal("subject-modal");
    resetUpdateSubjectForm();
    initUpdateSubjectFormValidator({
        submitHandler: function () {
            let name = $("#subject-name-input").val();
            let faculty = $("#faculty-input").val();
            let duration = $("#duration-input").val();
            let manager = $("#manager-input").val();
            let status = $('input[name="status-input"]:checked').val();
            updateNewSubjectInfoToServer(
                name,
                faculty,
                duration,
                manager,
                status
            );
        },
    });
}

function resetUpdateSubjectForm() {
    // set title for modal
    $("#subject-modal-title").text("Update Subject Modal");

    // reset input value
    $("#subject-name-input").val("");
    $("#faculty-input").val("");
    $("#duration-input").val("");
    $("#manager-input").val("");
    $("#active-status-input").prop("checked", true);

    // reset validaion
    resetUpdateSubjectValidator();

    initSelect2({
        name: "validation-manager",
        placeholder: "Select manager...",
    });

    initSelect2({
        name: "validation-faculty",
        placeholder: "Select faculty...",
    });

    getFacultiesFromServer("update");
}

function getDetailSubjectFromServer() {
    subjectAPI.getDetail({
        subjectId: updateSubjectId,
        success: function (data) {
            oldSubjectNameForUpdate = data.name;
            fillDetailSubjectToUpdateSubjectModal(data);
        },
    });
}

function fillDetailSubjectToUpdateSubjectModal(subject) {
    $("#subject-name-input").val(subject.name).change();
    $("#faculty-input").val(subject.facultyId).change();
    $("#duration-input").val(subject.duration).change();
    $("#manager-input").val(subject.managerId).change();
    // status
    if ($("#active-status-input").val() === subject.status) {
        $("#active-status-input").prop("checked", true);
    } else {
        $("#inactive-status-input").prop("checked", true);
    }
}

function updateNewSubjectInfoToServer(
    name,
    facultyId,
    duration,
    managerId,
    status
) {
    subjectAPI.update({
        subjectId: updateSubjectId,
        name,
        facultyId,
        duration,
        managerId,
        status,
        success: function () {
            hideModal("subject-modal");
            showNotification(
                "Update Subject",
                "Successfully! Subject updated!"
            );
            getSubjectsDataForTable(); // reload table
        },
    });
}
