let projectBaseUrl = `${baseUrl}/projects`;

let projectAPI = {
    getAll: function ({
        currentPage,
        limit,
        currentSearch,
        currentFieldSort,
        currentClassFilter,
        isSortASC,
        success,
    }) {
        let url = `${projectBaseUrl}?page=${currentPage}&size=${limit}`;

        // sort
        if (currentFieldSort) {
            url += `&sort=${currentFieldSort},${isSortASC ? "ASC" : "DESC"}`;
        }

        // search
        if (currentSearch) {
            url += `&q=${currentSearch}`;
        }

        // filter
        if (currentClassFilter) {
            url += `&classId=${currentClassFilter}`;
        }

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
                    "Get List Project",
                    jqXHR, errorThrown,
                    () => projectAPI.getAll({
                        currentPage,
                        limit,
                        currentSearch,
                        currentClassFilter,
                        currentFieldSort,
                        isSortASC,
                        success
                    }));
            },
        });
    },

    insert: function ({classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds, success}) {
        let newProject = {
            classId: classId,
            groupName: groupName,
            projectCode: projectCode,
            englishName: englishName,
            vietnameseName: vietnameseName,
            mentorId: mentorId,
            coMentorId:coMentorId,
            leaderId:leaderId,
            note:note,
            status: status,
            teamMemberIds: teamMemberIds
        };
        $.ajax({
          url: `${projectBaseUrl}`,
          type: "POST",
          data: JSON.stringify(newProject), // body
          contentType: "application/json",
          headers: {
            "Authorization": `Bearer ${storage.getToken()}`
          },
          success: success,
          error(jqXHR, _, errorThrown) {
            handleCommonAPIError(
              "Create new Class",
              jqXHR, errorThrown,
              () => projectAPI.insert({
                classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds, success
              }));
          },
        });
      },

      updateProjectInfo: function ({projectId, classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds, success}) {
        let projectUpdate = {
            classId: classId,
            groupName: groupName,
            projectCode: projectCode,
            englishName: englishName,
            vietnameseName: vietnameseName,
            mentorId: mentorId,
            coMentorId:coMentorId,
            leaderId:leaderId,
            note:note,
            status: status,
            teamMemberIds: teamMemberIds
        };
        $.ajax({
          url: `${projectBaseUrl}/${projectId}`,
          type: "PUT",
          data: JSON.stringify(projectUpdate), // body
          contentType: "application/json",
          headers: {
            "Authorization": `Bearer ${storage.getToken()}`
          },
          success: success,
          error(jqXHR, _, errorThrown) {
            handleCommonAPIError(
              "Update project",
              jqXHR, errorThrown,
              () => projectAPI.updateProjectInfo({ projectId,
                classId, groupName, projectCode, englishName, vietnameseName, mentorId, coMentorId, leaderId, note, status, teamMemberIds, success
              }));
          },
        });
      },

    getDetail: function ({ projectId, success }) {
        $.ajax({
            url: `${projectBaseUrl}/${projectId}`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                Authorization: `Bearer ${storage.getToken()}`,
            },
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                // error
                showNotification(
                    "Get Detail Project",
                    "Fail! There is a error!",
                    false
                );
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
        });
    },

    getAllProjectForSelection: function ({ success }) {
        $.ajax({
            url: `${projectBaseUrl}/selection`,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                Authorization: `Bearer ${storage.getToken()}`,
            },
            success: success,
            error(jqXHR, _, errorThrown) {
                handleCommonAPIError(
                    "Get All Project For Selection",
                    jqXHR, errorThrown,
                    () => projectAPI.getAllProjectForSelection({ success }));
            },
        });
    }
};
