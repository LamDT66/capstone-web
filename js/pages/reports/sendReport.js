function openSendProjectReportModal() {
    showModal("project-report-modal");
    resetAddReportForm();
    initAddReportFormValidator({
        submitHandler: function () {
            let title = $('#title-input').val();
            let rawMilestone = $('#report-milestone-input').val();
            let milestoneInt = parseInt(rawMilestone);
            showLoadingButton("send-report-btn", "Send Report");
            reportAPI.uploadReportFile({
                file: $("#report-file-input").prop('files')[0],
                success: function (fileName) {
                    insertNewReportToServer({
                        title, milestoneInt, fileName
                    });
                },
            });
        }
    });
}

function resetAddReportForm() {
    // set title for modal
    $("#project-report-modal-title").text("Send Project Report");

    // reset form
    $('#title-input').val('');
    $('#report-milestone-input').val('');
    $("#report-file-input").val(null);

    // reset validation
    resetAddReportValidator();

    initSelect2({
        name: "validation-milestone",
        placeholder: "Select milestone...",
    });

    getMilestoneListForReportFromServer("insert");
}

function insertNewReportToServer({ title, milestoneInt, fileName }) {
    reportAPI.insert({
        title, milestoneInt, fileName,
        success: function () {
            // success
            hideModal("project-report-modal");
            showNotification("success", "Send Report Successfully");
            getReportsDataForTable();
            hideLoadingButton("send-report-btn", "Send Report");
        },
    });
}
