let milestoneBaseUrl = `${baseUrl}/milestones`;

let milestoneAPI = {
  getAllByStudent: function ({ success, }) {
    $.ajax({
      url: `${milestoneBaseUrl}/student`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get all milestone By Student",
          jqXHR, errorThrown,
          () => milestoneAPI.getAllByStudent({ success }));
      },
    });
  },
  getAllByStudent: function ({ success, }) {
    $.ajax({
      url: `${milestoneBaseUrl}/student`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get all milestone By Student",
          jqXHR, errorThrown,
          () => milestoneAPI.getAllByStudent({ success }));
      },
    });
  },

};