function getStudentListFromServer(mode) {
    studentAPI.getAllByNoClass({
        success: function (data) {
            fillStudentToStudentSelect(data, mode);
        },
    });
}

function fillStudentToStudentSelect(students, mode) {
    let rows = "<option value=''>Select student...</option>";

    for (const student of students) {
        let row = `<option value='${student.id}'>${student.email}</option>`;
        rows += row;
    }
    $("#student-input").empty();
    $("#student-input").append(rows);
}