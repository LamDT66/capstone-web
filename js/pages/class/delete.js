let deleteClassId;

function openDeleteClassModal(id, name) {
  deleteClassId = id;
  showModal("delete-class-modal");
  $("#delete-class-name").text(name);
}

function deleteClassFromServer() {
  classAPI.delete({
    classId: deleteClassId,
    success: function () {
      hideModal("delete-class-modal");
      showNotification("Delete Class", "Successfully! The Class deleted!");
      getClassDataForTable(); // reload table
    },
  });
}
