let currentSubjectFilter = "";
let currentSemesterFilter = "";
let currentStatusClassFilter = "";

function getClassDataForTable() {
    classAPI.getAll({
        currentPage,
        limit,
        currentSearch,
        currentSubjectFilter,
        currentSemesterFilter,
        currentStatusClassFilter,
        currentFieldSort,
        isSortASC,
        success: function (data) {
            fillListClassToTable(data.content);
            fillPaginationClassToTable(data.totalElements);
        },
    });
}

function fillListClassToTable(classes) {
    let rows = "";
    for (const clazz of classes) {
        let row = ` <tr>                               
                            <td>${clazz.name}</td>
                            <td>${clazz.startDate} --> ${clazz.endDate}</td>
                            <td>${clazz.semesterName}</td>
                            <td>${clazz.subjectName}</td>
                            <td class="text-center"> 
                                <a href="#" class="mr-2" onclick="openAddStudentToClassModal(${clazz.id})">
                                    <i class="align-middle" data-feather="eye"></i>
                                </a>
                            </td>
                            <td>${clazz.status}</td>
                            <td class="table-action">
                                <a href="#" class="mr-2" onclick="openUpdateClassModal(${clazz.id})">
                                    <i class="align-middle" data-feather="edit-2"></i>
                                </a>
                                <a href="#" onclick="openDeleteClassModal(${clazz.id}, '${clazz.name}')">
                                    <i class="align-middle" data-feather="trash"></i>
                                </a>
                            </td>
                    </tr>`;
        rows += row;
    }
    $("#class-table-body").empty();
    $("#class-table-body").append(rows);
    feather.replace();
}

function fillPaginationClassToTable(totalItems) {
    let totalPages = Math.ceil(totalItems / limit);

    let rows = "";

    // previous
    rows += `<li class="page-item ${currentPage == 1 ? "disabled" : ""
        }" onclick="changeClassPage(${currentPage - 1}, ${totalPages})">
                    <a class="page-link" href="#">Previous</a>
                </li>`;

    for (let i = 1; i <= totalPages; i++) {
        let row = `<li class="page-item ${currentPage == i ? "active" : ""
            }" onclick="changeClassPage(${i}, ${totalPages})">
                            <a class="page-link" href="#">${i}</a>
                        </li>`;
        rows += row;
    }

    rows += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""
        }" onclick="changeClassPage(${currentPage + 1}, ${totalPages})">
                    <a class="page-link" href="#">Next</a>
                </li>`;

    $("#class-pagination").empty();
    $("#class-pagination").append(rows);
}

function changeClassPage(newPage, totalPages) {
    if (newPage == currentPage || newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    getClassDataForTable(); // reload table
}

function changeClassSort(field) {
    if (field == currentFieldSort) {
        isSortASC = !isSortASC;
    } else {
        currentFieldSort = field;
        isSortASC = true;
    }

    // binding UI
    switch (currentFieldSort) {
        case "name":
            showSortIcon({
                idSortIcon: "class-name-sort-icon",
                hideAllSortIcons: hideAllClassSortIcons,
            });
            break;
        case "startDate":
            showSortIcon({
                idSortIcon: "time-sort-icon",
                hideAllSortIcons: hideAllClassSortIcons,
            });
            break;
        case "semester.settingName":
            showSortIcon({
                idSortIcon: "semesterName-sort-icon",
                hideAllSortIcons: hideAllClassSortIcons,
            });
            break;
        case "subject.subjectName":
            showSortIcon({
                idSortIcon: "subjectName-sort-icon",
                hideAllSortIcons: hideAllClassSortIcons,
            });
            break;
        case "status":
            showSortIcon({
                idSortIcon: "status-sort-icon",
                hideAllSortIcons: hideAllClassSortIcons,
            });
            break;
    }

    // reload table
    resetClassPaging();
    getClassDataForTable();
}

function changeClassSearch() {
    let inputSearch = $("#class-search").val();
    if (inputSearch != currentSearch) {
        currentSearch = inputSearch;
        resetClassPaging();
        getClassDataForTable(); // reload table
    }
}

function hideAllClassSortIcons() {
    hideSortIcon("class-name-sort-icon");
    hideSortIcon("submit-date-sort-icon");
    hideSortIcon("semesterName-sort-icon");
    hideSortIcon("subjectName-sort-icon");
    hideSortIcon("facultyName-sort-icon");
    hideSortIcon("managerFullName-sort-icon");
    hideSortIcon("status-sort-icon");
}

function resetClassPaging() {
    currentPage = 1;
}

function resetClassSearch() {
    currentSearch = "";
    $("#class-search").val("");
}

function resetClassSort() {
    currentFieldSort = "id";
    isSortASC = false;
    hideAllClassSortIcons();
}

function resetClassFilter() {
    currentSubjectFilter = "";
    currentSemesterFilter = "";
    currentStatusClassFilter = "";

    $("#subject-input-filter").val("").change();
    $("#semester-input-filter").val("").change();
    $("#status-class-filter").val("").change();
}

function initSelectForClassFilter() {

    initSelect2({
        name: "validation-subject-filter",
        placeholder: "Select subject...",
    });

    initSelect2({
        name: "validation-semester-filter",
        placeholder: "Select semester...",
    });

    initSelect2({
        name: "validation-status-filter",
        placeholder: "Select status...",
    });
}

function refreshClassTable() {
    // reset value
    resetClassPaging();
    resetClassSearch();
    resetClassSort();
    initSelectForClassFilter();
    resetClassFilter();

    // get data for filter
    getSubjectListForClassFromServer("filter");

    // reload table
    getClassDataForTable();
}

function changeClassFilter() {
    let inputSubject = $("#subject-input-filter").val();
    let inputSemester = $("#semester-input-filter").val();
    let inputStatus = $("#status-class-filter").val();

    // change filter
    if (inputSubject != currentSubjectFilter
        || inputSemester != currentSemesterFilter
        || inputStatus != currentStatusClassFilter
    ) {
        currentSubjectFilter = inputSubject;
        currentSemesterFilter = inputSemester;
        currentStatusClassFilter = inputStatus

        resetClassPaging();
        getClassDataForTable(); // reload table
    }
}