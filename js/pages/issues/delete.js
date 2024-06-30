let deleteIssueId;

function openDeleteIssueModal(id, title) {
  deleteIssueId = id;
  showModal("delete-issue-modal");
  $("#delete-issue-title").text(title);
}

function deleteIssueFromServer() {
  issueAPI.delete({
    issueId: deleteIssueId,
    success: function () {
      hideModal("delete-issue-modal");
      showNotification("Delete Issue", "Successfully! The Issue deleted!");
      getIssueDataForTable(); // reload table
    },
  });
}
