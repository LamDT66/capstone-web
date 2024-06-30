let currentProjectFilter = "";
let currentAssigneeFilter = "";
let currentAssignerFilter = "";

function getIssueDataForTable() {
    issueAPI.getAll({
        currentPage,
        limit,
        currentSearch,
        currentProjectFilter,
        currentAssigneeFilter,
        currentAssignerFilter,
        currentStatusFilter,
        currentFieldSort,
        isSortASC,
        success: function (data) {
            fillListIssueToTable(data.content);
            fillPaginationIssueToTable(data.totalElements);
        },
    });
}

function fillListIssueToTable(issues) {
    let role = storage.getRole();
    let rows = "";
    for (const issue of issues) {
        let row = ` <tr>                               
                            <td>${issue.id}</td>
                            <td>${issue.title}</td>
                            ${role != Constant.ROLE_TEACHER ? "" :
                                `<td data-toggle="tooltip" title="${issue.projectVietnameseName}">
                                    ${issue.projectEnglishName}
                                </td>`
                            }
                            <td>${issue.milestone}</td>
                            <td>${issue.typeName}</td>
                            <td>${issue.processName}</td>
                            <td>${issue.status}</td>
                            <td data-toggle="tooltip" title="${issue.assigneeEmail}">
                                ${issue.assigneeFullName}
                            </td>
                            <td data-toggle="tooltip" title="${issue.assignerEmail}">
                                ${issue.assignerFullName}
                            </td>
                            ${role == Constant.ROLE_TEACHER ? "" :
                                `<td class="table-action">
                                    <a href="#" class="mr-2" onclick="openUpdateIssueModal(${issue.id})">
                                        <i class="align-middle" data-feather="edit-2"></i>
                                    </a>
                                    <a href="#" onclick="openDeleteIssueModal(${issue.id}, '${issue.title}')">
                                        <i class="align-middle" data-feather="trash"></i>
                                    </a>
                                </td>`
                            }
                    </tr>`;
        rows += row;
    }
    $("#issue-table-body").empty();
    $("#issue-table-body").append(rows);
    feather.replace();
}

function fillPaginationIssueToTable(totalItems) {
    let totalPages = Math.ceil(totalItems / limit);

    let rows = "";

    // previous
    rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
        }" onclick="changeIssuePage(${currentPage - 1}, ${totalPages})">
                    <a class="page-link" href="#">Previous</a>
                </li>`;

    for (let i = 1; i <= totalPages; i++) {
        let row = `<li class="page-item ${currentPage == i ? "active" : ""
            }" onclick="changeIssuePage(${i}, ${totalPages})">
                            <a class="page-link" href="#">${i}</a>
                        </li>`;
        rows += row;
    }

    rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
        }" onclick="changeIssuePage(${currentPage + 1}, ${totalPages})">
                    <a class="page-link" href="#">Next</a>
                </li>`;

    $("#issue-pagination").empty();
    $("#issue-pagination").append(rows);
}

function changeIssuePage(newPage, totalPages) {
    if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    getIssueDataForTable(); // reload table
}

function changeIssueSort(field) {
    if (field == currentFieldSort) {
        isSortASC = !isSortASC;
    } else {
        currentFieldSort = field;
        isSortASC = true;
    }

    // binding UI
    switch (currentFieldSort) {
        case "id":
            showSortIcon({
                idSortIcon: "project-id-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "title":
            showSortIcon({
                idSortIcon: "title-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "project.englishName":
            showSortIcon({
                idSortIcon: "project-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "milestone.title":
            showSortIcon({
                idSortIcon: "milestone-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "type.settingName":
            showSortIcon({
                idSortIcon: "issueType-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "process.settingName":
            showSortIcon({
                idSortIcon: "process-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "status":
            showSortIcon({
                idSortIcon: "status-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "assignee.fullName":
            showSortIcon({
                idSortIcon: "assignee-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
        case "assigner.fullName":
            showSortIcon({
                idSortIcon: "assigner-sort-icon",
                hideAllSortIcons: hideAllIssueSortIcons,
            });
            break;
    }

    // reload table
    resetIssuePaging();
    getIssueDataForTable();
}

function hideAllIssueSortIcons() {
    hideSortIcon("class-id-sort-icon");
    hideSortIcon("title-sort-icon");
    hideSortIcon("project-sort-icon");
    hideSortIcon("milestone-sort-icon");
    hideSortIcon("issueType-sort-icon");
    hideSortIcon("process-sort-icon");
    hideSortIcon("status-sort-icon");
    hideSortIcon("assignee-sort-icon");
    hideSortIcon("assigner-sort-icon");
}

function resetIssuePaging() {
    currentPage = 1;
}

function changeIssueSearch() {
    let inputSearch = $("#issue-search").val();
    if (inputSearch != currentSearch) {
        currentSearch = inputSearch;
        resetIssuePaging();
        getIssueDataForTable(); // reload table
    }
}

function resetIssueSearch() {
    currentSearch = "";
    $("#issue-search").val("");
}

function resetIssueSort() {
    currentFieldSort = "id";
    isSortASC = false;
    hideAllIssueSortIcons();
}

function resetIssueFilter() {
    currentProjectFilter = "";
    currentAssigneeFilter = "";
    currentAssignerFilter = "";
    currentStatusFilter = "";

    $("#project-input-filter").val("").change();
    $("#assignee-input-filter").val("").change();
    $("#assigner-input-filter").val("").change();
    $("#status-issue-filter").val("").change();
}

function initSelectForIssueFilter() {

    initSelect2({
        name: "validation-project-filter",
        placeholder: "Select project...",
    });

    initSelect2({
        name: "validation-assignee-filter",
        placeholder: "Select assignee...",
    });

    initSelect2({
        name: "validation-assigner-filter",
        placeholder: "Select assigner...",
    });

    initSelect2({
        name: "validation-status-filter",
        placeholder: "Select status...",
    });
}

function refreshIssueTable() {
    // reset value
    resetIssuePaging();
    resetIssueSearch();
    resetIssueSort();
    initSelectForIssueFilter();
    resetIssueFilter();

    let role = storage.getRole();
    if (role == Constant.ROLE_TEACHER) {
        // show class
        $("#project-filter").show();
        $("#project-column").show();
        $("#action-column").hide();
        $("#insert-import-button").hide();
        getProjectListForIssueFromServer("filter");
    } else {
        $("#project-filter").hide();
        $("#project-column").hide();
        $("#action-column").show();
        $("#insert-import-button").show();
        getAssigneeFromServer("filter");
    }

    // reload table
    getIssueDataForTable();
}

function changeIssueFilter() {
    let inputProject = $("#project-input-filter").val();
    let inputAssignee = $("#assignee-input-filter").val();
    let inputAssigner = $("#assigner-input-filter").val();
    let inputStatus = $("#status-issue-filter").val();

    // change filter
    if (inputProject != currentProjectFilter
        || inputAssignee != currentAssigneeFilter
        || inputAssigner != currentAssignerFilter
        || inputStatus != currentStatusFilter
    ) {
        currentProjectFilter = inputProject;
        currentAssigneeFilter = inputAssignee;
        currentAssignerFilter = inputAssigner;
        currentStatusFilter = inputStatus;

        resetIssuePaging();
        getIssueDataForTable(); // reload table
    }
}
