// Get the registration <form> element from the DOM.
const form = document.getElementById("registration-form");
const submitButton = form.querySelector("button");
    
// TODO: Task 1 - Get the password <input> elements from the DOM by ID
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const checkPasswords = function () {
    // TODO: Task 2 - Compare passwordInput value to confirmPasswordInput value
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;

    // TODO: Task 3 - If passwords don't match then display error message on confirmPasswordInput (using setCustomValidity)
    //                If passwords do match then clear the error message (setCustomValidity with empty string)
    if (passwordsMatch) {
        // Clear any previous error message.
        confirmPasswordInput.setCustomValidity("");
    } else {
        // Setting this error will prevent the from from being submitted.
        confirmPasswordInput.setCustomValidity("Your passwords don't match. Please type the same password again.");
    }
};

const addPasswordInputEventListeners = function () {
    // TODO: Task 4 - Listen for the "input" event on passwordInput and confirmPasswordInput.
    //       Call the checkPasswords function
    passwordInput.addEventListener("input", checkPasswords, false);
    confirmPasswordInput.addEventListener("input", checkPasswords, false);
};

const formSubmissionAttempted = function() {
    form.classList.add("submission-attempted");
};

const addSubmitClickEventListener = function() {
    submitButton.addEventListener("click", formSubmissionAttempted, false);
};

addPasswordInputEventListeners();
addSubmitClickEventListener();















































































































































































































