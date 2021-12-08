// https://www.linkedin.com/in/{username}/detail/recent-activity/shares

/**
 * Halts execution for a certain amount of seconds.
 * https://stackoverflow.com/a/39914235
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * Use with other async functions to limit execution duration.
 * https://javascript.plainenglish.io/how-to-add-a-timeout-limit-to-asynchronous-javascript-functions-3676d89c186d
 */
function timeout(timeLimit, msg = 'Async call timeout limit reached') {
    return new Promise((_resolve, reject) => {
        timeoutHandle = setTimeout(
            () => reject(new Error(msg)),
            timeLimit * 1000
        );
    });
}

// Wait for an element to appear
async function awaitThis(selector, parent = document) {
    let element = parent.querySelector(selector);
    if (element) return Promise.resolve(element);
    while (null == element) {
        await sleep(1);
        element = parent.querySelector(selector);
        if (element) return Promise.resolve(element);
    }
    return Promise.reject(null);
};

// Wait for an element to disappear
async function awaitGone(element) {
    if (null == element) return Promise.resolve("element is gone");
    while (document.contains(element)) {
        await sleep (1);
        if (true != document.contains(element)) return Promise.resolve("element is gone");
    }
    return Promise.reject(null);
}

function awaitGoneTimed(element, seconds = 10) {
    return Promise.race([awaitGone(element), timeout(seconds)]);
}


function awaitThisTimed(selector, parent = document, seconds = 10) {
    return Promise.race([awaitThis(selector, parent), timeout(seconds)]);
}

function getPostEditMenuButtons() {
    var buttons = [];
    for (const x of document.querySelectorAll(".feed-shared-control-menu__trigger")) {
        buttons.push(x);
    }
    return buttons;
}

// Forces scroll down
async function loadMoreActivity() {
    window.scrollTo(0, document.body.scrollHeight);
}

async function init() {
    console.log("*** Starting activity deletion ***");

    // Grab first set of post-edit buttons [...]
    const editMenuButtons = getPostEditMenuButtons();
    if (0 == editMenuButtons.length) {
        console.log("No posts found!");
        return true;
    }

    //
    console.log(">>> Deleting loaded activity");
    for (const emButton of editMenuButtons) {
        emButton.scrollIntoView();
        emButton.click();
        const menu = await awaitThisTimed(".feed-shared-control-menu__content");

        if (true !== menu instanceof HTMLElement) {
            throw "Menu not found!";
        } else {
            console.log(`Menu found (id:${menu.id})`);
        }

        const deleteButton = await awaitThisTimed(".option-delete .feed-shared-control-menu__headline", menu);

        if (null == deleteButton) {
            throw `Though menu (id:${menu.id}) was found, post-delete button was not!`;
        } else {
            console.log("delete button in menu found");
        }

        deleteButton.click();

        const modalAcceptButton = await awaitThisTimed("button.feed-shared-decision-modal__confirm-button");
        console.log(modalAcceptButton);
        if (null == modalAcceptButton) {
            throw "Post deletion modal not found!";
        } else {
            console.log("modal accept button found");
        }
        modalAcceptButton.click();
        const result = await awaitGoneTimed(modalAcceptButton);
        console.log(result);
        if (null == result) {
            throw "IDK";
        }
    }

    console.log(">>> Loading more activity");
    await loadMoreActivity();
    console.log(">>> Done.");
    await sleep(3);
    if (0 < getPostEditMenuButtons().length) init();

    return true;
}

init();
