let deleteStudentId;

function openDeleteStudentModal(studentId, name) {
  deleteStudentId = studentId;
  showModal("delete-student-modal");
  $("#delete-student-name").text(name);
}

function deleteStudentFromServer() {
  if (studentModeForModel == "import") {
    importedStudents = importedStudents.filter(student => student.mobile != deleteStudentId);
    hideModal("delete-student-modal");
    fillListImportedStudentToTable();
  } else {
    studentAPI.delete({
      studentId: deleteStudentId,
      success: function () {
        hideModal("delete-student-modal");
        showNotification("Delete Student", "Successfully! The Student removed!");
        getStudentsDataForTable(); // reload table
        resetAddStudentToClassForm();
      },
    });
  }

}
