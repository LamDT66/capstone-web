let projectSettingBaseUrl = `${baseUrl}/project-settings`;

let projectSettingAPI = {
    getAll: function ({
        currentPage,
        limit,
        currentSearch,
        currentFieldSort,
        isSortASC,
        projectId,
        success,
    }) {
        let url = `${projectSettingBaseUrl}/project/${projectId}?page=${currentPage}&size=${limit}`;

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
            error(jqXHR, textStatus, errorThrown) {
                handleCommonAPIError(
                    "Get List Project Setting",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.getAll({ currentPage, limit, currentSearch, currentFieldSort, isSortASC, projectId, success }));
            },
        });
    },

    getAllTypes: function ({ success }) {
        $.ajax({
            url: `${projectSettingBaseUrl}/types`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get Project Setting Type",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.getAllTypes({ success }));
            },
        });
    },

    insert: function ({ projectSettingType, projectSettingName, projectId, success }) {
        let newProjectSetting = {
            settingType: projectSettingType,
            settingName: projectSettingName,
        };

        $.ajax({
            url: `${projectSettingBaseUrl}/project/${projectId}`,
            type: "POST",
            data: JSON.stringify(newProjectSetting), // body
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Insert Project Setting",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.insert({ projectSettingType, projectSettingName, projectId, success }));
            },
        });
    },

    update: function ({ projectSettingId, projectSettingType, projectSettingName, projectId, success }) {
        let newProjectSettingInfo = {
            settingType: projectSettingType,
            settingName: projectSettingName,
        };

        $.ajax({
            url: `${projectSettingBaseUrl}/${projectSettingId}/project/${projectId}`,
            type: "PUT",
            data: JSON.stringify(newProjectSettingInfo), // body
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Update Project Setting",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.update({ projectSettingId, projectSettingType, projectSettingName, projectId, success }));
            },
        });
    },

    getDetail: function ({ projectSettingId, success }) {
        $.ajax({
            url: `${projectSettingBaseUrl}/${projectSettingId}`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get Project Setting Detail",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.update({ projectSettingId, projectSettingType, projectSettingName,  projectId, success }));
            },
        });
    },

    delete: function ({ projectSettingId, success }) {
        $.ajax({
            url: `${projectSettingBaseUrl}/${projectSettingId}`,
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
                    "Delete Project Setting",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.delete({ projectSettingId, success }));
            },
        });
    },
    getAllType: function ({ success }) {
        let url = `${projectSettingBaseUrl}/types/TYPE`;
        $.ajax({
            url: url,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                Authorization: `Bearer ${storage.getToken()}`,
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get List Project Setting Type",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.getAllType({ success }));
            },
        });
    },
    getAllProcess: function ({ success }) {
        let url = `${projectSettingBaseUrl}/types/PROCESS`;
        $.ajax({
            url: url,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                Authorization: `Bearer ${storage.getToken()}`,
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get List Project Setting Process",
                    jqXHR, errorThrown,
                    () => projectSettingAPI.getAllProcess({ success }));
            },
        });
    }

};
