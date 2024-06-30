let projectIdForProjectSetting;

function getProjectSettingsDataForTable(projectId) {
    projectIdForProjectSetting = projectId;

    projectSettingAPI.getAll({
        currentPage,
        limit,
        currentSearch,
        currentFieldSort,
        isSortASC,
        projectId,
        success: function (data) {
            fillListProjectSettingToTable(data.content);
            fillPaginationProjectSettingToTable(data.totalElements);
        }
    });
}

function fillListProjectSettingToTable(projectSettings) {
    let rows = "";

    for (const projectSetting of projectSettings) {
        let row = `<tr>
                        <td>${projectSetting.settingType==='TYPE'||projectSetting.settingType==='STATUS'?'ISSUE':'WORK'} ${projectSetting.settingType}</td>
                        <td>${projectSetting.settingName}</td>
                        <td class="table-action">
                            <a href="#" class="mr-2" onclick="openUpdateProjectSettingModal(${projectSetting.id})">
                                <i class="align-middle" data-feather="edit-2"></i>
                            </a>
                            <a href="#" onclick="openDeleteProjectSettingModal(${projectSetting.id}, '${projectSetting.settingName}')">
                                <i class="align-middle" data-feather="trash"></i>
                            </a>
                        </td>
                    </tr>`;
        rows += row;
    }
    $("#project-setting-table-body").empty();
    $("#project-setting-table-body").append(rows);
    feather.replace();
}

function fillPaginationProjectSettingToTable(totalItems) {
    let totalPages = Math.ceil(totalItems / limit);

    let rows = "";

    // previous
    rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
        }" onclick="changeProjectSettingPage(${currentPage - 1}, ${totalPages})">
                    <a class="page-link" href="#">Previous</a>
                </li>`;

    for (let i = 1; i <= totalPages; i++) {
        let row = `<li class="page-item ${currentPage == i ? "active" : ""
            }" onclick="changeProjectSettingPage(${i}, ${totalPages})">
                        <a class="page-link" href="#">${i}</a>
                    </li>`;
        rows += row;
    }

    rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
        }" onclick="changeProjectSettingPage(${currentPage + 1}, ${totalPages})">
                    <a class="page-link" href="#">Next</a>
                </li>`;

    $("#project-setting-pagination").empty();
    $("#project-setting-pagination").append(rows);
}

function changeProjectSettingPage(newPage, totalPages) {
    if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    getProjectSettingsDataForTable(projectId);
}

function hideAllProjectSettingSortIcons() {
    hideSortIcon("project-setting-type-sort-icon");
    hideSortIcon("project-setting-name-sort-icon");
}

function changeProjectSettingSort(field) {
    if (field == currentFieldSort) {
        isSortASC = !isSortASC;
    } else {
        currentFieldSort = field;
        isSortASC = true;
    }

    //binding UI
    switch (currentFieldSort) {
        case "setting_type":
            showSortIcon({
                idSortIcon: "project-setting-type-sort-icon",
                hideAllSortIcons: hideAllProjectSettingSortIcons,
            });
            break;
        case "setting_name":
            showSortIcon({
                idSortIcon: "project-setting-name-sort-icon",
                hideAllSortIcons: hideAllProjectSettingSortIcons,
            });
            break;
    }

    // reload table
    resetProjectSettingPaging();
    getProjectSettingsDataForTable(projectId);
}

function resetProjectSettingPaging(){
    currentPage = 1;
}

function resetProjectSettingSort() {
    currentFieldSort = "id";
    isSortASC = false;
    hideAllProjectSettingSortIcons();
}

function refreshProjectSettingTable() {
    resetProjectSettingPaging();
    resetProjectSettingSearch();
    resetProjectSettingSort();
    getProjectSettingsDataForTable(projectId); // reload table
}

function changeProjectSettingSearch(){
    let inputSearch = $("#project-setting-search").val();
    if (inputSearch != currentSearch) {
        currentSearch = inputSearch;
        resetProjectSettingPaging(); 
        getProjectSettingsDataForTable(projectId); // reload table
    }
}

function resetProjectSettingSearch() {
    currentSearch = "";
    $("#project-setting-search").val("");
}