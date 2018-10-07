    // Get the registration <form> element from the DOM.
    const form = document.getElementById("registration-form");
    const submitButton = form.querySelector("button");
    // Get the <input> elements from the DOM.
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    function checkPasswords() {
        const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
        if (passwordsMatch) {
            // Clear any previous error message.
            confirmPasswordInput.setCustomValidity("");
        } else {
            // Setting this error message will prevent the form from being submitted.
            confirmPasswordInput.setCustomValidity("Your passwords don't match. Please type the same password again.");
        }
    };

    function addPasswordInputEventListeners() {
        passwordInput.addEventListener("input", checkPasswords, false);
        confirmPasswordInput.addEventListener("input", checkPasswords, false);
    };

    function formSubmissionAttempted() {
        form.classList.add("submission-attempted");
    };

    function addSubmitClickEventListener() {
        submitButton.addEventListener("click", formSubmissionAttempted, false);
    };

    addPasswordInputEventListeners();
    addSubmitClickEventListener();















































































































































































































