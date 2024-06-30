let userBaseUrl = `${baseUrl}/users`;
let getAllTeacherUrl = `${baseUrl}/users/teachers`;
let getAllStudentUrl = `${baseUrl}/students-subjects/email`;

let userAPI = {
  getAll: function ({
    currentPage,
    limit,
    currentSearch,
    currentGenderFilter,
    currentRoleFilter,
    currentStatusFilter,
    currentFieldSort,
    isSortASC,
    success,
  }) {
    let url = `${userBaseUrl}?page=${currentPage}&size=${limit}`;

    // sort
    if (currentFieldSort) {
      url += `&sort=${currentFieldSort},${isSortASC ? "ASC" : "DESC"}`;
    }

    // search
    if (currentSearch) {
      url += `&q=${currentSearch}`;
    }

    // filter
    if (currentGenderFilter) {
      url += `&gender=${currentGenderFilter}`;
    }

    if (currentRoleFilter) {
      url += `&roleId=${currentRoleFilter}`;
    }

    if (currentStatusFilter) {
      url += `&status=${currentStatusFilter}`;
    }

    $.ajax({
      url: url,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get List User",
          jqXHR, errorThrown,
          () => userAPI.getAll({ currentPage, limit, currentSearch, currentGenderFilter, currentRoleFilter, currentStatusFilter, currentFieldSort, isSortASC, success }));
      },
    });
  },

  insert: function ({
    fullName,
    gender,
    email,
    mobile,
    role,
    status,
    success,
  }) {
    let newUser = {
      fullName: fullName,
      gender: gender,
      email: email,
      mobile: mobile,
      roleId: role,
      status: status,
    };
    $.ajax({
      url: `${userBaseUrl}`,
      type: "POST",
      data: JSON.stringify(newUser), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Create new User",
          jqXHR, errorThrown,
          () => userAPI.insert({ fullName, gender, email, mobile, role, status, success }));
      },
    });
  },

  update: function ({
    userId,
    role,
    status,
    success,
  }) {
    let newUserInfo = {
      roleId: role,
      status: status,
    };

    $.ajax({
      url: `${userBaseUrl}/${userId}`,
      type: "PUT",
      data: JSON.stringify(newUserInfo), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Update User",
          jqXHR, errorThrown,
          () => userAPI.update({ userId, role, status, success }));
      },
    });
  },

  getDetail: function ({ userId, success }) {
    $.ajax({
      url: `${userBaseUrl}/${userId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Detail User",
          jqXHR, errorThrown,
          () => userAPI.getDetail({ userId, success }));
      },
    });
  },

  delete: function ({ userId, success }) {
    $.ajax({
      url: `${userBaseUrl}/${userId}`,
      type: "DELETE",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        // foreign key setting
        if (jqXHR.status == 500) {
          showNotification("Delete User", "Fail! The user are being used!", false);
          return;
        }
        handleCommonAPIError("Delete User", jqXHR, errorThrown, () =>
          userAPI.delete({ userId, success })
        );
      },
    });
  },

  getAllManagers: function ({ success }) {
    $.ajax({
      url: `${userBaseUrl}/managers`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Managers",
          jqXHR,
          errorThrown,
          () => userAPI.getAllManagers({ success })
        );
      },
    });
  },

    getAllTeachersOfCurrentFaculty: function ({ success }) {
      $.ajax({
          url: `${getAllTeacherUrl}/current-faculty`,
          type: "GET",
          contentType: "application/json",
          dataType: "json",
          headers: {
              Authorization: `Bearer ${storage.getToken()}`,
          },
          success: success,
          error(jqXHR, _, errorThrown) {
              handleCommonAPIError(
                  "Get All Teacher Of Current Faculty",
                  jqXHR,
                  errorThrown,
                  () => userAPI.getAllTeachersOfCurrentFaculty({ success })
              );
          },
      });
  },

    getAllStudentsEmailBySubject: function ({ success }) {
        $.ajax({
            url: `${getAllStudentUrl}`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                Authorization: `Bearer ${storage.getToken()}`,
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get All Students",
                    jqXHR,
                    errorThrown,
                    () => userAPI.getAllStudents({ success })
                );
            },
        });
    },
  getAllStudentsEmailBySubject: function ({ success }) {
    $.ajax({
      url: `${getAllStudentUrl}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Students",
          jqXHR,
          errorThrown,
          () => userAPI.getAllStudents({ success })
        );
      },
    });
  },

  getAllManagersByFaculty: function ({ facultyId, success }) {
    $.ajax({
      url: `${userBaseUrl}/managers/${facultyId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Managers By Faculty",
          jqXHR, errorThrown,
          () => userAPI.getAllManagersByFaculty({ facultyId, success }));
      },
    });
  },

  getAllTeachers: function ({ success }) {
    $.ajax({
      url: `${userBaseUrl}/teachers`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Teachers",
          jqXHR, errorThrown,
          () => userAPI.getAllTeachers({ success }));
      },
    });
  },

  getAllTeachersByFaculty: function ({ facultyId, success }) {
    $.ajax({
      url: `${userBaseUrl}/teachers/${facultyId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Teachers By Faculty",
          jqXHR, errorThrown,
          () => userAPI.getAllTeachersByFaculty({ facultyId, success }));
      },
    });
  },

  getAllStudents: function ({ success }) {
    $.ajax({
      url: `${userBaseUrl}/students`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Students",
          jqXHR, errorThrown,
          () => userAPI.getAllStudents({ success }));
      },
    });
  },

  getProfile: function ({ success }) {
    $.ajax({
      url: `${userBaseUrl}/profile`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Profile",
          jqXHR, errorThrown,
          () => userAPI.getProfile({ success }));
      }
    });
  },

  updateProfile: function ({
    fullName,
    gender,
    facultyId,
    mobile,
    success
  }) {
    let newProfileInfo = {
      fullName: fullName,
      gender: gender,
      facultyId: facultyId,
      mobile: mobile
    };

    $.ajax({
      url: `${userBaseUrl}/profile`,
      type: "PUT",
      data: JSON.stringify(newProfileInfo),
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Update Profile",
          jqXHR, errorThrown,
          () => userAPI.updateProfile({ fullName, gender, facultyId, mobile, success }));
      }
    });
  }
};
