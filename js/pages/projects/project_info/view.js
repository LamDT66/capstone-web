function getProjectDetail(projectId) {

  let role = storage.getRole();
  if (role == Constant.ROLE_TEACHER || role == Constant.ROLE_MANAGER) {
    $("#update-project-button").show();
  } else {
    // student
    $("#update-project-button").hide();
  }

  projectAPI.getDetail({
    projectId,
    success: function (data) {
      // success
      fillProjectDetailToView(data);
    },
  });
}

function fillProjectDetailToView(data) {
  $("#classTxt").text(data.clazz.name);
  $("#groupNameTxt").text(data.groupName);
  $("#projectCodeTxt").text(data.projectCode);
  $("#englistNameTxt").text(data.englishName);
  $("#vietnameseNameTxt").text(data.vietnameseName);
  $("#mentorTxt").text(data.mentor.fullName);
  $("#coMentorTxt").text(data.coMentor.fullName);
  $("#leaderTxt").text(data.leader?.fullName);
  $("#noteTxt").text(data.note);
  $("#statusTxt").text(data.status);
  fillListStudentToProjectDetail(data.students);
}

function fillListStudentToProjectDetail(students) {
  let rows = "";
  if (students == "") {
    rows = "This project has no members yet";
  }
  for (const student of students) {
    let row = `<li class="pb-2" id = "student-name" style="list-style-type: none;">
                    <div class="d-flex align-items-center flex-grow-1">
                    <div class="mr-3 d-flex align-items-center justify-content-center" style="background-color: #f0f0f4; height:44px; width: 44px; border-radius: 4px; font-size: 18px; font-weight: bold; box-shadow: 0 0 0.875rem 0 rgba(53, 64, 82, 0.05);">
                    ${student.fullName?.charAt(0)}
                    </div>
                    <span class="ml-1">${student.fullName}</span>
                    </div>
                </li>`;
    rows += row;
  }
  $("#projectStudentEmailList").empty();
  $("#projectStudentEmailList").append(rows);
  feather.replace();
}
