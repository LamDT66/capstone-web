function showNotification(message, title, isSuccess = true) {
  var type = isSuccess ? "success" : "error";

  toastr[type](message, title, {
    closeButton: true,
    newestOnTop: true,
    rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
    timeOut: 2500,
  });
}

function showLoadingButton(id, content) {
  $(`#${id}`).prop('disabled', true);
  $(`#${id}`).html(`${content} 
            <div
                class="spinner-border text-light spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
            </div>`);
}

function hideLoadingButton(id, content) {
  $(`#${id}`).prop('disabled', false);
  $(`#${id}`).html(content);
}