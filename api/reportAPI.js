let reportBaseUrl = `${baseUrl}/reports`;

let reportAPI = {
  getAll: function ({
    currentPage,
    limit,
    currentProjectFilter,
    success
  }) {
    let url = `${reportBaseUrl}?page=${currentPage}&size=${limit}`;

    // filter
    if (currentProjectFilter) {
      url += `&projectId=${currentProjectFilter}`;
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
          "Get List Report",
          jqXHR, errorThrown,
          () => reportAPI.getAll({
            currentPage,
            limit,
            currentProjectFilter,
            success
          }));
      },
    });
  },

  getDetail: function ({ reportId, success }) {
    $.ajax({
      url: `${reportBaseUrl}/${reportId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Detail Report",
          jqXHR, errorThrown,
          () => reportAPI.getDetail({ reportId, success }));
      },
    });
  },

  insert: function ({ title, milestoneInt, fileName, success }) {
    let newReport = {
      title: title,
      milestoneId: milestoneInt,
      fileUrl: fileName
    };
    $.ajax({
      url: reportBaseUrl,
      type: "POST",
      data: JSON.stringify(newReport),
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Insert Report",
          jqXHR, errorThrown,
          () => reportAPI.insert({ title, milestoneInt, fileName, success }));
      },
    });
  },

  uploadReportFile: function ({ file, success }) {
    let formData = new FormData();
    formData.append('file', file);

    $.ajax({
      url: `${baseUrl}/files/reports`,
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Upload Report File",
          jqXHR, errorThrown,
          null);
      },
    });
  },
};