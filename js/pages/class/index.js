function loadClassPage() {
    $("#content").load("../pages/class/class.html", function () {
        feather.replace();
        classCommonForClassPage();
        refreshClassTable();
    });
}

function classCommonForClassPage() {
    // common settings
    $('[data-toggle="tooltip"]').tooltip();

    $('#end-date-input').datetimepicker({
        format: 'YYYY-MM-DD'
    });

    $('#start-date-input').datetimepicker({
        format: 'YYYY-MM-DD'
    });

    $('#submit-date-input').datetimepicker({
        format: 'YYYY-MM-DD'
    });
}