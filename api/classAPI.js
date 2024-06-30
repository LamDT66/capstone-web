let classBaseUrl = `${baseUrl}/classes`;

let classAPI = {
  getAll: function ({
    currentPage,
    limit,
    currentSearch,
    currentSubjectFilter,
    currentSemesterFilter,
    currentStatusClassFilter,
    currentFieldSort,
    isSortASC,
    success,
  }) {
    let url = `${classBaseUrl}?page=${currentPage}&size=${limit}`;

    // sort
    if (currentFieldSort) {
      url += `&sort=${currentFieldSort},${isSortASC ? "ASC" : "DESC"}`;
    }

    // search
    if (currentSearch) {
      url += `&q=${currentSearch}`;
    }

    // filter
    if (currentSubjectFilter) {
      url += `&subjectId=${currentSubjectFilter}`;
    }
    if (currentSemesterFilter) {
      url += `&semesterId=${currentSemesterFilter}`;
    }
    if (currentStatusClassFilter) {
      url += `&status=${currentStatusClassFilter}`;
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
          "Get List Class",
          jqXHR, errorThrown,
          () => classAPI.getAll({
            currentPage,
            limit,
            currentSearch,
            currentSubjectFilter,
            currentSemesterFilter,
            currentStatusClassFilter,
            currentFieldSort,
            isSortASC,
            success
          }));
      },
    });
  },
  getDetail: function ({ classId, success }) {
    $.ajax({
      url: `${classBaseUrl}/${classId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Detail Class",
          jqXHR, errorThrown,
          () => classAPI.getDetail({ classId, success }));
      },
    });
  },
  insert: function ({
    name, startDate, endDate, submitDate, status,
    subjectId, semesterId, facultyId, managerId, teacherIds, success
  }) {
    let newClass = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      submitDate: submitDate,
      status: status,
      subjectId: subjectId,
      semesterId: semesterId,
      facultyId: facultyId,
      managerId: managerId,
      teacherIds: teacherIds,
    };
    $.ajax({
      url: `${classBaseUrl}`,
      type: "POST",
      data: JSON.stringify(newClass), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Create new Class",
          jqXHR, errorThrown,
          () => classAPI.insert({
            name, startDate, endDate, submitDate, status,
            subjectId, semesterId, facultyId, managerId, teacherIds, success
          }));
      },
    });
  },
  update: function ({
    classId,
    name, startDate, endDate, submitDate, status,
    subjectId, semesterId, facultyId, managerId, teacherIds, success
  }) {
    let newClassInfo = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      submitDate: submitDate,
      status: status,
      subjectId: subjectId,
      semesterId: semesterId,
      facultyId: facultyId,
      managerId: managerId,
      teacherIds: teacherIds,
    };

    $.ajax({
      url: `${classBaseUrl}/${classId}`,
      type: "PUT",
      data: JSON.stringify(newClassInfo), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Update Class",
          jqXHR, errorThrown,
          () => classAPI.update({
            classId,
            name, startDate, endDate, submitDate, status,
            subjectId, semesterId, facultyId, managerId, teacherIds, success
          }));
      },
    });
  },
  delete: function ({ classId, success }) {
    $.ajax({
      url: `${classBaseUrl}/${classId}`,
      type: "DELETE",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        // foreign key setting
        if (jqXHR.status == 500) {
          showNotification("Delete Class", "Fail! The class are being used!", false);
          return;
        }
        handleCommonAPIError(
          "Delete Class",
          jqXHR, errorThrown,
          () => classAPI.delete({ classId, success }));
      },
    });
  },
  getAllForManager: function ({ success }) {
    $.ajax({
      url: `${classBaseUrl}/managers`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Class For Manager",
          jqXHR, errorThrown,
          () => classAPI.getAllForManager({ success }));
      },
    });
  },
  getAllForSelection: function ({ success }) {
    $.ajax({
      url: `${classBaseUrl}/selection`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Class For Selection",
          jqXHR, errorThrown,
          () => classAPI.getAllForSelection({ success }));
      },
    });
  }
}