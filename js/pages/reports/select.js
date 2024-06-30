function getMilestoneListForReportFromServer(mode) {
    milestoneAPI.getAllByStudent({
        success: function (data) {
            // success
            fillMilestonesToSelectProjectOfAddReportModal(data, mode);
        },
    });
}

function fillMilestonesToSelectProjectOfAddReportModal(milestones, mode) {
    let rows = "<option value=''>Select milestone...</option>";

    for (const milestone of milestones) {
        let row = `<option value='${milestone.id}'>${milestone.title}</option>`;
        rows += row;
    }

    $("#report-milestone-input").empty();
    $("#report-milestone-input").append(rows);
}