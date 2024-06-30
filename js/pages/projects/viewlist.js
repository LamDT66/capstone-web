let currentClassFilter = "";

function getProjectDataForTable() {
  projectAPI.getAll({
    currentPage,
    limit,
    currentSearch,
    currentClassFilter,
    currentFieldSort,
    isSortASC,
    success: function (data) {
      fillListProjectToTable(data.content);
      fillPaginationProjectToTable(data.totalElements);
    },
  });
}

function fillListProjectToTable(projects) {
  let rows = ``;
  let role = storage.getRole();

  for (const project of projects) {
    let row = `<div class="mb-3" id="project-table">
        <div class="d-flex align-items-center justify-content-between" style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px; border-radius: 4px; height: 60px; padding-left:8px; padding-right:16px" >
          <div class="d-flex align-items-center flex-grow-1">
            <div class="mr-3 d-flex align-items-center justify-content-center" style="background-color: #f0f0f4; height:44px; width: 44px; border-radius: 4px; font-size: 18px; font-weight: bold; box-shadow: 0 0 0.875rem 0 rgba(53, 64, 82, 0.05);">
              ${project.englishName?.charAt(0)}
            </div>
            <h5 class=" mb-0 flex-grow-1">
              <span style="">${project.semesterName}</span> /
              <span style="">${project.className}</span> / 
              <span style="font-weight: bold">${project.englishName}</span>
            </h5>
          </div>
          <div class="card-actions float-right">
            <div class="dropdown show">
              <a href="#" data-toggle="dropdown" data-display="static">
                <i class="align-middle" data-feather="more-horizontal"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#" onclick="loadProjectInfoPage(${project.id})"
                  >View project general information</a
                >
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="loadProjectMilestonePage(${project.id})"
                  >View milestones</a
                >
                ${role == Constant.ROLE_STUDENT || role == Constant.ROLE_MANAGER
                    ? ""
                    :`<a class="dropdown-item" href="#" onclick="loadProjectConfigPage(${project.id})">
                        View project configs
                      </a>`
                }
              </div>
            </div>
          </div>
        </div>
      </div>`;
    rows += row;
  }
  $("#project-table").empty();
  $("#project-table").append(rows);
  feather.replace();
}

function fillPaginationProjectToTable(totalItems) {
  let totalPages = Math.ceil(totalItems / limit);

  let rows = "";

  // previous
  rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
    }" onclick="changeProjectPage(${currentPage - 1}, ${totalPages})">
                  <a class="page-link" href="#">Previous</a>
              </li>`;

  for (let i = 1; i <= totalPages; i++) {
    let row = `<li class="page-item ${currentPage == i ? "active" : ""
      }" onclick="changeProjectPage(${i}, ${totalPages})">
                          <a class="page-link" href="#">${i}</a>
                      </li>`;
    rows += row;
  }

  rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
    }" onclick="changeProjectPage(${currentPage + 1}, ${totalPages})">
                  <a class="page-link" href="#">Next</a>
              </li>`;

  $("#project-pagination").empty();
  $("#project-pagination").append(rows);
}

function changeProjectPage(newPage, totalPages) {
  if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
    return;
  }

  currentPage = newPage;
  getProjectDataForTable(); // reload table
}

function resetProjectPaging() {
  currentPage = 1;
}

function changeProjectSearch() {
  let inputSearch = $("#project-search").val();
  if (inputSearch != currentSearch) {
    currentSearch = inputSearch;
    resetProjectPaging();
    getProjectDataForTable(); // reload table
  }
}

function resetProjectSearch() {
  currentSearch = "";
  $("#project-search").val("");
}

function resetProjectSort() {
  currentFieldSort = "id";
  isSortASC = false;
}

function changeProjectFilter() {
  let inputClass = $("#class-input-filter").val();

  // change filter
  if (inputClass != currentClassFilter) {
    currentClassFilter = inputClass;

    resetProjectPaging();
    getProjectDataForTable(); // reload table
  }
}

function resetProjectFilter() {
  currentClassFilter = "";
  $("#class-input-filter").val("").change();
}

function initSelectForProjectFilter() {
  initSelect2({
    name: "validation-class-filter",
    placeholder: "Select class...",
  });
}

function refreshProjectTable() {
  // reset value
  resetProjectPaging();
  resetProjectSearch();
  resetProjectSort();
  initSelectForProjectFilter();
  resetProjectFilter();

  let role = storage.getRole();
  if (role == Constant.ROLE_MANAGER) {
    // show class
   $('#add-project-button1').attr("style", "display: block !important");
    $("#project-filter").show();
    getProjectClassListFromServer("filter");
  } else {
    $("#add-project-button1").attr("style", "display: none !important");
    $("#project-filter").hide();
  }

  // reload table
  getProjectDataForTable();
}