function getReportsDataForTable() {
  reportAPI.getAll({
    currentPage,
    limit,
    currentProjectFilter,
    success: function (data) {
      fillListReportToTable(data);
      fillPaginationProjectReportToTable(data.totalElements);
    },
  });
}

function fillListReportToTable(reports) {
  let rows = "";
  for (const report of reports.content) {
    let row = `<div class="report-item">
                  <div class="d-flex align-items-center">
                      <i class="align-middle mr-2 fas fa-fw fa-file"></i>
                      <i target="_blank" class="report-item-title">${report.title}</i>
                  </div>
                  <div>
                    <div class="d-flex align-items-center report-item-description">
                      <i class="align-middle mr-2" data-feather="users"></i>
                      <span>${report.projectEnglishName}</span>
                      <span class="pl-2 pr-2">•</span>
                      <i class="align-middle mr-2" data-feather="user-plus"></i>
                      <span>Created by: ${report.creatorFullName}</span>
                      <span class="pl-2 pr-2">•</span>
                      <i class="align-middle mr-2" data-feather="flag"></i>
                      <span>Milestone title: ${report.milestoneTitle}</span>
                      <div class="d-flex align-items-center ml-2 report-created-at">
                        <i class="align-middle mr-2 fas fa-fw fa-calendar-alt"></i>
                        <span>Submit time: ${report.createdAt}</span>
                      </div>
                      <span class="pl-2 pr-2">•</span>
                      <div class="d-flex align-items-center pl-10">
                        <i class="align-middle mr-2" data-feather="download"></i> 
                        <a href="http://localhost:8080/api/v1/files/reports?nameFile=${report.fileUrl}" target="_blank">Download File</a>
                      </div>
                    </div>
                  </div>
                </div>`;
    rows += row;
  }
  $("#report-table-body").empty();
  $("#report-table-body").append(rows);

  feather.replace();
}

function fillPaginationProjectReportToTable(totalItems) {
  let totalPages = Math.ceil(totalItems / limit);

  let rows = "";

  // previous
  rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
    }" onclick="changeProjectReportPage(${currentPage - 1}, ${totalPages})">
                  <a class="page-link" href="#">Previous</a>
              </li>`;

  for (let i = 1; i <= totalPages; i++) {
    let row = `<li class="page-item ${currentPage == i ? "active" : ""
      }" onclick="changeProjectReportPage(${i}, ${totalPages})">
                      <a class="page-link" href="#">${i}</a>
                  </li>`;
    rows += row;
  }

  rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
    }" onclick="changeProjectReportPage(${currentPage + 1}, ${totalPages})">
                  <a class="page-link" href="#">Next</a>
              </li>`;

  $("#project-report-pagination").empty();
  $("#project-report-pagination").append(rows);
}

function changeProjectReportPage(newPage, totalPages) {
  if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
    return;
  }

  currentPage = newPage;
  getReportsDataForTable();
}

function resetReportPaing() {
  currentPage = 1;
}

function resetReportFilter() {
  currentProjectFilter = "";

  $("#project-input-filter").val("").change();
}

function changeReportFilter() {
  let inputProject = $("#project-input-filter").val();

  //change filter
  if (inputProject != currentProjectFilter) {
    currentProjectFilter = inputProject;

    resetReportPaing();
    getReportsDataForTable();
  }
}

function resetReportTable() {
  resetReportPaing();
  resetReportFilter();

  let role = storage.getRole();
  if (role == Constant.ROLE_STUDENT) {
    $('#add-project-report').attr("style", "display: flex !important");
  } else {
    $('#add-project-report').attr("style", "display: none !important");
  }

  //get data for table
  getReportsDataForTable();
}

