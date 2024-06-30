let studentModeForModel;
let importedStudents;

function getStudentsDataForTable() {
    studentModeForModel = 'insert';

    studentAPI.getAllByClass({
        currentPage: currentPageForModel,
        limit: limitForModel,
        classId: classIdToGetStudent,
        currentSearch: currentSearchForModel,
        currentFieldSort: currentFieldSortForModel,
        isSortASC: isSortASCForModel,
        success: function (data) {
            $("#insert-student-form").show();
            $("#student-search-input").attr("style", "display: flex !important");
            $("#student-pagination").show();

            fillListStudentToTable(data.content);
            fillPaginationStudentToTable(data.totalElements);
        },
    });
}

function fillListStudentToTable(students) {
    let rows = "";
    for (const student of students) {
        let row = ` <tr>                               
                            <td>${student.fullName || ""}</td>
                            <td>${student.gender || ""}</td>
                            <td>${student.email || ""}</td>
                            <td>${student.mobile || ""}</td>
                            <td>${student.status || ""}</td>
                            <td class="table-action text-center">
                                <a href="#" onclick="openDeleteStudentModal(${studentModeForModel == 'insert' ? student.id : student.mobile}, '${student.fullName}')">
                                    <i class="align-middle" data-feather="trash"></i>
                                </a>
                            </td>
                    </tr>`;
        rows += row;
    }
    $("#student-table-body").empty();
    $("#student-table-body").append(rows);
    feather.replace();
}

function fillPaginationStudentToTable(totalItems) {
    totalPages = Math.ceil(totalItems / limit);

    let rows = "";

    rows += `<li class="page-item ${currentPageForModel == 1 ? "disabled" : ""
        }" onclick="changeStudentPage(${currentPageForModel - 1}, ${totalPages})">
                    <a class="page-link" href="#">Previous</a>
            </li>`;

    for (let i = 1; i <= totalPages; i++) {
        let row = `<li class="page-item ${currentPageForModel == i ? "active" : ""
            }" onclick="changeStudentPage(${i}, ${totalPages})">
                            <a class="page-link" href="#">${i}</a>
                        </li>`;
        rows += row;
    }

    rows += `<li class="page-item ${currentPageForModel == totalPages ? "disabled" : ""
        }" onclick="changeStudentPage(${currentPageForModel + 1}, ${totalPages})">
                    <a class="page-link" href="#">Next</a>
                </li>`;
    $("#student-pagination").empty();
    $("#student-pagination").append(rows);
}

function changeStudentPage(newPage, totalPages) {
    if (newPage == currentPageForModel || newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPageForModel = newPage;
    getStudentsDataForTable(); // reload table
}

function changeStudentSort(field) {
    if (studentModeForModel == 'import') return;

    if (field == currentFieldSortForModel) {
        isSortASCForModel = !isSortASCForModel;
    } else {
        currentFieldSortForModel = field;
        isSortASCForModel = true;
    }

    // binding UI
    switch (currentFieldSortForModel) {
        case "student.fullName":
            showSortIconForModel({
                idSortIcon: "fullName-sort-icon",
                hideAllSortIcons: hideAllStudentSortIcons,
            });
            break;
        case "student.gender":
            showSortIconForModel({
                idSortIcon: "gender-sort-icon",
                hideAllSortIcons: hideAllStudentSortIcons,
            });
            break;
        case "student.email":
            showSortIconForModel({
                idSortIcon: "email-sort-icon",
                hideAllSortIcons: hideAllStudentSortIcons,
            });
            break;
        case "student.mobile":
            showSortIconForModel({
                idSortIcon: "mobile-sort-icon",
                hideAllSortIcons: hideAllStudentSortIcons,
            });
            break;
        case "student.status":
            showSortIconForModel({
                idSortIcon: "status-student-sort-icon",
                hideAllSortIcons: hideAllStudentSortIcons,
            });
            break;
    }

    // reload table
    resetStudentPaging();
    getStudentsDataForTable();
}

function changeStudentSearch() {
    let inputSearch = $("#student-search").val();
    if (inputSearch != currentSearchForModel) {
        currentSearchForModel = inputSearch;
        resetStudentPaging();
        getStudentsDataForTable(); // reload table
    }
}

function hideAllStudentSortIcons() {
    hideSortIcon("fullName-sort-icon");
    hideSortIcon("gender-sort-icon");
    hideSortIcon("email-sort-icon");
    hideSortIcon("mobile-sort-icon");
    hideSortIcon("status-student-sort-icon");
}

function resetStudentPaging() {
    currentPageForModel = 1;
}

function resetStudentSearch() {
    currentSearchForModel = "";
    $("#student-search").val("").change();
}

function resetStudentSort() {
    currentFieldSortForModel = "id";
    isSortASCForModel = false;
    hideAllStudentSortIcons();
}

function refreshStudentTable() {
    // reset value
    resetStudentPaging();
    resetStudentSearch();
    resetStudentSort();

    // reload table
    getStudentsDataForTable();
}