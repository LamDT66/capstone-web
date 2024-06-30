function loadReportPage() {
  $("#content").load("../pages/reports/reports.html", function () {
    feather.replace();
    resetReportTable();
  });
}