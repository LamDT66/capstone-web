let addSubjectFormValidator;
let updateSubjectFormValidator;
let addSubjectMilestoneFormValidator;
let updateSubjectMilestoneFormValidator;
let confirmOtpFormValidator;
let resetPasswordFormValidator;
let forgotPasswordFormValidator;
let registerFormValidator;
let loginFormValidator;
let changePasswordFormValidator;
let addSettingFormValidator;
let addProjectSettingFormValidator;
let addProjectMilestoneFormValidator;
let updateSettingFormValidator;
let updateProjectSettingFormValidator;
let updateProjectMilestoneFormValidator;
let addUserFormValidator;
let updateUserFormValidator;
let updateProfileFormValidator;
let addProjectFormValidator;
let addClassFormValidator;
let addReportFormValidator;
let updateClassFormValidator;
let addStudentFormValidator;
let importStudentFormValidator;
let updateProjectFormValidator;
let addIssueFormValidator;
let updateIssueFormValidator;
let addProjectReportFormValidator;


jQuery.validator.addMethod("dateGreaterThanNowAnd",
  function (value, _, params) {
    let paramValue = $(`input[name="${params}"]`).val();
    if (!value) return true;

    if (!params || paramValue.length == 0) {
      return new Date(value) > new Date(getNowFormatDate());
    }
    return (
      new Date(value) > new Date(paramValue) &&
      new Date(value) > new Date(getNowFormatDate())
    );
  },
  `Must be greater than {0}`
);

jQuery.validator.addMethod(
  "dateGreaterThanNowAndLessThan",
  function (value, _, params) {
    let paramValue = $(`input[name="${params}"]`).val();

    if (!value) return true;

    if (!params || paramValue.length == 0) {
      return new Date(value) > new Date(getNowFormatDate());
    }
    return (
      new Date(value) < new Date(paramValue) &&
      new Date(value) > new Date(getNowFormatDate())
    );
  },
  `Must be less than {0}`
);

function showErrorMessage(idInput, idLabel, errorMessage) {
  $(`#${idInput}`).addClass("is-invalid");
  $(`#${idLabel}`).removeClass("d-none");
  if (errorMessage) {
    $(`#${idLabel}`).text(errorMessage);
  }
}

function hideErrorMessage(idInput, idLabel) {
  $(`#${idInput}`).removeClass("is-invalid");
  $(`#${idLabel}`).addClass("d-none");
}

function initBaseValidator({ formValidator, rules, messages, submitHandler }) {
  $(`${formValidator}`).validate().destroy();
  $(`${formValidator}`).validate({
    rules: rules,
    messages: messages,
    submitHandler: function (form) {
      submitHandler();
      return false;
    },
    // Errors
    errorPlacement: function errorPlacement(error, element) {
      var $parent = $(element).parents(".form-group");
      // Do not duplicate errors
      if ($parent.find(".jquery-validation-error").length) {
        return;
      }
      $parent.append(
        error.addClass(
          "jquery-validation-error small form-text invalid-feedback"
        )
      );
    },
    highlight: function (element) {
      var $el = $(element);
      var $parent = $el.parents(".form-group");
      $el.addClass("is-invalid");
      // Select2 and Tagsinput
      if (
        $el.hasClass("select2-hidden-accessible") ||
        $el.attr("data-role") === "tagsinput"
      ) {
        $el.parent().addClass("is-invalid");
      }
    },
    unhighlight: function (element) {
      $(element)
        .parents(".form-group")
        .find(".is-invalid")
        .removeClass("is-invalid");
    },
  });
}

function resetValidator(formValidator) {
  if (formValidator) {
    try {
      formValidator.resetForm();
    } catch (e) { }
    $("input").removeClass("is-invalid");
  }
}

function initAddProjectReportFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#project-report-form",
    rules: {
      "validation-project-report-title": {
        required: true,
        minlength: 5,
        maxlength: 200,
      },
      "validation-project-report-url": {
        required: true,
        maxlength: 1000,
      },
      "validation-project-report-milestone": {
        required: true,
      },
    },
    // messages: {
    //   "validation-settingName": {
    //     maxlength: "The max length of name is 50 characters",
    //     remote: "The setting's name already exists",
    //   },
    // },
    submitHandler,
  });
  addProjectReportFormValidator = $("#project-report-form");
}

function initAddSettingFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#setting-form",
    rules: {
      "validation-settingType": {
        required: true,
      },
      "validation-settingName": {
        required: true,
        maxlength: 50,
        remote: {
          url: `${settingBaseUrl}/name/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#settingName-input").val();
            },
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
      "validation-settingOrder": {
        required: true,
        min: 1,
        remote: {
          url: `${settingBaseUrl}/display-order/exists`,
          type: "GET",
          data: {
            type: function () {
              return $("#settingType-input").val();
            },
            displayOrder: function () {
              return $("#settingOrder-input").val();
            },
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
    },
    messages: {
      "validation-settingName": {
        maxlength: "The max length of name is 50 characters",
        remote: "The setting's name already exists",
      },
      "validation-settingOrder": {
        remote: "The setting's display order already exists",
      },
    },
    submitHandler,
  });
  addSettingFormValidator = $("#setting-form");
}

function initAddProjectSettingFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#project-setting-form",
    rules: {
      "validation-settingType": {
        required: true,
      },
      "validation-settingName": {
        required: true,
        minlength: 3,
        maxlength: 50,
        remote: {
          url: `${projectSettingBaseUrl}/project/type/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#projectSettingName-input").val().toString();
            },
            settingType: function () {
              return $("#projectSettingType-input").val().toString();
            },
            projectId: function () {
              return projectIdForProjectSetting;
            }
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
    },
    messages: {
      "validation-settingName": {
        minlength: "The min length of name is 3 characters",
        maxlength: "The max length of name is 50 characters",
        remote: "The setting's name already exists",
      },
    },
    submitHandler,
  });
  addProjectSettingFormValidator = $("#project-setting-form");
}

function initAddProjectMilestoneFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#project-milestone-form",
    rules: {
      "validation-title": {
        required: true,
        minlength: 5,
        maxlength: 200,
        remote: {
          url: `${projectMilestoneBaseUrl}/title/exists`,
          type: "GET",
          data: {
            title: function () {
              return $("#title-input").val();
            },
            projectId: function () {
              return projectIdForProjectMilestone;
            }
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
      "validation-start-date": {
        required: true,
        date: true,
      },
      "validation-end-date": {
        required: true,
        date: true,
        dateGreaterThanNowAnd: "validation-start-date",
      },
      "validation-end-date": {
        required: true,
        date: true,
        dateGreaterThanNowAnd: "validation-start-date",
      },
    },
    messages: {
      "validation-title": {
        minlength: "The min length of title is 5 characters",
        maxlength: "The max length of title is 200 characters",
        remote: "The milestone's title already exists",
      },
      "validation-end-date": {
        dateGreaterThanNowAnd:
          "The end date must be greater than now and start date",
      },
    },
    submitHandler,
  });
  addProjectMilestoneFormValidator = $("#project-milestone-form");

  // validate when changing value of fields
  $("#start-date-input").on("change.datetimepicker", ({ date, oldDate }) => {
    $(`input[name="validation-end-date"]`).valid();
  });
}

function initLoginFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#login-form",
    rules: {
      "validation-email": {
        required: true,
        minlength: 6,
        maxlength: 50,
      },
      "validation-password": {
        required: true,
        minlength: 6,
        maxlength: 32,
      },
    },
    submitHandler,
  });
  loginFormValidator = $("#login-form");
}

function initChangePasswordFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#change-password-form",
    rules: {
      "validation-old-password": {
        required: true,
        remote: {
          url: `${baseUrl}/auth/old-password-match`,
          type: "GET",
          headers: {
            "Authorization": `Bearer ${storage.getToken()}`
          },
          data: {
            oldPassword: function () {
              return $("#old-password-input").val();
            },
          },
          dataFilter: function (data) {
            return data == "true";
          },
        },
      },
      "validation-new-password": {
        required: true,
        minlength: 6,
        maxlength: 32,
      },
      "validation-confirm-password": {
        required: true,
        minlength: 6,
        maxlength: 32,
        equalTo: "#new-password-input"
      }
    },
    messages: {
      "validation-old-password": {
        remote: "The old password is incorrect"
      },
      "validation-confirm-password": {
        equalTo: "Password & Confirm Password are not matching"
      }
    },
    submitHandler
  });
  changePasswordFormValidator = $("#change-password-form");
}

