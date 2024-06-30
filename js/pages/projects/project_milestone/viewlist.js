let projectIdForProjectMilestone;

function getProjectMilestonesDataForTable(projectId) {
    if(projectId) {
        projectIdForProjectMilestone = projectId;
    }
    projectMilestoneAPI.getAll({
        currentPage,
        limit,
        currentSearch,
        currentFieldSort,
        isSortASC,
        projectId: projectIdForProjectMilestone,
        success: function (data) {
            fillListProjectMilestoneToTable(data.content);
            fillPaginationProjectMilestoneToTable(data.totalElements);
        }
    });
}

function formatDate (date) {
    let [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
}

function fillListProjectMilestoneToTable(projectMilestones) {
    let rows = "";
    let role = storage.getRole();

    for (const projectMilestone of projectMilestones) {
        let row = `<tr>
                        <td>${projectMilestone.title}</td>
                        <td>${formatDate(projectMilestone.startDate)}</td>
                        <td>${formatDate(projectMilestone.endDate)}</td>
                        <td>${projectMilestone.status}</td>
                        ${role == Constant.ROLE_STUDENT 
                            ? ""
                            :   `<td class="table-action">
                                    <a href="#" class="mr-2" onclick="openUpdateProjectMilestoneModal(${projectMilestone.id})">
                                        <i class="align-middle" data-feather="edit-2"></i>
                                    </a>
                                    <a href="#" onclick="openDeleteProjectMilestoneModal(${projectMilestone.id}, '${projectMilestone.title}', '${projectMilestone.status}')">
                                        <i class="align-middle" data-feather="trash"></i>
                                    </a>
                                </td>`
                        }
                    </tr>`;
        rows += row;
    }
    $("#project-milestone-table-body").empty();
    $("#project-milestone-table-body").append(rows);
    feather.replace();
}

function fillPaginationProjectMilestoneToTable(totalItems) {
    let totalPages = Math.ceil(totalItems / limit);

    let rows = "";

    // previous
    rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
        }" onclick="changeProjectMilestonePage(${currentPage - 1}, ${totalPages})">
                    <a class="page-link" href="#">Previous</a>
                </li>`;

    for (let i = 1; i <= totalPages; i++) {
        let row = `<li class="page-item ${currentPage == i ? "active" : ""
            }" onclick="changeProjectMilestonePage(${i}, ${totalPages})">
                        <a class="page-link" href="#">${i}</a>
                    </li>`;
        rows += row;
    }

    rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
        }" onclick="changeProjectMilestonePage(${currentPage + 1}, ${totalPages})">
                    <a class="page-link" href="#">Next</a>
                </li>`;

    $("#project-milestone-pagination").empty();
    $("#project-milestone-pagination").append(rows);
}

function changeProjectMilestonePage(newPage, totalPages) {
    if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
        return;
    }
    currentPage = newPage;
    getProjectMilestonesDataForTable();
}

function hideAllProjectMilestoneSortIcons() {
    hideSortIcon("project-milestone-title-sort-icon");
    hideSortIcon("project-milestone-startDate-sort-icon");
    hideSortIcon("project-milestone-endDate-sort-icon");
    hideSortIcon("project-milestone-status-sort-icon");
}

function changeProjectMilestoneSort(field){
    if (field == currentFieldSort) {
        isSortASC = !isSortASC;
    } else {
        currentFieldSort = field;
        isSortASC = true;
    }

    //binding UI
    switch (currentFieldSort) {
        case "title":
            showSortIcon({
                idSortIcon: "project-milestone-title-sort-icon",
                hideAllSortIcons: hideAllProjectMilestoneSortIcons,
            });
            break;
        case "startDate":
            showSortIcon({
                idSortIcon: "project-milestone-startDate-sort-icon",
                hideAllSortIcons: hideAllProjectMilestoneSortIcons,
            });
            break;
        case "endDate":
            showSortIcon({
                idSortIcon: "project-milestone-endDate-sort-icon",
                hideAllSortIcons: hideAllProjectMilestoneSortIcons,
            });
            break;
        case "status":
            showSortIcon({
                idSortIcon: "project-milestone-status-sort-icon",
                hideAllSortIcons: hideAllProjectMilestoneSortIcons,
            });
            break;
    }

    // reload table
    resetProjectMilestonePaging();
    getProjectMilestonesDataForTable();
}

function resetProjectMilestonePaging() {
    currentPage = 1;
}

function resetProjectMilestoneSort() {
    currentFieldSort = "id";
    isSortASC = false;
    hideAllProjectMilestoneSortIcons();
}

function refreshProjectMilestoneTable() {
    resetProjectMilestonePaging();
    resetProjectMilestoneSort();
    resetProjectMilestoneSearch();
    getProjectMilestonesDataForTable(); // reload table
}

function changeProjectMilestoneSearch(){
    let inputSearch = $("#project-milestone-search").val();
    if (inputSearch != currentSearch) {
        currentSearch = inputSearch;
        resetProjectMilestonePaging(); 
        getProjectMilestonesDataForTable(); // reload table
    }
}

function resetProjectMilestoneSearch() {
    currentSearch = "";
    $("#project-milestone-search").val("");
}