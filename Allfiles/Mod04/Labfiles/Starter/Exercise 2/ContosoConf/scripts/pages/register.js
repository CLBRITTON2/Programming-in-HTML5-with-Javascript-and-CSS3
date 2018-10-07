// Get the registration <form> element from the DOM.
const form = document.getElementById("registration-form");
const submitButton = form.querySelector("button");
    
// TODO: Task 1 - Get the password <input> elements from the DOM by ID
// const passwordInput = ...;
// const confirmPasswordInput = ...;

const checkPasswords = function () {
    // TODO: Task 2 - Compare passwordInput value to confirmPasswordInput value

    // TODO: Task 3 - If passwords don't match then display error message on confirmPasswordInput (using setCustomValidity)
    //                If passwords do match then clear the error message (setCustomValidity with empty string)
};

const addPasswordInputEventListeners = function () {
    // TODO: Task 4 - Listen for the "input" event on passwordInput and confirmPasswordInput.
    //       Call the checkPasswords function
};

const formSubmissionAttempted = function() {
    form.classList.add("submission-attempted");
};

const addSubmitClickEventListener = function() {
    submitButton.addEventListener("click", formSubmissionAttempted, false);
};

addPasswordInputEventListeners();
addSubmitClickEventListener();
















































































































































































































