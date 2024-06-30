// List class for Select
function getProjectClassListFromServer(mode) {
    classAPI.getAllForManager({
        success: function (data) {
            // success
            fillProjectClassToSelect(data, mode);
        },
    });
}

function fillProjectClassToSelect(classes, mode) {
    let rows = "<option value=''>Select class...</option>";

    for (const clazz of classes) {
        let row = `<option value='${clazz.id}'>${clazz.name}</option>`;
        rows += row;
    }

    if (mode == "filter") {
        $("#class-input-filter").empty();
        $("#class-input-filter").append(rows);
    }
}