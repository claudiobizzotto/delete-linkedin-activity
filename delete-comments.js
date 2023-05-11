// https://www.linkedin.com/in/{username}/detail/recent-activity

/**
 * Halts execution for a certain amount of seconds.
 * https://stackoverflow.com/a/39914235
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Gets Comment dropdowns on comments you've authored.
function getDeleteCommentDropdowns() {
    var dropdowns = [], buttons = [];
    for (const dropdown of document.querySelectorAll(".artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.comment-options-trigger.t-black--light.m0")) {
        dropdowns.push(dropdown)
    }
    return dropdowns;
}

// Gets "Delete" button inside "Are you sure you want to delete your comment?" confirmation box.
function getDeleteConfirmationButton() {
    return document.querySelector("button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view")
}

//
async function deleteComment() {
    await sleep(2);

    var deleteConfirmationButton = getDeleteConfirmationButton();
    if (deleteConfirmationButton) {
        deleteConfirmationButton.click();
    }
}

//
async function deleteActivity() {
    var deleteDropdowns = getDeleteCommentDropdowns();
    for (var i = 0; i < deleteDropdowns.length; i++) {
        deleteDropdowns[i].click()
        spans = document.querySelectorAll(".comment-options-dropdown__option-text span")
        for (const span of spans) {
            if (span.textContent.includes("Delete")) {
                span.click();
            }
        }
        deleteComment();
        await sleep(3);
    }
}

//
var keepGoing = true;
async function init() {
    console.log("*** Starting activity deletion ***");
    console.log(">>> Deleting comments")
    deleteActivity();
    if (keepGoing) {
        await sleep(5);
        init();
    }
}

init();
