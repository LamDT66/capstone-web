let settingBaseUrl = `${baseUrl}/settings`;

let settingAPI = {
  getAll: function ({
    currentPage,
    limit,
    currentSearch,
    currentFieldSort,
    isSortASC,
    success,
  }) {
    let url = `${settingBaseUrl}?page=${currentPage}&size=${limit}`;

    // search
    if (currentSearch) {
      url += `&q=${currentSearch}`;
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
          "Get List Setting",
          jqXHR, errorThrown,
          () => settingAPI.getAll({ currentPage, limit, currentSearch, currentFieldSort, isSortASC, success }));
      },
    });
  },

  getAllTypes: function ({ success }) {
    $.ajax({
      url: `${settingBaseUrl}/types`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Setting Type",
          jqXHR, errorThrown,
          () => settingAPI.getAllTypes({ success }));
      },
    });
  },

  insert: function ({ settingType, settingName, settingDisplayOrder, success }) {
    let newSetting = {
      settingType: settingType,
      settingName: settingName,
      settingDisplayOrder: settingDisplayOrder
    };

    $.ajax({
      url: settingBaseUrl,
      type: "POST",
      data: JSON.stringify(newSetting), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Create new Setting",
          jqXHR, errorThrown,
          () => settingAPI.insert({ settingType, settingName, success }));
      },
    });
  },

  update: function ({ settingId, settingType, settingName, settingDisplayOrder, success }) {
    let newSettingInfo = {
      settingType: settingType,
      settingName: settingName,
      settingDisplayOrder: settingDisplayOrder
    };

    $.ajax({
      url: `${settingBaseUrl}/${settingId}`,
      type: "PUT",
      data: JSON.stringify(newSettingInfo), // body
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Update Setting",
          jqXHR, errorThrown,
          () => settingAPI.update({ settingId, settingType, settingName, success }));
      },
    });
  },

  getDetail: function ({ settingId, success }) {
    $.ajax({
      url: `${settingBaseUrl}/${settingId}`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get Detail Setting",
          jqXHR, errorThrown,
          () => settingAPI.update({ settingId, settingType, settingName, success }));
      },
    });
  },

  delete: function ({ settingId, success }) {
    $.ajax({
      url: `${settingBaseUrl}/${settingId}`,
      type: "DELETE",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        // foreign key setting
        if (jqXHR.status == 500) {
          showNotification("Delete Setting", "Fail! The setting are being used!", false);
          return;
        }
        handleCommonAPIError(
          "Delete Setting",
          jqXHR, errorThrown,
          () => settingAPI.delete({ settingId, success }));
      },
    });
  },

  getAllUserRoles: function ({ success }) {
    $.ajax({
      url: `${settingBaseUrl}/userRoles`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Roles",
          jqXHR, errorThrown,
          () => settingAPI.getAllUserRoles({ success }));
      },
    });
  },

  getAllFacultiesForSelection: function ({ success }) {
    $.ajax({
      url: `${settingBaseUrl}/faculties`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Faculties",
          jqXHR, errorThrown,
          () => settingAPI.getAllFacultiesForSelection({ success }));
      },
    });
  },

  getAllSemestersForSelection: function ({ success }) {
    $.ajax({
      url: `${settingBaseUrl}/semesters`,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${storage.getToken()}`
      },
      success: success,
      error(jqXHR, _, errorThrown) {
        handleCommonAPIError(
          "Get All Semesters",
          jqXHR, errorThrown,
          () => classAPI.getAllSemestersForSelection({ success }));
      },
    });
  },
};
