let deleteUserId;

function openDeleteUserModal(id, fullName) {
  deleteUserId = id;
  showModal("delete-user-modal");
  $("#delete-user-fullName").text(fullName);
}

function deleteUserFromServer() {
  userAPI.delete({
    userId: deleteUserId,
    success: function () {
      hideModal("delete-user-modal");
      showNotification("Delete User", "Successfully! User deleted!");
      getUsersDataForTable(); // reload table
    },
  });
}
