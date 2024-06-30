function initImportStudentToClassForm() {
    resetImportStudentToClassForm();
    initImportStudentFormValidator({
        submitHandler: function () {
            showLoadingButton("import-btn", "Import");
            importNewStudentToClassToServer();
        },
    });
}

function resetImportStudentToClassForm() {
    // reset input value
    $("#student-import-input").val(null);
    importedStudents = [];

    hideLoadingButton("import-btn", "Import");

    // reset validation
    resetImportStudentValidator();
}

function readStudentExcelFile(input) {
    studentModeForModel = 'import';

    parseExcelFile(input, (jsonObject) => {
        renameOfStudentKey(jsonObject);
        importedStudents = jsonObject;
        fillListImportedStudentToTable();

        $("#insert-student-form").hide();
        $("#student-search-input").attr("style", "display: none !important");
        $("#student-pagination").hide();
    }
    )
}

function parseExcelFile(input, processingFunction) {
    var reader = new FileReader();

    reader.onload = function (e) {
        let workbook = XLSX.read(e.target.result, {
            type: 'binary'
        });

        let firstSheet = workbook.SheetNames[0];
        var rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        var jsonObject = JSON.stringify(rows);
        processingFunction(JSON.parse(jsonObject));
    };

    reader.onerror = function (exception) {
        console.log(exception);
    };

    reader.readAsBinaryString(input.files[0]);
}

function renameOfStudentKey(students) {
    students.forEach((student) => {
        delete Object.assign(student, { fullName: student.Fullname })['Fullname'];
        delete Object.assign(student, { gender: student.Gender })['Gender'];
        delete Object.assign(student, { email: student.Email })['Email'];
        delete Object.assign(student, { mobile: student.PhoneNumber })['PhoneNumber'];
        delete Object.assign(student, { status: student.Status })['Status'];
    });
}

function fillListImportedStudentToTable() {
    fillListStudentToTable(importedStudents);
}

function importNewStudentToClassToServer() {
    if (importedStudents.length == 0) return;

    studentAPI.import({
        classId: classIdToGetStudent,
        students: importedStudents,
        success: function () {
            showNotification(
                "Import New Students to Class",
                "Successfully! New student imported!"
            );
            resetImportStudentToClassForm();
            resetAddStudentToClassForm() // reset select
            refreshStudentTable(); // reload table
        },
        validateError: function () {
            resetImportStudentToClassForm();
        }
    });
}