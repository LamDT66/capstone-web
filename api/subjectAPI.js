let subjectBaseUrl = `${baseUrl}/subjects`;

let subjectAPI = {
  getAll: function ({
    currentPage,
    limit,
    currentSearch,
    currentSubjectStatusFilter,
    currentFieldSort,
    isSortASC,
    success,
  }) {
    let url = `${subjectBaseUrl}?page=${currentPage}&size=${limit}`;

    // search
    if (currentSearch) {
      url += `&q=${currentSearch}`;
    }

    // // filter
    if (currentSubjectStatusFilter) {
      url += `&status=${currentSubjectStatusFilter}`;
    }

    // sort
    if (currentFieldSort) {
      url += `&sort=${currentFieldSort},${isSortASC ? "ASC" : "DESC"}`;
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
          "Get List Subject",
          jqXHR, errorThrown,
          () => subjectAPI.getAll({ currentPage, limit, currentSearch, currentSubjectStatusFilter, currentFieldSort, isSortASC, success, }));
      },
    });
  },

  getDetail: function ({ subjectId, success }) {
    $.ajax({
      url: `${subjectBaseUrl}/${subjectId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Detail Subject",
          jqXHR, errorThrown,
          () => subjectAPI.getDetail({ subjectId, success }));
      },
    });
  },

  insert: function ({ name, facultyId, duration, managerId, status, success }) {
    let newSubject = {
      name: name,
      facultyId: facultyId,
      duration: duration,
      managerId: managerId,
      status: status
    };

    $.ajax({
      url: `${subjectBaseUrl}`,
      type: "POST",
      data: JSON.stringify(newSubject), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Create new subject",
          jqXHR, errorThrown,
          () => subjectAPI.insert({ name, facultyId, duration, managerId, status, success }));
      },
    });
  },

  update: function ({
    subjectId,
    name,
    facultyId,
    duration,
    managerId,
    status,
    success,
  }) {
    let newSubjectInfo = {
      name: name,
      facultyId: facultyId,
      duration: duration,
      managerId: managerId,
      status: status
    };

    $.ajax({
      url: `${subjectBaseUrl}/${subjectId}`,
      type: "PUT",
      data: JSON.stringify(newSubjectInfo), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Update Subject",
          jqXHR, errorThrown,
          () => subjectAPI.update({ subjectId, name, facultyId, duration, managerId, status, success }));
      },
    });
  },

  delete: function ({ subjectId, success }) {
    $.ajax({
      url: `${subjectBaseUrl}/${subjectId}`,
      type: "DELETE",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, textStatus, errorThrown) {
        showNotification("Delete Subject", "Fail! There is a error!", false);
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      },
    });
  },

  getAllSubjectForSelection: function ({ success }) {
    $.ajax({
      url: `${subjectBaseUrl}/selection`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Subject Selection",
          jqXHR, errorThrown,
          () => subjectAPI.getAllSubjectForSelection({ success }));
      },
    });
  },
};
