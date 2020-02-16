// https://www.linkedin.com/in/{username}/detail/recent-activity

/**
 * Halts execution for a certain amount of seconds.
 * https://stackoverflow.com/a/39914235
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Gets "Delete" buttons on comments you've authored.
function getDeleteCommentButtons() {
    var buttons = [];
    for (const span of document.querySelectorAll("span.mh4.comments-options-menu__text")) {
        if (span.textContent.includes("Delete")) {
            buttons.push(span);
        }
    }

    return buttons;
}

// Gets "Delete" button inside "Are you sure you want to delete your comment?" confirmation box.
function getDeleteConfirmationButton() {
    return document.querySelector("button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view")
}

// Forces scroll down
function loadMoreActivity() {
    window.scrollTo(0, document.body.scrollHeight);
}

//
async function deleteComment(deleteButton) {
    deleteButton.click();
    await sleep(2);

    var deleteConfirmationButton = getDeleteConfirmationButton();
    if (deleteConfirmationButton) {
        deleteConfirmationButton.click();
    }
}

//
async function deleteActivity() {
    var deleteButtons = getDeleteCommentButtons();
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteComment(deleteButtons[i]);
        await sleep(3);
    }
}

//
var keepGoing = true;
async function init() {
    console.log("*** Starting activity deletion ***");
    console.log(">>> Loading more activity")
    loadMoreActivity()
    await sleep(2);
    console.log(">>> Deleting comments")
    deleteActivity();
    if (keepGoing) {
        await sleep(5);
        init();
    }
}

init();
