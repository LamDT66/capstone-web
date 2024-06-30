// Class
function getClassListFromServer(mode) {
  classAPI.getAllForSelection({
    success: function (data) {
      fillClassListToSelect(data, mode);
      getMentorListFromServer(mode);
    },
  });
}

function fillClassListToSelect(data, mode) {
  let rows = "<option value=''>Select class...</option>";

  for (const c of data) {
    let row = `<option value="${c.id}">${c.name}</option>`;
    rows += row;
  }
  $("#class-input").empty();
  $("#class-input").append(rows);
  $("#class-input").on("change", function () {
    let selectedValue = $(this).val();
    if (selectedValue) getStudentByNoProjectInClassFromServer(selectedValue, mode)
  });
}

// Mentor
function getMentorListFromServer(mode) {
  userAPI.getAllTeachersOfCurrentFaculty({
    success: function (data) {
      fillMentorListToSelect(data, mode);
      getCoMentorListFromServer(mode);
    },
  });
}

function fillMentorListToSelect(data, mode) {
  let rows = "<option value=''>Select mentor...</option>";
  for (const m of data) {
    let row = `<option value="${m.id}">${m.fullName}</option>`;
    rows += row;
  }
  $("#mentor-input").empty();
  $("#mentor-input").append(rows);
}

// Co Mentor
function getCoMentorListFromServer(mode) {
  userAPI.getAllTeachersOfCurrentFaculty({
    success: function (data) {
      fillCoMentorListToSelect(data, mode);
      if (mode == 'update') getProjectDetailFromServer();
    },
  });
}

function fillCoMentorListToSelect(data, mode) {
  let rows = "<option value=''>Select co_mentor...</option>";

  // Sửa value & innerText theo CoMentor object
  for (const m of data) {
    let row = `<option value="${m.id}">${m.fullName}</option>`;
    rows += row;
  }
  $("#co-mentor-input").empty();
  $("#co-mentor-input").append(rows);
}

// Team members
function getStudentByNoProjectInClassFromServer(classId, mode) {
  studentAPI.getAllStudentsByNoProjectInClass({
    classId,
    success: function (data) {
      fillStudentByNoProjectInClassToSelect(data, mode);
    },
  });
}

function fillStudentByNoProjectInClassToSelect(data, mode) {

  if (mode == 'update' && fillDetailForUpdateMode) {
    data = [...data, ...detailProject.students];
    data.sort((a, b) => a.id - b.id);
  }

  let rows = "<option value=''>Select co_mentor...</option>";

  // Sửa value & innerText theo CoMentor object
  for (const m of data) {
    let row = `<option value="${m.id}">${m.fullName}</option>`;
    rows += row;
  }
  $("#team-member-input").empty();
  $("#team-member-input").append(rows);
  $("#team-member-input").on("change", function () {
    let selectedOptions = $(this).find(":selected");
    let selectedObjects = [];

    selectedOptions.each(function () {
      let selectedValue = $(this).val();
      let selectedText = $(this).text();

      let selectedObject = {
        id: selectedValue,
        fullName: selectedText
      };

      selectedObjects.push(selectedObject);
    });
    fillSelectedTeamMemberToLeader(selectedObjects, mode)
  });
  if (mode == 'update' && fillDetailForUpdateMode) {
    $("#team-member-input").val(detailProject.students.map((s) => s.id)).change();
  }
}

function fillSelectedTeamMemberToLeader(data, mode) {
  let rows = "<option value=''>Select leader...</option>";

  // Sửa value & innerText theo CoMentor object
  for (const m of data) {
    let row = `<option value="${m.id}">${m.fullName}</option>`;
    rows += row;
  }
  $("#leader-input").empty();
  $("#leader-input").append(rows);

  if (mode == 'update' && fillDetailForUpdateMode) {
    fillDetailForUpdateMode = false
    $("#leader-input").val(detailProject.leader?.id).change();
  }
}