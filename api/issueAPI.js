let issueBaseUrl = `${baseUrl}/issues`;

let issueAPI = {
    getAll: function ({
        currentPage,
        limit,
        currentSearch,
        currentProjectFilter,
        currentAssigneeFilter,
        currentAssignerFilter,
        currentStatusFilter,
        currentFieldSort,
        isSortASC,
        success
    }) {
        let url = `${issueBaseUrl}?page=${currentPage}&size=${limit}`;
        // sort
        if (currentFieldSort) {
            url += `&sort=${currentFieldSort},${isSortASC ? "ASC" : "DESC"}`;
        }

        // search
        if (currentSearch) {
            url += `&q=${currentSearch}`;
        }

        // filter
        if (currentProjectFilter) {
            url += `&projectId=${currentProjectFilter}`;
        }
        if (currentAssigneeFilter) {
            url += `&assigneeId=${currentAssigneeFilter}`;
        }
        if (currentAssignerFilter) {
            url += `&assignerId=${currentAssignerFilter}`;
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
                    "Get List Issue",
                    jqXHR, errorThrown,
                    () => issueAPI.getAll({
                        currentPage,
                        limit,
                        currentSearch,
                        currentProjectFilter,
                        currentAssigneeFilter,
                        currentAssignerFilter,
                        currentStatusFilter,
                        currentFieldSort,
                        isSortASC,
                        success
                    }));
            },
        });
    },
    getDetail: function ({ issueId, success }) {
        $.ajax({
            url: `${issueBaseUrl}/${issueId}`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get Detail issue",
                    jqXHR, errorThrown,
                    () => issueAPI.getDetail({ issueId, success }));
            },
        });
    },
    insert: function ({ milestoneId, title, description, typeId, processId, assigneeId, status, success }) {
        let newIssue = {
            milestoneId: milestoneId,
            title: title,
            description: description,
            typeId: typeId,
            processId: processId,
            assigneeId: assigneeId,
            status: status
        };

        $.ajax({
            url: issueBaseUrl,
            type: "POST",
            data: JSON.stringify(newIssue), // body
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Create new Issue",
                    jqXHR, errorThrown,
                    () => issueAPI.insert({ milestoneId, title, description, typeId, processId, assigneeId, status, success }));
            },
        });
    },
    update: function ({
        issueId,
        milestoneId, title, description, typeId, processId, assigneeId, status,
        success
    }) {
        let newIssueInfo = {
            milestoneId: milestoneId,
            title: title,
            description: description,
            typeId: typeId,
            processId: processId,
            assigneeId: assigneeId,
            status: status
        };

        $.ajax({
            url: `${issueBaseUrl}/${issueId}`,
            type: "PUT",
            data: JSON.stringify(newIssueInfo), // body
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Update Issue",
                    jqXHR, errorThrown,
                    () => issueAPI.update({
                        issueId,
                        milestoneId, title, description, typeId, processId, assigneeId, status,
                        success
                    }));
            },
        });
    },
    delete: function ({ issueId, success }) {
        $.ajax({
            url: `${issueBaseUrl}/${issueId}`,
            type: "DELETE",
            headers: {
                "Authorization": `Bearer ${storage.getToken()}`
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                if (jqXHR.status == 500) {
                    showNotification("Delete Issue", "Fail! The issue are being used!", false);
                    return;
                }
                handleCommonAPIError(
                    "Delete Issue",
                    jqXHR, errorThrown,
                    () => issueAPI.delete({ issueId, success }));
            },
        });
    },
}