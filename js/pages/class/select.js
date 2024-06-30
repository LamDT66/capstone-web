// List Subject for Select
function getSubjectListForClassFromServer(mode) {
    subjectAPI.getAllSubjectForSelection({
        success: function (data) {
            fillSubjectToClassSelect(data, mode);
            getSemesterListForClassFromServer(mode);
        },
    });
}

function fillSubjectToClassSelect(subjects, mode) {
    let rows = "<option value=''>Select subject...</option>";

    for (const subject of subjects) {
        let row = `<option value='${subject.id}'>${subject.name}</option>`;
        rows += row;
    }
    if (mode == "filter") {
        $("#subject-input-filter").empty();
        $("#subject-input-filter").append(rows);
    } else {
        $("#subject-input").empty();
        $("#subject-input").append(rows);
    }
}

// List Semester for Select
function getSemesterListForClassFromServer(mode) {
    settingAPI.getAllSemestersForSelection({
        success: function (data) {
            fillSemestersToClassSelect(data, mode);
            if (mode == 'update') {
                getDetailClassFromServer();
            }
        },
    });
}

function fillSemestersToClassSelect(semesters, mode) {
    let rows = "<option value=''>Select semester...</option>";

    for (const semester of semesters) {
        let row = `<option value='${semester.id}'>${semester.settingName}</option>`;
        rows += row;
    }
    if (mode == "filter") {
        $("#semester-input-filter").empty();
        $("#semester-input-filter").append(rows);
    } else {
        $("#semester-input").empty();
        $("#semester-input").append(rows);
    }
}