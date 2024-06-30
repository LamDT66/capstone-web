let studentBaseUrl = `${baseUrl}/students`;

let studentAPI = {
  getAllByClass: function ({
    currentPage,
    limit,
    classId,
    currentSearch,
    currentFieldSort,
    isSortASC,
    success,
  }) {
    let url = `${studentBaseUrl}/classes/${classId}?page=${currentPage}&size=${limit}`;

    // sort
    if (currentFieldSort) {
      url += `&sort=${currentFieldSort},${isSortASC ? "ASC" : "DESC"}`;
    }

    // search
    if (currentSearch) {
      url += `&q=${currentSearch}`;
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
          "Get List Students By Class",
          jqXHR, errorThrown,
          () => studentAPI.getAllByClass({ currentPage, limit, classId, currentSearch, currentFieldSort, isSortASC, success, }));
      },
    });
  },
  getAllByNoClass: function ({
    success,
  }) {
    $.ajax({
      url: `${studentBaseUrl}/noClasses`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get List Students By No Class",
          jqXHR, errorThrown,
          () => studentAPI.getAllByNoClass({ success, }));
      },
    });
  },
  getAllByProject: function ({
    success,
  }) {
    $.ajax({
      url: `${studentBaseUrl}/project`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get List Students By Project",
          jqXHR, errorThrown,
          () => studentAPI.getAllByProject({ success }));
      },
    });
  },
  insert: function ({
    classId,
    studentIds,
    success,
  }) {
    let form = {
      studentIds: studentIds
    };
    $.ajax({
      url: `${studentBaseUrl}/classes/${classId}`,
      type: "POST",
      data: JSON.stringify(form), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Create new User",
          jqXHR, errorThrown,
          () => studentAPI.insert({ classId, studentIds, success }));
      },
    });
  },
  import: function ({
    classId,
    students,
    success,
    validateError,
  }) {
    let form = {
      students: students
    };
    $.ajax({
      url: `${studentBaseUrl}/classes/${classId}/import`,
      type: "POST",
      data: JSON.stringify(form), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        if (jqXHR.status == 400) {
          showNotification(
            "Import new Users",
            JSON.stringify(jqXHR.responseJSON.exception).replace(",", "\n").replace("{", "").replace("}", ""),
            false);
          validateError();
          return;
        }
        handleCommonAPIError(
          "Import new Users",
          jqXHR, errorThrown,
          () => studentAPI.import({ classId, students, success }));
      },
    });
  },
  delete: function ({ studentId, success }) {
    $.ajax({
      url: `${studentBaseUrl}/classes/${studentId}`,
      type: "DELETE",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Remove Student",
          jqXHR, errorThrown,
          () => studentAPI.delete({ studentId, success }));
      },
    });
  },

  getAllStudentsByNoProjectInClass: function ({
    classId,
    success,
  }) {
    $.ajax({
      url: `${studentBaseUrl}/classes/${classId}/noProject`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get List Students By No Project In Class",
          jqXHR, errorThrown,
          () => studentAPI.getAllStudentsByNoProjectInClass({classId, success}));
      },
    });
  },
};