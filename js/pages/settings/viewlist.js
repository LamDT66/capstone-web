function getSettingsDataForTable() {
  settingAPI.getAll({
    currentPage,
    limit,
    currentSearch,
    currentFieldSort,
    isSortASC,
    success: function (data) {
      fillListSettingToTable(data.content);
      fillPaginationSettingToTable(data.totalElements);
    },
  });
}

function fillListSettingToTable(settings) {
  let rows = "";

  for (const setting of settings) {
    let row = ` <tr>                               
                        <td>${setting.settingType}</td>
                        <td>${setting.settingName}</td>
                        <td>${setting.settingDisplayOrder}</td>
                        <td class="table-action">
						              <a href="#" class="mr-2" onclick="openUpdateSettingModal(${setting.id})">
                            <i class="align-middle" data-feather="edit-2"></i>
                          </a>
						              <a href="#" onclick="openDeleteSettingModal(${setting.id}, '${setting.settingName}')">
                            <i class="align-middle" data-feather="trash"></i>
                          </a>
						            </td>
                </tr>`;
    rows += row;
  }
  $("#setting-table-body").empty();
  $("#setting-table-body").append(rows);
  feather.replace();
}

function fillPaginationSettingToTable(totalItems) {
  let totalPages = Math.ceil(totalItems / limit);

  let rows = "";

  // previous
  rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
    }" onclick="changeSettingPage(${currentPage - 1}, ${totalPages})">
                <a class="page-link" href="#">Previous</a>
            </li>`;

  for (let i = 1; i <= totalPages; i++) {
    let row = `<li class="page-item ${currentPage == i ? "active" : ""
      }" onclick="changeSettingPage(${i}, ${totalPages})">
                        <a class="page-link" href="#">${i}</a>
                    </li>`;
    rows += row;
  }

  rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
    }" onclick="changeSettingPage(${currentPage + 1}, ${totalPages})">
                <a class="page-link" href="#">Next</a>
            </li>`;

  $("#setting-pagination").empty();
  $("#setting-pagination").append(rows);
}

function changeSettingPage(newPage, totalPages) {
  if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
    return;
  }

  currentPage = newPage;
  getSettingsDataForTable(); // reload table
}

function hideAllSettingSortIcons() {
  hideSortIcon("setting-type-sort-icon");
  hideSortIcon("setting-name-sort-icon");
  hideSortIcon("setting-order-sort-icon");
}

function changeSettingSort(field) {
  if (field == currentFieldSort) {
    isSortASC = !isSortASC;
  } else {
    currentFieldSort = field;
    isSortASC = true;
  }

  // binding UI
  switch (currentFieldSort) {
    case "settingType":
      showSortIcon({
        idSortIcon: "setting-type-sort-icon",
        hideAllSortIcons: hideAllSettingSortIcons,
      });
      break;
    case "settingName":
      showSortIcon({
        idSortIcon: "setting-name-sort-icon",
        hideAllSortIcons: hideAllSettingSortIcons,
      });
      break;
    case "settingDisplayOrder":
      showSortIcon({
        idSortIcon: "setting-order-sort-icon",
        hideAllSortIcons: hideAllSettingSortIcons,
      });
      break;
  }

  // reload table
  resetSettingPaging();
  getSettingsDataForTable();
}

function resetSettingPaging() {
  currentPage = 1;
}

function resetSettingSort() {
  currentFieldSort = "id";
  isSortASC = false;
  hideAllSettingSortIcons();
}

function refreshSettingTable() {
  resetSettingPaging();
  resetSettingSearch();
  resetSettingSort();
  getSettingsDataForTable(); // reload table
}

function changeSettingSearch() {
  let inputSearch = $("#setting-search").val();
  if (inputSearch != currentSearch) {
    currentSearch = inputSearch;
    resetSettingPaging();
    getSettingsDataForTable(); // reload table
  }
}

function resetSettingSearch() {
  currentSearch = "";
  $("#setting-search").val("");
}