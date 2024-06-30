// Get project to select
function getProjectListForIssueFromServer(mode) {
    projectAPI.getAllProjectForSelection({
        success: function (data) {
            // success
            fillProjectToIssueSelect(data, mode);
            getAssigneeFromServer(mode);
        },
    });
}

function fillProjectToIssueSelect(projects, mode) {
    let rows = "<option value=''>Select project...</option>";

    for (const project of projects) {
        let row = `<option value='${project.id}'>${project.englishName}</option>`;
        rows += row;
    }
    if (mode == "filter") {
        $("#project-input-filter").empty();
        $("#project-input-filter").append(rows);
    }
}

// Get Assignee & Assigner to select
function getAssigneeFromServer(mode) {
    let role = storage.getRole();
    if (role == Constant.ROLE_TEACHER) {
        userAPI.getAllStudents({
            success: function (data) {
                // success
                fillAssigneeToIssueSelect(data, mode);
                if (mode == 'filter') {
                    getAssignerFromServer(mode);
                }
            },
        });
    } else {
        // student
        studentAPI.getAllByProject({
            success: function (data) {
                // success
                fillAssigneeToIssueSelect(data, mode);
                if (mode == 'filter') {
                    getAssignerFromServer(mode);
                } else if (mode == 'update') {
                    getDetailIssueFromServer();
                }
            },
        });
    }
}

function fillAssigneeToIssueSelect(assignees, mode) {
    let rows = "<option value=''>Select assignee...</option>";

    for (const assignee of assignees) {
        let row = `<option value='${assignee.id}'>${assignee.fullName}</option>`;
        rows += row;
    }

    if (mode == "filter") {
        $("#assignee-input-filter").empty();
        $("#assignee-input-filter").append(rows);
    } else {
        $("#assignee-input").empty();
        $("#assignee-input").append(rows);
    }
}

function getAssignerFromServer(mode) {
    let role = storage.getRole();
    if (role == Constant.ROLE_TEACHER) {
        userAPI.getAllStudents({
            success: function (data) {
                // success
                fillAssignerToIssueSelect(data, mode);
            },
        });
    } else {
        // student
        studentAPI.getAllByProject({
            success: function (data) {
                // success
                fillAssignerToIssueSelect(data, mode);
            },
        });
    }
}

function fillAssignerToIssueSelect(assigners, mode) {
    let rows = "<option value=''>Select assigner...</option>";

    for (const assigner of assigners) {
        let row = `<option value='${assigner.id}'>${assigner.fullName}</option>`;
        rows += row;
    }

    if (mode == "filter") {
        $("#assigner-input-filter").empty();
        $("#assigner-input-filter").append(rows);
    }
}

function getMilestoneListForIssueFromServer(mode) {
    milestoneAPI.getAllByStudent({
        success: function (data) {
            // success
            fillMilestoneToIssueSelect(data, mode);
            getTypeListForIssueFromServer(mode);
        },
    });
}

function fillMilestoneToIssueSelect(milestones, mode) {
    let rows = "<option value=''>Select milestone...</option>";

    for (const milestone of milestones) {
        let row = `<option value='${milestone.id}'>${milestone.title}</option>`;
        rows += row;
    }

    $("#milestone-input").empty();
    $("#milestone-input").append(rows);
}

function getTypeListForIssueFromServer(mode) {
    projectSettingAPI.getAllType({
        success: function (data) {
            // success
            fillTypeToIssueSelect(data, mode);
            getProcessListForIssueFromServer(mode);
        },
    });
}

function fillTypeToIssueSelect(types, mode) {
    let rows = "<option value=''>Select type...</option>";

    for (const type of types) {
        let row = `<option value='${type.id}'>${type.settingName}</option>`;
        rows += row;
    }

    $("#type-input").empty();
    $("#type-input").append(rows);
}

function getProcessListForIssueFromServer(mode) {
    projectSettingAPI.getAllProcess({
        success: function (data) {
            // success
            fillProcessToIssueSelect(data, mode);
            getAssigneeFromServer(mode);
        },
    });
}

function fillProcessToIssueSelect(processes, mode) {
    let rows = "<option value=''>Select process...</option>";

    for (const process of processes) {
        let row = `<option value='${process.id}'>${process.settingName}</option>`;
        rows += row;
    }

    $("#process-input").empty();
    $("#process-input").append(rows);
}