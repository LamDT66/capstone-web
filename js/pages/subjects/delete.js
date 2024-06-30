let deleteSubjectId;

function openDeleteSubjectModal(id, subjectName) {
  deleteSubjectId = id;
  showModal("delete-subject-modal");
  $("#delete-subject-name").text(subjectName);
}

function deleteSubjectFromServer() {
  subjectAPI.delete({
    subjectId: deleteSubjectId,
    success: function () {
      hideModal("delete-subject-modal");
      showNotification("Delete Subject", "Successfully! Subject deleted!");
      getSubjectsDataForTable(); // reload table
    },
  });
}
