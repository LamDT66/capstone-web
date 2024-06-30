$(function () {
  if (!storage.isLogin()) {
    location.href = "../pages/auth/landing_page.html";
    return;
  }

  loadComponents();

  loadDefaultPage();
});

function loadComponents() {
  $("#header").load("./header.html", function () {
    feather.replace();
    $("#header-fullname").text(storage.getFullName());
    $("#header-user-avatar").text(storage.getFullName()?.charAt(0));
  });

  $("#left-menu").load("./left-menu.html", function () {
    feather.replace();
    $("#left-menu-fullname").text(storage.getFullName());
    $("#left-menu-user-avatar").text(storage.getFullName()?.charAt(0));
    showMenu();
  });

  $("#footer").load("./footer.html", function () {
    feather.replace();
  });
}

function showMenu() {
  let role = storage.getRole();
  switch (role) {
    case Constant.ROLE_ADMIN:
      // show
      $("#setting-menu").show();
      $("#user-menu").show();
      $("#subject-menu").show();
      // hide
      $("#project-menu").hide();
      $("#report-menu").hide();
      $("#issue-menu").hide();
      $("#class-menu").hide();
      break;
    case Constant.ROLE_MANAGER:
      // show
      $("#class-menu").show();
      $("#project-menu").show();
      // hide
      $("#setting-menu").hide();
      $("#user-menu").hide();
      $("#subject-menu").hide();
      $("#report-menu").hide();
      $("#issue-menu").hide();
      break;
    case Constant.ROLE_TEACHER:
      // show
      $("#project-menu").show();
      $("#report-menu").show();
      $("#issue-menu").show();
      // hide
      $("#setting-menu").hide();
      $("#user-menu").hide();
      $("#subject-menu").hide();
      $("#class-menu").hide();
      break;
    case Constant.ROLE_STUDENT:
      // show
      $("#project-menu").show();
      $("#report-menu").show();
      $("#issue-menu").show();
      // hide
      $("#setting-menu").hide();
      $("#user-menu").hide();
      $("#subject-menu").hide();
      $("#class-menu").hide();
      break;
  }
}

function loadDefaultPage() {
  let role = storage.getRole();
  switch (role) {
    case Constant.ROLE_ADMIN:
      loadUserPage();
      break;
    case Constant.ROLE_MANAGER:
    case Constant.ROLE_TEACHER:
    case Constant.ROLE_STUDENT:
      loadProjectPage();
      break;
  }
}

function logout() {
  storage.removeUserInfo();
  location.href = "../pages/auth/login.html";
}

function toggleLeftMenu() {
  if ($("#left-menu").hasClass("toggled")) {
    $("#left-menu").removeClass("toggled");
  } else {
    $("#left-menu").addClass("toggled");
  }
}
