function showSortIcon({ idSortIcon, hideAllSortIcons }) {
  hideAllSortIcons();
  $(`#${idSortIcon}`).removeClass("d-none");

  // set icon
  $(`#${idSortIcon}`).empty();
  $(`#${idSortIcon}`).prepend(
    `<i data-feather="${isSortASC ? "chevron-up" : "chevron-down"}"></i>`
  );
  feather.replace();
}

function showSortIconForModel({ idSortIcon, hideAllSortIcons }) {
  hideAllSortIcons();
  $(`#${idSortIcon}`).removeClass("d-none");

  // set icon
  $(`#${idSortIcon}`).empty();
  $(`#${idSortIcon}`).prepend(
    `<i data-feather="${isSortASCForModel ? "chevron-up" : "chevron-down"}"></i>`
  );
  feather.replace();
}

function hideSortIcon(idSortIcon) {
  $(`#${idSortIcon}`).addClass("d-none");
}