// Add Project
function initAddProjectFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#add-project-form",
    rules: {
      "validation-class": {
        required: true,
      },
      "validation-groupName": {
        required: true,
        minlength: 3,
        maxlength: 200,
      },
      "validation-team-member": {
        required: true,
        maxlength: 6,
      },
      "validation-projectCode": {
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      "validation-englishName": {
        required: true,
        minlength: 5,
        maxlength: 200,
      },
      "validation-vietnameseName": {
        required: true,
        minlength: 5,
        maxlength: 200,
      },
      "validation-mentor": {
        required: true,
      },
      "validation-coMentor": {
        required: true,
      },
    },
    messages: {
      "validation-team-member": {
          maxlength: "The number of students cannot be greater than 6!",
      },
    },
    submitHandler,
  });
  addProjectFormValidator = $("#add-project-form");
}

// Update project
function initUpdateProjectFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#update-project-form",
    rules: {
      "validation-class": {
        required: true,
      },
      "validation-groupName": {
        required: true,
        minlength: 3,
        maxlength: 200,
      },
      "validation-team-member": {
        required: true,
        maxlength: 6,
      },
      "validation-projectCode": {
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      "validation-englishName": {
        required: true,
        minlength: 5,
        maxlength: 200,
      },
      "validation-vietnameseName": {
        required: true,
        minlength: 5,
        maxlength: 200,
      },
      "validation-mentor": {
        required: true,
      },
      "validation-coMentor": {
        required: true,
      },
    },
    messages: {
        "validation-team-member": {
            maxlength: "The number of students cannot be greater than 6!",
        },
    },
    submitHandler,
  });
  updateProjectFormValidator = $("#update-project-form");
}

// Add Team Members (Add Project)
function initAddMemberFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#add-member-form",
    rules: {
      "validation-member": {
        required: true,
      },
    },
    // messages: {
    //     "validation-settingName": {
    //         remote: "The setting's name already exists",
    //     },
    // },
    submitHandler,
  });
  addMemberFormValidator = $("#add-member-form");
}

function initRegisterFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#register-form",
    rules: {
      "validation-fullName": {
        required: true,
        pattern: /^(?!\s)[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`'"|=-]*$/,
        minlength: 6,
        maxlength: 50,
      },
      "validation-email": {
        required: true,
        maxlength: 50,
        remote: {
          url: `${baseUrl}/users/email/exists`,
          type: "GET",
          data: {
            email: function () {
              return $("#email-input").val();
            },
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
      "validation-password": {
        required: true,
        minlength: 6,
        maxlength: 32,
      },
      "validation-confirmPassword": {
        required: true,
        minlength: 6,
        maxlength: 32,
        equalTo: "#password-input",
      },
    },
    messages: {
      "validation-email": {
        remote: jQuery.validator.format("{0} is already in use"),
      },
      "validation-confirmPassword": {
        equalTo: "Password & Confirm Password are not matching",
      },
    },
    submitHandler,
  });
  registerFormValidator = $("#register-form");
}

function initForgotPasswordFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#forgot-password-form",
    rules: {
      "validation-email": {
        required: true,
        email: true,
        remote: {
          url: `${userBaseUrl}/email/exists`,
          type: "GET",
          data: {
            email: function () {
              return $("#email-input").val();
            },
          },
          dataFilter: function (data) {
            return data == "true";
          },
        },
      },
    },
    messages: {
      "validation-email": {
        remote: "The user's email is not exists",
      },
    },
    submitHandler,
  });
  forgotPasswordFormValidator = $("#forgot-password-form");
}

function initResetPasswordFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#reset-password-form",
    rules: {
      "validation-password": {
        required: true,
        minlength: 6,
        maxlength: 32,
      },
      "validation-confirmPassword": {
        required: true,
        minlength: 6,
        maxlength: 32,
        equalTo: "#password-input",
      },
      "validation-otp": {
        required: true,
        remote: {
          url: `${baseUrl}/auth/reset-password-otp/exists`,
          type: "GET",
          data: {
            otp: function () {
              return $("#otp-input").val();
            },
          },
          dataFilter: function (data) {
            return data == "true";
          },
        },
      },
    },
    messages: {
      "validation-otp": {
        remote: "The OTP is incorrect",
      },
      "validation-confirmPassword": {
        equalTo: "Password & Confirm Password are not matching",
      },
    },
    submitHandler,
  });
  confirmOtpFormValidator = $("#reset-password-form");
}

function resetAddSettingValidator() {
  resetValidator(addSettingFormValidator);
}

function resetAddProjectSettingValidator() {
  resetValidator(addProjectSettingFormValidator);
}

function resetAddProjectMilestoneValidator() {
  resetValidator(addProjectMilestoneFormValidator);
}

function resetChangePasswordFormValidator() {
  resetValidator(changePasswordFormValidator);
}

function resetAddUserValidator() {
  resetValidator(addUserFormValidator);
}

function resetUpdateProjectFormValidator() {
  resetValidator(updateProjectFormValidator);
}

function resetAddClassValidator() {
  resetValidator(addClassFormValidator);
}

function resetAddReportValidator() {
  resetValidator(addReportFormValidator);
}

function resetUpdateClassValidator() {
  resetValidator(updateClassFormValidator);
}

function resetAddStudentValidator() {
  resetValidator(addStudentFormValidator);
}

function resetImportStudentValidator() {
  resetValidator(importStudentFormValidator);
}

//Add new user
function initAddUserFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#user-form",
    rules: {
      "validation-fullName": {
        required: true,
        pattern: /^(?!\s)[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`'"|=-]*$/,
        maxlength: 50,
      },
      "validation-email": {
        required: true,
        email: true,
        remote: {
          url: `${userBaseUrl}/email/exists`,
          type: "GET",
          data: {
            email: function () {
              return $("#email-input").val();
            },
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
      "validation-mobile": {
        required: true,
        pattern: "[0-9]+",
        minlength: 10,
        maxlength: 20,
        remote: {
          url: `${userBaseUrl}/mobile/exists`,
          type: "GET",
          data: {
            mobile: function () {
              return $("#mobile-input").val();
            },
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },

      },
      "validation-role": {
        required: true,
      },
    },
    messages: {
      "validation-email": {
        remote: "The user's email already exists",
      },
      "validation-mobile": {
        remote: "The user's mobile already exists",
      },
    },
    submitHandler,
  });
  addUserFormValidator = $("#user-form");
}

function resetAddSubjectValidator() {
  resetValidator(addSubjectFormValidator);
}

function resetAddIssueValidator() {
  resetValidator(addIssueFormValidator);
}

function resetUpdateIssueValidator() {
  resetValidator(updateIssueFormValidator);
}

function initAddSubjectFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#subject-form",
    rules: {
      "validation-subject-name": {
        required: true,
        maxlength: 50,
        remote: {
          url: `${subjectBaseUrl}/name/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#subject-name-input").val();
            },

          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
      "validation-faculty": {
        required: true,
      },
      "validation-duration": {
        required: true,
        min: 1,
      },
      "validation-manager": {
        required: true,
      },
    },
    messages: {
      "validation-subject-name": {
        remote: "The subject's name already exists",
      },
    },
    submitHandler,
  });
  addSubjectFormValidator = $("#subject-form");
}

function initUpdateSubjectFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#subject-form",
    rules: {
      "validation-subject-name": {
        required: true,
        remote: {
          url: `${subjectBaseUrl}/name/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#subject-name-input").val();
            },
          },
          dataFilter: function (data) {
            if ($("#subject-name-input").val() == oldSubjectNameForUpdate) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
      "validation-duration": {
        required: true,
        min: 1,
      },
      "validation-faculty": {
        required: true,
      },
      "validation-manager": {
        required: true,
      },
    },
    messages: {
      "validation-subject-name": {
        remote: "The subject's name already exists",
      },
    },
    submitHandler,
  });
  updateSubjectFormValidator = $("#subject-form");
}

function resetUpdateSubjectValidator() {
  resetValidator(updateSubjectFormValidator);
}

function initUpdateProfileFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#update-profile-form",
    rules: {
      "validation-name": {
        required: true,
        pattern: /^(?!\s)[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`'"|=-]*$/,
        minlength: 6,
        maxlength: 50,
      },
      "validation-faculty": {
        required: true,
      },
      "validation-mobile": {
        required: true,
        pattern: "[0-9]+",
        minlength: 10,
        maxlength: 20,
        remote: {
          url: `${userBaseUrl}/mobile/exists`,
          type: "GET",
          data: {
            mobile: function () {
              return $("#mobile-input").val();
            },
          },
          dataFilter: function (data) {
            if ($("#mobile-input").val() == oldProfileMobile) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
    },
    messages: {
      "validation-mobile": {
        remote: "The user's mobile already exists",
      },
    },
    submitHandler,
  });
  updateProfileFormValidator = $("#update-profile-form");
}

function resetUpdateUserValidator() {
  resetValidator(updateUserFormValidator);
}

function initAddSubjectMilestoneFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#subject-milestone-form",
    rules: {
      "validation-title": {
        required: true,
      },
      "validation-step": {
        required: true,
        min: 1,
      },
      "validation-duration": {
        required: true,
        min: 1,
      },
    },
    submitHandler,
  });
  addSubjectMilestoneFormValidator = $("#subject-milestone-form");
}

function resetAddSubjectMilestoneValidator() {
  resetValidator(addSubjectMilestoneFormValidator);
}

function initUpdateSubjectMilestoneFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#subject-milestone-form",
    rules: {
      "validation-title": {
        required: true,
      },
      "validation-step": {
        required: true,
        min: 1,
      },
      "validation-duration": {
        required: true,
        min: 1,
      },
    },
    submitHandler,
  });
  updateSubjectMilestoneFormValidator = $("#subject-milestone-form");
}

function resetUpdateSubjectMilestoneValidator() {
  resetValidator(updateSubjectMilestoneFormValidator);
}

function initUpdateSettingFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#setting-form",
    rules: {
      "validation-settingType": {
        required: true,
      },
      "validation-settingName": {
        required: true,
        remote: {
          url: `${settingBaseUrl}/name/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#settingName-input").val();
            },
          },
          dataFilter: function (data) {
            if ($("#settingName-input").val() == oldSettingNameForUpdate) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
      "validation-settingOrder": {
        required: true,
        min: 1,
        remote: {
          url: `${settingBaseUrl}/display-order/exists`,
          type: "GET",
          data: {
            type: function () {
              return $("#settingType-input").val();
            },
            displayOrder: function () {
              return $("#settingOrder-input").val();
            },
          },
          dataFilter: function (data) {
            if ($("#settingType-input").val() == oldSettingTypeForUpdate &&
              $("#settingOrder-input").val() == oldSettingDisplayOrderForUpdate) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
    },
    messages: {
      "validation-settingName": {
        remote: "The setting's name already exists",
      },
      "validation-settingOrder": {
        remote: "The setting's display order already exists",
      },
    },
    submitHandler,
  });
  updateSettingFormValidator = $("#setting-form");
}

function initUpdateProjectSettingFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#project-setting-form",
    rules: {
      "validation-settingType": {
        required: true,
      },
      "validation-settingName": {
        required: true,
        minlength: 3,
        maxlength: 50,
        remote: {
          url: `${projectSettingBaseUrl}/project/type/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#projectSettingName-input").val().toString();
            },
            settingType: function () {
              return $("#projectSettingType-input").val().toString();
            },
            projectId: function () {
              return projectIdForProjectSetting;
            }
          },
          dataFilter: function (data) {
            if ($("#projectSettingName-input").val() == oldProjectSettingNameForUpdate
              && $("#projectSettingType-input").val() == oldProjectSettingTypeForUpdate) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
    },
    messages: {
      "validation-settingName": {
        minlength: "The min length of name is 3 characters",
        maxlength: "The max length of name is 50 characters",
        remote: "The setting's name already exists",
      },
    },
    submitHandler,
  });
  updateProjectSettingFormValidator = $("#project-setting-form");
}

function initUpdateProjectMilestoneFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#project-milestone-form",
    rules: {
      "validation-title": {
        required: true,
        minlength: 5,
        maxlength: 200,
        remote: {
          url: `${projectMilestoneBaseUrl}/title/exists`,
          type: "GET",
          data: {
            title: function () {
              return $("#title-input").val();
            },
          },
          dataFilter: function (data) {
            if (
              $("#title-input").val() ==
              oldProjectMilestoneTitleForUpdate
            ) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
      "validation-start-date": {
        required: true,
        date: true,
      },
      "validation-end-date": {
        required: true,
        date: true,
        dateGreaterThanNowAnd: "validation-start-date",
      },
    },
    messages: {
      "validation-title": {
        minlength: "The min length of title is 5 characters",
        maxlength: "The max length of title is 200 characters",
        remote: "The milestone's title already exists",
      },
      "validation-end-date": {
        dateGreaterThanNowAnd:
          "The end date must be greater than now and start date",
      },
    },
    submitHandler,
  });
  updateProjectMilestoneFormValidator = $("#project-milestone-form");

  // validate when changing value of fields
  $("#start-date-input").on("change.datetimepicker", ({ date, oldDate }) => {
    $(`input[name="validation-end-date"]`).valid();
  });
}

function resetUpdateSettingValidator() {
  resetValidator(updateSettingFormValidator);
}

function resetUpdateProjectSettingValidator() {
  resetValidator(updateProjectSettingFormValidator);
}

function resetUpdateProjectMilestoneValidator() {
  resetValidator(updateProjectMilestoneFormValidator);
}

function initUpdateUserFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#user-form",
    rules: {
      "validation-role": {
        required: true,
      },
      "validation-status": {
        required: true,
      },
    },
    submitHandler,
  });
  updateUserFormValidator = $("#user-form");
}

function resetUpdateProfileValidator() {
  resetValidator(updateProfileFormValidator);
}

function resetUpdateUserValidator() {
  resetValidator(updateUserFormValidator);
}

function initAddIssueFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#issue-form",
    rules: {
      "validation-milestone": {
        required: true,
      },
      "validation-title": {
        required: true,
        maxlength: 200,
      },
      "validation-description": {
        required: true
      },
      "validation-type": {
        required: true
      },
      "validation-process": {
        required: true
      },
      "validation-assignee": {
        required: true
      },
      "validation-status": {
        required: true
      },
    },
    submitHandler
  });
  addIssueFormValidator = $("#issue-form");
}


function initUpdateIssueFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#issue-form",
    rules: {
      "validation-milestone": {
        required: true,
      },
      "validation-title": {
        required: true,
        maxlength: 200,
      },
      "validation-description": {
        required: true
      },
      "validation-type": {
        required: true
      },
      "validation-process": {
        required: true
      },
      "validation-assignee": {
        required: true
      },
      "validation-status": {
        required: true
      },
    },
    submitHandler
  });
  updateIssueFormValidator = $("#issue-form");
}

function initAddClassFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#class-form",
    rules: {
      "validation-class-name": {
        required: true,
        remote: {
          url: `${classBaseUrl}/name/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#class-name-input").val();
            },
          },
          dataFilter: function (data) {
            return !(data == "true");
          },
        },
      },
      "validation-start-date": {
        required: true,
        date: true
      },
      "validation-end-date": {
        required: true,
        date: true,
        dateGreaterThanNowAnd: 'validation-start-date'
      },
      "validation-subject": {
        required: true,
      },
      "validation-semester": {
        required: true,
      },
    },
    messages: {
      "validation-class-name": {
        remote: "The class's name already exists",
      },
      "validation-end-date": {
        dateGreaterThanNowAnd: "The end date must be greater than now and start date",
      },
    },
    submitHandler,
  });
  addClassFormValidator = $("#class-form");

  // validate when changing value of fields
  $("#start-date-input").on("change.datetimepicker", ({ date, oldDate }) => {
    $(`input[name="validation-end-date"]`).valid();
  });
}

function initAddReportFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#report-form",
    rules: {
      "validation-title": {
        required: true,
        maxlength: 200,
      },
      "validation-milestone": {
        required: true,
      },
      "validation-report-file": {
        required: true
      }
    },
    submitHandler,
  });
  addReportFormValidator = $("#report-form");
}

function initUpdateClassFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#class-form",
    rules: {
      "validation-class-name": {
        required: true,
        remote: {
          url: `${classBaseUrl}/name/exists`,
          type: "GET",
          data: {
            name: function () {
              return $("#class-name-input").val();
            },

          },
          dataFilter: function (data) {
            if ($("#class-name-input").val() == oldClassNameForUpdatingClass) {
              return true;
            }
            return !(data == "true");
          },
        },
      },
      "validation-start-date": {
        required: true,
        date: true
      },
      "validation-end-date": {
        required: true,
        date: true,
        dateGreaterThanNowAnd: 'validation-start-date'
      },
      "validation-subject": {
        required: true,
      },
      "validation-semester": {
        required: true,
      }
    },
    messages: {
      "validation-class-name": {
        remote: "The class's name already exists",
      },
      "validation-end-date": {
        dateGreaterThanNowAnd: "The end date must be greater than now and start date",
      }
    },
    submitHandler,
  });
  addClassFormValidator = $("#class-form");

  // validate when changing value of fields
  $("#start-date-input").on("change.datetimepicker", ({ date, oldDate }) => {
    $(`input[name="validation-end-date"]`).valid();
  });
}


function initAddStudentFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#insert-student-form",
    rules: {
      "validation-student": {
        required: true,
      }
    },
    submitHandler,
  });
  addStudentFormValidator = $("#insert-student-form");
}

function initImportStudentFormValidator({ submitHandler }) {
  initBaseValidator({
    formValidator: "#import-student-form",
    rules: {
      "validation-import-student": {
        required: true,
      }
    },
    submitHandler,
  });
  importStudentFormValidator = $("#import-student-form");
}
