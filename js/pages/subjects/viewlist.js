let currentSubjectStatusFilter = "";

function getSubjectsDataForTable() {
  subjectAPI.getAll({
    currentPage,
    limit,
    currentSearch,
    currentSubjectStatusFilter,
    currentFieldSort,
    isSortASC,
    success: function (data) {
      fillListSubjectToTable(data.content);
      fillPaginationSubjectToTable(data.totalElements);
    },
  });
}

function fillListSubjectToTable(subjects) {
  let rows = "";
  for (const subject of subjects) {
    let row = ` <tr>                               
                        <td>${subject.name}</td>
                        <td>${subject.faculty}</td>
                        <td>${subject.duration} days</td>
                        <td data-toggle="tooltip" title="${subject.managerEmail}">
                          ${subject.managerFullName}
                        </td>
                        <td>${subject.status}</td>
                        <td class="table-action text-center">
						                <a href="#" class="mr-2" onclick="openUpdateSubjectModal(${subject.id})">
                                <i class="align-middle" data-feather="edit-2"></i>
                            </a>
						                <a href="#" onclick="openDeleteSubjectModal(${subject.id}, '${subject.name}')">
                                <i class="align-middle" data-feather="trash"></i>
                            </a>
						            </td>
                </tr>`;
    rows += row;
  }
  $("#subject-table-body").empty();
  $("#subject-table-body").append(rows);
  feather.replace();
}

function fillPaginationSubjectToTable(totalItems) {
  let totalPages = Math.ceil(totalItems / limit);

  let rows = "";

  // previous
  rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
    }" onclick="changeSubjectPage(${currentPage - 1}, ${totalPages})">
                <a class="page-link" href="#">Previous</a>
            </li>`;

  for (let i = 1; i <= totalPages; i++) {
    let row = `<li class="page-item ${currentPage == i ? "active" : ""
      }" onclick="changeSubjectPage(${i}, ${totalPages})">
                        <a class="page-link" href="#">${i}</a>
                    </li>`;
    rows += row;
  }

  rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
    }" onclick="changeSubjectPage(${currentPage + 1}, ${totalPages})">
                <a class="page-link" href="#">Next</a>
            </li>`;

  $("#subject-pagination").empty();
  $("#subject-pagination").append(rows);
}

function changeSubjectPage(newPage, totalPages) {
  if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
    return;
  }

  currentPage = newPage;
  getSubjectsDataForTable(); // reload table
}

function changeSubjectSort(field) {
  if (field == currentFieldSort) {
    isSortASC = !isSortASC;
  } else {
    currentFieldSort = field;
    isSortASC = true;
  }

  // binding UI
  switch (currentFieldSort) {
    case "subjectName":
      showSortIcon({
        idSortIcon: "subject-name-sort-icon",
        hideAllSortIcons: hideAllSubjectSortIcons,
      });
      break;
    case "faculty.settingName":
      showSortIcon({
        idSortIcon: "faculty-sort-icon",
        hideAllSortIcons: hideAllSubjectSortIcons,
      });
      break;
    case "verifyDuration":
      showSortIcon({
        idSortIcon: "duration-sort-icon",
        hideAllSortIcons: hideAllSubjectSortIcons,
      });
      break;
    case "manager.fullName":
      showSortIcon({
        idSortIcon: "manager-sort-icon",
        hideAllSortIcons: hideAllSubjectSortIcons,
      });
      break;
    case "status":
      showSortIcon({
        idSortIcon: "status-sort-icon",
        hideAllSortIcons: hideAllSubjectSortIcons,
      });
      break;
  }

  // reload table
  resetSubjectPaging();
  getSubjectsDataForTable();
}

function hideAllSubjectSortIcons() {
  hideSortIcon("subject-name-sort-icon");
  hideSortIcon("faculty-sort-icon");
  hideSortIcon("duration-sort-icon");
  hideSortIcon("manager-sort-icon");
  hideSortIcon("status-sort-icon");
}

function resetSubjectPaging() {
  currentPage = 1;
}

function resetSubjectSort() {
  currentFieldSort = "id";
  isSortASC = false;

  hideAllSubjectSortIcons();
}

function changeSubjectSearch() {
  let inputSearch = $("#subject-search").val();
  if (inputSearch != currentSearch) {
    currentSearch = inputSearch;
    resetSubjectPaging();
    getSubjectsDataForTable(); // reload table
  }
}

function resetSubjectSearch() {
  currentSearch = "";
  $("#subject-search").val("");
}

function changeSubjectFilter() {
  let inputStatus = $("#status-input-filter").val();

  // change filter
  if (inputStatus != currentSubjectStatusFilter) {
    currentSubjectStatusFilter = inputStatus;

    resetSubjectPaging();
    getSubjectsDataForTable(); // reload table
  }
}

function resetSubjectFilter() {
  currentSubjectStatusFilter = "";
  $("#status-input-filter").val("").change();
}

function initSelectForSubjectFilter() {
  initSelect2({
    name: "validation-status-filter",
    placeholder: "Select status...",
  });
}

function refreshSubjectTable() {
  // reset value
  resetSubjectPaging();
  resetSubjectSearch();
  initSelectForSubjectFilter();
  resetSubjectFilter();
  resetSubjectSort();

  // reload table
  getSubjectsDataForTable();
}