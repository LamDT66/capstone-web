let projectMilestoneBaseUrl = `${baseUrl}/project-milestones`;

let projectMilestoneAPI = {
    getAll: function ({
        currentPage,
        limit,
        currentSearch,
        currentFieldSort,
        isSortASC,
        projectId,
        success,
    }){
        let url = `${projectMilestoneBaseUrl}/project/${projectId}?page=${currentPage}&size=${limit}`;

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
                    "Get List Project Milestone",
                    jqXHR, errorThrown,
                    () => projectMilestoneAPI.getAll({ currentPage, limit, currentSearch, currentFieldSort, isSortASC, projectId, success }));
            },
        });
    },

    insert: function ({ title, startDate, endDate ,status, projectId,  success }) {
        let newProjectMilestone = {
            title: title,
            startDate: startDate,
            endDate: endDate,
            status: status,
        };

        $.ajax({
            url: `${projectMilestoneBaseUrl}/project/${projectId}`,
            type: "POST",
            data: JSON.stringify(newProjectMilestone), // body
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Create new Project Milestone",
                    jqXHR, errorThrown,
                    () => projectMilestoneAPI.insert({ title, startDate, endDate, status, projectId,  success }));
            },
        });
    },

    update: function ({ id, title, startDate, endDate, status, success }) {
        let newProjectMilestoneInfo = {
            title: title,
            startDate: startDate,
            endDate: endDate,
            status: status,
        };

        $.ajax({
            url: `${projectMilestoneBaseUrl}/${id}`,
            type: "PUT",
            data: JSON.stringify(newProjectMilestoneInfo), // body
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Update Project Milestone",
                    jqXHR, errorThrown,
                    () => projectMilestoneAPI.update({ id, title, startDate, endDate, status, success }));
            },
        });
    },

    getDetail: function ({ id, success }) {
        $.ajax({
            url: `${projectMilestoneBaseUrl}/${id}`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get Project Milestone Detail",
                    jqXHR, errorThrown,
                    () => projectMilestoneAPI.update({ id, title, startDate, endDate, projectId, success }));
            },
        });
    },

    delete: function ({ id, success }) {
        $.ajax({
            url: `${projectMilestoneBaseUrl}/${id}`,
            type: "DELETE",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                // foreign key setting
                if (jqXHR.status == 500) {
                    showNotification("Delete Milestone", "Fail! The milestone are being used!", false);
                    return;
                }
                handleCommonAPIError(
                    "Delete Project Milestone",
                    jqXHR, errorThrown,
                    () => projectMilestoneAPI.delete({ id, success })
                );
            },
        });
    },
};