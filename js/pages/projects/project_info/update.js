let projectUpdateId;
let detailProject;
let fillDetailForUpdateMode = false;
function openUpdateProject(updateProjectId) {
    projectUpdateId = updateProjectId;
    resetUpdateProjectForm();
    initUpdateProjectFormValidator({
        submitHandler: function () {
            let classId = $("#class-input").val();
            let groupName = $("#group-name-input").val();
            let projectCode = $("#project-code-input").val();
            let englishName = $("#english-name-input").val();
            let vietnameseName = $("#vietnamese-name-input").val();
            let mentorId = $("#mentor-input").val();
            let coMentorId = $("#co-mentor-input").val();
            let leaderId = $("#leader-input").val();
            let teamMemberIds = $("#team-member-input").val();
            let note = $("#note-input").val();
            let status = $('input[name="status-input"]:checked').val();
            updateNewProjectInfoToServer(classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds)
        },
    });
}

function updateNewProjectInfoToServer(
    classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds
) {
    projectAPI.updateProjectInfo({
        projectId: projectUpdateId,
        classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds,
        success: function () {
            showNotification("Update Class", "Successfully! Class updated!");
            backtoDetailProjectScreen();
        },
    });
}

// reset !
function resetUpdateProjectForm() {

    // reset input value
    $("#class-input").val("");
    $("#group-name-input").val("");
    $("#active-status-input").prop("checked", true);
    $("#team-member-input").val("");
    $("#project-code-input").val("");
    $("#english-name-input").val("");
    $("#vietnamese-name-input").val("");
    $("#mentor-input").val("");
    $("#co-mentor-input").val("");
    $("#leader-input").val("");
    $("#note-input").val("");

    //disable role teacher
    let role = storage.getRole();
    if (role == Constant.ROLE_TEACHER) {
        $("#class-input").prop('disabled', true);
        $("#group-name-input").prop('disabled', true);
        $("#team-member-input").prop('disabled', true);
        $("#mentor-input").prop('disabled', true);
        $("#co-mentor-input").prop('disabled', true);
    } else {
        $("#class-input").prop('disabled', false);
        $("#group-name-input").prop('disabled', false);
        $("#team-member-input").prop('disabled', false);
        $("#mentor-input").prop('disabled', false);
        $("#co-mentor-input").prop('disabled', false);
    }

    // reset validation
    resetUpdateProjectFormValidator();

    initSelect2({
        name: "validation-class",
        placeholder: "Select class...",
    });

    initSelect2({
        name: "validation-mentor",
        placeholder: "Select mentor...",
    });

    initSelect2({
        name: "validation-coMentor",
        placeholder: "Select co_mentor...",
    });

    initSelect2({
        name: "validation-team-member",
        placeholder: "Select team member...",
    });

    initSelect2({
        name: "validation-leader",
        placeholder: "Select leader...",
    });

    getClassListFromServer("update");
}

function getProjectDetailFromServer() {
    projectAPI.getDetail({
        projectId: projectUpdateId,
        success: function (data) {
            // success
            fillProjectDetailToUpdate(data);
        },
    });
}

function fillProjectDetailToUpdate(project) {
    detailProject = project;
    fillDetailForUpdateMode = true;
    $("#class-input").val(project.clazz.id).change();
    $("#group-name-input").val(project.groupName);
    if ($("#active-status-input").val() === project.status) {
        $("#active-status-input").prop("checked", true);
    } else {
        $("#inactive-status-input").prop("checked", true);
    }
    $("#project-code-input").val(project.projectCode);
    $("#english-name-input").val(project.englishName);
    $("#vietnamese-name-input").val(project.vietnameseName);
    $("#mentor-input").val(project.mentor.id).change();
    $("#co-mentor-input").val(project.coMentor.id).change();
    $("#note-input").val(project.note);
}

function backtoDetailProjectScreen() {
    loadProjectInfoPage(projectUpdateId);
}