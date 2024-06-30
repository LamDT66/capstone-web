function initAddStudentToClassForm() {
    resetAddStudentToClassForm();
    initAddStudentFormValidator({
        submitHandler: function () {
            let studentIds = $("#student-input").val();
            insertNewStudentToClassToServer(
                studentIds
            );
        },
    });
}

function resetAddStudentToClassForm() {
    // reset input value
    $("#student-input").val("");

    initSelect2({
        name: "validation-student",
        placeholder: "Select student...",
    });

    // reset validation
    resetAddStudentValidator();

    getStudentListFromServer("insert");
}

function insertNewStudentToClassToServer(studentIds) {
    studentAPI.insert({
        classId: classIdToGetStudent,
        studentIds,
        success: function () {
            showNotification(
                "Insert New Students to Class",
                "Successfully! New student added!"
            );
            resetAddStudentToClassForm() // reset select
            refreshStudentTable(); // reload table
        },
    });
}