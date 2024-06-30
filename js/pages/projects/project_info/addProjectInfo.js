function openAddProject() {
    resetAddProjectForm();
    initAddProjectFormValidator({
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

            insertNewProjectToServer(classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds)
        },
    });
}

function insertNewProjectToServer(
    classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds
) {
    projectAPI.insert({
        classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds,
        success: function () {
            loadProjectPage();
            showNotification(
                "Create new Project",
                "Successfully! New project created!"
            );
            getProjectDataForTable();
        },
    });
}

function resetAddProjectForm() {
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
        name: "validation-leader",
        placeholder: "Select leader...",
    });

    initSelect2({
        name: "validation-team-member",
        placeholder: "Select student ...",
    });

    getClassListFromServer("insert");

}
