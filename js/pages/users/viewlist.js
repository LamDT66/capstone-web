let currentGenderFilter = "";
let currentRoleFilter = "";
let currentStatusFilter = "";

function getUsersDataForTable() {
  userAPI.getAll({
    currentPage,
    limit,
    currentSearch,
    currentGenderFilter,
    currentRoleFilter,
    currentStatusFilter,
    currentFieldSort,
    isSortASC,
    success: function (data) {
      fillListUserToTable(data.content);
      fillPaginationUserToTable(data.totalElements);
    },
  });
}

function fillListUserToTable(users) {
  let rows = "";

  for (const user of users) {
    let row = ` <tr>                               
                          <td>${user.fullName}</td>
                          <td>${user.gender || ""}</td>
                          <td>${user.email}</td>
                          <td>${user.mobile || ""}</td>
                          <td>${user.roleName}</td>
                          <td>${user.status}</td>
                          <td class="table-action">
                              <a href="#" class="mr-2" onclick="openUpdateUserModal(${user.id})">
                                  <i class="align-middle" data-feather="edit-2"></i>
                              </a>
                              <a href="#" onclick="openDeleteUserModal(${user.id}, '${user.fullName}')">
                                  <i class="align-middle" data-feather="trash"></i>
                              </a>
                          </td>
                  </tr>`;
    rows += row;
  }
  $("#user-table-body").empty();
  $("#user-table-body").append(rows);
  feather.replace();
}

function fillPaginationUserToTable(totalItems) {
  let totalPages = Math.ceil(totalItems / limit);

  let rows = "";

  // previous
  rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
    }" onclick="changeUserPage(${currentPage - 1}, ${totalPages})">
                  <a class="page-link" href="#">Previous</a>
              </li>`;

  for (let i = 1; i <= totalPages; i++) {
    let row = `<li class="page-item ${currentPage == i ? "active" : ""
      }" onclick="changeUserPage(${i}, ${totalPages})">
                          <a class="page-link" href="#">${i}</a>
                      </li>`;
    rows += row;
  }

  rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
    }" onclick="changeUserPage(${currentPage + 1}, ${totalPages})">
                  <a class="page-link" href="#">Next</a>
              </li>`;

  $("#user-pagination").empty();
  $("#user-pagination").append(rows);
}

function changeUserPage(newPage, totalPages) {
  if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
    return;
  }

  currentPage = newPage;
  getUsersDataForTable(); // reload table
}

function hideAllUserSortIcons() {
  hideSortIcon("fullName-sort-icon");
  hideSortIcon("gender-sort-icon");
  hideSortIcon("email-sort-icon");
  hideSortIcon("mobile-sort-icon");
  hideSortIcon("role-sort-icon");
  hideSortIcon("status-sort-icon");
}

function changeUserSort(field) {
  if (field == currentFieldSort) {
    isSortASC = !isSortASC;
  } else {
    currentFieldSort = field;
    isSortASC = true;
  }

  // binding UI
  switch (currentFieldSort) {
    case "fullName":
      showSortIcon({
        idSortIcon: "fullName-sort-icon",
        hideAllSortIcons: hideAllUserSortIcons,
      });
      break;
    case "gender":
      showSortIcon({
        idSortIcon: "gender-sort-icon",
        hideAllSortIcons: hideAllUserSortIcons,
      });
      break;
    case "email":
      showSortIcon({
        idSortIcon: "email-sort-icon",
        hideAllSortIcons: hideAllUserSortIcons,
      });
      break;
    case "mobile":
      showSortIcon({
        idSortIcon: "mobile-sort-icon",
        hideAllSortIcons: hideAllUserSortIcons,
      });
      break;
    case "status":
      showSortIcon({
        idSortIcon: "status-sort-icon",
        hideAllSortIcons: hideAllUserSortIcons,
      });
      break;
    case "role.settingName":
      showSortIcon({
        idSortIcon: "role-sort-icon",
        hideAllSortIcons: hideAllUserSortIcons,
      });
      break;
  }

  // reload table
  resetUserPaging();
  getUsersDataForTable();
}

function resetUserPaging() {
  currentPage = 1;
}

function resetUserSort() {
  currentFieldSort = "id";
  isSortASC = false;
  hideAllUserSortIcons();
}

function changeUserSearch() {
  let inputSearch = $("#user-search").val();
  if (inputSearch != currentSearch) {
    currentSearch = inputSearch;
    resetUserPaging();
    getUsersDataForTable(); // reload table
  }
}

function resetUserSearch() {
  currentSearch = "";
  $("#user-search").val("");
}

function changeUserFilter() {
  let inputGender = $("#gender-input-filter").val();
  let inputRole = $("#role-input-filter").val();
  let inputStatus = $("#status-input-filter").val();

  // change filter
  if (inputGender != currentGenderFilter
    || inputRole != currentRoleFilter
    || inputStatus != currentStatusFilter
  ) {
    currentGenderFilter = inputGender;
    currentRoleFilter = inputRole;
    currentStatusFilter = inputStatus;

    resetUserPaging();
    getUsersDataForTable(); // reload table
  }
}

function resetUserFilter() {
  currentGenderFilter = "";
  currentRoleFilter = "";
  currentStatusFilter = "";

  $("#gender-input-filter").val("").change();
  $("#role-input-filter").val("").change();
  $("#status-input-filter").val("").change();
}

function initSelectForUserFilter() {

  initSelect2({
    name: "validation-gender-filter",
    placeholder: "Select gender...",
  });

  initSelect2({
    name: "validation-role-filter",
    placeholder: "Select role...",
  });

  initSelect2({
    name: "validation-status-filter",
    placeholder: "Select status...",
  });
}

function refreshUserTable() {
  // reset value
  resetUserPaging();
  resetUserSearch();
  resetUserSort();
  initSelectForUserFilter();
  resetUserFilter();

  // get data for filter
  getUserRolesFromServer("filter");

  // reload table
  getUsersDataForTable();
}