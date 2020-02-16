// https://www.linkedin.com/in/{username}/detail/recent-activity/shares

/**
 * Halts execution for a certain amount of seconds.
 * https://stackoverflow.com/a/39914235
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Gets "Delete post" buttons on posts you've authored.
function getDeleteButtons() {
    var buttons = [];
    for (const span of document.querySelectorAll("span.feed-shared-control-menu__headline")) {
        if (span.textContent.includes("Delete post")) {
            buttons.push(span);
        }
    }

    return buttons;
}

// Gets "Delete" button inside "Delete post?" confirmation box.
function getDeleteConfirmationButton() {
    return document.querySelector("button.feed-shared-decision-modal__confirm-button[data-control-name=\"deleteshares.delete\"]")
}

// Forces scroll down
function loadMoreActivity() {
    window.scrollTo(0, document.body.scrollHeight);
}

//
async function deletePost(deleteButton) {
    deleteButton.click();
    await sleep(2);

    var deleteConfirmationButton = getDeleteConfirmationButton();
    if (deleteConfirmationButton) {
        deleteConfirmationButton.click();
    }
}

//
async function deleteActivity() {
    var deleteButtons = getDeleteButtons();
    for (var i = 0; i < deleteButtons.length; i++) {
        deletePost(deleteButtons[i]);
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
    console.log(">>> Deleting loaded activity")
    deleteActivity();
    if (keepGoing) {
        await sleep(5);
        init();
    }
}

init();
