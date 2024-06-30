let classIdToGetStudent;

function openAddStudentToClassModal(classId) {
    classIdToGetStudent = classId;
    showModal("student-modal");
    // insert student
    initAddStudentToClassForm();
    // import student
    initImportStudentToClassForm();
    // table
    refreshStudentTable();
}